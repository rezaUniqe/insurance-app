import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FormsListSkeleton() {
  // Create an array of 6 items to represent loading forms
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
        {skeletonItems.map((index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
  );
}
