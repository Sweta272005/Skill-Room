import { AppLayout } from "@/components/layout/AppLayout";
import { Calendar, Clock, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

export default function Schedule() {
  return (
    <AppLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Weekly Schedule</h1>
            <p className="text-muted-foreground">Manage your learning blocks.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm">
              + Add Block
            </button>
          </div>
        </div>

        <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="grid grid-cols-8 border-b border-border bg-muted/20">
            <div className="p-4 border-r border-border text-center text-sm font-medium text-muted-foreground">
              Time
            </div>
            {DAYS.map((day) => (
              <div key={day} className="p-4 text-center text-sm font-bold border-r border-border last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto">
            {HOURS.map((hour) => (
              <div key={hour} className="grid grid-cols-8 border-b border-border last:border-b-0 min-h-[80px]">
                <div className="p-2 border-r border-border text-xs text-muted-foreground text-center sticky left-0 bg-card">
                  {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
                {DAYS.map((day, dayIdx) => {
                  // Mock random events
                  const hasEvent = (dayIdx === 0 && hour === 10) || (dayIdx === 2 && hour === 14) || (dayIdx === 4 && hour === 9);
                  const eventType = dayIdx % 2 === 0 ? "lecture" : "lab";
                  
                  return (
                    <div key={`${day}-${hour}`} className="border-r border-border last:border-r-0 p-1 relative group">
                      {hasEvent && (
                        <div className={cn(
                          "absolute inset-1 rounded-lg p-2 text-xs font-medium border cursor-pointer hover:shadow-md transition-all",
                          eventType === "lecture" 
                            ? "bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-900/40 dark:border-purple-800 dark:text-purple-300"
                            : "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/40 dark:border-blue-800 dark:text-blue-300"
                        )}>
                          <div className="flex justify-between items-start">
                            <span>{eventType === "lecture" ? "AI / ML Core" : "Web Dev Lab"}</span>
                            <MoreHorizontal className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                          </div>
                          <div className="mt-1 opacity-70 flex items-center gap-1">
                             <Clock className="w-3 h-3" /> 1h
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
