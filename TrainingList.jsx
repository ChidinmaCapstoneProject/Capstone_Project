import React, { useEffect } from "react";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import { parseISO, format } from "date-fns";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ViewDetails from "../../ViewDetails/ViewDetails";
import "./TrainingList.css";
import { SOCKET_URL } from "../../../../Utils/URLConstants";
import { io } from "socket.io-client";
const socket = io(SOCKET_URL);

export default function TrainingList({ trainings }) {
  const [matchedTrainings, setMatchedTrainings] = useLocalStorage(
    "matchedTrainings",
    []
  );
  const location = useLocation();

  useEffect(() => {
    function getMatchedTraining() {
      const trainerName = location?.state?.trainerName;
      setMatchedTrainings(
        trainings.filter((each) => {
          return each.fullname === trainerName;
        })
      );
    }
    getMatchedTraining();
    socket.on("updateTraining", (update) => {
      trainings.map((each) => {
        if (each._id === update.ID) {
          for (var key in each) {
            if (Object.keys(update).includes(key)) {
              each[key] = update[key];
            }
          }
        }
      });
      getMatchedTraining();
    });
  }, [trainings]);
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "blue" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "blue" }}
        onClick={onClick}
      />
    );
  }
  return (
    <div>
      {matchedTrainings?.map((training, index) => {
        return (
          <>
            <Slider
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              infinite={true}
              dots={true}
              nextArrow={<SampleNextArrow />}
              prevArrow={<SamplePrevArrow />}
            >
              <div className="training-content">
                <h1>{training?.trainingType}</h1> by {training?.fullname}
                <p className="mt-0.5">
                  {format(parseISO(training.startTime), "h:mm a")} -{" "}
                  {format(parseISO(training.endTime), "h:mm a")}
                </p>
              </div>
              <div>
                <ViewDetails training={training} />
              </div>
            </Slider>
          </>
        );
      })}
    </div>
  );
}
