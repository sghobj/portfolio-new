import { gql } from "@apollo/client";

export const HOME_QUERY = gql`
  query Homepage {
    homepage {
      welcomeText
      heroTitle
      heroSubtitle
      githubLink
      expertises {
        description
        iconColor
        iconName
        id
        title
      }
      skills {
        name
        iconName
        iconColor
        documentId
      }
    }
  }
`;
