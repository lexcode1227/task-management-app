import React from "react";
import { cn } from "../../libs/utils";
import { cva } from "class-variance-authority";

type tags = "RAILS" | "REACT" | "ANDROID" | "IOS" | "NODE_JS";

const TagsVariants = cva(
  "flex gap-2 rounded px-4 py-1 text-body-M font-bold", 
  {
    variants: {
      variant: {
        DEFAULT:
          "bg-color_neutral_2/10 text-color_neutral_1",
        RAILS:
          "bg-color_primary_4/10 text-color_primary_4",
        NODE_JS:
          "bg-color_secondary_4/10 text-color_secondary_4",
        ANDROID:
          "bg-color_tertiary_4/10 text-color_tertiary_4",
        IOS:
          "bg-color_tertiary_4/10 text-color_tertiary_4",
        REACT: 
          "bg-color_blue_1/10 text-color_blue_1",
      },
    },
    defaultVariants: {
      variant: "DEFAULT",
    },
  }
)
interface TagsProps {
  titleTag: string;
  icon?: React.ReactNode;
  variant?: tags;
  className?: string;
}

const Tags = ({
  titleTag,
  icon,
  variant,
  className = "",
}: TagsProps) => {
  return (
    <span
      className={cn(TagsVariants({ variant }), className)}
    >
      {icon && <span>{icon}</span>}
      {titleTag}
    </span>
  );
};

export default Tags;
