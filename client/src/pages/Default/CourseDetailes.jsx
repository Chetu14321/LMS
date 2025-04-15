import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "animate.css"; // Import the animate.css file

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5400/api/course/single/${id}`)
      .then((res) => {
        setCourse(res.data.course);
        console.log(res.data.course);
      })
      .catch((err) => {
        console.error(err.response?.data?.msg || err.message);
      });
  }, [id]);

  if (!course) return <p className="text-center mt-5">Loading course...</p>;

  return (
    <div className="container mt-5">
      <div
        className="text-center py-4 mb-4 text-white rounded animate__animated animate__fadeIn animate__delay-1s"
        style={{ background: "linear-gradient(to right, #007bff, #6610f2)" }}
      >
        <h2 className="mb-0">
          Thank you for choosing <strong>{course.title}</strong>
        </h2>
      </div>

      <div className="card shadow-lg rounded-4 p-4 border-0">
        <div className="row g-4 align-items-start">
          {/* Image + Button Column */}
          <div className="col-md-5 d-flex flex-column align-items-stretch animate__animated animate__fadeInLeft animate__delay-1s">
            <div className="position-relative">
              <img
                src={course.thunbmnail_image}
                className="img-fluid rounded-4"
                alt={course.title}
                style={{ maxHeight: "320px", objectFit: "cover", width: "100%" }}
              />
              <div className="align-items-center mt-3">
                <button className="btn btn-primary animate__animated animate__bounceIn">
                  <i className="bi bi-book"></i> Start Learning
                </button>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="col-md-7 animate__animated animate__fadeInRight animate__delay-2s">
            <h3 className="text-dark">{course.title}</h3>
            <p className="text-muted">
              <strong>Description:</strong> {course.description}
            </p>

            <div className="mb-3">
              <span className="badge bg-success fs-6 p-2">
                ₹{course.price} Only
              </span>
            </div>

            <p>
              <strong>
                <i className="bi bi-person-fill text-primary me-2"></i>Trainer:
              </strong> {course.trainer}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(course.createdAt).toLocaleDateString()}
            </p>

            {course.course_link && (
              <p>
                <strong>Course Link:</strong>{" "}
                <a
                  href={course.course_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-primary"
                >
                  View Course
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
