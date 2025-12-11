// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="page">
      <h1>404 – Page not found</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFoundPage;
