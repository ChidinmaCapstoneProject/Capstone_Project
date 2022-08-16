import axios from "../../../api/axios";
const POST_URL = "/training";
export const handleTrainingSubmit = async (trainingInfo, timeRange, userName, userId, setErrMsg) => {
    try {
      const startTime = timeRange[0];
      const endTime = timeRange[1];
      const trainingType= trainingInfo.trainingType;
      const email= trainingInfo.email;
      const price= trainingInfo.price;
      const day= trainingInfo.day;
      const description= trainingInfo.description;
      const Id=userId
      if(trainingInfo.slots === null){
        trainingInfo.slots = 999999;
      }
      const slots= trainingInfo.slots;

      const response = await axios.post(
        POST_URL,
        JSON.stringify({
          userName,
          email,
          Id,
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
      );
      setErrMsg('')
      alert("submited");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Failed To Post Training");
      }
    }
  };
