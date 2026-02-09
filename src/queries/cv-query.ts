import { gql } from "@apollo/client";

export const CV_QUERY = gql`
  query CV_QUERY {
    cv {
      about
      name
      subtitle
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
        iconColor
        iconName
        name
        documentId
      }
      languages {
        id
        language
        level
      }
      certifications {
        certificateLink
        date
        id
        image {
          alternativeText
          url
        }
        instituition
        name
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
