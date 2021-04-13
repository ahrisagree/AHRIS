

import React from "react";
import {
  withStyles,
  makeStyles,
  Paper,
  Grid,
  Typography,
  ButtonBase,
  TextField,
  Divider,
} from '@material-ui/core';
import Button  from "components/Button";
import CustomTextField from 'components/CustomTextField';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width : 'stretch',
    // marginTop: "5%",
    padding: theme.spacing(2),
    maxWidth: 1000,
    margin: 'auto',


  },
  paper1: {
    padding: theme.spacing(5),
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    maxWidth: 1000,
    height:  '100%',
    minHeight: 500,
    backgroundColor: '#0A3142',
    // diplay: 'flex',
    // justify: 'space-between',
    
  },
  paper2: {
    padding: theme.spacing(5),
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    maxWidth: 1000, 
    height:  '100%',
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
    <Grid container direction='row'>
      <Grid item xs={12} container>
        {/* yg warna biru */}
        <Grid item xs={3}>
          <Paper className={classes.paper1}>
          <Grid container spacing={2} margin='auto' display='flex' justifyContent="space-between" direction='column'>
            <Grid item xs={12}>
            <Typography style={{ color:"#fdfdfd", textAlign:'center', fontFamily: 'IBM Plex Sans', fontWeight:600, variant:'body1'}} >
                      Email
            </Typography>
            <Typography style={{ color:"#fdfdfd", textAlign:'center', fontFamily: 'IBM Plex Sans', fontWeight:300, variant:'body2'}} >
                      a05@propensi.com
            </Typography>
            </Grid>
               <Grid item xs={12} alignItems="flex-end">
                  <Button 
                    onClick={() => {
                      console.log("You Clicked on Me!");
                    }}
                    type="button"
                    buttonStyle="btnBlueOutline"
                    buttonSize="btnLong"
                  >
                    Logout
                  </Button>               
                </Grid>
          </Grid>
          </Paper>
        </Grid>

        {/* yg putih */}
        <Grid item xs={9}>
          <Paper className={classes.paper2}>
          <Grid container spacing={1} direction='row'>
            <Grid item xs={12} container>
               <Grid item xs={5}>
                  <Typography style={{ fontWeight: 600 }} gutterBottom variant="subtitle1">
                      Nama
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Set nama
                    </Typography>
                    <br></br>
                    <Typography style={{ fontWeight: 600 }} gutterBottom variant="subtitle1">
                      Role
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Set role
                    </Typography>
                    <br></br>
                    <Typography style={{ fontWeight: 600 }} gutterBottom variant="subtitle1">
                      Divisi
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Set divisi
                    </Typography>
                    <br></br>
                    <Typography style={{ fontWeight: 600 }} gutterBottom variant="subtitle1">
                      Gaji
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Set gaji
                    </Typography>
               </Grid>
               <Divider orientation="vertical" flexItem />
               < Grid item xs={1}>
               </Grid>
               < Grid item xs={5}>
                    <Grid container spacing={2} direction='row'>
                      <Grid item xs={12} container>
                        <Grid item xs={12}>
                        <Typography style={{ fontWeight: 600 }} variant="subtitle1">Change Password</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField 
                            variant="outlined"
                            style={{}}
                            size="small"
                            label="Old Password"
                            margin = "normal"
                          />
                        </Grid> 
                        <Grid item xs={12}>
                          <TextField 
                            variant="outlined"
                            style={{}}
                            size="small"
                            label="New Password "
                            margin = "normal"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField 
                            variant="outlined"
                            style={{}}
                            size="small"
                            label="New Password Confirmation"
                            margin = "normal"
                          />
                        </Grid>
                        <Grid item xs={12}>
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
            </Grid>
          </Grid>
          </Paper>
        </Grid>

  
      </Grid>
    </Grid>
    </div>

    
 
  
  );
}



export default Profil;