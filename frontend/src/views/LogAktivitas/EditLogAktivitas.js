import React, { useEffect, useState } from 'react';
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
import { buatLogAPI, editLogAPI, getLog } from 'api/log';
import Loading from 'components/Loading';

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


const EditLogAktivitas = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const [success, setSuccess] = useState(false);
  

  const [selectedDate, setSelectedDate] = React.useState("");
  const [jamMasuk, setJamMasuk] = React.useState("");
  const [jamKeluar, setJamKeluar] = React.useState("");
  const [tipe, setTipe] = React.useState(false);
  const [keterangan, setKeterangan] = React.useState("");
  const [aktivitas, setAktivitas] = React.useState("");
  const [linkDeliverables, setLinkDeliverables] = React.useState("");
  const [statusDeliverables, setStatusDeliverables] = React.useState("");
  const [alasanLembur, setAlasanLembur] = React.useState("");
  const [notes, setNotes] = React.useState("");


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  useEffect(() => {
    setLoading(true);
    const id = props.match.params.id;
    getLog(id).then(res => {
      const { data } = res
      setSelectedDate(data.tanggal);
      setJamMasuk(data.jam_masuk);
      setJamKeluar(data.jam_keluar);
      setTipe(data.is_lembur);
      setKeterangan(data.keterangan);
      setAktivitas(data.aktivitas);
      setLinkDeliverables(data.link_deliverable);
      setStatusDeliverables(data.status_deliverable);
      setNotes(data.notes);
      setAlasanLembur(data.alasan_lembur);
    }).catch(err => {
      // HANDLE ERROR
    }).finally(() => {
      setLoading(false);
    })
    
  }, [])


  const sendEditData = () => {
    const { id } = props.match.params;
    setLoading(true)
    editLogAPI(id, {
      tanggal: selectedDate,
      jam_masuk: jamMasuk,
      jam_keluar: jamKeluar,
      is_lembur: tipe,
      keterangan: keterangan,
      aktivitas: aktivitas,
      link_deliverable: linkDeliverables,
      status_deliverable: statusDeliverables,
      notes: notes,
      alasan_lembur: alasanLembur
    }).then(res => {
      setSuccess(true);
    }).catch(err => {
      setError(err.response && err.response.data);
    }).finally(() => {
      setLoading(false);
    })
  }

  
    return (
      <div className="m-10">
        <MainTitle title="Edit Log Aktivitas" className="mb-8" />
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
              required="true"
              variant="outlined"
              id="date"
              label="Tanggal"
              type="date"
              style= {{margin: 8, width: "31%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedDate}
              onChange={e=>{setSelectedDate(e.target.value); delete error.selectedDate}}
              error={!!error.selectedDate}
              helperText={error.selectedDate && error.selectedDate[0]}
              disabled={false}
              />
            
            <TextField
              required="true"
              variant="outlined"
              id="time"
              label="Jam masuk"
              type="time"
              style= {{margin: 8, width: "33%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, 
              }}
              value={jamMasuk}
              onChange={e=>{setJamMasuk(e.target.value); delete error.jamMasuk}}
              error={!!error.jamMasuk}
              helperText={error.jamMasuk && error.jamMasuk[0]}
              disabled={false}
            />


            <TextField
              required="true"
              variant="outlined"
              id="time"
              label="Jam keluar"
              type="time"
              style= {{margin: 8, width: "31%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, 
              }}
              value={jamKeluar}
              onChange={e=>{setJamKeluar(e.target.value); delete error.jamKeluar}}
              error={!!error.jamKeluar}
              helperText={error.jamKeluar && error.jamKeluar[0]}
              disabled={false}
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
            onChange={e=>{setTipe(e.target.value); delete error.tipe}}
            error={!!error.tipe}
            helperText={error.tipe && error.tipe[0]}
            disabled={false}
            >
              {daftar_tipe.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>


            <TextField id="outlined-full-width"
            required="true"
            label="Keterangan"
            style={{ margin: 10, width: "48%" }}
            margin="normal"
            variant="outlined"
            className={classes.textField}
            value={keterangan}
            onChange={e=>{setKeterangan(e.target.value); delete error.keterangan}}
            error={!!error.keterangan}
            helperText={error.keterangan && error.keterangan[0]}
            disabled={false}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            required="true"
            label="Aktivitas"
            multiline
            rows={4}
            variant="outlined"
            className={classes.textField}
            value={aktivitas}
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            onChange={e=>{setAktivitas(e.target.value); delete error.aktivitas}}
            error={!!error.aktivitas}
            helperText={error.aktivitas && error.aktivitas[0]}
            disabled={false}
            />
            
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Link Deliverables"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              className={classes.textField}
              value={linkDeliverables}
              onChange={e=>{setLinkDeliverables(e.target.value); delete error.linkDeliverables}}
              error={!!error.linkDeliverables}
              helperText={error.linkDeliverables && error.linkDeliverables[0]}
              disabled={false}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Status Deliverables"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              className={classes.textField}
              value={statusDeliverables}
              onChange={e=>{setStatusDeliverables(e.target.value); delete error.statusDeliverables}}
              error={!!error.statusDeliverables}
              helperText={error.statusDeliverables && error.statusDeliverables[0]}
              disabled={false}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Notes"
            multiline
            rows={2}
            variant="outlined"
            className={classes.textField}
            value={notes}
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            onChange={e=>{setNotes(e.target.value); delete error.notes}}
            error={!!error.notes}
            helperText={error.notes && error.notes[0]}
            disabled={false}
            />
          </Grid>
          
          {tipe &&
          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Alasan Lembur"
            multiline
            rows={2}
            variant="outlined"
            className={classes.textField}
            value={alasanLembur}
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            onChange={e=>{setAlasanLembur(e.target.value); delete error.alasanLembur}}
            error={!!error.alasanLembur}
            helperText={error.alasanLembur && error.alasanLembur[0]}
            disabled={!tipe}
            />
          </Grid>
          }

          <div className="flex justify-center py-6">
          <TemplateButton
              onClick={sendEditData}
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
        <Dialog open={success} handleClose={()=>setSuccess(false)} ></Dialog>
        <DialogFail
          open={!!error.detail} 
          handleClose={()=>{
            setError({});
          }} 
          text={error.detail}
          />
      </div>
    )
};
export default EditLogAktivitas; 