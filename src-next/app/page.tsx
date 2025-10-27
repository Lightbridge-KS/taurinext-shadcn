'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, RotateCcw } from "lucide-react";

export default function Home() {
  const [count, setCount] = useState<number>(0);

  const increment = (): void => setCount(count + 1);
  const decrement = (): void => setCount(count - 1);
  const reset = (): void => setCount(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Counter App</CardTitle>
          <CardDescription className="text-center">
            A simple counter demo using shadcn/ui components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Count: {count}
            </Badge>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={decrement}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Minus className="h-4 w-4" />
              Decrement
            </Button>
            <Button
              onClick={increment}
              size="lg"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Increment
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={reset}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
