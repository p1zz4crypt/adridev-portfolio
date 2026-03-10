// src/sections/Chatbot.tsx
// ─────────────────────────────────────
// Ruta: /contact (via React Router)
// MXTW Volunteer Bot — MVP con LangChain
// ─────────────────────────────────────

import { useState, useRef, useEffect, type KeyboardEvent, type MouseEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions: string[] = [
  "¿Qué roles hay disponibles?",
  "¿Cuáles son los beneficios?",
  "¿Cómo aplico como voluntario?",
  "¿Necesito experiencia previa?",
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! 👋 Soy el asistente virtual del programa de voluntariado de **Mexico Tech Week 2026**.\n\nPuedo ayudarte con información sobre roles, beneficios, requisitos y el proceso de aplicación.\n\n¿En qué puedo ayudarte?",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showArch, setShowArch] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(text: string): Promise<void> {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/mxtw-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data: { answer?: string } = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "Lo siento, hubo un error. Intenta de nuevo.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error de conexión. Intenta de nuevo." },
      ]);
    }
    setLoading(false);
  }

  function renderMarkdown(text: string) {
    return text.split("\n").map((line, i) => {
      const processed = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");

      if (line.startsWith("- ") || line.startsWith("• ")) {
        return (
          <div key={i} className="pl-4 relative mb-1">
            <span className="absolute left-0" style={{ color: "#00E676" }}>•</span>
            <span dangerouslySetInnerHTML={{ __html: processed.replace(/^[-•]\s/, "") }} />
          </div>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        const num = line.match(/^(\d+)\./)?.[1];
        return (
          <div key={i} className="pl-6 relative mb-1">
            <span className="absolute left-0 font-bold" style={{ color: "#00E676" }}>{num}.</span>
            <span dangerouslySetInnerHTML={{ __html: processed.replace(/^\d+\.\s/, "") }} />
          </div>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <div key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{ background: "#0A0A0A", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Header */}
      <div className="text-center mb-6 max-w-lg">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "#00E676", letterSpacing: 3 }}
        >
          MVP Demo — LangChain + RAG
        </p>
        <h1 className="text-3xl font-extrabold text-white mb-2">MXTW Volunteer Bot</h1>
        <p className="text-sm" style={{ color: "#666" }}>
          Chatbot con AI que responde preguntas sobre el voluntariado de Mexico Tech Week 2026
        </p>
      </div>

      {/* Chat Container */}
      <div
        className="w-full max-w-lg flex flex-col overflow-hidden"
        style={{
          background: "#0f0f0f",
          borderRadius: 20,
          border: "1px solid #222",
          height: "min(70vh, 600px)",
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid #1a1a1a" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center text-lg"
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #00E676, #00C853)",
              }}
            >
              🤖
            </div>
            <div>
              <div className="text-white text-sm font-bold">MXTW Bot</div>
              <div className="flex items-center gap-1 text-[10px] font-semibold" style={{ color: "#00E676" }}>
                <span
                  className="inline-block rounded-full"
                  style={{ width: 5, height: 5, background: "#00E676" }}
                />
                Powered by LangChain + OpenAI
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowArch(!showArch)}
            className="font-mono text-[10px] font-semibold px-2.5 py-1 rounded-lg cursor-pointer"
            style={{
              background: showArch ? "rgba(0,230,118,0.08)" : "#1a1a1a",
              border: `1px solid ${showArch ? "rgba(0,230,118,0.25)" : "#333"}`,
              color: showArch ? "#00E676" : "#666",
            }}
          >
            {showArch ? "✕" : "{ } Arquitectura"}
          </button>
        </div>

       {/* Architecture Panel */}
        {showArch && (
          <div
            className="px-4 py-3 font-mono text-[11px] leading-relaxed"
            style={{
              background: "#0a0f0a",
              borderBottom: "1px solid #1a2a1a",
              color: "#999",
            }}
          >
            <div className="font-bold mb-1.5" style={{ color: "#00E676" }}>
              Flujo RAG con LangChain.js
            </div>
            <div style={{ color: "#666" }}>
              <span className="text-neutral-300">1.</span> KB se divide en chunks (RecursiveCharacterTextSplitter)<br />
              <span className="text-neutral-300">2.</span> Cada chunk → vector con OpenAI Embeddings<br />
              <span className="text-neutral-300">3.</span> Vectores en MemoryVectorStore (Supabase pgvector en prod)<br />
              <span className="text-neutral-300">4.</span> Por pregunta → busca los 4 chunks más similares<br />
              <span className="text-neutral-300">5.</span> Solo esos chunks van como contexto al LLM (GPT-4o-mini)
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["LangChain.js", "OpenAI", "RAG", "Embeddings", "Vite + React"].map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(0,230,118,0.06)",
                    border: "1px solid rgba(0,230,118,0.15)",
                    color: "#00E676",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed"
                style={{
                  background: msg.role === "user" ? "#00E676" : "#1a1a1a",
                  color: msg.role === "user" ? "#000" : "#DDD",
                  borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  border: msg.role === "user" ? "none" : "1px solid #252525",
                }}
              >
                {renderMarkdown(msg.content)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="px-3.5 py-2.5 text-[13px]"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid #252525",
                  borderRadius: "14px 14px 14px 4px",
                  color: "#666",
                }}
              >
                <span className="mxtw-pulse">Buscando en la base de conocimiento</span>
                <span className="mxtw-pulse" style={{ animationDelay: "0.2s" }}>.</span>
                <span className="mxtw-pulse" style={{ animationDelay: "0.4s" }}>.</span>
                <span className="mxtw-pulse" style={{ animationDelay: "0.6s" }}>.</span>
                <style>{`.mxtw-pulse{animation:mxtwP 1.5s infinite}@keyframes mxtwP{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2.5 flex flex-wrap gap-1.5">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="text-[11px] px-3 py-1.5 rounded-full cursor-pointer transition-colors"
                style={{
                  background: "#141414",
                  border: "1px solid #2a2a2a",
                  color: "#BBB",
                }}
                onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.borderColor = "#00E676";
                  e.currentTarget.style.color = "#00E676";
                }}
                onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.borderColor = "#2a2a2a";
                  e.currentTarget.style.color = "#BBB";
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderTop: "1px solid #1a1a1a" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && sendMessage(input)}
            placeholder="Pregunta sobre el voluntariado..."
            disabled={loading}
            className="flex-1 text-[13px] outline-none"
            style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 12,
              padding: "10px 14px",
              color: "#FFF",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="flex items-center justify-center text-base font-bold"
            style={{
              background: input.trim() ? "#00E676" : "#1a1a1a",
              color: input.trim() ? "#000" : "#666",
              border: "none",
              borderRadius: 12,
              width: 40,
              height: 40,
              cursor: input.trim() ? "pointer" : "default",
            }}
          >
            {loading ? "⏳" : "↑"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-5 text-[11px] font-mono" style={{ color: "#444" }}>
        MVP Demo — Adriana Rosas — React + LangChain.js + OpenAI
      </p>
    </section>
  );
}
