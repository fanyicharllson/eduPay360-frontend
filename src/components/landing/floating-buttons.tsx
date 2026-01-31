import { useState, useRef, useEffect } from "react";
import { MessageSquare, Mail, X, Send } from "lucide-react";
import { ContactForm } from "./ContactForm";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  message: string;
}

const AIResponses = [
  "Our 14-day free trial includes all premium features with no credit card required.",
  "You can manage up to 10,000 students across multiple classes in EduPay360.",
  "We support mobile money, bank transfers, and card payments for school fees.",
  "Real-time analytics dashboards update every minute with live data.",
  "Yes, EduPay360 works offline and syncs when you go back online.",
  "We provide 24/7 email and phone support for all subscribers.",
  "You can invite unlimited teachers and staff to manage their classes.",
];

export function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      message: "Hi! I'm EduPay360's AI assistant. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Close modals when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        chatRef.current &&
        !chatRef.current.contains(target) &&
        !(event.target as HTMLElement).closest("[data-chat-button]")
      ) {
        setChatOpen(false);
      }
      if (
        contactRef.current &&
        !contactRef.current.contains(target) &&
        !(event.target as HTMLElement).closest("[data-contact-button]")
      ) {
        setContactOpen(false);
      }
    }

    if (chatOpen || contactOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [chatOpen, contactOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle sending chat messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: inputValue,
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const randomResponse =
        AIResponses[Math.floor(Math.random() * AIResponses.length)];
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: randomResponse,
      };
      setChatMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Overlay for modals */}
      {(chatOpen || contactOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setChatOpen(false);
            setContactOpen(false);
          }}
        />
      )}

      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* Chat Widget */}
        {chatOpen && (
          <div
            ref={chatRef}
            className="absolute bottom-20 right-0 bg-card border border-border/50 rounded-2xl shadow-2xl w-96 max-h-[500px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 z-50 backdrop-blur-sm"
          >
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border rounded-t-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Ask EduPay360
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Get instant answers
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      msg.type === "user"
                        ? "bg-primary/20 border border-primary/40 text-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything..."
                  disabled={isLoading}
                  className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-primary cursor-pointer hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-lg px-3 py-2 transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Contact Widget */}
        {contactOpen && (
          <div
            ref={contactRef}
            className="fixed bottom-18 right-13 bg-card border border-border/50 rounded-2xl shadow-2xl w-96 max-h-[500px] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300 z-50 backdrop-blur-sm"
          >
            <div className="bg-gradient-to-r from-secondary/10 to-accent/10 border-b border-border rounded-t-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">
                    Contact Support
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    We'll get back to you soon
                  </p>
                </div>
              </div>
              <button
                onClick={() => setContactOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ContactForm />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col-reverse">
          {/* Contact Button */}
          <button
            data-contact-button
            onClick={() => {
              setContactOpen(!contactOpen);
              setChatOpen(false);
            }}
            className="group relative cursor-pointer w-14 h-14 bg-gradient-to-br from-accent to-accent/80 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-accent/40 hover:scale-110 transition-all duration-300 hover:-translate-y-1"
            title="Contact Support"
          >
            <Mail className="w-6 h-6" />
            <span className="absolute right-16 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Contact Us
            </span>
          </button>

          {/* Chat Button */}
          <button
            data-chat-button
            onClick={() => {
              setChatOpen(!chatOpen);
              setContactOpen(false);
            }}
            className="group relative cursor-pointer w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-primary/40 hover:scale-110 transition-all duration-300 hover:-translate-y-1"
            title="Ask EduPay360"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute right-16 px-3 py-2 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              Ask AI
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
