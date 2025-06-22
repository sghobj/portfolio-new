import { gql } from "@apollo/client";

export const CV_QUERY = gql`
  query CV_QUERY {
    cv {
      about
      coverImageUrl
      experiences {
        id
        company
        description
        from
        location
        position
        to
      }
      education {
        id
        description
        from
        institute
        location
        specialty
        to
      }
      skills {
        id
        level
        name
      }
      languages {
        id
        language
        level
      }
      certifications {
        id
        name
        date
      }
      publications {
        id
        date
        description
      }
      contactLinks {
        socialMedia {
          id
          href
          name
          icon
        }
        email
      }
    }
  }
`;
