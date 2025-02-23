import { gql } from '@apollo/client';

export const CV_QUERY = gql`
  query CV_QUERY {
    cv {
      about
      coverImageUrl
      experiences {
        company
        description
        from
        location
        position
        to
      }
      education {
        description
        from
        institute
        location
        specialty
        to
      }
      skills {
      level
      name
    }
    }
  }
`;
