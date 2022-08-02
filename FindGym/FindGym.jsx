import React, { useState, useEffect } from "react";
import Map from "./Map/Map";
import List from "./List/List";
import { getPlacesData, getZipcode } from "../../../api/calls";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Grid } from "@material-ui/core";
import NavBar from "../../NavBar/NavBar";
import useStyles from "./styles";

export default function FindGym() {
  const classes = useStyles();
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState(2500);
  const [rating, setRating] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  useEffect(() => {
    const filterPlaces = places?.filter((place) => place?.rating > rating);
    setFilteredPlaces(filterPlaces);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(coords.lat, coords.lng, distance).then((results) => {
      setPlaces(results);
      setFilteredPlaces([]);
      setIsLoading(false);
    });
  }, [coords, distance]);

  const handleZipcode = (value) => {
    setErrMsg("");
    if (String(value).length > 0) {
      getZipcode(value, setErrMsg, setCoords);
    }
  };
  return (
    <>
      <div className="gym-nav-bar" style={{ marginBottom: "50px" }}>
        <NavBar />{" "}
      </div>
      <div className={classes.search}>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>

        <InputBase
          type="Number"
          placeholder="Enter Zipcode"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={(e) => {
            handleZipcode(e.target.value);
          }}
        />
      </div>
      <Grid
        container
        spacing={3}
        style={{
          width: "100%",
          display: "flex",
          marginTop: "50px",
          padding: "20px",
        }}
      >
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces?.length ? filteredPlaces : places}
            isLoading={isLoading}
            setDistance={setDistance}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoords}
            coordinates={coords}
            places={filteredPlaces?.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}
