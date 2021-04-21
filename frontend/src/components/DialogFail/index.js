import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import fail from 'images/fail.png';

const styles = (theme) => ({
  root: {
    margin: 3,
    padding: theme.spacing(4),
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
    right : -53
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
    width: "40%",
    position: "relative",
    top: -5,
    right: -50,
  }
});

const DialogContent = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogContent className={classes.root} {...other}>
        <img src={fail} alt="Gagal" className={classes.foto}/>
        <Typography variant="h6" className={classes.typography}>{children}</Typography>
        {onClose ? (
        <Button className={classes.button} onClick={onClose}>Tutup</Button>
      ) : null}
      </MuiDialogContent>
    );
});

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers style={{alignItems: "center"}} onClose={handleClose}>
            <Typography style={{fontFamily: "IBM Plex Sans"}}>
              <Typography style={{fontWeight:"bold", fontSize:"24px",fontFamily: "IBM Plex Sans"}}>
                Gagal
              </Typography>
                Data tidak dapat disimpan
            </Typography>
            <br></br>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}
