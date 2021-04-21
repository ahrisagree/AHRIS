import React from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  TextField,
  Divider,
} from '@material-ui/core';
import TemplateButton  from "components/TemplateButton";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width : 'stretch',
    padding: theme.spacing(2),
    maxWidth: 1000,
    margin: 'auto',
    paddingTop: 50,
    marginTop: 20,
  },
  paper1: {
    padding: theme.spacing(5),
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    maxWidth: 1000,
    height:  '100%',
    minHeight: 500,
    backgroundColor: '#0A3142',

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
  title: {
    position: "relative",
    top: 40,
    right : -160,
  },
}));

const Profil = props => {
  const classes = useStyles();
  return (
    <div className="m-10">
      <div className={classes.title}>
        <h4 style={{fontFamily: "IBM Plex Sans", fontSize: "24px", fontWeight:600}}>Profil Pengguna</h4>
        <div style={{width:414, height: 12, backgroundColor:"#FFB800", borderRadius: 4}}></div>
      </div>

    <div className={classes.root}>
    <Grid container direction='row'>
      <Grid item xs={12} container>
        {/* yg warna biru */}
        <Grid item xs={3}>
          <Paper className={classes.paper1}>
          <Grid container spacing={2} margin='auto' display='flex' justify="space-between" direction='row' style={{height: '100%'}}>
            <Grid item xs={12}>
            <Typography style={{ color:"#fdfdfd", textAlign:'center', fontFamily: 'IBM Plex Sans', fontWeight:600, variant:'body1'}} >
                      Email
            </Typography>
            <Typography style={{ color:"#fdfdfd", textAlign:'center', fontFamily: 'IBM Plex Sans', fontWeight:300, variant:'body2'}} >
                      a05@propensi.com
            </Typography>
            </Grid>
               <Grid item container xs={12} alignItems="flex-end">
               <TemplateButton 
                    onClick={() => {
                      console.log("You Clicked on Me!");
                    }}
                    type="button"
                    buttonStyle="btnBlueOutline"
                    buttonSize="btnLong"
                  >
                    Logout
                  </TemplateButton>                 </Grid>
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
                      {/* <Grid item xs={12} container> */}
                        <Typography style={{ fontWeight: 600 }} variant="subtitle1">Change Password</Typography>
                          <TextField 
                            required="true"
                            variant="outlined"
                            style={{}}
                            size="small"
                            fullWidth
                            label="Old Password"
                            margin = "normal"
                          />
                          <TextField 
                            required="true"
                            variant="outlined"
                            style={{}}
                            size="small"
                            fullWidth
                            label="New Password "
                            margin = "normal"
                          />
                          <TextField 
                            required="true"
                            variant="outlined"
                            style={{}}
                            size="small"
                            fullWidth
                            label="New Password Confirmation"
                            margin = "normal"
                          />
                          <br></br>
                          <TemplateButton 
                                onClick={() => {
                                  console.log("You Clicked on Me!");
                                }}
                                type="button"
                                buttonStyle="btnBlue"
                                buttonSize="btnSmall"
                              >
                                Ubah Password
                          </TemplateButton>
                </Grid>
               </Grid>
            </Grid>
          </Grid>
          </Paper>
        </Grid>

  
      </Grid>
    </Grid>
    </div>
    </div>

    
 
  
  );
}



export default Profil;