import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import mapStyles from "./mapStyles";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
const MAP_URL =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDMg-YZvJG0m-lvHqzJCpnxwrPA-4vIxEE";
export default function Map({ coordinates, places }) {
  const classes = useStyles();
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  function markerHover(place) {
    setSelectedPlace(place);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  }

  const CustomSkinMap = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
        defaultOptions={{
          scrollwheel: false,
          zoomControl: true,
          styles: mapStyles,
        }}
      >
        <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
        {places?.map((place, i) => {
          return (
            <div className={classes.markerContainer} key={i}>
              <Marker
                icon={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
                position={{
                  lat: Number(place.geometry.location.lat),
                  lng: Number(place.geometry.location.lng),
                }}
                onClick={(e) => markerHover(place, e)}
              />
            </div>
          );
        })}
        {infoOpen && selectedPlace && (
          <InfoWindow
            position={{
              lat: Number(selectedPlace.geometry.location.lat),
              lng: Number(selectedPlace.geometry.location.lng),
            }}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div>
              <Typography className={classes.typography}>
                {selectedPlace.name}
              </Typography>
              <Typography>
                <LocationOn /> {selectedPlace.vicinity}
              </Typography>
              {selectedPlace?.rating > 1 ? (
                <Rating
                  size="small"
                  value={Number(selectedPlace?.rating)}
                  readOnly
                />
              ) : null}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    ))
  );
  return (
    <div className={classes.mapContainer}>
      <CustomSkinMap
        googleMapURL={MAP_URL}
        defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
