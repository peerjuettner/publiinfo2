import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2)
  }
}));

export default function InfoPage() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          PubliInfo
        </Typography>
        <Typography component="p">
          An Application to visualize the usage of the publicly accessible bicycles from{" "}
          <a href="https://www.publibike.ch">publibike</a>.
          <br />
          Uses <a href="https://material-ui.com">material-ui</a>,
          <a href="https://react-leaflet.js.org/docs/en/intro.html">react-leaflet</a>.
          <br />
          Created by <a href="https://github.com/peerjuettner/"> Peer Jüttner.</a>
        </Typography>
      </Paper>
    </div>
  );
}
