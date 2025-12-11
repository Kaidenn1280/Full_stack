import { useState, useMemo } from "react";
import FavoriteButton from "../ui/FavoriteButton";
import { resources } from "../../mock/data"; 
import "../../styles/DownloadsSection.css";

interface DownloadsSectionProps {
  isActive?: boolean;
}

const DownloadsSection = ({ isActive }: DownloadsSectionProps) => {
  const [filterType, setFilterType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filtering Logic
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchType = filterType === "All" || item.type === filterType;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [filterType, searchQuery]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF": return "fa-file-pdf";
      case "ZIP": return "fa-file-archive";
      case "EPUB": return "fa-book";
      case "DOCX": return "fa-file-word";
      default: return "fa-file-alt";
    }
  };

  return (
    <section id="downloads" className={`page-section dl-section ${isActive ? 'active' : ''}`}>
      <div className="dl-container">
        
        {/* Header */}
        <div className="dl-header-row">
          <div className="dl-title-block">
            <h2>Resource <span className="dl-highlight">Archive</span></h2>
            <p>Download secure textbooks, cheat sheets, and datasets.</p>
          </div>

          <div className="dl-actions-block">
            <div className="dl-search-compact">
              <i className="fas fa-search" />
              <input 
                type="text" 
                placeholder="Find resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="dl-view-toggle">
              <button 
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <i className="fas fa-th-large" />
              </button>
              <button 
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                title="List View"
              >
                <i className="fas fa-list" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="dl-filter-bar">
          <div className="dl-filter-group">
            {["All", "PDF", "EPUB", "ZIP"].map((type) => (
              <button 
                key={type}
                className={`filter-pill ${filterType === type ? "active" : ""}`}
                onClick={() => setFilterType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <span className="dl-count-badge">
            {filteredResources.length} Files
          </span>
        </div>

        {/* Content */}
        <div className={`dl-content-wrapper ${viewMode}`}>
          
          {/* List Headers - ALIGNED STRICTLY */}
          {viewMode === "list" && (
            <div className="dl-list-header">
              <span className="col-icon">Type</span>
              <span className="col-name">Name</span>
              <span className="col-cat">Category</span>
              <span className="col-size">Size</span>
              <span className="col-dl">Downloads</span>
              <span className="col-action">Action</span>
            </div>
          )}

          {/* Cards */}
          {filteredResources.map((item) => (
            viewMode === "grid" ? (
              // --- GRID VIEW CARD ---
              <div key={item.id} className={`dl-card ${item.type.toLowerCase()}-accent`}>
                <span className="dl-badge-type-float">{item.type}</span>
                <div className="dl-fav-float">
                  <FavoriteButton id={item.id} type="download" />
                </div>

                <div className="dl-icon-area">
                  <i className={`fas ${getFileIcon(item.type)}`} />
                </div>
                
                <div className="dl-info-area">
                  <h3 className="dl-card-title">{item.title}</h3>
                  <span className="dl-card-cat">{item.category}</span>
                </div>

                <div className="dl-meta-area">
                  <div className="dl-meta-item">
                    <i className="far fa-hdd" /> {item.size}
                  </div>
                  <div className="dl-meta-item">
                    <i className="fas fa-download" /> {item.downloads}
                  </div>
                </div>

                <div className="dl-btn-area">
                  <button className="dl-download-btn">Download</button>
                </div>
              </div>
            ) : (
              // --- LIST VIEW CARD (Fixed Alignment) ---
              <div key={item.id} className={`dl-card list-row ${item.type.toLowerCase()}-accent`}>
                
                {/* 1. Icon */}
                <div className="dl-list-icon">
                  <i className={`fas ${getFileIcon(item.type)}`} />
                </div>
                
                {/* 2. Name */}
                <div className="dl-list-name">
                  <h3 className="dl-card-title">{item.title}</h3>
                </div>

                {/* 3. Category */}
                <div className="dl-list-cat">
                  <span className="dl-card-cat">{item.category}</span>
                </div>

                {/* 4. Size */}
                <div className="dl-list-meta">
                  <span>{item.size}</span>
                </div>

                {/* 5. Downloads */}
                <div className="dl-list-meta">
                  <span>{item.downloads}</span>
                </div>

                {/* 6. Action (Button + Heart) */}
                <div className="dl-list-action">
                   {/* Heart Icon */}
                   <div className="dl-list-heart">
                    <FavoriteButton id={item.id} type="download" />
                  </div>
                  {/* Button */}
                  <button className="dl-download-btn">Download</button>
                </div>
              </div>
            )
          ))}

          {filteredResources.length === 0 && (
            <div className="dl-empty-state">
              <p>No resources found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;