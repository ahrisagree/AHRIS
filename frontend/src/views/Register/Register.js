import React from 'react';
import {
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Container,
  Button,
  TextField,
  Grid
} from '@material-ui/core';
import title from 'images/Group 124.png';
import Dialog2 from 'components/Dialog2';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E5E5E5",
    flexGrow: 1,
  },
  paper: {
    position: "absolute",
    paddingTop: 50,
    fontWeight: "bold",
    color: "#FFFF",
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    width: 1000,
    height : 500,
    left: 200,
    top: 150
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily:"IBM Plex Sans"
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#0A3142",
    color: '#FFFFFF',
    fontWeight: 600,
    fontFamily: "IBM Plex Sans",
    borderRadius: 25.86,
    width: 286,
    height: 50,
    top: 30,
    left: 300
  },
  foto: {
    marginLeft: 160
  },
  title: {
    position: "relative",
    top: 40,
    right : -160
  }
}));

const Register = props => {
  const classes = useStyles();

  const [showModal, updateShowModal] = React.useState(false);

  const toggleModal = () => updateShowModal(state => !state);

  return (
    <div className="m-10">
      <div className={classes.title}>
        <h4 style={{fontFamily: "IBM Plex Sans", fontSize: "24px", fontWeight:600}}>Buat Akun</h4>
        <div style={{width:414, height: 12, backgroundColor:"#FFB800", borderRadius: 4}}></div>
      </div>
      
      <Container component={Paper} className={classes.paper}>
        <Grid item xs={12}>
          <TextField id="outlined-full-width"
          required="true"
          label="Nama"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="outlined"></TextField>
        </Grid>

        <div>
        <TextField
          id="outlined-margin-normal"
          required="true"
          label="Email"
          style={{ margin: 8 , width: '75ch'}}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-medium"
          required="true"
          label="Role"
          select
          style={{ margin: 8 , width: '21ch'}}
          margin="normal"
          variant="outlined"
          className={classes.textField}
        />
      </div>  

        <Grid item xs={12}>
          <TextField id="outlined-full-width"
          required="true"
          label="Divisi"
          style={{ margin: 8 }}
          fullWidth
          select
          margin="normal"
          variant="outlined"></TextField>
        </Grid>
        
        <Grid item xs={12}>
          <TextField id="outlined-full-width"
          required="true"
          label="Gaji Pokok"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="outlined"></TextField>
        </Grid>
        <Dialog2></Dialog2>
        <Button className={classes.button} onClick={toggleModal}>Simpan</Button>
        <Dialog2 canShow={showModal} updateModalState={toggleModal}></Dialog2>
        
        
      </Container>

    </div>
  )
};

export default Register;                                                                                                                                                                                
