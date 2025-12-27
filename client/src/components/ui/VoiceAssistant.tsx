import { useState, useEffect } from "react";
import { Mic, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm your learning assistant. How can I help you schedule your tasks today?" }
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate listening
      setTimeout(() => {
        setTranscript("Schedule my Python project for tomorrow at 2 PM");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleSend = () => {
    if (!transcript) return;
    
    setMessages([...messages, { role: "user", text: transcript }]);
    setTranscript("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "I've added 'Python Project' to your schedule for tomorrow at 2:00 PM. Anything else?" 
      }]);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-card border border-border shadow-2xl rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-primary/5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-background/50">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "max-w-[85%] p-3 rounded-xl text-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground ml-auto rounded-tr-none"
                      : "bg-muted text-foreground mr-auto rounded-tl-none"
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-card flex gap-2">
              <div className="relative flex-1">
                <Input 
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Type or speak..." 
                  className="pr-10"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("absolute right-0 top-0 h-full hover:bg-transparent", isListening && "text-destructive animate-pulse")}
                  onClick={toggleListening}
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
              <Button size="icon" onClick={handleSend} disabled={!transcript}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all",
          isOpen ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
