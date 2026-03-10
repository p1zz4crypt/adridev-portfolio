// api/mxtw-chat.js
// ─────────────────────────────────────────────────
// Vercel Serverless Function — MXTW Volunteer Bot
// LangChain.js RAG pipeline
// ─────────────────────────────────────────────────
// Endpoint: POST /api/mxtw-chat
// El frontend hace fetch a esta URL automáticamente
// ─────────────────────────────────────────────────

import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";

// ── Base de conocimiento ──
const VOLUNTEER_KB = `
MEXICO TECH WEEK 2026 — PROGRAMA DE VOLUNTARIADO

SOBRE EL EVENTO:
Mexico Tech Week es un festival tech descentralizado y comunitario en CDMX. Cualquiera puede registrar un evento en el calendario abierto. Edición 2026: 26 de octubre al 1 de noviembre. Más de 200 eventos, 9,000+ asistentes esperados. Sponsors Platinum: Binance, Canva, Capital One, Tec de Monterrey. Gold: Google Cloud, Notion, WeWork. Silver: Salesforce, Deel, Zillow.

ROLES DISPONIBLES:
1. Tech House Ops — Gestión del hub central: coworking, café, logística de espacios y atención directa a asistentes. No requiere experiencia previa. Turnos de 6h. 8-10 vacantes estimadas.
2. Registro & Check-in — Recepción de asistentes en venues, verificación de registro en Lu.ma, entrega de badges y orientación. No requiere experiencia previa. Turnos de 4-6h. 6-8 vacantes.
3. Social Media & Foto — Cobertura en redes sociales del evento en tiempo real: fotografía, video para stories, reels y posts. Requiere experiencia básica en content creation. Turnos de 6h. 4-6 vacantes.
4. Speaker Support — Asistencia a ponentes: coordinar llegadas, preparar salas, manejar tiempos y resolver imprevistos. Requiere inglés conversacional y experiencia básica en eventos. Turnos de 4-6h. 4-6 vacantes.
5. Tech Support & AV — Soporte técnico en venues: proyectores, audio, conectividad WiFi, streaming y troubleshooting. Requiere experiencia en soporte técnico. Turnos de 6h. 3-4 vacantes.
6. Liaison Internacional — Acompañamiento de asistentes internacionales: traducción, orientación en CDMX y networking facilitado. Requiere inglés avanzado y conocimiento de CDMX. Turnos flexibles. 4-6 vacantes.

BENEFICIOS PARA VOLUNTARIOS:
- Acceso gratuito a todos los eventos de MXTW durante la semana completa
- Networking directo con founders, VCs, y representantes de sponsors
- Certificado oficial de participación emitido por MXTW
- Kit de voluntario que incluye playera oficial y swag del evento
- Acceso al Tech House con café y snacks gratuitos durante turnos
- Mención en redes sociales oficiales de Mexico Tech Week

PROCESO DE APLICACIÓN:
Paso 1: Llenar el formulario de aplicación en mexicotechweek.mx/volunteer
Paso 2: Entrevista breve de 15 minutos por WhatsApp con el equipo de operaciones
Paso 3: Onboarding que incluye training virtual y recepción del manual del voluntario
Paso 4: Asignación de rol y turnos según disponibilidad y habilidades
Paso 5: Participar activamente en Mexico Tech Week (26 oct - 1 nov 2026)
Paso 6: Recibir certificado digital de participación post-evento

REQUISITOS GENERALES:
- Comprometerse a un mínimo de 12 horas durante la semana del evento
- Tener disponibilidad de al menos 2 días completos
- Turnos disponibles: mañana (8:00-14:00) o tarde (14:00-20:00), o flexible
- Código de vestimenta durante turnos: casual tech con playera oficial de MXTW
- No se requiere experiencia previa para la mayoría de roles (excepto Tech Support y Speaker Support)
- Voluntarios de fuera de CDMX y de otros países son bienvenidos

PREGUNTAS FRECUENTES:
- ¿Puedo asistir a eventos como attendee? Sí, fuera de tu turno asignado puedes asistir libremente a cualquier evento del calendario MXTW.
- ¿Hay apoyo de transporte? No cubrimos transporte pero intentamos asignar al venue más cercano a tu ubicación.
- ¿Puedo ser voluntario desde fuera de CDMX? Sí, voluntarios de otras ciudades y países son bienvenidos. No cubrimos hospedaje pero podemos conectarte con otros voluntarios para compartir.
- ¿Hay alimentación? Café y snacks gratuitos en el Tech House durante tus turnos.
- ¿Cuál es el deadline para aplicar? Las aplicaciones se revisan de forma continua hasta agotar vacantes. Recomendamos aplicar lo antes posible.
- ¿Puedo elegir mi rol? Puedes indicar tu preferencia en el formulario. La asignación final depende de disponibilidad y habilidades.
- ¿Recibiré un certificado? Sí, todos los voluntarios que completen sus horas reciben un certificado digital oficial.

TECH HOUSE:
El Tech House es el hub central de Mexico Tech Week, ubicado en CDMX. Ofrece coworking gratuito, café de especialidad, networking space, y es el punto de encuentro principal del evento. Los voluntarios del Tech House son el corazón logístico de la operación.

CONTACTO:
Para consultas adicionales: hola@mexicotechweek.mx
Sitio web: mexicotechweek.mx
`;

// ── Vector store singleton (se reutiliza entre invocaciones en caliente) ──
let vectorStorePromise = null;

async function getVectorStore() {
  if (!vectorStorePromise) {
    vectorStorePromise = (async () => {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
        separators: ["\n\n", "\n", ". ", " "],
      });

      const docs = await splitter.createDocuments([VOLUNTEER_KB]);

      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        model: "text-embedding-3-small",
      });

      return await MemoryVectorStore.fromDocuments(docs, embeddings);
    })();
  }
  return vectorStorePromise;
}

// ── Handler ──
export default async function handler(req, res) {
  // CORS para que el frontend de Vite pueda llamar en dev
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    const userMessage = messages?.[messages.length - 1]?.content;

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    // 1. Vector store
    const vectorStore = await getVectorStore();

    // 2. Retriever — busca los 4 chunks más relevantes
    const retriever = vectorStore.asRetriever({ k: 4, searchType: "similarity" });

    // 3. LLM
    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
      temperature: 0.3,
    });

    // 4. Prompt con contexto RAG
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `Eres el asistente virtual del programa de voluntariado de Mexico Tech Week 2026. Tu nombre es MXTW Bot.

REGLAS:
- Responde SOLO con información del contexto proporcionado
- Si no encuentras la respuesta en el contexto, indica amablemente que no tienes esa información y sugiere contactar a hola@mexicotechweek.mx
- Responde en español, de forma amigable y concisa
- Usa markdown cuando ayude (negritas, listas)
- No inventes información

CONTEXTO:
{context}`,
      ],
      ["human", "{input}"],
    ]);

    // 5. RAG chain
    const combineDocsChain = await createStuffDocumentsChain({ llm, prompt });
    const retrievalChain = await createRetrievalChain({ combineDocsChain, retriever });

    // 6. Ejecutar
    const response = await retrievalChain.invoke({ input: userMessage });

    return res.status(200).json({ answer: response.answer });
  } catch (error) {
    console.error("MXTW Chat error:", error);
    return res.status(500).json({ error: "Error procesando tu pregunta." });
  }
}
