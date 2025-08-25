const express = require("express");
const {
  startLiveSession,
  endLiveSession,
  getLiveSession,
} = require("../controller/liveController");
const router = express.Router();

// Admin routes
router.post("/:id/start", startLiveSession);
router.post("/:id/end", endLiveSession);

// User route
router.get("/:id", getLiveSession);

module.exports = router;
