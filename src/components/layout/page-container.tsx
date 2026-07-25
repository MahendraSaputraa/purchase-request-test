import * as React from "react";
import { cn } from "@/lib/utils";

function PageContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-336 px-4 py-6", className)}
      {...props}
    />
  );
}

export { PageContainer };
