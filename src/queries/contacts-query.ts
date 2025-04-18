import { gql } from "@apollo/client";

export const CONTACTS_QUERY = gql`
  query CONTACTS_QUERY {
    cv {
      contactLinks {
        socialMedia {
          name
          href
          icon
        }
        email
      }
    }
  }
`;
