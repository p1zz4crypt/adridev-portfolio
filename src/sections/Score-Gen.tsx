import { useState } from "react";
import { Send, Download, AlertCircle, CheckCircle } from "lucide-react";

export default function ProjectScoreGenerator() {
  const [formData, setFormData] = useState({
    idea: "",
    estado: "",
    municipio: "",
    modalidad: "casa", // casa | local | via_publica | delivery
    presupuesto: "medio", // bajo | medio | alto
    aperturaObjetivo: "1_mes", // 2_semanas | 1_mes | 3_meses
    alimentosFrescos: true,
    empleados: false,
    anuncio: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  function InfoTooltip({
    label = "Info",
    title,
    bullets = [],
  }: {
    label?: string;
    title: string;
    bullets?: string[];
  }) {
    return (
      <span className="relative inline-flex items-center group">
        <span
          className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-500/50 bg-slate-800/60 text-slate-200 text-xs font-bold cursor-help"
          aria-label={label}
          tabIndex={0}
        >
          i
        </span>

        {/* Tooltip */}
        <span
          role="tooltip"
          className="
          pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-80 -translate-x-1/2
          rounded-xl border border-slate-700/60 bg-slate-950/95 p-4 text-left
          text-slate-200 shadow-2xl opacity-0 scale-95 transition
          group-hover:opacity-100 group-hover:scale-100
          group-focus-within:opacity-100 group-focus-within:scale-100
        "
        >
          <span className="block text-sm font-semibold mb-2">{title}</span>

          {bullets.length > 0 && (
            <ul className="space-y-1 text-xs text-slate-300">
              {bullets.map((b, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {/* caret */}
          <span
            className="
            absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45
            border-l border-t border-slate-700/60 bg-slate-950/95
          "
          />
        </span>
      </span>
    );
  }






 const faqItems = [
  {
    question: "¿Qué es Lumo?",
    answer:
      "Una herramienta con IA que convierte tu idea de negocio en un diagnóstico práctico para México. Con tu idea, ubicación, modalidad (casa/local/vía pública) y presupuesto, obtienes: score de viabilidad (0–10), trámites probables por nivel (obligatorios / pronto / graduales), estimación de costos en MXN (con y sin local), lista de equipo e insumos y un plan 30/60/90."
  },
  {
    question: "¿Para quién es útil?",
    answer:
      "Para personas que quieren emprender en México y necesitan aterrizar su idea rápido: qué tan viable es, qué permisos podrían aplicar, cuánto podría costar arrancar y qué comprar primero. Ideal para negocios pequeños, desde casa, locales, puestos o ventas por WhatsApp."
  },
  {
    question: "¿Qué mide exactamente?",
    answer:
      "Evalúa la viabilidad con base en: presupuesto vs. alcance, complejidad operativa, riesgos de permisos/regulación según la modalidad, factores de ubicación (a nivel general) y claridad/diferenciación de la propuesta. El score es una guía para tomar mejores decisiones, no una garantía."
  },
  {
    question: "¿Cuánto tiempo tarda el análisis?",
    answer:
      "Normalmente menos de 10 segundos. La IA genera el diagnóstico y lo entrega estructurado para que puedas revisarlo y actuar."
  },
  {
    question: "¿Es asesoría legal o contable? ¿Cómo funciona técnicamente?",
    answer:
      "No. Es una guía inicial con supuestos y enlaces para verificar en fuentes oficiales (SAT, municipio/alcaldía, Protección Civil, COFEPRIS si aplica). Técnicamente usa React + Tailwind en el frontend y la API de Google Gemini."
  }
];


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const generateAnalysis = async (data) => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const prompt = `Actúa como un asesor práctico para emprendedores en México.
Tu tarea es evaluar una idea de negocio y convertirla en un diagnóstico accionable con enfoque mexicano: trámites, tiempos, costos aproximados y equipo/insumos.

Entradas del usuario:
- Idea de negocio: ${data.idea}
- Ubicación: ${data.estado}, ${data.municipio}
- Modalidad: ${data.modalidad} (casa/local/vía pública/delivery)
- Presupuesto: ${data.presupuesto}
- Fecha objetivo de apertura: ${data.aperturaObjetivo}
- Alimentos frescos: ${data.alimentosFrescos ? "sí" : "no"}
- Empleados: ${data.empleados ? "sí" : "no"}
- Anuncio/rotulación: ${data.anuncio ? "sí" : "no"}

Reglas:
1) Devuelve SOLO JSON válido (sin markdown, sin texto extra).
2) Dinero en MXN y en rangos (ej. "$3,000–$8,000").
3) Trámites agrupados en: mandatory_to_start, recommended_soon, optional_or_grow_later.
4) Como depende del municipio/estado, incluye "where_to_check" (dependencia típica) y aclara cuando dependa de reglamento local.
5) Incluye 2 escenarios: sin local (casa) y con local rentado.
6) Lista equipo/insumos típicos y un total aproximado (rango), aclarando que es estimado.
7) Incluye plan 30/60/90 y 3 next_best_actions.
En "important_links_mx" incluye 3 a 5 links. Prioriza fuentes oficiales (SAT, municipio/alcaldía, Protección Civil, COFEPRIS si aplica). Si no conoces la URL exacta municipal, deja url vacío pero con title claro.

Responde SOLO con este JSON (rellena TODO):
{
  "viability_score": 0,
  "score_breakdown": [
    { "factor": "Presupuesto vs alcance", "score_0_2": 0, "note": "" },
    { "factor": "Permisos y riesgo regulatorio", "score_0_2": 0, "note": "" },
    { "factor": "Operación y logística", "score_0_2": 0, "note": "" },
    { "factor": "Demanda/ubicación", "score_0_2": 0, "note": "" },
    { "factor": "Diferenciación", "score_0_2": 0, "note": "" }
  ],
  "summary": "",
  "assumptions": ["", ""],

  "required_procedures_mx": {
    "mandatory_to_start": [
      { "name": "", "level": "federal|state|municipal", "why": "", "typical_time": "", "typical_cost_mxn": "", "where_to_check": "" }
    ],
    "recommended_soon": [
      { "name": "", "level": "federal|state|municipal", "why": "", "typical_time": "", "typical_cost_mxn": "", "where_to_check": "" }
    ],
    "optional_or_grow_later": [
      { "name": "", "level": "federal|state|municipal", "why": "", "typical_time": "", "typical_cost_mxn": "", "where_to_check": "" }
    ]
  },

  "setup_cost_estimates_mxn": {
    "scenario_no_local_home_based": {
      "one_time": [
        { "category": "", "range_mxn": "", "notes": "" }
      ],
      "monthly": [
        { "category": "", "range_mxn": "", "notes": "" }
      ],
      "estimated_total_one_time_range_mxn": "",
      "estimated_total_monthly_range_mxn": ""
    },
    "scenario_with_rented_local": {
      "one_time": [
        { "category": "", "range_mxn": "", "notes": "" }
      ],
      "monthly": [
        { "category": "", "range_mxn": "", "notes": "" }
      ],
      "estimated_total_one_time_range_mxn": "",
      "estimated_total_monthly_range_mxn": ""
    }
  },

  "equipment_and_supplies": {
    "essential": [
      { "item": "", "why": "", "estimated_range_mxn": "" }
    ],
    "nice_to_have": [
      { "item": "", "why": "", "estimated_range_mxn": "" }
    ],
    "estimated_equipment_total_range_mxn": "",
    "note": "Estimaciones aproximadas; varían por ciudad, calidad y proveedor."
  },

  "risks": [
    { "risk": "", "impact": "alto|medio|bajo", "mitigation": "" }
  ],

  "execution_plan_30_60_90": {
    "first_7_days": ["", ""],
    "days_8_30": ["", ""],
    "days_31_60": ["", ""],
    "days_61_90": ["", ""]
  },

  "next_best_actions": ["", "", ""],
  "important_links_mx": [
  { "title": "SAT - Inscripción al RFC", "url": "https://www.sat.gob.mx/" },
  { "title": "Tu gobierno municipal/alcaldía - Licencia de funcionamiento", "url": "" },
  { "title": "Protección Civil (municipal/estatal)", "url": "" }
],
  "disclaimer": "No es asesoría legal. Verifica requisitos en tu municipio/estado."
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.4,
            },
          }),
        }
      );

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        console.error("Gemini error body:", errBody);
        throw new Error(
          errBody?.error?.message || `API error: ${response.status}`
        );
      }

      const dataRes = await response.json();
      const content = dataRes.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!content) throw new Error("Empty response from model");

      const parsed = JSON.parse(content);

      if (
        parsed?.viability_score === undefined ||
        !parsed?.required_procedures_mx?.mandatory_to_start ||
        !parsed?.setup_cost_estimates_mxn?.scenario_no_local_home_based ||
        !parsed?.setup_cost_estimates_mxn?.scenario_with_rented_local ||
        !parsed?.equipment_and_supplies?.essential ||
        !parsed?.execution_plan_30_60_90 ||
        !Array.isArray(parsed?.next_best_actions)
      ) {
        throw new Error("Invalid response structure");
      }

      return parsed;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  };

  const handleAnalyze = async () => {
    if (!formData.idea.trim()) {
      setError("Por favor describe tu idea de negocio");
      return;
    }
    if (!formData.estado.trim()) {
      setError("Por favor indica tu estado");
      return;
    }
    if (!formData.municipio.trim()) {
      setError("Por favor indica tu municipio o alcaldía");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const analysisResult = await generateAnalysis(formData);

      setResult(analysisResult);
    } catch (err) {
      console.error("Error:", err);
      setError("Error al analizar. Verifica tu API key o intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    alert("Funcionalidad de descarga se integrará con pdfkit o similar");
  };

  const getRiskColor = (impact) => {
    switch (impact) {
      case "alto":
        return "text-red-500";
      case "medio":
        return "text-yellow-500";
      case "bajo":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getRiskBg = (impact) => {
    switch (impact) {
      case "alto":
        return "bg-red-50 border-red-200";
      case "medio":
        return "bg-yellow-50 border-yellow-200";
      case "bajo":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };
  const costBasisTooltip =
    "Estimación aproximada basada en: tu rango de presupuesto, modalidad, insumos/equipo típico del giro y supuestos comunes (rentas promedio/depósito, inventario inicial, servicios y mermas). Puede variar por ciudad, proveedor y temporada.";


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-3 mb-4">
              <svg
                className="w-8 h-8 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 1 1 0 000 2H6a1 1 0 100-2h-.5A3.5 3.5 0 008 7.5V9H4.5A3.5 3.5 0 001 12.5v2.75c0 .84.648 1.512 1.5 1.512h14c.852 0 1.5-.672 1.5-1.512v-2.75A3.5 3.5 0 0015.5 9H12V7.5A3.5 3.5 0 008.5 4H8a1 1 0 100 2h.5A1.5 1.5 0 0110 7.5v1.5H4V5z"
                />
              </svg>
            </div>

           
            <p className="text-slate-300 text-lg">
              Aterriza tu idea de negocio en México: trámites, costos, equipo y
              plan
            </p>
          </div>
        </div>

        {/* Form Section */}
        {!result && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl  p-8 ">
              <div className="mb-8">
                <label className="block text-black font-bold mb-3 text-lg">
                  Describe tu idea de negocio
                </label>
                <textarea
                  name="idea"
                  value={formData.idea}
                  onChange={handleChange}
                  placeholder="Ej: Quiero abrir una verdulería afuera de mi casa, sin local, vendiendo desde la puerta..."
                  className="w-full h-32 p-4 bg-slate-700/50 text-black rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none placeholder-slate-400 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-black font-bold mb-3">
                    📍 Estado
                  </label>
                  <input
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    placeholder="Ej: CDMX, Jalisco, Nuevo León..."
                    className="w-full p-4 bg-slate-700/50 text-black rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-black font-bold mb-3">
                    🏙️ Municipio / Alcaldía
                  </label>
                  <input
                    name="municipio"
                    value={formData.municipio}
                    onChange={handleChange}
                    placeholder="Ej: Benito Juárez, Zapopan, San Pedro..."
                    className="w-full p-4 bg-slate-700/50 text-black rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-black font-bold mb-3">
                    🏪 Modalidad
                  </label>
                  <select
                    name="modalidad"
                    value={formData.modalidad}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-700/50 text-black rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
                  >
                    <option value="casa">Desde casa (puerta/garage)</option>
                    <option value="local">Local rentado</option>
                    <option value="via_publica">
                      Vía pública (puesto/banqueta)
                    </option>
                    <option value="delivery">A domicilio / WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-black font-bold mb-3">
                    🗓️ ¿Cuándo quieres abrir?
                  </label>
                  <select
                    name="aperturaObjetivo"
                    value={formData.aperturaObjetivo}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-700/50 text-black rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
                  >
                    <option value="2_semanas">En 2 semanas</option>
                    <option value="1_mes">En 1 mes</option>
                    <option value="3_meses">En 3 meses</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-black font-bold mb-3">
                    💰 Presupuesto aproximado
                  </label>
                  <select
                    name="presupuesto"
                    value={formData.presupuesto}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-700/50 text-black rounded-xl border border-purple-500/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition"
                  >
                    <option value="bajo">Bajo (hasta $10,000 MXN)</option>
                    <option value="medio">Medio ($10,000–$50,000 MXN)</option>
                    <option value="alto">Alto ($50,000+ MXN)</option>
                  </select>
                </div>
              </div>
              <div className="bg-slate-700/20 rounded-xl p-4 border border-slate-600/30 mb-8">
                <p className="text-black font-bold mb-3">Detalles rápidos</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-black">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="alimentosFrescos"
                      checked={formData.alimentosFrescos}
                      onChange={handleChange}
                    />
                    Venderé alimentos frescos
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="empleados"
                      checked={formData.empleados}
                      onChange={handleChange}
                    />
                    Tendré empleados
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="anuncio"
                      checked={formData.anuncio}
                      onChange={handleChange}
                    />
                    Haré anuncio / lona
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6 flex items-start gap-3">
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition transform hover:scale-105 disabled:hover:scale-100 text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Analizando tu idea...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Generar Análisis
                  </>
                )}
              </button>

              {/* FAQ Section */}
              <div className="mt-12">
                <h3 className="text-black font-bold text-lg mb-4 text-center">
                  ❓ Preguntas Frecuentes
                </h3>
                <div className="space-y-2">
                  {faqItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-700/30 rounded-lg border border-slate-600/30 overflow-hidden transition"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-6 py-4 text-left text-black font-semibold hover:bg-slate-700/50 transition flex items-center justify-between"
                      >
                        <span>{item.question}</span>
                        <span
                          className={`transform transition-transform ${expandedFaq === idx ? "rotate-180" : ""
                            }`}
                        >
                          ▼
                        </span>
                      </button>
                      {expandedFaq === idx && (
                        <div className="px-6 py-4 bg-slate-800/50 border-t border-slate-600/30 text-slate-300 text-sm leading-relaxed">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Score Card - Hero */}
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-black border border-purple-400/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <p className="text-purple-100 text-sm font-semibold uppercase tracking-wider mb-2">
                    Puntuación de Viabilidad
                  </p>
                  <p className="text-6xl font-black mb-4">
                    {result.viability_score?.toFixed(1) || "0.0"}/10
                  </p>
                  {result.summary && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <p className="text-purple-50 leading-relaxed">
                        {result.summary}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <div className="relative w-40 h-40">
                    <svg
                      className="transform -rotate-90 w-40 h-40"
                      viewBox="0 0 160 160"
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="8"
                        strokeDasharray={`${((result.viability_score || 0) / 10) * 439.8
                          } 439.8`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-black">
                        {Math.round(((result.viability_score || 0) / 10) * 100)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Timeline and Team */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-blue-500/20 backdrop-blur">
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center">
                      🏠 Sin local (desde casa)
                      <InfoTooltip
                        title="¿De dónde sale este estimado?"
                        bullets={[
                          "Rango según tu presupuesto + modalidad (casa/local).",
                          "Incluye supuestos típicos: inventario inicial, equipo básico, servicios, mermas.",
                          "Si es con local: renta, depósito y adecuaciones simples.",
                          "Varía por ciudad, proveedor, temporada y tamaño del negocio."
                        ]}
                      />
                    </p>


                    <p className="text-2xl font-bold text-blue-400">
                      {result.setup_cost_estimates_mxn
                        ?.scenario_no_local_home_based
                        ?.estimated_total_one_time_range_mxn || "—"}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      Mensual:{" "}
                      {result.setup_cost_estimates_mxn
                        ?.scenario_no_local_home_based
                        ?.estimated_total_monthly_range_mxn || "—"}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-purple-500/20 backdrop-blur">
                    <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center">
                      🏪 Con local rentado
                      <InfoTooltip
                        title="¿Qué incluye el escenario con local?"
                        bullets={[
                          "Renta + depósito (supuesto típico) + adecuaciones básicas.",
                          "Permisos municipales tienden a ser más probables.",
                          "Mismo estimado de equipo/insumos iniciales + reposición mensual.",
                          "Varía por zona, metros cuadrados y condiciones del local."
                        ]}
                      />
                    </p>


                    <p className="text-2xl font-bold text-purple-400">
                      {result.setup_cost_estimates_mxn
                        ?.scenario_with_rented_local
                        ?.estimated_total_one_time_range_mxn || "—"}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      Mensual:{" "}
                      {result.setup_cost_estimates_mxn
                        ?.scenario_with_rented_local
                        ?.estimated_total_monthly_range_mxn || "—"}
                    </p>
                  </div>
                </div>

                {/* Risks */}
                {result.risks && result.risks.length > 0 && (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 backdrop-blur">
                    <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                      <AlertCircle size={24} className="text-yellow-400" />
                      Riesgos Identificados
                    </h2>
                    <div className="space-y-3">
                      {result.risks.map((risk, idx) => (
                        <div
                          key={idx}
                          className={`rounded-lg p-4 border-l-4 ${getRiskBg(
                            risk.impact
                          )} backdrop-blur`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${risk.impact === "alto"
                                ? "bg-red-500"
                                : risk.impact === "medio"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                }`}
                            />
                            <div>
                              <p
                                className={`font-bold ${getRiskColor(
                                  risk.impact
                                )}`}
                              >
                                {risk.risk}
                              </p>
                              <p className="text-slate-400 text-sm mt-1">
                                {risk.mitigation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Phases */}
                {result.execution_plan_30_60_90 && (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 backdrop-blur">
                    <h2 className="text-xl font-bold text-black mb-4">
                      📋 Plan 30/60/90
                    </h2>

                    {[
                      [
                        "Primeros 7 días",
                        result.execution_plan_30_60_90.first_7_days,
                      ],
                      ["Días 8–30", result.execution_plan_30_60_90.days_8_30],
                      ["Días 31–60", result.execution_plan_30_60_90.days_31_60],
                      ["Días 61–90", result.execution_plan_30_60_90.days_61_90],
                    ].map(([title, items]) => (
                      <div key={title} className="mb-4">
                        <p className="text-black font-semibold mb-2">{title}</p>
                        <ul className="space-y-2">
                          {(items || []).map((t, i) => (
                            <li
                              key={i}
                              className="text-slate-300 text-sm flex gap-2"
                            >
                              <span className="text-blue-400 font-bold">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {result.important_links_mx && result.important_links_mx.length > 0 && (
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 backdrop-blur">
                    <h2 className="text-lg font-bold text-black mb-4">🔗 Links útiles (MX)</h2>

                    <ul className="space-y-2">
                      {result.important_links_mx
                        .filter(l => l?.title)
                        .slice(0, 5)
                        .map((l, idx) => (
                          <li key={idx} className="text-slate-300 text-sm">
                            {l.url ? (
                              <a
                                href={l.url}
                                target="_blank"
                                rel="noreferrer"
                                className="underline hover:opacity-80"
                              >
                                {l.title}
                              </a>
                            ) : (
                              <span className="opacity-80">{l.title}</span>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {result.next_best_actions &&
                  result.next_best_actions.length > 0 && (
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 backdrop-blur h-full">
                      <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                        <CheckCircle size={20} className="text-green-400" />
                        Próximos mejores pasos
                      </h2>
                      <ul className="space-y-2">
                        {result.next_best_actions.map((rec, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-slate-300 text-sm"
                          >
                            <span className="text-green-400 font-bold flex-shrink-0">
                              ✓
                            </span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => setResult(null)}
                className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-black font-bold py-3 px-6 rounded-xl transition border border-slate-600/50"
              >
                ← Nuevo Análisis
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                <Download size={20} />
                Descargar Reporte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
