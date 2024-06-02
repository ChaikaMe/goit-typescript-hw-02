import css from './ImageCard.module.css';
interface ImageCardProps {
  src: string;
  description: string;
  imageId: string;
  onModal: (imageId: string) => void;
}
export default function ImageCard({
  src,
  description,
  imageId,
  onModal,
}: ImageCardProps) {
  return (
    <div className={css.item}>
      <img
        className={css.image}
        src={src}
        alt={description}
        onClick={() => onModal(imageId)}
      />
    </div>
  );
}
