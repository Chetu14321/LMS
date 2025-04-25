import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    trainer: '',
    thunbmnail_image: '',
    course_link: '',
    topicTitle: '',
    topicDescription: '',
    category: '',
    content: '',
    courseId: ''
  });

  useEffect(() => {
    fetchCourses();
    fetchTopics();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/course/all');
      setCourses(res.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await axios.get('/api/topic/all');
      setTopics(res.data.topics);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const courseData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      trainer: formData.trainer,
      thunbmnail_image: formData.thunbmnail_image,
      course_link: formData.course_link
    };

    try {
      if (editingCourseId) {
        await axios.patch(`/api/course/update/${editingCourseId}`, courseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Course updated successfully!');
      } else {
        await axios.post('/api/course/add', courseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Course created successfully!');
      }
      setFormData({ ...formData, title: '', description: '', price: '', trainer: '', thunbmnail_image: '', course_link: '' });
      setEditingCourseId(null);
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.msg );
    }
  };

  const handleEditCourse = (course) => {
    setFormData({
      ...formData,
      title: course.title,
      description: course.description,
      price: course.price,
      trainer: course.trainer,
      thunbmnail_image: course.thunbmnail_image,
      course_link: course.course_link
    });
    setEditingCourseId(course._id);
    window.scrollTo(0, 0);
  };

  const handleDeleteCourse = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`/api/course/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Course deleted successfully!');
        fetchCourses();
      } catch (error) {
        toast.error('Failed to delete course');
      }
    }
  };

  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/topic/add', {
        topic_title: formData.topicTitle,
        topic_description: formData.topicDescription,
        catagory: formData.category,
        content: formData.content,
        courseId: formData.courseId,
        courseName: courses.find(course => course._id === formData.courseId)?.title || ''
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Topic created successfully!');
      setFormData({ ...formData, topicTitle: '', topicDescription: '', category: '', content: '', courseId: '' });
      fetchTopics();
    } catch (error) {
      toast.error(error.response?.data?.msg );
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
        <h4 className="mb-4">Admin Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className={`btn btn-${activeTab === 'dashboard' ? 'warning' : 'outline-light'} w-100`} onClick={() => setActiveTab('dashboard')}>
              Dashboard
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className={`btn btn-${activeTab === 'course' ? 'warning' : 'outline-light'} w-100`} onClick={() => setActiveTab('course')}>
              Create Course
            </button>
          </li>
          <li className="nav-item">
            <button className={`btn btn-${activeTab === 'topic' ? 'warning' : 'outline-light'} w-100`} onClick={() => setActiveTab('topic')}>
              Create Topic
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {activeTab === 'dashboard' && (
          <div>
            <h3 className="mb-4">Dashboard Overview</h3>
            <div className="card p-3 mb-3 shadow-sm">
              <p><strong>Total Courses:</strong> {courses.length}</p>
              <p><strong>Total Topics:</strong> {topics.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'course' && (
          <div className="card p-4 shadow-sm">
            <h4 className="mb-4">{editingCourseId ? 'Edit Course' : 'Create New Course'}</h4>
            <form onSubmit={handleCourseSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Trainer</label>
                <input type="text" className="form-control" value={formData.trainer} onChange={(e) => setFormData({ ...formData, trainer: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Thumbnail URL</label>
                <input type="text" className="form-control" value={formData.thunbmnail_image} onChange={(e) => setFormData({ ...formData, thunbmnail_image: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Course Link</label>
                <input type="url" className="form-control" value={formData.course_link} onChange={(e) => setFormData({ ...formData, course_link: e.target.value })} />
              </div>
              <button className="btn btn-primary">{editingCourseId ? 'Update Course' : 'Create Course'}</button>
            </form>

            {/* List of Courses */}
            <h5 className="mt-5">Existing Courses</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Trainer</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.trainer}</td>
                    <td>{course.price}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditCourse(course)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'topic' && (
          <div className="card p-4 shadow-sm">
            <h4 className="mb-4">Create New Topic</h4>
            <form onSubmit={handleTopicSubmit}>
              <div className="mb-3">
                <label className="form-label">Course</label>
                <select className="form-select" value={formData.courseId} onChange={(e) => setFormData({ ...formData, courseId: e.target.value })} required>
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Topic Title</label>
                <input type="text" className="form-control" value={formData.topicTitle} onChange={(e) => setFormData({ ...formData, topicTitle: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Topic Description</label>
                <textarea className="form-control" value={formData.topicDescription} onChange={(e) => setFormData({ ...formData, topicDescription: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                  <option value="">Select Category</option>
                  <option value="video">Video</option>
                  <option value="article">Article</option>
                  <option value="audio">Audio</option>
                  <option value="document">Document</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea className="form-control" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
              </div>
              <button className="btn btn-primary">Create Topic</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
