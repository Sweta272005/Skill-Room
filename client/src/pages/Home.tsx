import { AppLayout } from "@/components/layout/AppLayout";
import { GateCard } from "@/components/ui/GateCard";
import { VoiceAssistant } from "@/components/ui/VoiceAssistant";
import { TodaysTasksModal } from "@/components/ui/TodaysTasksModal";
import { GATES } from "@/lib/mockData";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import generatedImage from '@assets/generated_images/cozy_futuristic_digital_study_room_background.png';

export default function Home() {
  const [showTasksModal, setShowTasksModal] = useState(true);

  return (
    <AppLayout>
      <TodaysTasksModal isOpen={showTasksModal} onClose={() => setShowTasksModal(false)} />
      
      <div className="relative min-h-full pb-20">
        {/* Hero / Room Visual */}
        <div className="relative w-full h-80 md:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          <img 
            src={generatedImage} 
            alt="My Virtual Room" 
            className="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition-transform duration-[20s]"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
                Welcome to Your Sanctuary
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Select a gate to begin your learning journey. Your room is ready for you, John.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Gates Grid */}
        <div className="px-8 md:px-12 -mt-10 relative z-30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {GATES.map((gate, index) => (
              <motion.div
                key={gate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
              >
                <GateCard gate={gate} />
              </motion.div>
            ))}

            {/* Add Custom Gate Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * GATES.length + 0.3 }}
            >
              <div className="h-full border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group min-h-[280px]">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                </div>
                <h3 className="text-lg font-heading font-bold mb-1">Create Custom Gate</h3>
                <p className="text-sm text-muted-foreground px-4">
                  Use AI to design a personalized learning path tailored just for you.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <VoiceAssistant />
      </div>
    </AppLayout>
  );
}
