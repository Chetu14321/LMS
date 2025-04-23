import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    trainer: '',
    thunbmnail_image: '',
    course_link: '',
  });

  const [updateCourse, setUpdateCourse] = useState({
    title: '',
    description: '',
    price: '',
    trainer: '',
    thunbmnail_image: '',
    course_link: '',
  });

  const API_BASE = 'http://localhost:5400/api';

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:5400/api/auth/all`);
      setUsers(res.data.users);
    } catch (error) {
      console.error(error.response?.data?.msg || error.message);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE}/course/all`);
      setCourses(res.data.courses);
    } catch (err) {
      console.error(err.response.data.msg || err.message);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from localStorage
  
    try {
      await axios.post(`${API_BASE}/course/add`, newCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setNewCourse({
        title: '',
        description: '',
        price: '',
        trainer: '',
        thunbmnail_image: '',
        course_link: '',
      });
  
      setShowCreateForm(false);
      toast.success('Course created successfully!');
      fetchCourses();
    } catch (error) {
      console.error(error.response?.data?.msg || error.message);
      toast.error(error.response?.data?.msg || 'Failed to create course.');
    }
  };
  

  // Update Course
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from localStorage

    try {
      await axios.patch(`${API_BASE}/course/update/${selectedCourse._id}`, updateCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowUpdateForm(false);
      setSelectedCourse(null);
      fetchCourses();
    } catch (error) {
      console.error(error.response?.data?.msg || error.message);
    }
  };

  //delete handler
  const handleDeleteCourse = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this course?");
      if (!confirmDelete) return; // Exit if user cancels
  
      const token = localStorage.getItem("token");
  
      await axios.delete(`${API_BASE}/course/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      alert("Course deleted successfully!");
      fetchCourses(); // Refresh the course list
    } catch (error) {
      console.error(error.response?.data?.msg || error.message);
      alert("Error deleting course. Please try again.");
    }
  };
  
  

  // Set Course for Update
  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setUpdateCourse({
      title: course.title,
      description: course.description,
      price: course.price,
      trainer: course.trainer,
      thunbmnail_image: course.thunbmnail_image,
      course_link: course.course_link,
    });
    setShowUpdateForm(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Welcome, Admin!</h2>

      {/* Create Course Section */}
      <div className="mb-4">
        <button
          className="btn btn-outline-primary mb-2"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Close Create Form' : 'Create Course'}
        </button>

        {showCreateForm && (
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Create New Course</h5>
            <form onSubmit={handleCreateCourse}>
              {/* Form fields for new course */}
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  placeholder="Course Description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={newCourse.price}
                  onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Trainer Name"
                  value={newCourse.trainer}
                  onChange={(e) => setNewCourse({ ...newCourse, trainer: e.target.value })}
                  required
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Thumbnail Image URL"
                  value={newCourse.thunbmnail_image}
                  onChange={(e) => setNewCourse({ ...newCourse, thunbmnail_image: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="url"
                  className="form-control"
                  placeholder="Course Link"
                  value={newCourse.course_link}
                  onChange={(e) => setNewCourse({ ...newCourse, course_link: e.target.value })}
                />
              </div>
              <button className="btn btn-success" type="submit">
                Submit Course
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Course List Section */}
      <div className="row">
        <div className="col-md-6">
          <div
            className="card text-white bg-success mb-3"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowCourses(!showCourses)}
          >
            <div className="card-body">
              <h5 className="card-title">Total Courses</h5>
              <p className="card-text fs-4">{courses.length}</p>
            </div>
          </div>
          {showCourses && (
            <div className="card p-3 mb-3">
              <h5>Course List:</h5>
              <ul className="list-group">
                {courses.map((course) => (
                  <li key={course._id} className="list-group-item d-flex justify-content-between align-items-center">
                    {course.title} — by {course.trainer}
                    <div>
                      <button
                        className="btn btn-warning btn-sm mx-2"
                        onClick={() => handleEditCourse(course)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCourse(course._id)}>
  Delete
</button>

                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Update Course Form */}
      {showUpdateForm && selectedCourse && (
        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Update Course</h5>
          <form onSubmit={handleUpdateCourse}>
            {/* Form fields for updating course */}
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Course Title"
                value={updateCourse.title}
                onChange={(e) => setUpdateCourse({ ...updateCourse, title: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <textarea
                className="form-control"
                placeholder="Course Description"
                value={updateCourse.description}
                onChange={(e) => setUpdateCourse({ ...updateCourse, description: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={updateCourse.price}
                onChange={(e) => setUpdateCourse({ ...updateCourse, price: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Trainer Name"
                value={updateCourse.trainer}
                onChange={(e) => setUpdateCourse({ ...updateCourse, trainer: e.target.value })}
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Thumbnail Image URL"
                value={updateCourse.thunbmnail_image}
                onChange={(e) => setUpdateCourse({ ...updateCourse, thunbmnail_image: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="url"
                className="form-control"
                placeholder="Course Link"
                value={updateCourse.course_link}
                onChange={(e) => setUpdateCourse({ ...updateCourse, course_link: e.target.value })}
              />
            </div>
            <button className="btn btn-success" type="submit">
              Update Course
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
