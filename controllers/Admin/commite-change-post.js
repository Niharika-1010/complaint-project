const Complaints = require("../../models/Complaint-schema");

exports.commiteChange = (req, res) => {
  var id = req.params.id;

  console.log("ID:", id);
  console.log("BODY:", req.body);

  var updated_doc = {
    approvalStatus: req.body.approval
  };

  // Work Status update
  if (req.body.workStatus && req.body.workStatus !== "~") {
    updated_doc.workStatus = req.body.workStatus;
  }

  // Officer update (FIXED)
  if (req.body.officer && req.body.officer !== "~") {
    updated_doc.officerAppointed = req.body.officer;
  }

  console.log("UPDATED DOC:", updated_doc);

  Complaints.findByIdAndUpdate(id, updated_doc, { new: true }, (err, docs) => {
    if (err) {
      console.log("ERROR:", err);
      return res.sendStatus(500);
    }

    console.log("Complaint Successfully Updated");

    // Better than sendFile
     res.sendFile(__dirname + "/complaintSuccess.html");
  });
};