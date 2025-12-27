import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DailyTask, TODAY_TASKS } from "@/lib/todaysTasks";
import { CheckCircle, Circle, Clock, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodaysTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TodaysTasksModal({ isOpen, onClose }: TodaysTasksModalProps) {
  const [tasks, setTasks] = useState<DailyTask[]>(TODAY_TASKS);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 bg-card border border-border rounded-3xl shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-border flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Personal Assistant</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold">Today's Tasks</h2>
                <p className="text-muted-foreground text-sm mt-1">{completedCount} of {totalCount} completed</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 md:px-8 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Daily Progress</span>
                <span className="text-sm font-bold text-primary">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Tasks List */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-3">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all group",
                    task.completed
                      ? "bg-primary/5 border-primary/20 opacity-75"
                      : "bg-background border-border hover:border-primary/50 hover:bg-primary/5"
                  )}
                >
                  <div className="flex gap-4">
                    {/* Checkbox */}
                    <div className="flex-shrink-0 pt-1">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "transition-colors",
                          task.completed ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        )}
                      >
                        {task.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className={cn(
                          "font-semibold leading-tight",
                          task.completed && "line-through text-muted-foreground"
                        )}>
                          {task.title}
                        </h3>
                        <span className={cn(
                          "flex-shrink-0 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap",
                          task.priority === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : task.priority === "medium"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        )}>
                          {task.priority}
                        </span>
                      </div>

                      {/* Time & Duration */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span className="font-medium">{task.time}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="px-2 py-0.5 bg-muted rounded text-foreground font-medium">
                            {task.duration}min
                          </span>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">
                          {task.gate}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 border-t border-border bg-muted/30">
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Your Day
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
