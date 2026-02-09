import { gql } from "@apollo/client";

export const HOME_QUERY = gql`
  query Homepage {
    homepage {
      welcomeText
      heroTitle
      heroImage {
        url
        alternativeText
      }
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
      featuredProjects {
        documentId
        title
        description
        link
        tags {
          name
        }
        image {
          url
          alternativeText
        }
      }
    }
  }
`;
