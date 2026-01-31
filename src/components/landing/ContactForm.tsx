import React, { useState } from "react";
import { Phone } from "lucide-react";
import { toast } from "@/lib/toast";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent!", {
        description: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        position: "top-right",
      });
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }, 900);
  };

  return (
    <form className="p-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Name
        </label>
        <input
          type="text"
          placeholder="Your name"
          className="w-full bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <textarea
          placeholder="How can we help?"
          rows={3}
          className="w-full bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer bg-gradient-to-r from-secondary to-accent hover:shadow-lg hover:shadow-secondary/30 text-white rounded-lg py-2 font-semibold transition-all duration-300 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          +237 671 23 45 67
        </p>
        <p>
          Email:
          <a
            href="mailto:info@edupay360.com"
            className="text-primary hover:underline ml-1"
          >
            info@edupay360.com
          </a>
        </p>
      </div>
    </form>
  );
}
