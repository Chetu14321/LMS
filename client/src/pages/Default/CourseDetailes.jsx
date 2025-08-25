import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "animate.css";
import { useTheme } from "../../Context/ThemeContex";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Logged-in user ID from local storage
  const userId = localStorage.getItem("userId");
  console.log("Current User ID:", userId);

  // Fetch course details and enrollment status
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Get course info
        const res = await axios.get(`http://localhost:5400/api/course/single/${id}`);
        setCourse(res.data.course);

        // POST request for enrollment status
        const enrollRes = await axios.post(
          "http://localhost:5400/api/enrollments/requests/status",
          { userId, courseId: id }
        );

        setEnrollment(enrollRes.data.enrollment || null);
      } catch (err) {
        console.error(err.response?.data?.msg || err.message);
      }
    };

    fetchCourseDetails();
  }, [id, userId]);

  // Request enrollment
  const handleRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5400/api/enrollments/request", {
        userId,
        courseId: id,
      });
      setEnrollment(res.data.enrollment);
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  // Navigate to course topics
  const handleViewDetails = () => {
    navigate(`/course/topics/${id}`);
  };

  if (!course) return <p className="text-center mt-5">Loading course...</p>;

  return (
    <div className={theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}>
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

        {/* Card */}
        <div className="card shadow-lg border-0 rounded-4 animate__animated animate__zoomIn">
          <div className="row g-4 p-4 align-items-start">
            {/* Image */}
            <div className="col-md-5">
              <img
                src={course.thunbmnail_image}
                alt={course.title}
                className="img-fluid rounded-4"
                style={{ objectFit: "cover", maxHeight: "300px", width: "100%" }}
              />
            </div>

            {/* Details */}
            <div className="col-md-7">
              <h3 className="text-dark fw-bold mb-3">{course.title}</h3>
              <h5>Description: {course.description}</h5>

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

              {/* Conditional Rendering based on enrollment status */}
              <div className="mt-4">
                {!enrollment || enrollment.status === "rejected" ? (
                  <button className="btn btn-warning px-4" onClick={handleRequest}>
                    {enrollment?.status === "rejected"
                      ? "Request Again"
                      : "Request Enrollment"}
                  </button>
                ) : enrollment.status === "pending" ? (
                  <span className="badge bg-warning text-dark fs-6 p-2">
                    Pending Approval
                  </span>
                ) : enrollment.status === "approved" ? (
                  <button className="btn btn-primary px-4" onClick={handleViewDetails}>
                    <i className="bi bi-book-half me-2"></i> Start Course
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
