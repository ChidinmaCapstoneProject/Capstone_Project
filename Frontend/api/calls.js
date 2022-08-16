import axios from "axios";
const URL= 'https://google-maps28.p.rapidapi.com/maps/api/place/nearbysearch/json';
const RAPIDAPI_KEY='f9f4b3b7c5msh9ca4047c197d84ep198076jsn525c5abc3f98';
const RAPIDAPI_HOST='google-maps28.p.rapidapi.com';
export const getPlacesData = async (lat, lng, distance) =>{

    try{
        if(lat &&lng){
            const results = await axios.get(URL, {
                params: {location: `${lat},${lng}`, radius: `${distance}`, language: 'en', types: 'gym'},
                headers: {
                    'X-RapidAPI-Key': RAPIDAPI_KEY,
                    'X-RapidAPI-Host': RAPIDAPI_HOST
                  },
            })
            return results.data.results;
        }
    }catch(error){
        console.log('error: ', error);
    }
}

 export const getZipcode = async(zipcode, setErrMsg, setCoords) =>{
    try{
        const result= await axios.get( `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDMg-YZvJG0m-lvHqzJCpnxwrPA-4vIxEE&components=postal_code:${zipcode}`)
        setCoords(result.data.results[0].geometry.location)


    }catch(error){
        if(error?.response){
            console.log('error: ', error.response);
        }
        else{
            setErrMsg('Invalid Zipcode !')

        }

    }
}
getZipcode();
