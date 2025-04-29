import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'animate.css';

const Topic = () => {
  const { courseId, topicId } = useParams(); // Assuming topicId is passed in URL
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (!courseId) return;

    axios.get(`/api/topic/course/${courseId}`)
      .then((res) => {
        setTopics(res.data.topics);
        setLoading(false);
      })
      .catch((err) => {
        const msg = err.response?.data?.msg || "Failed to load topics.";
        setError(msg);
        setLoading(false);
      });
  }, [courseId]);

  useEffect(() => {
    const foundTopic = topics.find(topic => topic._id === topicId);
    setActiveTopic(foundTopic);
  }, [topicId, topics]);

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);

    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
    }
  };

  const handleBackClick = () => {
    // Navigate back to the list of topics
    navigate(`/course/${courseId}`);
  };

  if (loading) return <div className="text-center text-white">Loading topics...</div>;

  return (
    <div className="container-fluid bg-dark animate__animated animate__fadeIn" style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div
        className={`sidebar bg-black text-white p-3 shadow-lg ${isSidebarVisible ? '' : 'd-none'}`}
        style={{
          width: '250px',
          height: '100vh',
          position: 'fixed',
          top: '60px',
          left: 0,
          zIndex: 1000,
          overflowY: 'auto',
          transition: 'transform 0.3s ease',
        }}
      >
        <h5 className="text-center mb-5">Topics List</h5>
        <ul className="list-group list-group-flush">
          {topics.map((topic) => (
            <li
              key={topic._id}
              className={`list-group-item bg-dark text-white d-flex justify-content-between align-items-center ${activeTopic?._id === topic._id ? 'active' : ''}`}
              onClick={() => handleTopicClick(topic)}
              style={{
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
                borderLeft: activeTopic?._id === topic._id ? '5px solid #6610f2' : 'none',
                marginBottom: '10px',
              }}
            >
              <span>{topic.topic_title}</span>
              <i
                className="bi bi-arrow-right-circle"
                style={{
                  fontSize: '1.5rem',
                  color: '#6610f2',
                  transition: 'transform 0.3s ease',
                }}
              ></i>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div
        className="content"
        style={{
          marginLeft: isSidebarVisible ? '250px' : '0',  // Adjust based on sidebar visibility
          width: isSidebarVisible ? 'calc(100% - 250px)' : '100%',
          padding: '20px',
          maxHeight: '100vh',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 0
        }}
      >
        {/* Back Button */}
        <button 
          onClick={handleBackClick} 
          className="btn btn-light mb-4" 
          style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 999 }}
        >
          <i className="bi bi-arrow-left-circle" style={{ fontSize: '1.5rem', color: '#6610f2' }}></i> Back
        </button>

        <h2 className="text-center text-white mb-4">Course Topics</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row">
          <div className="col-md-12">
            {activeTopic ? (
              <div className="card shadow-lg bg-dark text-white p-4">
                <h4 className="topic-title mb-3">{activeTopic.topic_title}</h4>
                <p className="text-muted mb-4">{activeTopic.topic_description || 'No description available'}</p>

                {activeTopic.catagory === 'video' && activeTopic.content && (
                  <div className="video-container mb-4">
                    <video controls width="100%">
                      <source src={activeTopic.content} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {activeTopic.catagory === 'audio' && activeTopic.content && (
                  <div className="audio-container mb-4">
                    <audio controls>
                      <source src={activeTopic.content} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}

                {activeTopic.catagory === 'document' && activeTopic.content && (
                  <div className="document-container mb-4">
                    <iframe
                      src={activeTopic.content}
                      title="Document"
                      width="100%"
                      height="500px"
                      frameBorder="0"
                    />
                  </div>
                )}

                {activeTopic.catagory === 'article' && activeTopic.content && (
                  <div className="article-content mb-4">
                    <div
                      className="container"
                      dangerouslySetInnerHTML={{ __html: activeTopic.content }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-white mt-4">Click on a topic to view its content</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
