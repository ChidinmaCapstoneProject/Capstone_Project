import React, { useEffect, useState, createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

import useStyles from "./styles";
export default function List({ places, isLoading, setDistance, setRating }) {
  const classes = useStyles();

  return (
    <div>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <Typography variant="h4">
            Gyms and Fitness Centers Around You
          </Typography>
          <div style={{ display: "flex" }}>
            <div>
              <InputLabel style={{ marginLeft: "15px" }}>Distance</InputLabel>
              <FormControl className={classes.formControl}>
                <Select onChange={(e) => setDistance(e.target.value)}>
                  <MenuItem value={3220}>2miles</MenuItem>
                  <MenuItem value={4830}>5miles</MenuItem>
                  <MenuItem value={16100}>10miles</MenuItem>
                  <MenuItem value={24150}>15miles</MenuItem>
                  <MenuItem value={322200}>20miles</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <InputLabel style={{ marginLeft: "15px" }}>Ratings</InputLabel>
              <FormControl className={classes.formControl}>
                <Select onChange={(e) => setRating(e.target.value)}>
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={3}>Above 3.0 </MenuItem>
                  <MenuItem value={4}>Above 4.0</MenuItem>
                  <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid item key={i} xs={12}>
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
}
