import React, { useState } from 'react';
import API from '../api/axios';
import Footer from '../components/Footer';
import '../App.css';

const ContactPage = () => {
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Send message to backend
      await API.post('/contact', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      // Show success popup
      setShowMessagePopup(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClosePopup = () => {
    setShowMessagePopup(false);
  };

  return (
    <>
      {/* Contact Hero */}
      <section className="page-hero">
        <div className="container">
          <h2>Get In Touch</h2>
          <p>Let's connect over shared passions and interests</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h3>Send Me a Message</h3>
              <p>Want to share a recipe, recommend a manhwa, discuss gaming strategies, or just chat? Fill out the form below and I'll get back to you soon!</p>

              {errorMessage && (
                <div style={{ color: '#d32f2f', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>
                  {errorMessage}
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    minLength="2"
                    maxLength="50"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Share your thoughts, recommendations, or questions..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    minLength="10"
                    maxLength="1000"
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Image */}
            <div className="contact-image">
              <img src="https://mgx-backend-cdn.metadl.com/generate/images/894579/2026-01-11/6079bf94-c5dc-4dbe-8f7c-020ad30d61a2.png" alt="Organized creative workspace from above" />
            </div>
          </div>

          {/* Resources Table */}
          <div className="resources-section">
            <h3>Helpful Resources</h3>
            <p>Here are some of my favorite resources for learning baking, discovering new manga/manhwa, and improving at gaming:</p>

            <table className="resources-table">
              <thead>
                <tr>
                  <th>Resource Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="https://www.kingarthurbaking.com" target="_blank" rel="noopener noreferrer">King Arthur Baking</a></td>
                  <td>Comprehensive baking resource with tested recipes, technique guides, and ingredient information. Perfect for beginners and advanced bakers alike.</td>
                </tr>
                <tr>
                  <td><a href="https://www.webtoons.com" target="_blank" rel="noopener noreferrer">Webtoon</a></td>
                  <td>Official platform for reading Korean manhwa/webtoons. Features thousands of series across all genres, many available for free with regular updates.</td>
                </tr>
                <tr>
                  <td><a href="https://myanimelist.net" target="_blank" rel="noopener noreferrer">MyAnimeList</a></td>
                  <td>Largest anime and manga database with reviews, recommendations, and community discussions. Essential for tracking your reading list and discovering new series.</td>
                </tr>
                <tr>
                  <td><a href="https://www.chefsteps.com/" target="_blank" rel="noopener noreferrer">Chef Steps</a></td>
                  <td>Food science-focused cooking resource with detailed recipe explanations. Learn the \"why\" behind cooking techniques and improve your culinary skills.</td>
                </tr>
                <tr>
                  <td><a href="https://www.reddit.com/r/VALORANT/" target="_blank" rel="noopener noreferrer">r/VALORANT</a></td>
                  <td>Active Valorant community on Reddit with gameplay tips, patch discussions, agent guides, and esports news. Great for staying updated and improving your game.</td>
                </tr>
                <tr>
                  <td><a href="https://tracker.gg/valorant" target="_blank" rel="noopener noreferrer">Tracker.gg Valorant</a></td>
                  <td>Comprehensive stat tracking for Valorant players. Analyze your performance, track rank progress, and compare stats with friends and pros.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* External Links Section */}
          <div className="external-links-section">
            <h3>Connect & Learn More</h3>
            <div className="links-grid">
              <div className="link-card">
                <h4>🍰 Baking Community</h4>
                <p>Join fellow bakers at <a href="https://www.chefsteps.com/" target="_blank" rel="noopener noreferrer">Chef Steps</a> to discuss bread-making techniques, share recipes, and troubleshoot baking challenges.</p>
              </div>
              <div className="link-card">
                <h4>📚 Manga/Manhwa Forums</h4>
                <p>Discuss your favorite series on <a href="https://www.reddit.com/r/manga/" target="_blank" rel="noopener noreferrer">r/manga</a> and <a href="https://www.reddit.com/r/manhwa/" target="_blank" rel="noopener noreferrer">r/manhwa</a>, two active communities for readers worldwide.</p>
              </div>
              <div className="link-card">
                <h4>🎮 Gaming Network</h4>
                <p>Connect with gamers on <a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a> to find teammates, join communities, and participate in tournaments for Valorant and other games.</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <h3>Find Me Here</h3>
            <p>Located in San Fernando, La Union, Philippines. Always happy to meet fellow baking enthusiasts, manga readers, or gaming buddies in the area!</p>
            <div className="map-placeholder">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10278.848580428088!2d120.31879564743119!3d16.611945910171563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33918e4a2b02230f%3A0xea8944fd6a78dd1b!2sSan%20Fernando%20City%2C%20La%20Union!5e1!3m2!1sen!2sph!4v1768317085975!5m2!1sen!2sph"
                width="100%"
                height="400px"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="San Fernando La Union"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Message Success Popup */}
      <div className="message-popup-overlay" style={{ display: showMessagePopup ? 'flex' : 'none' }}>
        <div className="message-popup">
          <div className="popup-icon">✓</div>
          <h2>Message Sent!</h2>
          <p>Thank you for reaching out! I appreciate your message and will get back to you soon.</p>
          <button className="popup-close-btn" onClick={handleClosePopup}>Close</button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ContactPage;