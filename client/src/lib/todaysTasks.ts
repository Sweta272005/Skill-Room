export interface DailyTask {
  id: string;
  title: string;
  time: string; // HH:MM format
  duration: number; // minutes
  completed: boolean;
  gate: string; // which learning gate
  priority: "high" | "medium" | "low";
}

export const TODAY_TASKS: DailyTask[] = [
  {
    id: "t1",
    title: "Complete Python NumPy Tutorial",
    time: "09:00",
    duration: 60,
    completed: false,
    gate: "AI / ML",
    priority: "high"
  },
  {
    id: "t2",
    title: "Review React Hooks Deep Dive",
    time: "10:30",
    duration: 45,
    completed: false,
    gate: "Web Development",
    priority: "high"
  },
  {
    id: "t3",
    title: "Debug Web Dev Project",
    time: "11:30",
    duration: 90,
    completed: true,
    gate: "Web Development",
    priority: "medium"
  },
  {
    id: "t4",
    title: "Read System Design Basics",
    time: "13:30",
    duration: 45,
    completed: false,
    gate: "System Design",
    priority: "medium"
  },
  {
    id: "t5",
    title: "Practice AWS Lambda Functions",
    time: "14:30",
    duration: 60,
    completed: false,
    gate: "Cloud Computing",
    priority: "low"
  },
  {
    id: "t6",
    title: "Submit Project Documentation",
    time: "16:00",
    duration: 30,
    completed: false,
    gate: "Web Development",
    priority: "high"
  }
];
