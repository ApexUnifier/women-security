import Zone from "../models/zone.js";

const getZone = async (latitude, longitude) => {
  try {
    if (!latitude || !longitude) {
      throw new Error("Latitude and Longitude are required");
    }
    const zone = await Zone.findOne({ latitude, longitude });

    return zone;
  } catch (err) {
    throw new Error(`Zone found failed: ${err.message}`);
  }
};

const createZone = async (zoneData) => {
  try {
    if (!zoneData.latitude || !zoneData.longitude) {
      throw new Error("Latitude and Longitude are required");
    }

    const data = new Zone(zoneData);

    const zone = await data.save();

    return zone;
  } catch (err) {
    throw new Error(`Zone found failed: ${err.message}`);
  }
};

export default { getZone, createZone };
