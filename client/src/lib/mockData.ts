import {
  LucideIcon,
  Brain,
  Database,
  Cloud,
  Code,
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  Calendar,
  BarChart3,
  Mic,
  Layers,
  Settings,
  BookOpen,
  GraduationCap,
  Layout,
  Cpu,
} from "lucide-react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Cupboard {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Gate {
  id: string;
  title: string;
  icon: any; // Using any for Lucide component
  description: string;
  color: string;
  progress: number;
  cupboards: Cupboard[];
  certifications: number;
  internships: number;
  projects: number;
}

export const GATES: Gate[] = [
  {
    id: "ai-ml",
    title: "AI / ML",
    icon: Brain,
    description:
      "Master Artificial Intelligence and Machine Learning algorithms.",
    color: "text-purple-500 bg-purple-500/10 border-purple-200",
    progress: 45,
    certifications: 2,
    internships: 0,
    projects: 3,
    cupboards: [
      {
        id: "c1",
        title: "Python for Data Science",
        description: "Core Python concepts, NumPy, Pandas",
        tasks: [
          { id: "t1", title: "Complete Python Basics", completed: true },
          { id: "t2", title: "Master NumPy Arrays", completed: true },
          {
            id: "t3",
            title: "Pandas DataFrames Manipulation",
            completed: false,
          },
        ],
      },
      {
        id: "c2",
        title: "Machine Learning Algorithms",
        description: "Supervised and Unsupervised Learning",
        tasks: [
          { id: "t4", title: "Linear Regression", completed: false },
          { id: "t5", title: "Decision Trees", completed: false },
        ],
      },
    ],
  },
  {
    id: "web-dev",
    title: "Web Development",
    icon: Code,
    description: "Full Stack Web Development with modern technologies.",
    color: "text-blue-500 bg-blue-500/10 border-blue-200",
    progress: 78,
    certifications: 1,
    internships: 1,
    projects: 5,
    cupboards: [
      {
        id: "c3",
        title: "Frontend Mastery",
        description: "React, Tailwind, State Management",
        tasks: [
          { id: "t6", title: "React Hooks Deep Dive", completed: true },
          { id: "t7", title: "Tailwind CSS Architecture", completed: true },
          { id: "t8", title: "Redux Toolkit", completed: true },
        ],
      },
    ],
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    icon: Cloud,
    description: "AWS, Azure, and Google Cloud Platform fundamentals.",
    color: "text-orange-500 bg-orange-500/10 border-orange-200",
    progress: 12,
    certifications: 0,
    internships: 0,
    projects: 0,
    cupboards: [
      {
        id: "c4",
        title: "AWS Basics",
        description: "EC2, S3, Lambda",
        tasks: [
          { id: "t9", title: "Create EC2 Instance", completed: false },
          { id: "t10", title: "Configure S3 Bucket", completed: false },
        ],
      },
    ],
  },
  {
    id: "data-science",
    title: "Data Scientist",
    icon: Database,
    description: "Advanced analytics, statistics, and big data technologies.",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-200",
    progress: 30,
    certifications: 0,
    internships: 0,
    projects: 1,
    cupboards: [],
  },
  {
    id: "sys-design",
    title: "System Design",
    icon: Layers,
    description: "Scalable architecture and low-level design.",
    color: "text-indigo-500 bg-indigo-500/10 border-indigo-200",
    progress: 0,
    certifications: 0,
    internships: 0,
    projects: 0,
    cupboards: [],
  },
  {
    id: "core-cs",
    title: "Core Subjects",
    icon: Cpu,
    description: "OS, DBMS, CN, COA.",
    color: "text-slate-500 bg-slate-500/10 border-slate-200",
    progress: 60,
    certifications: 0,
    internships: 0,
    projects: 0,
    cupboards: [],
  },
];
