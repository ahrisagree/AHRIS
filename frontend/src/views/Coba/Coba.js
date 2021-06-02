import React from "react";

// Jangan lupa import ini kalo mau pake button yg dibikin
import TemplateButton  from "components/TemplateButton";

const Coba = props => {
  return (
    <div className="App">
      <h1>Button-button</h1>
      <br></br>
      <TemplateButton
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnGreen"
        buttonSize="btnMedium"
      >
        View
      </TemplateButton>
      {" "}
      
      <TemplateButton
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnYellow"
        buttonSize="btnMedium"
      >
        Edit
      </TemplateButton>
      {" "}
      <TemplateButton
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnDanger"
        buttonSize="btnMedium"
      >
        Delete
      </TemplateButton>
      {" "}
      <TemplateButton
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnBlue"
        buttonSize="btnLong"
      >
        Simpan
      </TemplateButton>
      {" "}
      <TemplateButton
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnGreen"
        buttonSize="btnMedium"
      >
        Isi Penilaian
      </TemplateButton>
      {" "}
      <TemplateButton size="small"
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnGreenOutline"
        buttonSize="btnLarge"
      >
        Batal
      </TemplateButton>
      {" "}
      <TemplateButton
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnGreen"
        buttonSize="btnMedium"
      >
       + Tambah Akun
      </TemplateButton>
      {" "}
      <TemplateButton
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnDanger"
        buttonSize="btnLarge"
      >
        Tutup
      </TemplateButton>
      {" "}
      <TemplateButton
        onClick={() => {
          console.log("You Clicked on Me!");
        }}
        type="button"
        buttonStyle="btnBlueOutline"
        buttonSize="btnLong"
      >
        Logout
      </TemplateButton>

    

    </div>
    
    
 
  
  );
}

// const Home = document.getElementById("root");
// ReactDOM.render(<App />, Home);

export default Coba;