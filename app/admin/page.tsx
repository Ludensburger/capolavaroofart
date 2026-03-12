"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { artworks as initialArtworks } from "@/data/artworks";
import { events as initialEvents } from "@/data/events";
import { Plus, Trash2, Edit, Save, LogOut, Lock } from "lucide-react";
import Link from "next/link";

const ADMIN_PASSWORD = "art2026"; // Change this to your desired password

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check for auth cookie
    const auth = document.cookie.includes("admin_auth=true");
    if (auth) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      document.cookie = `admin_auth=true; max-age=${30 * 24 * 60 * 60}; path=/`;
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_auth=; max-age=0; path=/";
    setIsAuthenticated(false);
    setPassword("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter your password to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Authenticated - show admin panel
  const [artworks, setArtworks] = useState(initialArtworks);
  const [events, setEvents] = useState(initialEvents);
  const [inquiries] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", work: "Untitled III", date: "2026-03-10 14:22", status: "New", source: "Gallery Modal" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", work: "Meridian", date: "2026-03-08 09:45", status: "Replied", source: "Direct Contact" },
    { id: 3, name: "Charlie Davis", email: "charlie@example.com", work: "Fault Line", date: "2026-03-05 18:12", status: "Archived", source: "Events Page" },
  ]);

  const [activityLogs] = useState([
    { id: 101, session: "sess_9a2b", time: "14:22:05", action: "Submitted Inquiry", detail: "Untitled III", page: "/gallery", device: "Desktop (Chrome)" },
    { id: 102, session: "sess_9a2b", time: "14:21:30", action: "Viewed Artwork Modal", detail: "Untitled III", page: "/gallery", device: "Desktop (Chrome)" },
    { id: 103, session: "sess_9a2b", time: "14:20:15", action: "Filtered Gallery", detail: "Dry Media", page: "/gallery", device: "Desktop (Chrome)" },
    { id: 104, session: "sess_c4d1", time: "13:45:00", action: "Page Entry", detail: "Home", page: "/", device: "Mobile (iOS)" },
    { id: 105, session: "sess_c4d1", time: "13:46:20", action: "Navigated to Section", detail: "About", page: "/#about", device: "Mobile (iOS)" },
    { id: 106, session: "sess_c4d1", time: "13:48:10", action: "Clicked Event", detail: "Dry Media Fundamentals", page: "/#events", device: "Mobile (iOS)" },
    { id: 107, session: "sess_f8e2", time: "11:10:30", action: "Toggled Theme", detail: "Dark -> Light", page: "/", device: "Tablet (Safari)" },
  ]);

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your portfolio, gallery, and track user journeys.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">View Site</Button>
            </Link>
            <Button variant="ghost" className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <Tabs defaultValue="interactions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] mb-8">
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Interactions Tab */}
          <TabsContent value="interactions" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Activity Log</CardTitle>
                <CardDescription>Real-time tracker of user actions across the portfolio.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Session</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Page/Path</TableHead>
                      <TableHead>Device</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityLogs.map((log) => (
                      <TableRow key={log.id} className="text-xs">
                        <TableCell className="font-mono text-muted-foreground">{log.time}</TableCell>
                        <TableCell className="font-mono">{log.session}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{log.detail}</TableCell>
                        <TableCell className="text-muted-foreground">{log.page}</TableCell>
                        <TableCell className="text-muted-foreground">{log.device}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inquiry Conversions</CardTitle>
                <CardDescription>Direct leads from the "Inquire" forms and buttons.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date/Time</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="font-mono text-xs">{inquiry.date}</TableCell>
                        <TableCell>
                          <div className="font-medium">{inquiry.name}</div>
                          <div className="text-xs text-muted-foreground">{inquiry.email}</div>
                        </TableCell>
                        <TableCell>{inquiry.work}</TableCell>
                        <TableCell>
                          <span className="text-xs bg-muted px-2 py-1 rounded">{inquiry.source}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={inquiry.status === "New" ? "default" : "secondary"}>
                            {inquiry.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Artist Details</CardTitle>
                  <CardDescription>Update your public identity and location.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="Art Jan Elaine A. Ylanan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title/Role</label>
                    <Input defaultValue="Artist" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input defaultValue="Cebu City, PH" />
                  </div>
                  <Button className="mt-4">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Biography</CardTitle>
                  <CardDescription>Tell your story and professional background.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">About Text</label>
                    <Textarea 
                      className="min-h-[200px]" 
                      defaultValue="Art Jan Elaine A. Ylanan (b. 1982, Chicago, IL) is a Artist working primarily in charcoal, conté, and oil paint. Her practice investigates the intersection of gesture and structure..." 
                    />
                  </div>
                  <Button className="mt-4">
                    <Save className="w-4 h-4 mr-2" />
                    Save Biography
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div>
                  <CardTitle>Artwork Management</CardTitle>
                  <CardDescription>Add, remove, or edit artworks in your gallery.</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Artwork
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artworks.map((art) => (
                    <div key={art.id} className="group relative border rounded-lg overflow-hidden bg-card">
                      <div className="aspect-[4/3] relative">
                        <img src={art.url} alt={art.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="icon" variant="secondary"><Edit className="w-4 h-4" /></Button>
                          <Button size="icon" variant="destructive"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-medium text-sm">{art.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{art.year} · {art.series}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Manage workshops, talks, and exhibitions.</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-muted rounded flex flex-col items-center justify-center text-[10px] font-bold uppercase">
                          <span className="text-primary">{event.date.split(' ')[0]}</span>
                          <span>{event.date.split(' ')[1].replace(',', '')}</span>
                        </div>
                        <div>
                          <h4 className="font-display font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
