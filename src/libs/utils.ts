import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PointEstimate, Status, TaskTag } from "../gql/graphql";
import { differenceInDays, isYesterday } from "date-fns";

interface Option {
  key: string;
  value: string;
}

export const formatDate = (date: Date): string => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatEstimatePoint = (estimate: PointEstimate) => {
  switch (estimate) {
    case PointEstimate.Eight:
      return 8;
    case PointEstimate.Four:
      return 4;
    case PointEstimate.One:
      return 1;
    case PointEstimate.Two:
      return 2;
    case PointEstimate.Zero:
      return 0;
    default:
      return 0;
  }
};

export const formatStatus = (statusValue: string): string => {
  return statusValue
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatSelectedValues = (
  options: Option[],
  selectedValues: string[],
) => {
  const maxVisibleItems = 1;
  const visibleItems = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.value);

  if (visibleItems.length > maxVisibleItems) {
    return `${visibleItems.slice(0, maxVisibleItems).join(", ")}...`;
  }

  return visibleItems.join(", ");
};

export const getRandomNum = () => {
  return Math.floor(Math.random() * 10);
};

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};


export const formatDueDate = (dueDate: Date) => {
    if (isYesterday(dueDate)) {
      return "YESTERDAY";
    } else {
      return formatDate(dueDate);
    }
  };

export const getDueDateColor = (dueDate: Date): string => {
  const today = new Date();
  const daysDifference = differenceInDays(dueDate, today);

  if (dueDate < today) {
    return "red";
  } else if (daysDifference <= 2) {
    return "yellow";
  } {
    return "green";
  }
}

export const estimatePointOptions = Object.entries(PointEstimate).map(([_, value]) => ({
  key: value,
  value: value,
}))

export const tagsOptions = Object.entries(TaskTag).map(([key, value]) => ({
  key: key,
  value: value,
}));

export const statusOptions = Object.entries(Status).map(([_, value]) => (value))

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}