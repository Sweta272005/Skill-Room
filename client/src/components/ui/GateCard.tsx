import { Gate } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Briefcase, Folder } from "lucide-react";

interface GateCardProps {
  gate: Gate;
}

export function GateCard({ gate }: GateCardProps) {
  const Icon = gate.icon;

  return (
    <Link href={`/gate/${gate.id}`}>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative h-full cursor-pointer"
      >
        <div className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-20 blur-lg transition duration-300 group-hover:opacity-40",
          gate.color.split(" ")[0].replace("text-", "bg-") // Hacky way to get bg color from text class
        )} />
        
        <div className="relative h-full bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={cn("p-3 rounded-xl", gate.color)}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="px-2.5 py-1 rounded-full bg-secondary/50 text-xs font-medium border border-border">
              {gate.progress}% Complete
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
            {gate.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
            {gate.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 py-4 border-t border-border/50 mb-4">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-foreground">{gate.certifications}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Trophy className="w-3 h-3" /> Certs
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-border/50">
              <span className="text-lg font-bold text-foreground">{gate.internships}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3 h-3" /> Intern
              </span>
            </div>
            <div className="flex flex-col items-center border-l border-border/50">
              <span className="text-lg font-bold text-foreground">{gate.projects}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Folder className="w-3 h-3" /> Proj
              </span>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Enter Room <ArrowRight className="w-4 h-4 ml-1" />
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary">
            <div 
              className={cn("h-full transition-all duration-500", gate.color.split(" ")[0].replace("text-", "bg-"))} 
              style={{ width: `${gate.progress}%` }}
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
