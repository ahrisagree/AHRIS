import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import warning from 'images/warning.png';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: "center",
    borderRadius: 12,
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
    backgroundColor: '#CF0909',
    color: '#FFFFFF',
    fontWeight: 'bold',
    borderColor: '#FFFFFF',
    position: "relative",
    top: 10,
    right : -50
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
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    width: "30%",
    position: "relative",
    top: -5,
    right: -82,
  },
  buttonSecondary: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    color: '#CF0909',
    fontWeight: 'bold',
    border: "solid 1px",
    borderColor: '#CF0909',
    position: "relative",
    top: 10,
    right : -65
  },
});

const DialogContent = withStyles(styles)((props) => {
    const { children, classes, onCancel, onConfirm, ...other } = props;
    return (
      <MuiDialogContent className={classes.root} {...other}>
        <img src={warning} alt="Warning" className={classes.foto}/>
        <Typography variant="h6" className={classes.typography}>{children}</Typography>
        {onConfirm ? (
        <Button className={classes.button} onClick={onConfirm}>Hapus</Button>
      ) : null}
        {onCancel ? (
        <Button className={classes.buttonSecondary} onClick={onCancel}>Batal</Button>
      ) : null}
      </MuiDialogContent>
    );
});

export default function CustomizedDialogs({open, handleCancel, handleConfirm}) {

  return (
      <Dialog aria-labelledby="customized-dialog-title" open={open} onClose={handleCancel}>
        <DialogContent dividers style={{alignItems: "center"}} onCancel={handleCancel} onConfirm={handleConfirm}>
            <Typography style={{fontFamily: "IBM Plex Sans"}}>
              <Typography style={{fontWeight:"bold", fontSize:"24px",fontFamily: "IBM Plex Sans"}}>
                Hapus Data
              </Typography>
                Apa Anda yakin menghapus
                data ini?
            </Typography>
            <br></br>
        </DialogContent>        
      </Dialog>
  );
}
