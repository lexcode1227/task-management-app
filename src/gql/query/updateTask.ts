import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
  mutation updateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      name
      pointEstimate
      status
      tags
      assignee {
        id
        avatar
        createdAt
        email
        fullName
        type
        updatedAt
      }
      createdAt
      dueDate
      position
      creator {
        id
        createdAt
        email
        fullName
        type
        updatedAt
      }
    }
  }
`;