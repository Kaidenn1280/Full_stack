// src/components/layout/Footer.tsx
const Footer = () => (
  <footer>
    <div className="container">
      <div
        className="logo"
        style={{ justifyContent: "center", marginBottom: "1rem" }}
      >
        <i className="fas fa-book-open" /> Open Access Learning
      </div>
      <p>
        &copy; 2024 Open Access Learning. A non-profit initiative aimed at
        democratizing education globally.
      </p>
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <a href="#" style={{ color: "var(--text-muted)" }}>
          Privacy
        </a>
        <a href="#" style={{ color: "var(--text-muted)" }}>
          Terms
        </a>
        <a href="#" style={{ color: "var(--text-muted)" }}>
          Contact
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
