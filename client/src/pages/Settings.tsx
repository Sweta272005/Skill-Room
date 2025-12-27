import { AppLayout } from "@/components/layout/AppLayout";
import { User, Bell, Lock, Palette, Volume2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <AppLayout>
      <div className="p-8 md:p-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-8">Settings</h1>
        
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Profile Section */}
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Profile Settings
            </h2>
            <div className="space-y-4 max-w-md">
               <div className="grid w-full items-center gap-1.5">
                  <Label>Display Name</Label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="John Doe" />
               </div>
               <div className="grid w-full items-center gap-1.5">
                  <Label>Email</Label>
                  <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="john.doe@university.edu" disabled />
               </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" /> Appearance
            </h2>
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Use dark theme for low-light environments.</p>
              </div>
              <Switch />
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations across the interface.</p>
              </div>
              <Switch />
            </div>
          </div>

          {/* AI Assistant */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-primary" /> Voice Assistant
            </h2>
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <Label className="text-base">Voice Activation</Label>
                <p className="text-sm text-muted-foreground">Allow "Hey Assistant" to wake up the AI.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
