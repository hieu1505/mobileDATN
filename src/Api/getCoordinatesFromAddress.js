import axios from 'axios';

const getCoordinatesFromAddress = async (address, apiKey) => {
  try {
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=${apiKey}`;
    const response = await axios.get(url);
    const result = response.data;
    const { features } = result;

    if (features.length > 0) {
      const firstResult = features[0];
      const { geometry } = firstResult;
      const { coordinates } = geometry;

      const longitude = coordinates[0];
      const latitude = coordinates[1];

      return { latitude, longitude };
    } else {
      throw new Error('No results found.');
    }
  } catch (error) {
    throw new Error('Error geocoding address: ' + error.message);
  }
};

export default getCoordinatesFromAddress;