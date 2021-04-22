import React, { useEffect } from 'react';
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import MainTitle from 'components/MainTitle';
import TemplateButton from 'components/TemplateButton';


const daftar_tipe = [
  {
    value: 'reguler',
  },
  {
    value: 'lembur',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E5E5E5",
    flexGrow: 1,
  },
  paper: {
    paddingTop: 50,
    fontWeight: "bold",
    color: "0A3142",
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
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
  title: {
    position: "relative",
    top: 40,
    right : -160
  }
}));

const DetailLogAktivitas = props => {
  const classes = useStyles();
  const [tipe, setTipe] = React.useState('reguler');

  const [selectedDate, setSelectedDate] = React.useState(new Date(''));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setTipe(event.target.value);
  };
  
    return (
      <div className="m-10">
        <MainTitle title="Detail Log Aktivitas" className="mb-8" />
        <Container component={Paper} className={classes.paper}>

          <Grid item xs={12}>
            <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontWeight: 600, fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Log Aktivitas
            </Typography>
          </Grid>
          
          
            <Grid item xs={12}>

            <TextField
              id="standard-read-only-input"
              label="Tanggal"
              defaultValue="21/01/2021"
              style= {{margin: 8, width: "30%"}}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              id="standard-read-only-input"
              label="Jam masuk"
              defaultValue="11.11"
              style= {{margin: 8, width: "34%"}}
              InputProps={{
                readOnly: true,
              }}
            /> 

            <TextField
              id="standard-read-only-input"
              label="Jam keluar"
              defaultValue="16.11"
              style= {{margin: 8, width: "30%"}}
              InputProps={{
                readOnly: true,
              }}
            />  
            
            </Grid>


          <Grid item xs={12}>
            <TextField
              id="standard-read-only-input"
              label="Tipe log"
              defaultValue="Reguler"
              style= {{margin: 8, width: "30%"}}
              InputProps={{
                readOnly: true,
              }}
            /> 

            <TextField
              id="standard-read-only-input"
              label="Keterangan"
              defaultValue="Selesai dikerjakan"
              style= {{margin: 8, width: "34%"}}
              InputProps={{
                readOnly: true,
              }}
            /> 
        
            <TextField
              id="standard-read-only-input"
              label="Aktivitas"
              defaultValue="Rapat, belajar, rapat, belajar, rapat, belajar, sampe gumoh"
              style= {{margin: 8, width: "30%"}}
              InputProps={{
                readOnly: true,
              }}
            /> 
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="standard-read-only-input"
              label="Link Deliverables"
              defaultValue="www.google.com"
              style= {{margin: 8, width: "30%"}}
              InputProps={{
                readOnly: true,
              }}
            /> 

            <TextField
              id="standard-read-only-input"
              label="Status Deliverables"
              defaultValue="Berhasil dikerjakan"
              style= {{margin: 8, width: "34%"}}
              InputProps={{
                readOnly: true,
              }}
            /> 

            <TextField
              id="standard-read-only-input"
              label="Notes"
              defaultValue="Butuh review"
              style= {{margin: 8, width: "30%"}}
              InputProps={{
                readOnly: true,
              }}
            /> 
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Komentar"
              style={{ margin: 10, width: "98%" }}
              margin="normal"
              variant="outlined"
              className={classes.textField}
              multiline
              rows={2}
              />
          </Grid>

          <div className="flex justify-end py-6">
              <TemplateButton
                type="button"
                buttonStyle="btnGreen"
                buttonSize="btnMedium"
              >
                Setujui
              </TemplateButton>

              <TemplateButton
                type="button"
                buttonStyle="btnDanger"
                buttonSize="btnMedium"
                
              >
                Tolak
              </TemplateButton>
            </div>
        

        </Container>
      </div>
    )
};
export default DetailLogAktivitas; 