import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth"; // Custom hook for user authentication
import { useTheme } from "../../Context/ThemeContex"; // Importing useTheme hook to access the theme context
import "animate.css";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useAuth(); // Get the user information from context or hook
  const { theme } = useTheme(); // Get the current theme (light or dark)
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/course/all")
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
      alert("Login First !....");
      navigate("/login");
    } else {
      // If user is logged in, navigate to course details page
      navigate(`/course/${courseId}`);
    }
  };

  return (
    <div
      className={`position-relative ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`} // Apply theme-specific classes to the container
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <div className="animated-bg"></div>

      <div className="container mt-5 position-relative" style={{ zIndex: 1 }}>
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold animate__animated animate__fadeInDown">
            📚 Welcome to Our LMS......
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
                <div
                  className={`card h-100 border-0 rounded-4 hover-shadow ${
                    theme === "dark"
                      ? "bg-dark text-light border-white shadow-lg"
                      : "bg-white bg-opacity-75 border-dark shadow-md"
                  }`} // Apply theme-based styles to the card
                  style={{
                    boxShadow: theme === "dark" 
                      ? "0px 4px 12px rgba(255, 255, 255, 0.1)" 
                      : "0px 4px 12px rgba(0, 0, 0, 0.1)"
                  }}
                >
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
                      className={`btn btn-outline-${theme === "dark" ? "light" : "primary"} btn-sm`}
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
    </div>
  );
};

export default Home;
