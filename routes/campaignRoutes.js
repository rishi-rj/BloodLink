const express = require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getAllCampaigns,
  getActiveCampaigns,
  likeCampaign,
  commentOnCampaign,
} = require("../controllers/campaignController");

const router = express.Router();

// Admin routes
router.post("/create", authMiddelware, adminMiddleware, createCampaign);
router.put("/:id", authMiddelware, adminMiddleware, updateCampaign);
router.delete("/:id", authMiddelware, adminMiddleware, deleteCampaign);
router.get("/admin-campaigns", authMiddelware, adminMiddleware, getAllCampaigns);

// Public routes
router.get("/active", getActiveCampaigns);
router.post("/:id/like", authMiddelware, likeCampaign);
router.post("/:id/comment", authMiddelware, commentOnCampaign);

module.exports = router;