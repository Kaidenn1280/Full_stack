import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/AboutPage";   // example page
import LoginModal from "./components/ui/LoginModal";   // example page
import { FavoritesProvider } from "./context/FavoritesContext";


function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginmodal" element={<LoginModal onClose={() => {}} />} />
        
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
