const Course = require("../model/course");
const { StatusCodes } = require("http-status-codes");

// Start a live session
const startLiveSession = async (req, res) => {
  try {
    const { meetingLink } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Course not found" });

    course.liveSession.isActive = true;
    course.liveSession.meetingLink = meetingLink;
    course.liveSession.recordingUrl = "";
    await course.save();

    res.json({ msg: "Live session started", liveSession: course.liveSession });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

// End a live session and add recording
const endLiveSession = async (req, res) => {
  try {
    const { recordingUrl } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Course not found" });

    course.liveSession.isActive = false;
    course.liveSession.recordingUrl = recordingUrl;
    await course.save();

    res.json({ msg: "Live session ended & recording added", liveSession: course.liveSession });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

// Get live session (for user view)
const getLiveSession = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Course not found" });

    res.json({ liveSession: course.liveSession });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

module.exports = { startLiveSession, endLiveSession, getLiveSession };
