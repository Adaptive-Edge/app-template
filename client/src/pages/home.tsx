import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: items, isLoading } = useQuery<any[]>({
    queryKey: ["/api/items"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--ae-accent-cyan)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2 animate-fadeIn">
          <h1 className="text-3xl font-bold text-gradient">
            {{APP_NAME}}
          </h1>
          <p className="text-muted-foreground">
            {{APP_DESCRIPTION}}
          </p>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is your new Adaptive Edge app. Start building!
            </p>
            <Button className="glow-cyan">
              Get Started
            </Button>
          </CardContent>
        </Card>

        {items && items.length > 0 && (
          <Card className="glass">
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {items.map((item: any) => (
                  <li key={item.id} className="p-2 rounded bg-muted/50">
                    {item.name}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
