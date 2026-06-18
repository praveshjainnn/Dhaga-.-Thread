var express = require("express");
var router = express.Router();
// DB disabled in demo mode - all models commented out

router.get("/", function (req, res) {
  res.send("Api Is Working (Demo Mode - No DB)");
});

// ─── MEETINGS ──────────────────────────────────────────────────────────────
router.post("/bookMeet", function (req, res) {
  res.status(201).json({ message: "Meeting Booked Successfully (Demo)", status: "success" });
});

router.post("/updateMeet", function (req, res) {
  res.status(201).json({ message: "Meeting Updated Successfully (Demo)", status: "success" });
});

router.post("/deleteMeet", function (req, res) {
  res.status(201).json({ message: "Meeting Deleted Successfully (Demo)", status: "success" });
});

router.get("/getMeetings", function (req, res) {
  res.status(200).json({ message: "Meetings Fetched Successfully (Demo)", meetings: [], status: "success" });
});

// ─── TRANSPORT ─────────────────────────────────────────────────────────────
router.post("/bookTransport", function (req, res) {
  res.status(201).json({ message: "Transport Booked Successfully (Demo)", status: "success" });
});

router.get("/getTransports", function (req, res) {
  res.status(200).json({ message: "Transport Fetched Successfully (Demo)", transport: [], status: "success" });
});

router.post("/updateTransportProgress", function (req, res) {
  res.status(201).json({ message: "Transport Updated Successfully (Demo)", status: "success" });
});

router.post("/deleteTransport", function (req, res) {
  res.status(201).json({ message: "Transport Deleted Successfully (Demo)", status: "success" });
});

// ─── WAREHOUSE ─────────────────────────────────────────────────────────────
router.post("/bookWarehouse", function (req, res) {
  res.status(201).json({ message: "Warehouse Booked Successfully (Demo)", status: "success" });
});

router.get("/getWarehousesBooking", function (req, res) {
  res.status(200).json({ message: "Warehouse Fetched Successfully (Demo)", warehouse: [], status: "success" });
});

router.post("/updateWarehouseBookingStatus", function (req, res) {
  res.status(201).json({ message: "Warehouse Updated Successfully (Demo)", status: "success" });
});

router.post("/updateWarehouseBooking", function (req, res) {
  res.status(201).json({ message: "Warehouse Updated Successfully (Demo)", status: "success" });
});

// ─── SERVICES ──────────────────────────────────────────────────────────────
router.post("/bookService", function (req, res) {
  res.status(201).json({ message: "Service Booked Successfully (Demo)", status: "success" });
});

router.get("/getServiceBookings", function (req, res) {
  res.status(200).json({ message: "Service Fetched Successfully (Demo)", service: [], status: "success" });
});

router.post("/updateServiceStatus", function (req, res) {
  res.status(201).json({ message: "Service Updated Successfully (Demo)", status: "success" });
});

// ─── USER / PROGRESS ───────────────────────────────────────────────────────
router.post("/updateProgress", function (req, res) {
  res.status(201).json({ message: "Progress Updated Successfully (Demo)", status: "success" });
});

router.post("/:userId/addBatch", function (req, res) {
  res.status(201).json({ message: "Batch Added Successfully (Demo)", status: "success" });
});

router.post("/:userId/:BatchId/editProgress", function (req, res) {
  res.json({ status: "success" });
});

router.post("/:userId/:BatchId/generateCertificate", function (req, res) {
  res.json({ status: "success" });
});

router.post("/getUserById", function (req, res) {
  res.json({
    user: {
      _id: "demo001",
      name: "Demo User",
      email: "demo@demo.com",
      role: "farmer",
      progress: 0,
      batches: []
    }
  });
});

console.log("API running in Demo Mode (no DB)");
module.exports = router;
