const Campaign = require("../models/campaignModel");
const { validationResult } = require("express-validator");

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: "Validation error", errors: errors.array() });
    }

    // Format the date properly
    const campaignData = {
      ...req.body,
      isActive: true,
      date: new Date(req.body.date)
    };

    const campaign = new Campaign(campaignData);
    await campaign.save();
    
    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      campaign,
    });
  } catch (error) {
    console.error("Campaign creation error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error creating campaign", 
      error: error.message 
    });
  }
};

// Update a campaign
const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }
    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      campaign,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Delete a campaign
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }
    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Get all campaigns (Admin)
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .sort({ createdAt: -1 })
      .populate({ path: "organisation", model: "User", select: "name" }); // Correct model name

    if (!campaigns) {
      return res.status(200).json({
        success: true,
        campaigns: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Campaigns fetched successfully",
      campaigns: campaigns.map((campaign) => ({
        ...campaign.toObject(),
        organisationName: campaign.organisation?.name,
      })),
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching campaigns",
      error: error.message,
    });
  }
};

// Get active campaigns (Users)
const getActiveCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ isActive: true })
      .sort({ date: 1 })
      .populate({ path: "organisation", model: "User", select: "name" }); // Correct model name

    res.status(200).json({
      success: true,
      message: "Active campaigns fetched successfully",
      campaigns: campaigns.map((campaign) => ({
        ...campaign.toObject(),
        organisationName: campaign.organisation?.name,
      })),
    });
  } catch (error) {
    console.error("Error fetching active campaigns:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching active campaigns",
      error: error.message,
    });
  }
};

// Like a campaign
const likeCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }
    campaign.likes += 1;
    await campaign.save();
    res.status(200).json({
      success: true,
      message: "Campaign liked successfully",
      likes: campaign.likes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Comment on a campaign
const commentOnCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ success: false, message: "Campaign not found" });
    }
    campaign.comments.push({ user: req.body.userId, comment: req.body.comment });
    await campaign.save();
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comments: campaign.comments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = {
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getAllCampaigns,
  getActiveCampaigns,
  likeCampaign,
  commentOnCampaign,
};