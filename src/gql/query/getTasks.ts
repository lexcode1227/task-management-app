import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query getTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
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
