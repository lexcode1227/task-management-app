import { gql } from "@apollo/client";

export const getUsers = gql`
  query getUsers {
    users {
      avatar
      fullName
      id
      createdAt
      email
      type
      updatedAt
    }
  }
`;