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
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#0A3142",
    color: '#FFFFFF',
    fontWeight: 'semi-bold',
    borderRadius: 25.86,
    width: 286,
    height: 50,
    top: 30,
    left: 300
  },
  foto: {
    marginLeft: 160
  }
}));

const Register = props => {
  const classes = useStyles();

  return (
    <div className="m-10">
      <img src={title} alt="title" className={classes.foto}/>
      <Container component={Paper} className={classes.paper}>
        <Grid item xs={12}>
          <TextField id="outlined-full-width"
          label="Nama"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="outlined"></TextField>
        </Grid>

        <div>
        <TextField
          id="outlined-margin-normal"
          label="Email"
          style={{ margin: 8 , width: '75ch'}}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-medium"
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
          label="Divisi"
          style={{ margin: 8 }}
          fullWidth
          select
          margin="normal"
          variant="outlined"></TextField>
        </Grid>
        
        <Grid item xs={12}>
          <TextField id="outlined-full-width"
          label="Gaji Pokok"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="outlined"></TextField>
        </Grid>

        <Button className={classes.button}>Simpan</Button>
        
      </Container>

    </div>
  )
};

export default Register;                                                                                                                                                                                
