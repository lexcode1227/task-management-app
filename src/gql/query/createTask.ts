import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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
  }
`;