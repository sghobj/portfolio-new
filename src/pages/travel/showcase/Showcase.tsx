import { PhotoGallery } from "../../../components/gallery/PhotoGallery.tsx";
import { usePhotos } from "../../../queries/photos.ts";

export const Showcase = () => {
  const { photos, loading, error } = usePhotos("travel-showcase");

  if (loading) return <p>Loading photos...</p>;
  if (error) return <p>Error loading photos: {error.message}</p>;

  // Map GraphQL photos to react-photo-album format
  const albumPhotos = photos
    .filter((p) => p.width && p.height) // filter out any missing dimensions
    .map((p) => ({
      src: p.src,
      width: p.width!,
      height: p.height!,
      title: p.public_id, // optional
    }));

  return <PhotoGallery photos={albumPhotos} />;
};
