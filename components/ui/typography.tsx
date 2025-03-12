import { forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
      // p: "leading-7 [&:not(:first-child)]:mt-6",
      p: "leading-7",
      span: "",
      strong: "font-bold",
      small: "text-sm font-medium leading-none",
      mark: "bg-yellow-200 px-1",
      kbd: "bg-gray-200 px-2 py-1 rounded text-xs font-mono",
    },
    affects: {
      default: "",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      removePMargin: "[&:not(:first-child)]:mt-0",
    },
  },
  defaultVariants: {
    variant: "p",
    affects: "default",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof typographyVariants> {
  as?: keyof JSX.IntrinsicElements;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Comp = "h2", className, variant, affects, ...props }, ref) => {
    return (
      <Comp
        className={cn(typographyVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
  VariantProps<typeof typographyVariants> {
  as?: keyof Pick<
    JSX.IntrinsicElements,
    "p" | "code" | "strong" | "span" | "small" | "mark" | "kbd"
  >;
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Tag = "p", className, variant = "p", affects, ...props }, ref) => {
    return (
      <Tag
        className={cn(typographyVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";
