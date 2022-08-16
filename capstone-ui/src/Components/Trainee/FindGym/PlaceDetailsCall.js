import axios from "../../../api/axios";
import { PLACEDETAILS_URL } from "../../../Utils/URLConstants";
 export const getPlaceDetails = async (place_id) => {
    try {
      const result = await axios.get( PLACEDETAILS_URL+ place_id);
      return result.data.result;

    } catch (error) {

    }
  };
  getPlaceDetails();
