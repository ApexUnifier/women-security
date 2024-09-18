import Police from "../models/police.js";

// Function to update the stationId of a police record
const updateStationIdController = async (req, res) => {
  try {
    const { regId, stationId } = req.body;
    const check = await Police.findOne({ regId });

    if (!check) {
      console.log("Police with Reg id does not exist, please register first");
      return res.status(404).json({ Message: "Register First" });
    }

    // Update the stationId and save the document
    check.stationId = stationId;
    await check.save();

    res.status(200).json({ Message: "Station ID updated successfully" });
  } catch (error) {
    console.error("Error updating station ID:", error);
    res.status(500).json({ Message: "Server Error" });
  }
};

// Function to get all police records
const getAllPoliceRecordsController = async (req, res) => {
  try {
    const policeRecords = await Police.find(); // Fetch all police records

    if (!policeRecords || policeRecords.length === 0) {
      return res.status(404).json({ Message: "No police records found" });
    }

    res.status(200).json(policeRecords);
  } catch (error) {
    console.error("Error fetching police records:", error);
    res.status(500).json({ Message: "Server Error" });
  }
};

export { updateStationIdController, getAllPoliceRecordsController };
