import React from "react";
import {
  makeStyles,
  IconButton,
} from '@material-ui/core';
import ReactDOM from "react-dom";

// Jangan lupa import ini kalo mau pake button yg dibikin
import Button  from "components/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Coba = props => {
  const classes = useStyles();
  return (
    <div className="App">
      <h1>Button-button</h1>
      <br></br>
      <Button
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnGreen"
        buttonSize="btnMedium"
      >
        View
      </Button>
      {" "}
      
      <Button
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnYellow"
        buttonSize="btnMedium"
      >
        Edit
      </Button>
      {" "}
      <Button
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnDanger"
        buttonSize="btnMedium"
      >
        Delete
      </Button>
      {" "}
      <Button
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnBlue"
        buttonSize="btnLong"
      >
        Simpan
      </Button>
      {" "}
      <Button
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnGreen"
        buttonSize="btnMedium"
      >
        Isi Penilaian
      </Button>
      {" "}
      <Button size="small"
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnGreenOutline"
        buttonSize="btnLarge"
      >
        Batal
      </Button>
      {" "}
      <Button
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnGreen"
        buttonSize="btnMedium"
      >
       + Tambah Akun
      </Button>
      {" "}
      <Button
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnDanger"
        buttonSize="btnLarge"
      >
        Tutup
      </Button>
      {" "}
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

    

    </div>
    
    
 
  
  );
}

// const Home = document.getElementById("root");
// ReactDOM.render(<App />, Home);

export default Coba;