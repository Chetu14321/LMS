import React, { useEffect, useState } from "react";
import axios from "axios"; // To make API calls

export default function Dashboard() {
  const [user, setUser] = useState(null);  // State to store user info
  const [totalCourses, setTotalCourses] = useState(0);  // State to store total courses count

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching user info (using your /verify endpoint)
        const userResponse = await axios.get("/api/auth/verify", {
          withCredentials: true  // To send cookies with the request
        });
        setUser(userResponse.data.user);  // Set user info in state

        // Fetching total courses (you need to create this endpoint to return the total number of courses)
        const coursesResponse = await axios.get("/api/course/all");
        setTotalCourses(coursesResponse.data.totalCourses); // Assuming response contains 'totalCourses'
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // If user data is still loading
  if (!user) {
    return <p className="text-center mt-5">Loading your dashboard...</p>;
  }

  return (
    <div className="container py-4">
      {/* Welcome Message */}
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <h2 className="text-primary">Welcome, {user.name}!</h2>
          <p className="text-muted">Email: {user.email}</p>
        </div>
      </div>

      {/* User Info Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3 shadow rounded-4">
            <h5>User Information</h5>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
          </div>
        </div>
      </div>

      {/* Total Courses Section */}
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <div className="card p-3 shadow rounded-4">
            <h5>Total Available Courses</h5>
            <p className="display-6">{totalCourses}</p>
            <p>Explore and start learning from the available courses!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
