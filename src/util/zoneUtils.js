import axios from "axios";

// Bounds for Delhi (latitude and longitude)
const latMin = 28.4;
const latMax = 28.88;
const lonMin = 76.84;
const lonMax = 77.34;

// Step size for latitude and longitude (e.g., 0.001 for 100m intervals)
const stepSize = 0.001;

// Categories and crime count range
const categories = ["RED", "GREEN", "YELLOW"];
const crimeCountMin = 1;
const crimeCountMax = 100;

/**
 * Function to generate random number between two bounds
 */
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Function to generate all latitude, longitude, random category, and crime count
 */
const generateZones = () => {
  const zones = [];

  // Loop through latitude and longitude with step size
  for (let lat = latMin; lat <= latMax; lat += stepSize) {
    for (let lon = lonMin; lon <= lonMax; lon += stepSize) {
      const category = categories[getRandomInt(0, categories.length - 1)];
      const crimeCount = getRandomInt(crimeCountMin, crimeCountMax);

      // Push generated data to zones array
      zones.push({
        latitude: parseFloat(lat.toFixed(6)).toString(), // Limit to 6 decimal places
        longitude: parseFloat(lon.toFixed(6)).toString(),
        category: category,
        crimeCount: crimeCount,
      });
    }
  }

  return zones;
};

/**
 * Function to send POST request to create zones in the database
 */
const createZoneInDatabase = async (zone) => {
  try {
    const response = await fetch("http://localhost:3002/api/zone/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: zone.latitude.toString(), // Convert to string if needed
        longitude: zone.longitude.toString(),
        category: zone.category,
        crimeCount: zone.crimeCount,
      }),
    });

    if (!response.ok) {
      // Check if the response status indicates an error
      const errorData = await response.json();
      throw new Error(
        `Error: ${response.status} ${errorData.message || "Unknown error"}`
      );
    }

    const responseData = await response.json();
    console.log(
      `Zone created: Latitude: ${zone.latitude}, Longitude: ${zone.longitude}`
    );
  } catch (error) {
    console.error(
      `Failed to create zone: Latitude: ${zone.latitude}, Longitude: ${zone.longitude}, Error: ${error.message}`
    );
  }
};

/**
 * Main function to generate zones and store them in the database
 */
const storeZonesInDatabase = async () => {
  const zones = generateZones();

  for (const zone of zones) {
    await createZoneInDatabase(zone); // Send each zone data to the database
  }
};

// Call the function to generate and store zones
storeZonesInDatabase();
