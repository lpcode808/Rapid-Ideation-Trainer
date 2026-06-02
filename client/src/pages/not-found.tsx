import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <Card className="mx-4 w-full max-w-md border-[hsl(var(--border))] bg-white/88 shadow-branded dark:border-white/10 dark:bg-[rgba(255,255,255,0.06)]">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-ideation-warning" />
            <h1 className="text-2xl font-bold text-ideation-secondary dark:text-white">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-foreground/65">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
