import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const SplashPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Splash Container */}
      <div className="splash-container">
        <div className="logo-section">
          <h1 className="logo-title">
            Creative<span className="lime-highlight">Hub</span>
          </h1>
        </div>

        <p className="tagline">Where Passion Meets Creativity</p>

        <div className="passion-icons">
          <div className="passion-item">
            <span className="passion-icon">🍰</span>
            <div className="passion-name">Baking & Cooking</div>
          </div>
          <div className="passion-item">
            <span className="passion-icon">📚</span>
            <div className="passion-name">Manga & Manhwa</div>
          </div>
          <div className="passion-item">
            <span className="passion-icon">🎮</span>
            <div className="passion-name">Gaming</div>
          </div>
        </div>

        <p className="description">
          Welcome to my creative sanctuary! Explore my passion for culinary arts, immerse yourself in the world of manga and manhwa, and discover my competitive gaming journey. Join me as I share recipes, reading recommendations, and gaming insights.
        </p>

        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => handleNavigate('/home')}>
            Enter Portfolio
          </button>
          <button className="btn btn-secondary" onClick={() => handleNavigate('/about')}>
            Learn More About Me
          </button>
        </div>

        <div className="scroll-hint">
          ↓ Dive into my world ↓
        </div>
      </div>
    </>
  );
};

export default SplashPage;
