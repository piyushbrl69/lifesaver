const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const User = require("../models/User");

// CREATE USER + QR
router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);

    const url = `${process.env.BASE_URL}/user/${user._id}`;
    const qr = await QRCode.toDataURL(url);

    res.json({ qr, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER
router.get("/test", (req, res) => {
  res.send("API working");
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;
