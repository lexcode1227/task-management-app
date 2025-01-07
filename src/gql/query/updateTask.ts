import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      name
      status
      pointEstimate
      tags
      dueDate
      position
      assignee {
        id
        avatar
        fullName
      }
    }
  }
`;