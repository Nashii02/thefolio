import { Link } from 'react-router-dom';
import '../css/HomePage.css';
import baking from '../images/baking.webp'
import manganmanhwa from '../images/manganmanhwa.jpg'
import setup from '../images/setup.jpg'

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">Where Culinary Arts, Stories, and Gaming Collide</h2>
            <p className="hero-description">Welcome to my world of passions! I'm deeply invested in mastering the art of baking and cooking, immersing myself in captivating manhwa and manga stories, and competing in intense online gaming sessions. Each passion brings unique joy and challenges that shape who I am.</p>
            <Link to="/about" className="cta-button">Discover My Journey</Link>
          </div>
          <div className="hero-image">
            <img src="https://mgx-backend-cdn.metadl.com/generate/images/894579/2026-01-11/6ba14c00-059b-4677-828e-a36efb960b35.png" alt="Creative collage showing baking ingredients, manga books, and gaming setup" />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="highlights">
        <div className="container">
          <h2>What drives my creativity</h2>
          <ul className="highlights-list">
            <li><strong>Culinary Mastery:</strong> I'm constantly learning new baking techniques and cooking methods, from perfecting sourdough bread to experimenting with international cuisines and pastry arts.</li>
            <li><strong>Story Immersion:</strong> Reading manhwa and manga allows me to explore diverse narratives, art styles, and cultural perspectives through compelling visual storytelling from Korea and Japan.</li>
            <li><strong>Competitive Gaming:</strong> Playing Valorant and other online games sharpens my strategic thinking, teamwork skills, and reflexes while connecting me with a global gaming community.</li>
            <li><strong>Collaboration:</strong> Working with other creative minds to share ideas, inspire each other, and create innovative projects.</li>
            <li><strong>Problem Solving:</strong> A desire to tackle challenges through innovative solutions and continuous learning.</li>
          </ul>
        </div>
      </section>

      {/* Preview Sections */}
      <section className="preview-sections">
        <div className="container">
          {/* Baking/Cooking Preview */}
          <div className="preview-card">
            <div className="preview-image">
              <img src={baking} alt="Beautiful assortment of freshly baked goods" />
            </div>
            <div className="preview-content">
              <h3>Baking & Cooking</h3>
              <p>My culinary journey is all about learning and experimentation. From mastering classic French pastries to exploring Asian cuisine, I'm constantly pushing my skills. The kitchen is my laboratory where science meets creativity, and every recipe is an opportunity to learn something new about flavors, techniques, and presentation.</p>
            </div>
          </div>

          {/* Manhwa/Manga Preview */}
          <div className="preview-card reverse">
            <div className="preview-image">
              <img src={manganmanhwa} alt="Collection of colorful manga and manhwa books" />
            </div>
            <div className="preview-content">
              <h3>Manhwa & Manga</h3>
              <p>I'm an avid reader of Korean manhwa and Japanese manga, diving into genres from action-packed shonen to emotional slice-of-life stories. Reading these visual narratives has taught me about storytelling, character development, and different cultural perspectives. My collection spans hundreds of volumes, and I'm always discovering new series to obsess over.</p>
            </div>
          </div>

          {/* Gaming Preview */}
          <div className="preview-card">
            <div className="preview-image">
              <img src={setup} alt="Modern gaming setup with monitors and peripherals" />
            </div>
            <div className="preview-content">
              <h3>Online Gaming - Valorant</h3>
              <p>Valorant is my main competitive game where I've invested countless hours mastering agents, learning map strategies, and climbing the ranked ladder. Gaming teaches me teamwork, communication, and staying calm under pressure. Beyond Valorant, I enjoy exploring other competitive titles and staying connected with the gaming community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Creative<span className="lime-text">Hub</span></h3>
              <p>Email: rekin@example.com</p>
              <p>Phone: (+63) 972 752 0359</p>
              <p>Address: San Fernando, La Union, Philippines</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 CreativeHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;