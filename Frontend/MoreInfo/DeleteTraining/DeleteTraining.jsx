import axios from "../../../../api/axios";
import "./DeleteTraining.css";
import { useNavigate } from "react-router-dom";
import { TRAININGS_URL, BOOKINGS_URL } from "../../../../Utils/URLConstants";
export default function DeleteTraining({
  training,
  whoBooked,
  setIsDeleteActive,
}) {
  const navigate = useNavigate();
  async function handleDelete() {
    try {
      const response = await axios.delete("/training/" + training._id, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const res = await axios.delete(BOOKINGS_URL + "/" + training._id, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      navigate("/ViewTrainerBookings");
    } catch (err) {
      console.log("err", err);
    }
  }
  return (
    <div className="deleteBackground">
      <div className="deleteContainer">
        <div className="title">
          {" "}
          Are you sure you want to delete this training ?
        </div>

        <div className="footer">
          <button
            onClick={() => {
              setIsDeleteActive(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>

          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
