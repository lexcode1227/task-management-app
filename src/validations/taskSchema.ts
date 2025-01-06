import { z } from "zod";

const PointEstimateEnum = z.enum(["EIGHT", "FOUR", "ONE", "TWO", "ZERO"], {
  errorMap: () => ({ message: "The point estimate is required" }),
});
const StatusEnum = z.enum(
  ["BACKLOG", "CANCELLED", "DONE", "IN_PROGRESS", "TODO"],
  {
    errorMap: () => ({ message: "This status is required" }),
  },
);
const TaskTagEnum = z.array(z.enum(["ANDROID", "IOS", "REACT", "NODE_JS", "RAILS"], {
  errorMap: () => ({ message: "The Tags are required" }),
}));

export const taskSchema = z.object({
  name: z
    .string()
    .min(3, "The task name must be greater than 5 and less than 30")
    .max(35)
    .regex(
      /^[A-Za-z][A-Za-z0-9\s]*$/,
      "Task name must contain only alphabetic characters and spaces",
    ),
  pointEstimate: PointEstimateEnum,
  assigneeId: z.string().optional(),
  tags: TaskTagEnum,
  dueDate: z
    .date()
    .min(new Date(), "Must be a valid date in the future.")
    .nullable()
    .refine((date) => date !== null && date > new Date(), {
      message: "The date must be a valid date in the future",
    }),
  status: StatusEnum,
});
