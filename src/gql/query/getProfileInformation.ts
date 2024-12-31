import { gql } from "@apollo/client";

export const GET_PROFILE_INFORMATION = gql`
query ProfileInformation {
  profile {
    id
    fullName
    email
    avatar
  }
}

`