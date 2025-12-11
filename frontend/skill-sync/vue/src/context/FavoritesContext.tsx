import React, { createContext, useContext, useState, useEffect } from "react";

// Define what we are storing
interface FavoritesContextType {
  favoriteDownloads: number[]; // Array of Resource IDs
  favoriteVideos: number[];    // Array of Lesson IDs
  toggleFavoriteDownload: (id: number) => void;
  toggleFavoriteVideo: (id: number) => void;
  isFavDownload: (id: number) => boolean;
  isFavVideo: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize from LocalStorage if available, otherwise empty array
  const [favoriteDownloads, setFavoriteDownloads] = useState<number[]>(() => {
    const saved = localStorage.getItem("favDownloads");
    return saved ? JSON.parse(saved) : [];
  });

  const [favoriteVideos, setFavoriteVideos] = useState<number[]>(() => {
    const saved = localStorage.getItem("favVideos");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("favDownloads", JSON.stringify(favoriteDownloads));
  }, [favoriteDownloads]);

  useEffect(() => {
    localStorage.setItem("favVideos", JSON.stringify(favoriteVideos));
  }, [favoriteVideos]);

  // Actions
  const toggleFavoriteDownload = (id: number) => {
    setFavoriteDownloads((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleFavoriteVideo = (id: number) => {
    setFavoriteVideos((prev) => 
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isFavDownload = (id: number) => favoriteDownloads.includes(id);
  const isFavVideo = (id: number) => favoriteVideos.includes(id);

  return (
    <FavoritesContext.Provider value={{ 
      favoriteDownloads, favoriteVideos, 
      toggleFavoriteDownload, toggleFavoriteVideo,
      isFavDownload, isFavVideo 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};