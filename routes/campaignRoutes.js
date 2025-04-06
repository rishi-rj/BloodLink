const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddelware");
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
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("startDate").isDate().withMessage("Start date must be a valid date"),
    body("endDate").isDate().withMessage("End date must be a valid date"),
  ],
  createCampaign
);
router.put("/:id", authMiddleware, adminMiddleware, updateCampaign);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCampaign);
router.get("/", authMiddleware, adminMiddleware, getAllCampaigns);

// User routes
router.get("/active", getActiveCampaigns);
router.post("/like/:id", authMiddleware, likeCampaign);
router.post("/comment/:id", authMiddleware, commentOnCampaign);

module.exports = router;