// src/components/sections/SubmitSection.tsx
const SubmitSection = ({ isActive }: { isActive: boolean }) => (
  <section id="submit" className={`page-section ${isActive ? "active" : ""}`}>
    <div className="container">
      <div className="section-header" style={{ textAlign: "center" }}>
        <h2>Contribute to Open Access</h2>
        <p className="section-subtitle">
          Share open educational resources (OER) with the global student
          community.
        </p>
      </div>

      <div className="submit-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("In a real app, this would submit!");
          }}
        >
          <div className="form-group">
            <label className="form-label">Resource Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Introduction to Statistics PDF"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <div className="form-group">
              <label className="form-label">Resource Type</label>
              <select className="form-select">
                <option>Textbook/PDF</option>
                <option>Video Series</option>
                <option>Practice Set</option>
                <option>Other Tool</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Primary Subject</label>
              <select className="form-select">
                <option>Mathematics</option>
                <option>Science</option>
                <option>Computer Science</option>
                <option>Languages</option>
                <option>Humanities</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Link to Resource (URL)</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://..."
            />
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                marginTop: "0.5rem",
              }}
            >
              Must be a publicly accessible, open-license link.
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Description &amp; License Info</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Briefly describe the resource and confirm its open license status (e.g., CC-BY, Public Domain)."
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: "100%", justifyContent: "center" }}
          >
            Submit for Review
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default SubmitSection;
