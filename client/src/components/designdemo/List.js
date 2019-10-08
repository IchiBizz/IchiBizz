import React from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import {
  Typography,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  Card,
  withStyles
} from "@material-ui/core";

const list = () => {
  return (
    <div>
      <>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              // alt={title}
              height="140"
              image={``}
              // title={title}
            />
            <CardContent>
              <Link to="#">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                ></Typography>
              </Link>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Add to wishlist
            </Button>
          </CardActions>
        </Card>
      </>
    </div>
  );
};

export default list;
