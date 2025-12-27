import { AppLayout } from "@/components/layout/AppLayout";
import { GATES } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { Trophy, Briefcase, FolderCheck, CalendarCheck, TrendingUp } from "lucide-react";

export default function Dashboard() {
  // Aggregate data
  const totalCerts = GATES.reduce((acc, g) => acc + g.certifications, 0);
  const totalInternships = GATES.reduce((acc, g) => acc + g.internships, 0);
  const totalProjects = GATES.reduce((acc, g) => acc + g.projects, 0);
  
  const progressData = GATES.map(g => ({
    name: g.title,
    progress: g.progress,
    color: g.color // We'd need to map these to hex values for Recharts ideally
  })).filter(g => g.progress > 0);

  // Map tailwind colors to hex for charts (simplified)
  const COLORS = ['#8b5cf6', '#3b82f6', '#f97316', '#10b981', '#6366f1', '#64748b'];

  return (
    <AppLayout>
      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Overview</h1>
            <p className="text-muted-foreground">Your academic progress summary.</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            Fall Semester 2024
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Certifications</p>
                <h3 className="text-4xl font-bold mt-2">{totalCerts}</h3>
              </div>
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Trophy className="w-6 h-6" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-auto">
              <TrendingUp className="w-3 h-3 text-green-500" /> +1 this month
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projects Completed</p>
                <h3 className="text-4xl font-bold mt-2">{totalProjects}</h3>
              </div>
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <FolderCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-auto">
               Last project: AI Chatbot
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Internships</p>
                <h3 className="text-4xl font-bold mt-2">{totalInternships}</h3>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>
             <div className="text-xs text-muted-foreground flex items-center gap-1 mt-auto">
               Currently applying
            </div>
          </div>
          
           <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                <h3 className="text-4xl font-bold mt-2">124</h3>
              </div>
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <CalendarCheck className="w-6 h-6" />
              </div>
            </div>
             <div className="text-xs text-muted-foreground flex items-center gap-1 mt-auto">
               <TrendingUp className="w-3 h-3 text-green-500" /> Top 10% of class
            </div>
          </div>
        </div>

        {/* Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-6">Learning Progress by Gate</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                  />
                  <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={20}>
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-2">Focus Distribution</h3>
             <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="progress"
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="flex flex-wrap gap-2 justify-center mt-2">
                {progressData.slice(0, 3).map((entry, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    {entry.name}
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
