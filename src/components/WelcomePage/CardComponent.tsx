import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Styles from "./CardComponent.module.css";
import { Link } from "react-router-dom";

const CardComponent = () => {
  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.leftCard}>
          <Card className={Styles.card}>
            <Avatar className={Styles.avatar} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="provider/signup">
                <Button variant="contained" size="small">
                  Job Provider
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div className={Styles.rightCard}>
          <Card className={Styles.card}>
            <Avatar className={Styles.avatar} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="seeker/signup">
                <Button variant="contained" size="small">
                  Job Seeker
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
