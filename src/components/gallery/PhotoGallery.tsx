import PhotoAlbum, { Photo } from "react-photo-album";
import "react-photo-album/styles.css";
import "./PhotoGallery.scss";

type PhotoGalleryProps = {
  photos: Photo[];
};
export const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  return (
    <div className="photo-gallery">
      <PhotoAlbum layout={"masonry"} photos={photos} />
    </div>
  );
};
