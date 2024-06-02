import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
interface ImageGalleryProps {
  images: {
    id: string;
    urls: {
      small: string;
    };
    alt_description: string;
  }[];
  onModal: (imageId: string) => void;
}

export default function ImageGallery({ images, onModal }: ImageGalleryProps) {
  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <li key={image.id}>
          <ImageCard
            src={image.urls.small}
            description={image.alt_description}
            imageId={image.id}
            onModal={onModal}
          />
        </li>
      ))}
    </ul>
  );
}
