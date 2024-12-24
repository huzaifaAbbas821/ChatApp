import { User } from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
    try {
        
        const loggedinId = req.user?._id;
        if(!loggedinId){
            throw new Error("error in getUserForSidebar")
        }
        // Use $ne (not equal) to exclude the logged-in user
        const allUsers = await User.find({ _id: { $ne: loggedinId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error in getUserForSidebar", error);
        // Correcting the error response structure
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
