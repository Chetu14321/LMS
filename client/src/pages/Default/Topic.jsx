import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RelatedCourseTopics = () => {
  const { courseId } = useParams();  // Get the courseId from the URL
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/topic/course/${courseId}`) // Call the backend route
      .then((res) => {
        console.log('Fetched course topics:', res.data);
        setTopics(res.data.topics);
        setError(null); // Clear any previous error
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.msg || 'Failed to load course topics';
        setError(errorMessage);
      });
  }, [courseId]);

  if (error) return <div className="text-danger text-center mt-4">{error}</div>;
  if (!topics.length) return <div className="text-center mt-4">No topics available for this course.</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Related Topics for Course</h3>
      {topics.map((topic) => (
        <div className="card shadow-sm mb-4 p-3" key={topic._id}>
          <h5>{topic.topic_title}</h5>
          <p className="text-muted">{topic.topic_description}</p>

          {/* Display content based on category */}
          {topic.catagory === 'video' && (
            <video controls width="100%">
              <source src={topic.content} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {topic.catagory === 'audio' && (
            <audio controls>
              <source src={topic.content} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
          {topic.catagory === 'document' && (
            <iframe
              src={topic.content}
              title="Document"
              width="100%"
              height="500px"
            ></iframe>
          )}
          {topic.catagory === 'article' && (
            <div dangerouslySetInnerHTML={{ __html: topic.content }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default RelatedCourseTopics;
