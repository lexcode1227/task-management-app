import { gql } from "@apollo/client";

export const CREATE_TASK_FRAGMENT = gql`
  fragment NewTask on Task {
    id
    name
    creator {
      fullName
    }
    pointEstimate
    status
    tags
    dueDate
  }
`;