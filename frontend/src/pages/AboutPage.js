import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import sourdough from '../images/Sourdough.webp';
import setup from '../images/setup.jpg';
import manhwa from '../images/manhwa.jpg';

const quizData = [
  {
    question: "How many agents have been in the Valorant protocol?",
    options: ["23", "20", "21", "24"],
    answer: 2
  },
  {
    question: "What are VALORANT characters called??",
    options: ["Heroes", "Legends", "Agents", "Champions"],
    answer: 2
  },
  {
    question: "Which role is best at entering sites first",
    options: ["Sentinel", "Duelist", "Initiator", "Controller"],
    answer: 1
  },
  {
    question: "What is the in-game currency used to buy weapons and abilities",
    options: ["Gold", "Credits", "Points", "Coins"],
    answer: 1
  },
  {
    question: "Which map is known for its teleporters",
    options: ["Breeze", "Haven", "Ascent", "Bind"],
    answer: 3
  },
  {
    question: "what does ally Clove say when she ults?",
    options: ["Back like I never left", "I am here again", "Ready for round 2?", "Run, run!!!"],
    answer: 0
  },
];

const AboutPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const selectOption = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null) return;
    const currentData = quizData[currentQuestionIndex];
    if (selectedOptionIndex === currentData.answer) {
      setScore(score + 1);
    }
    setQuizSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
      setQuizSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setQuizSubmitted(false);
    setQuizCompleted(false);
  };

  return (
    <>
      {/* About Us Section */}
      <section className="page-hero">
        <div className="container">
          <h2>About my Passion</h2>
          <p>Discover the hobbies that define my daily life</p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="about-content">
        <div className="container">
          {/* What I love */}
          <div className="content-section">
            <h3>What I Love About my Three Passions</h3>
            <div className="two-column">
              <div className="column">
                <img src={sourdough} alt="Sourdough bread" />
              </div>
              <div className="column">
                <p>My three passions-baking and cooking, reading manhwa and manga, and playing online games-might seem unrelated at first, but they're all deeply connected in how they enrich my life and challenge me in different ways</p>

                <p><strong id="baking">Baking and Cooking</strong> is where I find peace and creativity in equal measure. There's something incredibly satisfying about following a recipe, understanding the chemistry behind it, and watching ingredients transform into something delicious. I'm constantly learning new techniques, from laminating dough for croissants to perfecting the art of tempering chocolate. Every dish is a lesson in patience, precision, and creativity. I love experimenting with flavors from different cuisines and sharing my creations with family and friends.</p>

                <p><strong id="reading">Reading Manhwa and Manga</strong> opens up entire worlds of storytelling that I can't find anywhere else. Korean manhwa offers unique narratives with stunning full-color art, while Japanese manga provides diverse genres and art styles that have influenced global pop culture. I'm drawn to everything from action-packed series like Solo Leveling and Tower of God to slice-of-life stories that explore everyday human experiences. Reading these visual narratives has taught me about different cultures, improved my visual literacy, and given me countless hours of entertainment.</p>

                <p><strong id="gaming">Playing Online Games</strong>, especially Valorant, challenges my strategic thinking and teamwork abilities. Valorant combines precise shooting mechanics with character abilities, requiring both individual skill and team coordination. I've spent hundreds of hours learning agent abilities, studying map layouts, and improving my aim. Gaming has connected me with friends worldwide, taught me how to communicate effectively under pressure, and shown me the value of continuous improvement and learning from mistakes.</p>
              </div>
            </div>
          </div>

          {/* Journey Timeline Section */}
          <div className="content-section timeline-section">
            <h3>My Journey Through These Passions</h3>
            <div className="timeline-content">
              <div className="timeline-text">
                <ol className="timeline-list">
                  <li><strong>2015 – Early Gaming Experience:</strong> As a child, I spent time playing online games in local computer shops, where I was first introduced to multiplayer and competitive gaming. These early experiences sparked my interest in fast-paced and strategic gameplay, which later influenced my preference for tactical shooters and eventually led me to Valorant as my main game today.</li>
                  <li><strong>2020 - Deep Dive into Manga:</strong> Expanded my reading to include Japanese manga, exploring genres from shonen to seinen. Built a physical collection of favorite series and joined online reading communities.</li>
                  <li><strong>2020 - Discovering Manhwa:</strong> Read my first manhwa series "Tower of God" online and was immediately hooked by the unique storytelling and art style. Started exploring more Korean webtoons.</li>
                  <li><strong>2021 - Gaming During Lockdown:</strong> Began playing online games more seriously during the pandemic. Started with casual games and gradually moved to competitive titles, discovering a passion for strategic gameplay.</li>
                  <li><strong>2021 - Valorant Journey Begins:</strong> Downloaded Valorant and immediately fell in love with the tactical gameplay. Spent months learning each agent, practicing aim, and climbing the competitive ladder from Iron to Gold rank.</li>
                  <li><strong>2024 - Expanding Culinary Skills:</strong> Started learning how to bake through free online videos. Learned advanced techniques when I enrolled in online baking course and learned bread-making and pastry arts. Started documenting my recipes and sharing them with friends.</li>
                  <li><strong>2025-Present - Mastering All Three:</strong> Now balancing all three passions daily—experimenting with new recipes, keeping up with ongoing manhwa and manga series, and maintaining my Valorant rank while exploring other competitive games. Each passion continues to teach me valuable life skills.</li>
                </ol>
              </div>
              <div className="timeline-image">
                <img src="https://www.loveandlemons.com/wp-content/uploads/2020/03/baking-recipes-1.jpg" alt="Baking recipes" />
              </div>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="quote-section">
            <blockquote>
              <p>"Life is about finding joy in the things you love. Whether you're creating something delicious, losing yourself in a great story, or competing with friends, passion is what makes every moment meaningful."</p>
              <cite>— Personal Philosophy</cite>
            </blockquote>
          </div>

          {/* Additional Images */}
          <div className="image-gallery">
            <div className="gallery-item">
              <img src={setup} alt="Gaming setup with monitors and peripherals" />
              <p className="caption">My gaming station where I practice Valorant daily</p>
            </div>
            <div className="gallery-item">
              <img src={manhwa} alt="Manhwa and Manga" />
              <p className="caption">Reading alone that makes my day</p>
            </div>
          </div>

          {/* Why These Passions Matter */}
          <div className="content-section">
            <h3>Why These Passions Define Me</h3>
            <p>Each of my three passions contributes uniquely to who I am as a person. Baking and cooking teach me patience, precision, and the joy of creating something tangible that can be shared with others. There's a scientific aspect to understanding how ingredients interact, temperatures affect texture, and timing impacts flavor. Every successful dish builds my confidence, and every mistake is a learning opportunity.</p>

            <p>Reading manhwa and manga has expanded my worldview in ways I never expected. These visual narratives introduce me to Korean and Japanese cultures, different storytelling techniques, and art styles that range from minimalist to incredibly detailed. I've learned about perseverance from characters who never give up, empathy from slice-of-life stories, and creativity from fantasy worlds. The reading community is incredibly welcoming, and discussing plot theories and character development with fellow fans has improved my analytical thinking.</p>

            <p>Gaming, particularly Valorant, has taught me invaluable lessons about teamwork, communication, and handling pressure. In competitive matches, you need to make split-second decisions, coordinate with teammates, and adapt strategies on the fly. I've learned to stay calm when losing, be gracious when winning, and always focus on improvement rather than just results. The gaming community has connected me with people from around the world, and the friendships I've made through gaming are genuine and lasting.</p>

            <p>Together, these three passions create a balanced lifestyle. When I'm stressed, I bake. When I need to relax, I read. When I want excitement and challenge, I game. They complement each other perfectly—baking grounds me in the physical world, reading expands my imagination, and gaming sharpens my reflexes and strategic thinking. I can't imagine my life without any of these passions, and I'm excited to continue growing in each area for years to come.</p>
          </div>
        </div>
      </section>

      {/* Valorant Quiz Section */}
      <section className="quiz-section">
        <div className="container">
          {!quizCompleted ? (
            <>
              <h3>Test Your Valorant Knowledge!</h3>
              <div className="quiz-container">
                <div id="question" className="question">
                  {quizData[currentQuestionIndex].question}
                </div>
                <div id="options" className="options">
                  {quizData[currentQuestionIndex].options.map((option, index) => (
                    <div
                      key={index}
                      className={`option ${selectedOptionIndex === index ? 'selected' : ''}`}
                      onClick={() => selectOption(index)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <div id="result" className="result"></div>
                {!quizSubmitted ? (
                  <button
                    id="submitBtn"
                    className="quiz-btn submit-btn"
                    onClick={handleSubmit}
                    disabled={selectedOptionIndex === null}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <>
                    <div className="result-message">
                      {selectedOptionIndex === quizData[currentQuestionIndex].answer ? (
                        <div className="result-correct">✓ Correct!</div>
                      ) : (
                        <div className="result-wrong">
                          ✗ Wrong! Correct answer: {quizData[currentQuestionIndex].options[quizData[currentQuestionIndex].answer]}
                        </div>
                      )}
                    </div>
                    <button
                      id="nextBtn"
                      className="quiz-btn next-btn"
                      onClick={handleNext}
                    >
                      {currentQuestionIndex + 1 < quizData.length ? 'Next Question' : 'See Results'}
                    </button>
                  </>
                )}
                <div className="quiz-progress">
                  Question {currentQuestionIndex + 1} of {quizData.length}
                </div>
              </div>
            </>
          ) : (
            <div className="quiz-results">
              <h3>Quiz Complete!</h3>
              <div className="final-score">
                Your final score is {score} out of {quizData.length}
              </div>
              <button className="quiz-btn reset-btn" onClick={resetQuiz}>
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
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
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
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

export default AboutPage;