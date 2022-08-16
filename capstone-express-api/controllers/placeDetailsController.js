const axios = require('axios');
const getPlaceDetails = async (req, res) =>{
        try{
            const PLACEDETAILS_CALL=`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&fields=website,international_phone_number,url,opening_hours&key=AIzaSyDMg-YZvJG0m-lvHqzJCpnxwrPA-4vIxEE`;
            const result= await axios.get(PLACEDETAILS_CALL)
            return result.data;
        }catch(error){
            res.status(500).json({'message': error.message})
        }
}
module.exports={getPlaceDetails}
