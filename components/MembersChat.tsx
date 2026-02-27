"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { chatMembers, seedMessages, type ChatMember, type ChatMessage } from "@/lib/chat-data";

function formatTime(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function Avatar({ member, size = 32 }: { member: ChatMember; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: member.colour,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 700,
      color: "white", flexShrink: 0,
      border: "2px solid rgba(255,255,255,0.12)",
    }}>
      {member.initials}
    </div>
  );
}

function StatusDot({ status }: { status: ChatMember["status"] }) {
  const colours = { online: "#22c55e", away: "#f59e0b", offline: "#6b7280" };
  return (
    <div style={{
      width: 9, height: 9, borderRadius: "50%",
      background: colours[status],
      border: "2px solid #111",
      position: "absolute", bottom: 0, right: 0,
    }} />
  );
}

const ME: ChatMember = { id: 0, name: "You", initials: "ME", colour: "#CC0000", bike: "", status: "online" };

export default function MembersChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(2);
  const [activeTab, setActiveTab] = useState<"chat" | "members">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: Date.now(), memberId: 0, text, ts: Date.now() }]);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const onlineCount = chatMembers.filter(m => m.status === "online").length;

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-8 right-8 z-[200] w-14 h-14 rounded-full bg-[#cc0000] shadow-[0_4px_24px_rgba(204,0,0,0.45),0_2px_8px_rgba(0,0,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer border-0"
        aria-label="Members chat"
      >
        {open ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
        {!open && unread > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-[#cc0000] text-[0.65rem] font-bold flex items-center justify-center border-2 border-[#cc0000]">
            {unread}
          </div>
        )}
      </button>

      {/* Chat panel */}
      <div style={{
        position: "fixed", bottom: "5.5rem", right: "2rem", zIndex: 199,
        width: 360, height: 520,
        background: "rgba(12,12,12,0.97)",
        border: "1px solid rgba(204,0,0,0.25)",
        borderRadius: 16,
        boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        transform: open ? "scale(1) translateY(0)" : "scale(0.92) translateY(16px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.2s",
        transformOrigin: "bottom right",
      }}>
        {/* Header */}
        <div style={{ padding: "1rem 1.25rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "white", letterSpacing: "0.05em" }}>Members Chat</span>
            </div>
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
              {onlineCount} online
            </span>
          </div>
          <div style={{ display: "flex" }}>
            {(["chat", "members"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "0.5rem 1rem",
                fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
                color: activeTab === tab ? "#cc0000" : "rgba(255,255,255,0.35)",
                borderBottom: activeTab === tab ? "2px solid #cc0000" : "2px solid transparent",
                transition: "color 0.15s",
              }}>{tab === "chat" ? "Chat" : "Members"}</button>
            ))}
          </div>
        </div>

        {/* Chat tab */}
        {activeTab === "chat" && (
          <>
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {messages.map(msg => {
                const member = msg.memberId === 0 ? ME : chatMembers.find(m => m.id === msg.memberId)!;
                const isMe = msg.memberId === 0;
                return (
                  <div key={msg.id} style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: "0.6rem", alignItems: "flex-end" }}>
                    {!isMe && (
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <Avatar member={member} size={30} />
                        <StatusDot status={member.status} />
                      </div>
                    )}
                    <div style={{ maxWidth: "75%" }}>
                      {!isMe && (
                        <div style={{ fontWeight: 700, fontSize: "0.7rem", color: member.colour, letterSpacing: "0.08em", marginBottom: "0.2rem" }}>
                          {member.name}
                        </div>
                      )}
                      <div style={{
                        background: isMe ? "#cc0000" : "rgba(255,255,255,0.07)",
                        border: isMe ? "none" : "1px solid rgba(255,255,255,0.08)",
                        borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                        padding: "0.55rem 0.85rem",
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "0.85rem",
                        lineHeight: 1.4,
                      }}>
                        {msg.text}
                      </div>
                      <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", marginTop: "0.2rem", textAlign: isMe ? "right" : "left" }}>
                        {formatTime(msg.ts)}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Message the group…"
                style={{
                  flex: 1, background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10, padding: "0.55rem 0.85rem",
                  color: "white", fontSize: "0.875rem", outline: "none",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(204,0,0,0.5)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <button onClick={send} disabled={!input.trim()} style={{
                width: 36, height: 36, borderRadius: 10,
                background: input.trim() ? "#cc0000" : "rgba(255,255,255,0.07)",
                border: "none", cursor: input.trim() ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s", flexShrink: 0,
              }}>
                <Send size={15} color={input.trim() ? "white" : "rgba(255,255,255,0.25)"} />
              </button>
            </div>
          </>
        )}

        {/* Members tab */}
        {activeTab === "members" && (
          <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem 1.25rem" }}>
            {(["online", "away", "offline"] as const).map(status => {
              const group = chatMembers.filter(m => m.status === status);
              if (!group.length) return null;
              const labels = { online: "Online", away: "Away", offline: "Offline" };
              const colours = { online: "#22c55e", away: "#f59e0b", offline: "#6b7280" };
              return (
                <div key={status} style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: colours[status], marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: colours[status] }} />
                    {labels[status]} — {group.length}
                  </div>
                  {group.map(member => (
                    <div key={member.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div style={{ position: "relative" }}>
                        <Avatar member={member} size={36} />
                        <StatusDot status={member.status} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>{member.name}</div>
                        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>{member.bike}</div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
