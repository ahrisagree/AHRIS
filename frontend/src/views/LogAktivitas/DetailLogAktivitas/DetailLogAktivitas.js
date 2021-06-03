import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Typography,
  Tooltip,
  IconButton
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import MainTitle from 'components/MainTitle';
import TemplateButton from 'components/TemplateButton';
import { deleteLogAPI, getLog, komentarLogAPI } from 'api/log';
import { STATUS_LOG } from 'utils/constant';
import Loading from 'components/Loading';
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRounded from '@material-ui/icons/CreateRounded';
import DeleteConfirmationDialog from 'components/DialogConf';


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



const DetailLogAktivitas = ({history,match,user}) => {
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
  const [komentar, setKomentar] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [statusLog, setStatusLog] = React.useState("");

  const [role] = React.useState(user.role);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

 
  const { id } = match.params;

  useEffect(() => {
    setLoading(true);
    const id = match.params.id;
 
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
      setKomentar(data.komentar);
      setStatusLog(STATUS_LOG[data.status_log]);
    }).catch(err => {
      // HANDLE ERROR
    }).finally(() => {
      setLoading(false)
    })

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendKomentar = () => {
    const { id } = match.params;
    setLoading(true);
    komentarLogAPI(id, {
      komentar: komentar,
    }).then(res => {
      setSuccess(true);
    }).catch(err => {
      setError(err.response && err.response.data);
    }).finally(() => {
      setLoading(false);
    })
  }

  const deleteLog = () => {
    const { id } = match.params;
    setLoading(true);
    deleteLogAPI(id).then(()=>{history.push('/log');
    }).catch(err=>{
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false)
    })
  }

    return (
      <div className="m-10">
         <Grid item xs={12}>
     
         <Tooltip title="Delete">
        <IconButton size="small" style={{float: 'right'}} onClick={()=>setDeleteConfirm(true)}>
          <DeleteOutlineIcon />
        </IconButton>
      </Tooltip>

         <Link to={`/log/${id}/edit`} style={{float: 'right'}}>
          <Tooltip title="Edit">
            <IconButton size="small" >
               <EditRounded />
            </IconButton>
          </Tooltip>
                    
         </Link>
    
      
      </Grid>
        <MainTitle title="Detail Log Aktivitas" className="mb-8" />
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
              id="date"
              label="Tanggal"
              type="date"
              style= {{margin: 8, width: "30%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedDate}
              disabled={true}
              isDetail
              />
            

            <TextField
              id="time"
              label="Jam masuk"
              type="time"
              style= {{margin: 8, width: "34%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, 
              }}
              value={jamMasuk}
              disabled={true}
              isDetail
            />


            <TextField
              id="time"
              label="Jam keluar"
              type="time"
              style= {{margin: 8, width: "30%"}}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, 
              }}
              value={jamKeluar}
              disabled={true}
              isDetail
            />

            </Grid>


          <Grid item xs={12}>
            <TextField id="outlined-full-width"
            label="Tipe Log"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            className={classes.textField}
            value={tipe === false ? "Reguler" : "Lembur"}
            disabled={true}
            isDetail
            />


            <TextField id="outlined-full-width"
            label="Keterangan"
            style={{ margin: 8, width: "34%" }}
            margin="normal"
            className={classes.textField}
            value={keterangan !== "" ? keterangan : "-"}
            disabled={true}
            isDetail
            />

            <TextField id="outlined-multiline-static"
            label="Aktivitas"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            className={classes.textField}
            value={aktivitas}
            disabled={true}
            isDetail
            />
            
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              label="Link Deliverables"
              style={{ margin: 8, width: "30%" }}
              margin="normal"
              className={classes.textField}
              value={linkDeliverables}
              disabled={true}
              isDetail
              />

            <TextField id="outlined-full-width"
              label="Status Deliverables"
              style={{ margin: 8, width: "34%" }}
              margin="normal"
              className={classes.textField}
              value={statusDeliverables}
              disabled={true}
              isDetail
              />

            <TextField id="outlined-multiline-static"
            label="Notes"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            className={classes.textField}
            value={notes !== "" ? notes : "-"}
            disabled={true}
            isDetail
            />
          </Grid>

          <Grid item xs={12}>
            
              <TextField id="outlined-multiline-static"
              label="Komentar"
              style={{ margin: 8, width: "30%" }}
              margin="normal"
              className={classes.textField}
              value={komentar !== null ? komentar : "-"}
              disabled={true}
              isDetail
              />

              <TextField id="outlined-multiline-static"
              label="Status Log"
              style={{ margin: 8, width: "34%" }}
              margin="normal"
              className={classes.textField}
              value={statusLog}
              disabled={true}
              isDetail
              />

              {tipe &&
              <TextField id="outlined-multiline-static"
              label="Alasan Lembur"
              style={{ margin: 8, width: "30%" }}
              margin="normal"
              className={classes.textField}
              value={alasanLembur}
              disabled={true}
              isDetail
              />
            }
          </Grid>
          
          
          {role === "Manager" ?
          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="false"
              label="Komentar"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              className={classes.textField}
              multiline
              rows={2}
              onChange={e=>{setKomentar(e.target.value); delete error.komentar}}
              error={!!error.komentar}
              helperText={error.komentar && error.komentar[0]}
              disabled={false}
              />
          </Grid>
          :
          <Grid>

          </Grid>
            
          }

          {role === "Manager" ?
           <div className="flex justify-end py-6">
               <TemplateButton
                onClick={sendKomentar}
                type="button"
                buttonStyle="btnGreen"
                buttonSize="btnMedium"
              >
                Simpan
              </TemplateButton>
            </div>
            :  
            <div className="flex justify-end py-6">
            <Link to={`/log`}>
              <TemplateButton
                type="button"
                buttonStyle="btnGreen"
                buttonSize="btnMedium"
              >
                Back
              </TemplateButton>
            </Link>
            </div>
            
          }

        </Container>
        <Loading open={loading} />
        <Dialog open={success} handleClose={()=>history.push(`/daftar-log-karyawan`)} ></Dialog>
        <DialogFail
          open={!!error.detail} 
          handleClose={()=>{
            setError({});
          }} 
          text={error.detail}
          />
        <DeleteConfirmationDialog 
        open={!!deleteConfirm}
        handleCancel={()=>setDeleteConfirm(false)}
        handleConfirm={deleteLog}
        />
      </div>
    )
};
export default DetailLogAktivitas; 
