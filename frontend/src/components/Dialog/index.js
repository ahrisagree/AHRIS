import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Placeholder from 'images/Placeholder.png';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: "center",
    borderRadius: 12,
    textAlign: "center"
  },
  typography: {
    fontFamily: "IBM Plex Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "24px",
    color: "#0A3142",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    alignSelf: 'center',
    letterSpacing: "0.0075em",
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#00A96F',
    color: '#FFFFFF',
    fontWeight: 'bold',
    borderColor: '#FFFFFF',
    marginTop: 10,
  },
  judul: {
    fontFamily: "IBM Plex Sans",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "36px",
    color: "#0A3142",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    alignSelf: 'center',
    letterSpacing: "0.0075em",
    position : "relative",
  },
  foto: {
    width: "48%",
    margin: "auto"
  }
});

const DialogContent = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogContent disableTypography className={classes.root} {...other}>
        <img src={Placeholder} alt="Sukses" className={classes.foto}/>
        <Typography variant="h6" className={classes.typography}>{children}</Typography>
        {onClose ? (
        <Button className={classes.button} onClick={onClose}>Tutup</Button>
      ) : null}
      </MuiDialogContent>
    );
});

export default function CustomizedDialogs({open, handleClose}) {

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers style={{alignItems: "center"}} onClose={handleClose}>
        <Typography style={{fontFamily: "IBM Plex Sans", position:"relative", top:-8}}>
            <Typography style={{fontWeight:"bold", fontSize:"24px",fontFamily: "IBM Plex Sans"}}>
                Sukses
              </Typography>
                Data telah berhasil disimpan
            </Typography>
            <br></br>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
