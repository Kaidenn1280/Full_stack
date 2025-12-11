// src/components/ui/FavoriteButton.tsx
import { useFavorites } from "../../context/FavoritesContext";

interface FavoriteButtonProps {
  id: number;
  type: "video" | "download";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const FavoriteButton = ({ id, type, className = "", onClick }: FavoriteButtonProps) => {
  const { toggleFavoriteVideo, toggleFavoriteDownload, isFavVideo, isFavDownload } = useFavorites();
  
  const isFavorite = type === "video" ? isFavVideo(id) : isFavDownload(id);
  const toggleFavorite = type === "video" ? () => toggleFavoriteVideo(id) : () => toggleFavoriteDownload(id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite();
    onClick?.(e);
  };

  return (
    <button
      className={`favorite-btn ${isFavorite ? "favorited" : ""} ${className}`}
      type="button"
      onClick={handleClick}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <i className={isFavorite ? "fas fa-heart" : "far fa-heart"} />
    </button>
  );
};

export default FavoriteButton;
