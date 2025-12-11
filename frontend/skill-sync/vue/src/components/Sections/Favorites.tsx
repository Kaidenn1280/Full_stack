import { useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { lessons, resources } from "../../mock/data";
import "../../styles/Favorites.css";

interface FavoritesSectionProps {
  isActive: boolean;
}

const FavoritesSection = ({ isActive }: FavoritesSectionProps) => {
  const { favoriteDownloads, favoriteVideos, toggleFavoriteDownload, toggleFavoriteVideo } = useFavorites();
  const [activeTab, setActiveTab] = useState<"videos" | "downloads">("videos");

  // Filter actual data based on stored IDs
  const savedLessons = lessons.filter(l => favoriteVideos.includes(l.id));
  
  // Note: You need to export 'resources' from DownloadsSection or move it to a shared mock file
  // For this example, I assume 'resources' is available.
  // If resources is defined INSIDE DownloadsSection, move it to mock/data.ts
  const savedResources = resources.filter(r => favoriteDownloads.includes(r.id)); 

  return (
    <section id="favorites" className={`page-section fav-section ${isActive ? "active" : ""}`}>
      <div className="fav-container">
        
        {/* Header */}
        <div className="fav-header">
          <h2>Your <span className="fav-highlight">Collection</span></h2>
          <p>Manage your saved lessons and resources.</p>
        </div>

        {/* Tabs */}
        <div className="fav-tabs">
          <button 
            className={`fav-tab ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => setActiveTab("videos")}
          >
            Saved Videos ({savedLessons.length})
          </button>
          <button 
            className={`fav-tab ${activeTab === "downloads" ? "active" : ""}`}
            onClick={() => setActiveTab("downloads")}
          >
            Saved Resources ({savedResources.length})
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="fav-grid">
          
          {/* VIDEOS GRID */}
          {activeTab === "videos" && savedLessons.map(lesson => (
            <div key={lesson.id} className="fav-card video-card">
              <div className="fav-card-body">
                <span className="fav-type-badge">Video</span>
                <h3>{lesson.title}</h3>
                <p>{lesson.subject} • {lesson.duration}</p>
                <button 
                  className="fav-remove-btn"
                  onClick={() => toggleFavoriteVideo(lesson.id)}
                >
                  <i className="fas fa-heart-broken" /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* DOWNLOADS GRID */}
          {activeTab === "downloads" && savedResources.map(resource => (
            <div key={resource.id} className={`fav-card resource-card ${resource.type.toLowerCase()}-accent`}>
              <div className="fav-card-body">
                <span className="fav-type-badge">{resource.type}</span>
                <h3>{resource.title}</h3>
                <p>{resource.category} • {resource.size}</p>
                <button 
                  className="fav-remove-btn"
                  onClick={() => toggleFavoriteDownload(resource.id)}
                >
                  <i className="fas fa-trash-alt" /> Remove
                </button>
              </div>
            </div>
          ))}

          {/* EMPTY STATES */}
          {activeTab === "videos" && savedLessons.length === 0 && (
            <div className="fav-empty">
              <i className="far fa-play-circle" />
              <p>No favorite videos yet.</p>
            </div>
          )}
          
          {activeTab === "downloads" && savedResources.length === 0 && (
            <div className="fav-empty">
              <i className="far fa-folder-open" />
              <p>No saved resources yet.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default FavoritesSection;