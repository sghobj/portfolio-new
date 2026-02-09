import { gql, useQuery } from "@apollo/client"; // types/photos.ts

// types/photos.ts
export interface Photo {
  src: string;
  width?: number;
  height?: number;
  public_id?: string;
}

export interface PhotosQueryData {
  photos: Photo[];
}

export interface PhotosQueryVars {
  folder?: string;
}

export const PHOTOS_QUERY = gql`
  query GetPhotos($folder: String) {
    photos(folder: $folder) {
      src
      width
      height
      public_id
    }
  }
`;

export const usePhotos = (folder: string = "travel-showcase") => {
  const { data, loading, error } = useQuery<PhotosQueryData, PhotosQueryVars>(
    PHOTOS_QUERY,
    {
      variables: { folder },
      notifyOnNetworkStatusChange: true,
    },
  );

  return {
    photos: data?.photos ?? [],
    loading,
    error,
  };
};
