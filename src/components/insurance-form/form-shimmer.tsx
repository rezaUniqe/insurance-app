import {Card, CardContent} from "@/components/ui/card";
import {Loader2} from "lucide-react";

export function FormsLoading() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-lg font-medium">Loading insurance forms...</p>
      </CardContent>
    </Card>
  )
}