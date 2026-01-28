import { useState } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'

export function FloatingButtons() {
  const [chatOpen, setChatOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        {/* Chat Widget */}
        {chatOpen && (
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-80 max-h-96 flex flex-col animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-t-2xl p-4 flex items-center justify-between">
              <h3 className="font-semibold text-primary-foreground">Chat with AI</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="text-primary-foreground hover:opacity-80 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-muted rounded-lg p-3 max-w-xs">
                <p className="text-sm text-muted-foreground">
                  👋 Hi! How can I help you with EduPay360 today?
                </p>
              </div>
              <div className="bg-primary/10 rounded-lg p-3 max-w-xs ml-auto">
                <p className="text-sm text-foreground">
                  I'd like to know more about pricing
                </p>
              </div>
              <div className="bg-muted rounded-lg p-3 max-w-xs">
                <p className="text-sm text-muted-foreground">
                  Our plans start from 49,999 FCFA/month with a 14-day free trial. Which plan interests you?
                </p>
              </div>
            </div>

            <div className="border-t border-border p-4 flex gap-2">
              <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-3 py-2 transition-colors">
                Send
              </button>
            </div>
          </div>
        )}

        {/* Contact Widget */}
        {contactOpen && (
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-80 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-r from-secondary to-accent rounded-t-2xl p-4 flex items-center justify-between">
              <h3 className="font-semibold text-primary-foreground">Get in Touch</h3>
              <button
                onClick={() => setContactOpen(false)}
                className="text-primary-foreground hover:opacity-80 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  placeholder="How can we help?"
                  rows={3}
                  className="w-full bg-muted rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-secondary to-accent hover:shadow-lg hover:shadow-secondary/30 text-white rounded-lg py-2 font-semibold transition-all duration-300">
                Send Message
              </button>

              <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +237 671 23 45 67
                </p>
                <p>
                  Email:
                  <a href="mailto:info@edupay360.com" className="text-primary hover:underline ml-1">
                    info@edupay360.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-14 h-14 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:-translate-y-1"
            title="AI Chat"
          >
            <MessageCircle className="w-6 h-6" />
          </button>

          <button
            onClick={() => setContactOpen(!contactOpen)}
            className="w-14 h-14 bg-gradient-to-br from-secondary to-accent text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 hover:-translate-y-1"
            title="Contact Us"
          >
            <Phone className="w-6 h-6" />
          </button>
        </div>
      </div>
    </>
  )
}
