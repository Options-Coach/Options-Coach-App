"use client";
import { useState, useRef, useEffect } from "react";

export default function OptionsCoach() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (userText) => {
    if (!userText.trim()) return;
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  const startChat = () => {
    setStarted(true);
    sendMessage("Hello, I want to learn how to trade options.");
  };

  const quickPrompts = [
    "Where do I start as a beginner?",
    "What is a call option?",
    "Explain the Greeks simply",
    "What is a covered call?",
    "How do I read an options chain?",
    "What is implied volatility?",
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0f1a2e 50%, #0a0f1a 100%)",
      fontFamily: "'Georgia', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
    }}>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.2); border-radius: 4px; }
        input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px", width: "100%", maxWidth: "780px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "10px",
          background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)",
          borderRadius: "50px", padding: "6px 18px", marginBottom: "16px",
        }}>
          <span style={{ color: "#ffd700", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase" }}>AI-Powered Learning</span>
        </div>
        <h1 style={{
          color: "#fff", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: "700",
          margin: "0 0 8px", lineHeight: 1.1,
          textShadow: "0 0 40px rgba(255,215,0,0.3)",
        }}>
          📈 OptionsPro Coach
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", margin: 0 }}>
          Your personal AI mentor for learning options trading
        </p>
      </div>

      {/* Chat Window */}
      <div style={{
        width: "100%", maxWidth: "780px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,215,0,0.15)",
        borderRadius: "20px", overflow: "hidden",
        display: "flex", flexDirection: "column",
        minHeight: "500px", height: "65vh",
        backdropFilter: "blur(10px)",
      }}>
        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "24px",
          display: "flex", flexDirection: "column", gap: "16px",
        }}>
          {!started ? (
            <div style={{ margin: "auto", textAlign: "center" }}>
              <div style={{ fontSize: "60px", marginBottom: "16px" }}>🎓</div>
              <h2 style={{ color: "#fff", fontSize: "22px", margin: "0 0 10px" }}>Ready to learn options trading?</h2>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", maxWidth: "400px", margin: "0 auto 28px" }}>
                Your AI coach will guide you from the very basics all the way to advanced strategies — at your own pace.
              </p>
              <button onClick={startChat} style={{
                background: "linear-gradient(135deg, #ffd700, #ff8c00)",
                color: "#000", border: "none", borderRadius: "50px",
                padding: "14px 36px", fontSize: "16px", fontWeight: "700",
                cursor: "pointer", letterSpacing: "0.5px",
                boxShadow: "0 4px 20px rgba(255,215,0,0.4)",
              }}>
                Start Learning →
              </button>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                  {msg.role === "assistant" && (
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: "linear-gradient(135deg, #ffd700, #ff8c00)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "16px", flexShrink: 0, marginRight: "10px", marginTop: "4px",
                    }}>📈</div>
                  )}
                  <div style={{
                    maxWidth: "75%",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #ffd700, #ff8c00)"
                      : "rgba(255,255,255,0.07)",
                    color: msg.role === "user" ? "#000" : "#e8e8e8",
                    padding: "12px 16px",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    fontSize: "14px", lineHeight: "1.6",
                    border: msg.role === "assistant" ? "1px solid rgba(255,215,0,0.1)" : "none",
                    whiteSpace: "pre-wrap",
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #ffd700, #ff8c00)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
                  }}>📈</div>
                  <div style={{
                    background: "rgba(255,255,255,0.07)", borderRadius: "18px 18px 18px 4px",
                    padding: "14px 20px", border: "1px solid rgba(255,215,0,0.1)",
                  }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      {[0,1,2].map(i => (
                        <div key={i} style={{
                          width: "7px", height: "7px", borderRadius: "50%",
                          background: "#ffd700", opacity: 0.6,
                          animation: "bounce 1.2s infinite",
                          animationDelay: `${i * 0.2}s`,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Input */}
        {started && (
          <div style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(255,215,0,0.1)",
            background: "rgba(0,0,0,0.2)",
            display: "flex", gap: "10px",
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && sendMessage(input)}
              placeholder="Ask anything about options trading..."
              style={{
                flex: 1, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,215,0,0.2)", borderRadius: "50px",
                padding: "12px 20px", color: "#fff", fontSize: "14px", outline: "none",
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                background: "linear-gradient(135deg, #ffd700, #ff8c00)",
                border: "none", borderRadius: "50px", padding: "12px 22px",
                color: "#000", fontWeight: "700", fontSize: "14px",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
                transition: "opacity 0.2s",
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      {started && (
        <div style={{ width: "100%", maxWidth: "780px", marginTop: "16px" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
            Quick Topics
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {quickPrompts.map((p, i) => (
              <button key={i} onClick={() => !loading && sendMessage(p)} disabled={loading} style={{
                background: "rgba(255,215,0,0.07)", border: "1px solid rgba(255,215,0,0.2)",
                borderRadius: "50px", padding: "7px 14px", color: "rgba(255,255,255,0.7)",
                fontSize: "12px", cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", textAlign: "center", marginTop: "20px", maxWidth: "600px" }}>
        ⚠️ For educational purposes only. Not financial advice. Options trading involves significant risk. Always paper trade before using real money.
      </p>
    </div>
  );
}
