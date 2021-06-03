import React from 'react';
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
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import TemplateButton from 'components/TemplateButton';
import { buatLogAPI } from 'api/log';
import Loading from 'components/Loading';
import Moment from 'moment';


const daftar_tipe = [
  {
    value: false,
    label: 'Reguler',
  },
  {
    value: true,
    label: 'Lembur',
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

const LogAktivitas = ({history}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const params = new URLSearchParams(history.location.search);
  const date = new Date();
  const new_date = Moment(date).format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = React.useState(params.get("tanggal") || new_date);
  const [jamMasuk, setJamMasuk] = React.useState(params.get("jam_masuk")?.substr(0,5) || "");
  const [jamKeluar, setJamKeluar] = React.useState("");
  const [tipe, setTipe] = React.useState(false);
  const [keterangan, setKeterangan] = React.useState("");
  const [aktivitas, setAktivitas] = React.useState("");
  const [linkDeliverables, setLinkDeliverables] = React.useState("");
  const [statusDeliverables, setStatusDeliverables] = React.useState("");
  const [alasanLembur, setAlasanLembur] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [createLog, setCreateLog] = React.useState(false);
  const [update, setUpdate] = React.useState(0);


  const onSubmit = () => {
    setLoading(true)
    buatLogAPI(
      {tanggal: selectedDate,
      jam_masuk: jamMasuk,
      jam_keluar: jamKeluar,
      is_lembur: tipe,
      keterangan: keterangan,
      aktivitas: aktivitas,
      link_deliverable: linkDeliverables,
      status_deliverable: statusDeliverables,
      notes: notes},
    ).then(res=>{
      setSelectedDate("");
      setJamMasuk("");
      setJamKeluar("");
      setTipe("");
      setKeterangan("");
      setAktivitas("");
      setLinkDeliverables("");
      setStatusDeliverables("");
      setNotes("");
      setCreateLog(true);
    }).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })
  }

  const onSubmitLembur = () => {
    buatLogAPI(
      {tanggal: selectedDate,
      jam_masuk: jamMasuk,
      jam_keluar: jamKeluar,
      is_lembur: tipe,
      keterangan: keterangan,
      aktivitas: aktivitas,
      link_deliverable: linkDeliverables,
      status_deliverable: statusDeliverables,
      notes: notes,
      alasan_lembur: alasanLembur},
    ).then(res=>{
      setSelectedDate("");
      setJamMasuk("");
      setJamKeluar("");
      setTipe("");
      setKeterangan("");
      setAktivitas("");
      setLinkDeliverables("");
      setStatusDeliverables("");
      setNotes("");
      setAlasanLembur("");
      setCreateLog(true);
    }).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })
  }

  
    return (
      <div className="m-10">
        <MainTitle title="Buat Log Aktivitas" className="mb-8" />
        <Container component={Paper} className={classes.paper}>

          <Grid item xs={12}>
            <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Log Aktivitas
            </Typography>
          </Grid>
          
          
            <Grid item xs={12}>
              <TextField
              variant="outlined"
              id="date"
              label="Tanggal"
              type="date"
              defaultValue=""
              style= {{margin: 8, width: "31%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedDate}
              onChange={e=>{setSelectedDate(e.target.value); delete error.tanggal}}
              error={!!error.tanggal}
              helperText={error.tanggal && error.tanggal[0]}
              disabled={loading}
              />
            
            <TextField
              variant="outlined"
              id="time"
              label="Jam masuk"
              type="time"
              defaultValue=""
              style= {{margin: 8, width: "33%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, 
              }}
              value={jamMasuk}
              onChange={e=>{setJamMasuk(e.target.value); delete error.jam_masuk}}
              error={!!error.jam_masuk}
              // helperText={error.jam_masuk && error.jam_masuk["Time has"]}
              helperText={error.jam_masuk && "This field may not be blank. Exp. hh:mm"}

              disabled={loading}
            />


            <TextField
              variant="outlined"
              id="time"
              label="Jam keluar"
              type="time"
              defaultValue=""
              style= {{margin: 8, width: "31%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, 
              }}
              value={jamKeluar}
              onChange={e=>{setJamKeluar(e.target.value); delete error.jam_keluar}}
              error={!!error.jam_keluar}
              helperText={error.jam_keluar && "This field may not be blank. Exp. hh:mm"}
              disabled={loading}
            />

            </Grid>


          <Grid item xs={12}>
            <TextField id="outlined-full-width"
            select
            required="true"
            label="Tipe Log"
            style={{ margin: 10, width: "48%" }}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            value={tipe}
            onChange={e=>{setTipe(e.target.value); delete error.is_lembur}}
            error={!!error.is_lembur}
            helperText={error.is_lembur && error.is_lembur[0]}
            disabled={loading}
            >
              {daftar_tipe.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>


            <TextField id="outlined-full-width"
            label="Keterangan"
            style={{ margin: 10, width: "48%" }}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            onChange={e=>{setKeterangan(e.target.value); delete error.keterangan}}
            error={!!error.keterangan}
            helperText={error.keterangan && error.keterangan[0]}
            disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Aktivitas"
            multiline
            rows={4}
            variant="outlined"
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            onChange={e=>{setAktivitas(e.target.value); delete error.aktivitas}}
            error={!!error.aktivitas}
            helperText={error.aktivitas && error.aktivitas[0]}
            disabled={loading}
            />
            
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Link Deliverables"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              onChange={e=>{setLinkDeliverables(e.target.value); delete error.link_deliverable}}
              error={!!error.link_deliverable}
              helperText={error.link_deliverable && error.link_deliverable[0]}
              disabled={loading}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Status Deliverables"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              onChange={e=>{setStatusDeliverables(e.target.value); delete error.status_deliverable}}
              error={!!error.status_deliverable}
              helperText={error.status_deliverable && error.status_deliverable[0]}
              disabled={loading}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Notes"
            multiline
            rows={2}
            variant="outlined"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            onChange={e=>{setNotes(e.target.value); delete error.notes}}
            error={!!error.notes}
            helperText={error.notes && error.notes[0]}
            disabled={loading}
            />
          </Grid>
          
          {tipe &&
          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Alasan Lembur"
            multiline
            rows={2}
            variant="outlined"
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            onChange={e=>{setAlasanLembur(e.target.value); delete error.alasan_lembur}}
            error={!!error.alasan_lembur}
            helperText={error.alasan_lembur && error.alasan_lembur[0]}
            disabled={loading}
            />
          </Grid>
          }

          <div className="flex justify-center py-6">
          <TemplateButton
              onClick={!tipe ? onSubmit : onSubmitLembur}
              type="button"
              buttonStyle="btnBlue"
              buttonSize="btnLong"
              disabled={loading}
          >
              Simpan
          </TemplateButton>
        </div>

        </Container>
        <Loading open={loading} />
        <Dialog open={!!createLog} handleClose={()=>history.push(`/log`)} ></Dialog>
        <DialogFail
          open={!!error.detail} 
          handleClose={()=>{
            delete error.detail;
            setUpdate(update+1);
          }} 
          text={error.detail}
          />
      </div>
    )
};
export default LogAktivitas;     