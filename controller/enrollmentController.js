const Enrollment = require("../model/enrollment");
const { StatusCodes } = require("http-status-codes");

// Student requests course
const requestEnrollment = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // check if already requested
    const exists = await Enrollment.findOne({ userId, courseId });
    if (exists) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Already requested" });
    }

    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();

    res.status(StatusCodes.CREATED).json({ msg: "Request sent", enrollment });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

// Admin views all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Enrollment.find()
      .populate("userId", "name email")
      .populate("courseId", "title");

    res.json({ count: requests.length, requests });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

// Admin approves/rejects
const updateRequest = async (req, res) => {
  try {
    const { status } = req.body; // approved / rejected
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enrollment) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Request not found" });
    }

    res.json({ msg: `Request ${status}`, enrollment });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};
// const Enrollment = require("../models/Enrollment");

// Get enrollment status for a user and course
const getEnrollmentStatus = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "userId and courseId required" });
    }

    const enrollment = await Enrollment.findOne({ userId, courseId });

    res.status(StatusCodes.OK).json({ enrollment: enrollment || null });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Server error" });
  }
};

module.exports = { requestEnrollment, getAllRequests, updateRequest ,getEnrollmentStatus};
