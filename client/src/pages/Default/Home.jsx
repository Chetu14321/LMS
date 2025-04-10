import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="row align-items-center">
        <motion.div
          className="col-md-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="display-4 text-primary">Welcome to AuthApp</h1>
          <p className="lead text-muted">
            A modern authentication system with security and simplicity in mind.
          </p>
          <div className="mt-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="btn btn-primary me-2">
                Register
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="d-inline-block">
              <Link to="/login" className="btn btn-outline-secondary">
                Login
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="col-md-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <img
            src="https://cdn.dribbble.com/users/1022486/screenshots/6225042/authentication.gif"
            className="img-fluid rounded shadow"
            alt="Authentication"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
