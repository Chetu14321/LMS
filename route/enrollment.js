const express = require("express");
const { requestEnrollment, getAllRequests, updateRequest,getEnrollmentStatus } = require("../controller/enrollmentController");
const router = express.Router();

router.post("/request", requestEnrollment);       // Student requests course
router.get("/requests/all", getAllRequests);          // Admin sees all
router.patch("/requests/:id", updateRequest);     // Admin approves/rejects
router.post("/requests/status",getEnrollmentStatus)
module.exports = router;
