import zoneService from "../services/zoneService.js";

const getZone = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    let zone = await zoneService.getZone(latitude, longitude);

    res.status(200).json({
      status: true,
      message: "Zone found",
      category: zone.category,
      zone,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const createZone = async (req, res) => {
  try {
    const { latitude, longitude, category, crimeCount } = req.body;

    let returnData = await zoneService.createZone({
      latitude,
      longitude,
      category,
      crimeCount,
    });

    res.status(201).json({
      status: true,
      message: "Zone Created",
      returnData,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export default { getZone, createZone };
