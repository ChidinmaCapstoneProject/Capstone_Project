import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import { getPlaceDetails } from "../PlaceDetailsCall";

export default function PlaceDetails({ place }) {
  const classes = useStyles();
  const [placeId, setPlaceId] = useState("");

  useEffect(() => {
    getPlaceDetails(place.place_id).then((results) => {
      setPlaceId(results);
    });
  }, [place]);
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place?.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${place?.photos[0]?.photo_reference}&sensor=false&maxheight=350&maxwidth=300&key=AIzaSyDMg-YZvJG0m-lvHqzJCpnxwrPA-4vIxEE`
            : null
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1"></Typography>
        </Box>
        {place?.vicinity && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon style={{ color: "red" }} /> {place.vicinity}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Status</Typography>
          <Typography>{place?.business_status}</Typography>
        </Box>

        {place.rating > 1 ? (
          <Box display="flex" justifyContent="space-between">
            <Rating size="small" value={Number(place?.rating)} readOnly />
            <Typography variant="subtitle1">
              out of {place?.user_ratings_total} reviews
            </Typography>
          </Box>
        ) : null}
        {placeId.international_phone_number ? (
          <Box display="flex" justifyContent="space-between">
            <PhoneIcon style={{ color: "red" }} />

            <Typography variant="subtitle1">
              {placeId.international_phone_number}
            </Typography>
          </Box>
        ) : null}
        <CardActions>
          {placeId.url ? (
            <Button
              size="small"
              color="primaty"
              onClick={() => window.open(placeId.url, "_blank")}
            >
              Google Page
            </Button>
          ) : null}
          {placeId.website ? (
            <Button
              size="small"
              color="primaty"
              onClick={() => window.open(placeId.website, "_blank")}
            >
              Website
            </Button>
          ) : null}
        </CardActions>
      </CardContent>
    </Card>
  );
}
