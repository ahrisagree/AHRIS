

import React from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  ButtonBase,
  TextField,
} from '@material-ui/core';
import ReactDOM from "react-dom";

// import "./styles.css";
import Button  from "components/Button";
import CustomTextField from 'components/CustomTextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    marginTop: "5%",
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    margin: 'auto',
    maxWidth: 1000,
    width : 'stretch',
    height:  "100%",
    minHeight: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

// function App() {
const Profil = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
            <Button
                alignItems="flex-end"
                onClick={() => {
                  console.log("You Clicked on Me!");
                }}
                type="button"
                buttonStyle="btnBlue"
                buttonSize="btnLong"
              >
                Logout
          </Button>
          </Grid>

          <Grid item xs sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Nama
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Set nama
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Role
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Set role
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Divisi
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Set divisi
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Gaji
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Set gaji
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid> */}
            </Grid>
            
        <Grid item xs={6}>
            < Grid item xs container direction="column">
              <Typography variant="subtitle1">Change Password</Typography>
              <TextField 
            variant="outlined"
            style={{}}
            size="small"
            label="Old Password"
            margin = "normal"
          />
          <TextField 
            variant="outlined"
            style={{}}
            size="small"
            label="New Password "
            margin = "normal"
          />
           <TextField 
            variant="outlined"
            style={{}}
            size="small"
            label="New Password Confirmation"
            margin = "normal"
          />
          <Button
                onClick={() => {
                  console.log("You Clicked on Me!");
                }}
                type="button"
                buttonStyle="btnBlue"
                buttonSize="btnSmall"
              >
                Ubah Password
          </Button>
            </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
      
    
 
  
  );
}

// const Home = document.getElementById("root");
// ReactDOM.render(<App />, Home);

export default Profil;