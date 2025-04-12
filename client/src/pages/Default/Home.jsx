// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth"; // Custom hook for user authentication
import "animate.css";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth(); // Get the user information from context or hook
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5400/api/course/all")
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  const handleViewDetails = (courseId) => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate("/login");
    } else {
      // If user is logged in, navigate to course details page
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold animate__animated animate__fadeInDown">
          📚 Welcome to Our LMS
        </h1>
        <p className="text-muted animate__animated animate__fadeIn">
          Start learning with our top courses today!
        </p>
      </div>

      {courses.length === 0 ? (
        <p className="text-center text-muted">No courses found.</p>
      ) : (
        <div className="row">
          {courses.map((course, index) => (
            <div
              className="col-md-4 mb-4 animate__animated animate__fadeInUp"
              key={course._id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card h-100 shadow-sm border-0 rounded-4 hover-shadow">
                <img
                  src={course.thunbmnail_image}
                  className="card-img-top rounded-top-4"
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text text-muted">
                    {course.description.slice(0, 80)}...
                  </p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleViewDetails(course._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
