import { AppLayout } from "@/components/layout/AppLayout";
import { GATES } from "@/lib/mockData";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Circle, FolderOpen, Award, Layers } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import NotFound from "@/pages/not-found";

export default function GateDetails() {
  const [match, params] = useRoute("/gate/:id");
  const gateId = params?.id;
  const gate = GATES.find(g => g.id === gateId);
  
  // Local state for checkboxes to simulate interaction
  const [tasksState, setTasksState] = useState<Record<string, boolean>>({});

  if (!gate) return <NotFound />;

  const toggleTask = (taskId: string, initialStatus: boolean) => {
    setTasksState(prev => ({
      ...prev,
      [taskId]: prev[taskId] !== undefined ? !prev[taskId] : !initialStatus
    }));
  };

  const getTaskStatus = (taskId: string, initialStatus: boolean) => {
    return tasksState[taskId] !== undefined ? tasksState[taskId] : initialStatus;
  };

  const Icon = gate.icon;

  return (
    <AppLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto pb-24">
        {/* Header Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Back to Room
            </Button>
          </Link>
        </div>

        {/* Gate Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className={cn("p-6 rounded-3xl shadow-lg", gate.color.split(" ")[0].replace("text-", "bg-").replace("bg-", "bg-opacity-20 bg-"))}>
             {/* Note: The color logic above is a bit hacky for rapid proto, ideally specific classes */}
             <div className={cn("w-16 h-16 flex items-center justify-center rounded-2xl bg-background", gate.color)}>
                <Icon className="w-8 h-8" />
             </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-heading font-bold mb-4">{gate.title}</h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl">{gate.description}</p>
            
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                <Progress value={gate.progress} className="w-20 h-2" />
                <span>{gate.progress}% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Folders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="bg-card border border-border p-5 rounded-xl hover:shadow-md transition-all cursor-pointer group">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                 <Award className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold">Certifications</h4>
                 <p className="text-sm text-muted-foreground">{gate.certifications} Earned</p>
               </div>
             </div>
           </div>
           
           <div className="bg-card border border-border p-5 rounded-xl hover:shadow-md transition-all cursor-pointer group">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg group-hover:scale-110 transition-transform">
                 <Layers className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold">Internships</h4>
                 <p className="text-sm text-muted-foreground">{gate.internships} Applied</p>
               </div>
             </div>
           </div>
           
           <div className="bg-card border border-border p-5 rounded-xl hover:shadow-md transition-all cursor-pointer group">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
                 <FolderOpen className="w-6 h-6" />
               </div>
               <div>
                 <h4 className="font-bold">Projects</h4>
                 <p className="text-sm text-muted-foreground">{gate.projects} Completed</p>
               </div>
             </div>
           </div>
        </div>

        {/* Cupboards (Modules) */}
        <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded-full inline-block"></span>
          Learning Cupboards
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {gate.cupboards.length > 0 ? (
            gate.cupboards.map((cupboard, idx) => (
              <motion.div
                key={cupboard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="p-6 border-b border-border bg-muted/30">
                  <h3 className="text-xl font-bold mb-1">{cupboard.title}</h3>
                  <p className="text-sm text-muted-foreground">{cupboard.description}</p>
                </div>
                <div className="p-6 space-y-4">
                  {cupboard.tasks.map((task) => {
                    const isCompleted = getTaskStatus(task.id, task.completed);
                    return (
                      <div 
                        key={task.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer group",
                          isCompleted 
                            ? "bg-primary/5 border-primary/20" 
                            : "bg-background border-border hover:border-primary/50"
                        )}
                        onClick={() => toggleTask(task.id, task.completed)}
                      >
                        <div className={cn(
                          "flex-shrink-0 transition-colors",
                          isCompleted ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        )}>
                          {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                        </div>
                        <span className={cn(
                          "font-medium transition-all",
                          isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                        )}>
                          {task.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-2xl bg-muted/10">
              <p className="text-muted-foreground">This room is currently empty. Start by adding a module or let AI generate a path for you.</p>
              <Button className="mt-4" variant="outline">Generate Learning Path</Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
