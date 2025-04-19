const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

//GET DONAR LIST
const getDonarsListController = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In DOnar List API",
      error,
    });
  }
};
//GET list of hospitals
const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: hospitalData.length,
      message: "HOSPITAL List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API",
      error,
    });
  }
};
//GET ORG LIST
const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length,
      message: "ORG List Fetched Successfully",
      orgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API",
      error,
    });
  }
};
// =======================================

//DELETE DONAR
const deleteDonarController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: " Record Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

// Get all users with their donation/request history
const getUsersController = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    let limit = 10; // Default limit
    
    if (search && search.trim()) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { role: { $regex: search, $options: 'i' } }
        ]
      };
      limit = undefined; // No limit for search results
    }

    // Get users sorted by creation date
    const users = await userModel
      .find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit);

    if (!users.length && !search) {
      return res.status(200).send({
        success: true,
        message: "No users found",
        users: []
      });
    }

    // Get donation/request history for each user
    const usersWithHistory = await Promise.all(
      users.map(async (user) => {
        const [donations, requests] = await Promise.all([
          inventoryModel.countDocuments({
            email: user.email,
            inventoryType: "in"
          }),
          inventoryModel.countDocuments({
            email: user.email,
            inventoryType: "out"
          })
        ]);

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          createdAt: user.createdAt,
          donations,
          requests
        };
      })
    );

    return res.status(200).send({
      success: true,
      message: search ? "Search results" : "Latest users fetched successfully",
      totalCount: await userModel.countDocuments(query),
      users: usersWithHistory
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting users",
      error: error.message
    });
  }
};

// Get user details with full history
const getUserDetailsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    const donations = await inventoryModel.find({
      email: user.email,
      inventoryType: "in"
    }).sort({ createdAt: -1 });

    const requests = await inventoryModel.find({
      email: user.email,
      inventoryType: "out"
    }).sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      user: {
        ...user.toObject(),
        history: {
          donations,
          requests
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting user details",
      error
    });
  }
};

// Get inventory
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.body.userId })
      .populate({ path: "donar", model: "User", select: "name email" })
      .populate({ path: "hospital", model: "User", select: "name email" })
      .populate({ path: "organisation", model: "User", select: "name email" })
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Inventory fetched successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching inventory",
      error,
    });
  }
};

//EXPORT
module.exports = {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
  getUsersController,
  getUserDetailsController,
  getInventoryController
};
