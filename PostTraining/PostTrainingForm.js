import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimeRangeInput } from "@mantine/dates";

export default function PostTrainingForm({trainingInfo, setTrainingInfo, timeRange, setTimeRange}){
   return(
   <>
    <label htmlFor="Email">Email: *</label>
    <input
      type="text"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={trainingInfo.email}
      onChange={(e) =>
        setTrainingInfo((previousValue) => ({
          ...previousValue,
          email: e.target.value,
        }))
      }
      required
    />

    <label htmlFor="trainingtype">Training Type: *</label>
    <input
      type="text"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={trainingInfo.trainingType}
      required
      onChange={(e) =>
        setTrainingInfo((previousValue) => ({
          ...previousValue,
          trainingType: e.target.value,
        }))
      }
    />

    <label htmlFor="Description ">Description: *</label>
    <textarea
      className="shadow description appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={trainingInfo.description}
      type="text"
      required
      onChange={(e) =>
        setTrainingInfo((previousValue) => ({
          ...previousValue,
          description: e.target.value,
        }))
      }
    />

    <label
      htmlFor="price"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      Price:* $
      <input
        value={trainingInfo.price}
        type="Number"
        required
        onChange={(e) =>
          setTrainingInfo((previousValue) => ({
            ...previousValue,
            price: e.target.value,
          }))
        }
      />
    </label>

    <label
      htmlFor="slots"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
     Number of Slots:
      <input
        value={trainingInfo.slots}
        type="Number"
        onChange={(e) =>
          setTrainingInfo((previousValue) => ({
            ...previousValue,
            slots: e.target.value,

          }))
        }
      />
    </label>

    <label className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <FontAwesomeIcon icon={faCalendarDays} /> Select Day*{" "}
      <DatePicker
        selected={trainingInfo.day}
        onChange={(date) =>
          setTrainingInfo((previousValue) => ({
            ...previousValue,
            day: date,
          }))
        }
        dateFormat="dd MMM yyyy"
      />
    </label>
    <TimeRangeInput
      style={{ boxSizing: "content-box" }}
      format="12"
      value={timeRange}
      onChange={setTimeRange}
      className="setTime"
      label="Set Time Range"
    />
    </>
   )
}
