import axios from "../../../api/axios";

 export const getPlaceDetails = async (place_id) => {
    try {
      const result = await axios.get("/placeDetails?place_id=" + place_id);
      return result.data.result;

    } catch (error) {

    }
  };
  getPlaceDetails();
