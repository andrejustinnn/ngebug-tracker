import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FlexProps = {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: number;
  my?: number;
  mx?: number;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Flex: React.FC<FlexProps> = ({
  direction = "row",
  align = "center",
  justify = "start",
  gap = 0,
  my = 0,
  mx = 0,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex",
        `flex-${direction}`,
        `items-${align}`,
        `justify-${justify}`,
        gap ? `gap-${gap}` : "",
        my ? `my-${my}` : "",
        mx ? `mx-${mx}` : "",
        // direction === "row" || direction === "row-reverse"
        //   ? `space-x-${gap}`
        //   : `space-y-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Flex;
