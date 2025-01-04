import { gql } from "@apollo/client";

export const GET_PROFILE_INFORMATION = gql`
  query getProfileInformation {
    profile {
      id
      fullName
      email
      avatar
      createdAt
      updatedAt
      type
      __typename
    }
  }
`;