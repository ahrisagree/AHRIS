import React, { useEffect } from 'react';
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Typography,
  MenuItem,
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

const EditLogAktivitas = props => {
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
        <MainTitle title="Buat Log Aktivitas" className="mb-8" />
        <Container component={Paper} className={classes.paper}>

          <Grid item xs={12}>
            <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontWeight: 600, fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Log Aktivitas
            </Typography>
          </Grid>
          
          
            <Grid item xs={12}>
              {/* <TextField id="outlined-full-width"
              required="true"
              label="Tanggal"
              style={{ margin: 8, width: "31%" }}
              margin="normal"
              variant="outlined"
              className={classes.textField}

              /> */}

              <TextField
              variant="outlined"
              id="date"
              label="Tanggal"
              type="date"
              defaultValue="2021-04-20"
              style= {{margin: 8, width: "31%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              />
            
          
              {/* <TextField id="outlined-full-width"
              required="true"
              label="Jam Masuk"
              style={{ margin: 8, width: "33%" }}
              margin="normal"
              variant="outlined"
              className={classes.textField}
              />
              <TextField id="outlined-full-width"
              required="true"
              label="Jam Keluar"
              style={{ margin: 8, width: "31%" }}
              margin="normal"
              variant="outlined"
              className={classes.textField}
              /> */}

          <TextField
              variant="outlined"
              id="time"
              label="Jam masuk"
              type="time"
              defaultValue="10:12"
              style= {{margin: 8, width: "33%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, 
              }}
            />


            <TextField
              variant="outlined"
              id="time"
              label="Jam keluar"
              type="time"
              defaultValue="12:12"
              style= {{margin: 8, width: "31%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, 
              }}
            />

            </Grid>


          <Grid item xs={12}>
            <TextField id="outlined-full-width"
            select
            required="true"
            label="Tipe Log"
            defaultValue="Reguler"
            style={{ margin: 10, width: "48%" }}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            value={tipe}
            onChange={handleChange}
            >
              {daftar_tipe.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>

            <TextField id="outlined-full-width"
            required="true"
            label="Keterangan"
            defaultValue="sehat walafiat"
            style={{ margin: 10, width: "48%" }}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Aktivitas"
            defaultValue="belajar belajar dan belajar"
            multiline
            rows={4}
            variant="outlined"
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Link Deliverables"
              defaultValue="www.google.com"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Status Deliverables"
              defaultValue="Menunggu persetujuan"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Notes"
            defaultValue="Menunggu persetujuan"
            multiline
            rows={2}
            variant="outlined"
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            />
          </Grid>

          <div className="flex justify-center py-6">
          <TemplateButton
              type="button"
              buttonStyle="btnBlue"
              buttonSize="btnLong"
          >
              Simpan
          </TemplateButton>
        </div>

        </Container>
      </div>
    )
};
export default EditLogAktivitas; 