import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "animate.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(`/api/course/single/${id}`);
        setCourse(res.data.course);
      } catch (err) {
        console.error(err.response?.data?.msg || err.message);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const handleViewDetails = (courseId) => {
    if (courseId) {
      navigate(`/course//topics/${courseId}`);
      
    }
  };

  if (!course) return <p className="text-center mt-5">Loading course...</p>;

  return (
    <div className="container mt-5">
      {/* Header */}
      <div
        className="text-center py-4 mb-5 rounded text-white animate__animated animate__fadeInDown"
        style={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        }}
      >
        <h2 className="fw-bold">
          Welcome to <span className="text-warning">{course.title}</span>
        </h2>
        <p className="mb-0 fs-5">Let’s begin your learning journey!</p>
      </div>

      {/* Main Content Card */}
      <div className="card shadow-lg border-0 rounded-4 animate__animated animate__zoomIn">
        <div className="row g-4 p-4 align-items-start">
          {/* Image Section */}
          <div className="col-md-5">
            <img
              src={course.thunbmnail_image}
              alt={course.title}
              className="img-fluid rounded-4"
              style={{ objectFit: "cover", maxHeight: "300px", width: "100%" }}
            />
          
          </div>

          {/* Details Section */}
          <div className="col-md-7">
            <h3 className="text-dark fw-bold mb-3">{course.title}</h3>
            <h5>
              Description: {course.description}
           </h5>

            <div className="mb-3">
              <span className="badge bg-gradient bg-success fs-6 p-2">
                ₹{course.price} Only
              </span>
            </div>

            <p>
              <i className="bi bi-person-fill text-primary me-2"></i>
              <strong>Trainer:</strong> {course.trainer}
            </p>
            <p>
              <i className="bi bi-calendar-event text-info me-2"></i>
              <strong>Created At:</strong>{" "}
              {new Date(course.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-4">
              <button
                className="btn btn-primary px-4"
                onClick={() => handleViewDetails(course._id)}
              >
                <i className="bi bi-book-half me-2"></i> Start Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
