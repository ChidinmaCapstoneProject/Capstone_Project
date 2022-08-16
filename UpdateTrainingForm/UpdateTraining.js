import axios from "../../../../api/axios";
import { TRAININGS_URL } from "../../../../Utils/URLConstants";
export async function UpdateTraining (trainingInfo, timeRange, training){
        try{
            const startTime = timeRange[0];
            const endTime = timeRange[1];
            const trainingType= trainingInfo.trainingType;
            const email= trainingInfo.email;
            const price= trainingInfo.price;
            const day= trainingInfo.day;
            const description= trainingInfo.description;
            const slots= trainingInfo.slots;
            const trainingId= training._id;
            const response = await axios.put(TRAININGS_URL+'/'+training._id,
            JSON.stringify({
                email,
                trainingType,
                description,
                price,
                slots,
                day,
                startTime,
                endTime,
              }),
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            )
            alert('Success')

        }catch(err){
            alert('error')
        }

}
