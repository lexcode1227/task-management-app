import { PointEstimate } from "../gql/graphql";

interface Option {
  key: string;
  value: string;
}

export const formatDate = (date: string) => {
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

export const formatSelectedValues = (options: Option[], selectedValues: string[]) => {
  const maxVisibleItems = 1;
  const visibleItems = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.value);

  if (visibleItems.length > maxVisibleItems) {
    return `${visibleItems.slice(0, maxVisibleItems).join(', ')}...`;
  }

  return visibleItems.join(', ');
};