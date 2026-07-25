import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({
  imageSrc,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-10 text-center",
        className,
      )}
      {...props}
    >
      <Image
        width={1000}
        height={1000}
        src={imageSrc as string}
        alt=""
        className="mb-1 h-40 w-40 object-contain sm:h-52 sm:w-52"
      />

      <p className="font-heading text-sm font-semibold text-foreground">
        {title}
      </p>
      {description && (
        <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export { EmptyState };
