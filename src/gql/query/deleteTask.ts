import { gql } from "@apollo/client";

export const DELETE_TASK = gql`
    mutation deleteTask($input: DeleteTaskInput!) {
        deleteTask(input: $input) {
            assignee {
                fullName
            }
            id
            name
        }
    }
`;