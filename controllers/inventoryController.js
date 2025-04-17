const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      //calculate Blood Quanitity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("Total In", totalInOfRequestedBlood);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate OUT Blood Quanitity

      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      //in & Out Calc
      const availableQuanityOfBloodGroup = totalIn - totalOut;
      //quantity validation
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Reocrd Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro In Create Inventory API",
      error,
    });
  }
};

// GET ALL BLOOD RECORS
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};
// GET Hospital BLOOD RECORS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      messaage: "get hospital comsumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get consumer Inventory",
      error,
    });
  }
};

// GET BLOOD RECORD OF 3
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "recent Invenotry Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// GET DONAR REOCRDS
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //find donars
    const donorId = await inventoryModel.distinct("donar", {
      organisation,
    });
    // console.log(donorId);
    const donars = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donar records",
      error,
    });
  }
};

const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    //GET HOSPITAL ID
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    //FIND HOSPITAL
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In get Hospital API",
      error,
    });
  }
};

// GET ORG PROFILES
const getOrgnaisationController = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { donar });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG API",
      error,
    });
  }
};
// GET ORG for Hospital
const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventoryModel.distinct("organisation", { hospital });
    //find org
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital ORG API",
      error,
    });
  }
};

// GET ADMIN INVENTORY
const getAdminInventoryController = async (req, res) => {
  try {
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const inventory = await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // Calculate total IN
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup,
              inventoryType: "in"
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" }
            }
          }
        ]);

        // Calculate total OUT
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup,
              inventoryType: "out"
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" }
            }
          }
        ]);

        const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        return {
          bloodGroup,
          quantity: available
        };
      })
    );

    return res.status(200).send({
      success: true,
      message: "Admin Inventory Data Fetched Successfully",
      inventory
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Admin Inventory API",
      error
    });
  }
};

// GET ADMIN REQUESTS
const getAdminRequestsController = async (req, res) => {
  try {
    const requests = await inventoryModel
      .find({ 
        inventoryType: "out",
        $or: [
          { status: "pending" },
          { status: "approved" },
          { status: "rejected" }
        ]
      })
      .populate("hospital", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "Admin Requests Data Fetched Successfully",
      requests: requests.map(request => ({
        ...request.toObject(),
        hospitalName: request.hospital?.name,
        status: request.status || 'pending'
      }))
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Admin Requests API",
      error
    });
  }
};

// HANDLE BLOOD REQUEST
const handleBloodRequestController = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    const request = await inventoryModel.findById(requestId)
      .populate('hospital', 'email name')
      .populate('organisation');

    if (!request) {
      return res.status(404).send({
        success: false,
        message: "Request not found"
      });
    }

    // Check if request is already processed
    if (request.status && request.status !== 'pending') {
      return res.status(400).send({
        success: false,
        message: `Request is already ${request.status}`
      });
    }

    if (status === "approve") {
      // Check if enough blood is available
      const availableBlood = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup: request.bloodGroup,
            inventoryType: "in",
            organisation: request.organisation._id
          }
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" }
          }
        }
      ]);

      const totalAvailable = availableBlood[0]?.total || 0;
      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup: request.bloodGroup,
            inventoryType: "out",
            organisation: request.organisation._id
          }
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" }
          }
        }
      ]);

      const actualAvailable = totalAvailable - (totalOut[0]?.total || 0);

      if (actualAvailable < request.quantity) {
        return res.status(400).send({
          success: false,
          message: `Not enough blood available. Only ${actualAvailable} units available.`
        });
      }

      // Update original request status
      request.status = "approved";
      await request.save();

      // Create new out inventory record
      const outInventory = new inventoryModel({
        bloodGroup: request.bloodGroup,
        quantity: request.quantity,
        email: request.hospital.email,
        inventoryType: "out",
        hospital: request.hospital._id,
        organisation: request.organisation._id,
        status: "approved",
        requestId: request._id
      });
      await outInventory.save();
    } else if (status === "reject") {
      request.status = "rejected";
      await request.save();
    }

    return res.status(200).send({
      success: true,
      message: `Request ${status}ed successfully`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in handling request",
      error: error.message
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
  getAdminInventoryController,
  getAdminRequestsController,
  handleBloodRequestController
};
