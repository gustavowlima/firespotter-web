import axios from "axios";

export const getLocation = async (local: string) => {
  try {
    const response = await axios.get(`https://geocode.maps.co/search?q=${local}`);
    return response.data;
  } catch (error) {
    return error
  }
};
