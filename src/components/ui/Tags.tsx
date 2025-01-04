import React from "react";

interface TagsProps {
  titleTag: string;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const Tags = ({
  titleTag,
  icon,
  bgColor = "bg-color_tertiary_4/10",
  textColor = "text-color_tertiary_4",
  className = "",
}: TagsProps) => {
  return (
    <span
      className={`flex gap-2 rounded px-4 py-1 ${bgColor} ${textColor} ${className} text-body-M font-bold`}
    >
      {icon && <span>{icon}</span>}
      {titleTag}
    </span>
  );
};

export default Tags;
