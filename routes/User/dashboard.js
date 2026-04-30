const express = require("express");
const router = express.Router();

const dashboard = require("../../controllers/User/dashboard");
const authVerify = require("../../jwt/authverify");

const Complaints = require("../../models/Complaint-schema");

// 👉 GET Dashboard
router.get("/:id", authVerify, dashboard.dashboard);

// 👉 POST Feedback (NEW)
router.post("/submit-feedback/:id", async (req, res) => {
  try {
    const complaintId = req.params.id;
    const feedback = req.body.feedback;

    console.log("Feedback received:", feedback);

    await Complaints.findByIdAndUpdate(complaintId, {
      feedback: feedback,
    });

    console.log("Feedback saved successfully");

     res.send(`
  <script>
    alert("Feedback Submitted Successfully ✅");
    window.location.href = "/user/${req.userID}";
  </script>
`);// go back to dashboard
  } catch (err) {
    console.log("Error:", err);
    res.send("Error submitting feedback");
  }
});

module.exports = router;