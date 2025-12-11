// src/components/sections/CommunitySection.tsx
const CommunitySection = ({ isActive }: { isActive: boolean }) => (
  <section
    id="community"
    className={`page-section ${isActive ? "active" : ""}`}
  >
    <div className="container">
      <div className="section-header" style={{ textAlign: "center" }}>
        <h2>Community &amp; Peer Support</h2>
        <p className="section-subtitle">
          Don&apos;t study alone. Join groups, ask questions, and help others.
        </p>
      </div>

      <div className="grid" style={{ marginTop: "3rem" }}>
        <div
          style={{
            background: "var(--bg-surface)",
            padding: "2rem",
            borderRadius: "1rem",
            border: "1px solid var(--border-color)",
            textAlign: "center",
          }}
        >
          <i
            className="fas fa-comments"
            style={{
              fontSize: "3rem",
              color: "var(--secondary)",
              marginBottom: "1rem",
            }}
          />
          <h3>Q&amp;A Forums</h3>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
            }}
          >
            Stuck on a problem? Post your question and get answers from peers
            and mentors.
          </p>
          <button className="btn btn-primary" type="button">
            Browse Questions
          </button>
        </div>

        <div
          style={{
            background: "var(--bg-surface)",
            padding: "2rem",
            borderRadius: "1rem",
            border: "1px solid var(--border-color)",
            textAlign: "center",
          }}
        >
          <i
            className="fas fa-users"
            style={{
              fontSize: "3rem",
              color: "var(--primary)",
              marginBottom: "1rem",
            }}
          />
          <h3>Virtual Study Groups</h3>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
            }}
          >
            Find students learning the same subjects and band together for group
            sessions.
          </p>
          <button className="btn btn-primary" type="button">
            Find a Group
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default CommunitySection;
