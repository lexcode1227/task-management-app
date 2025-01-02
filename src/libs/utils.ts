import { PointEstimate } from "../gql/graphql";

export const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

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
}