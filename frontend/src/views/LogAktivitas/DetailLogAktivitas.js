import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Typography,
  MenuItem,
  Tooltip,
  IconButton
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import MainTitle from 'components/MainTitle';
import TemplateButton from 'components/TemplateButton';
import { getLog, setujuiLogAPI } from 'api/log';
import { STATUS_LOG } from 'utils/constant';
import Loading from 'components/Loading';
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRounded from '@material-ui/icons/CreateRounded';



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



const DetailLogAktivitas = (props, {history}) => {
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
  const [role, setRole] = React.useState("");
 
  const { id } = props.match.params;


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    setLoading(true);
    const id = props.match.params.id;
    console.log(id)

 
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
      setRole(data.user.role);
    }).catch(err => {
      // HANDLE ERROR
    }).finally(() => {
      setLoading(false)
    })

    
  }, [])

  const sendKomentarSetuju = () => {
    const { id } = props.match.params;
    setLoading(true);
    setStatusLog(STATUS_LOG[1]);
    setujuiLogAPI(id, {
      komentar: komentar,
      status_log: 1
    }).then(res => {
      setSuccess(true);
    }).catch(err => {
      setError(err.response && err.response.data);
    }).finally(() => {
      setLoading(false);
    })
  }

  const sendKomentarTolak = () => {
    const { id } = props.match.params;
    setLoading(true);
    setStatusLog(STATUS_LOG[2]);
    setujuiLogAPI(id, {
      komentar: komentar,
      status_log: 2
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
         <Grid item xs={12}>
     
         <Link to={`/edit-log/${id}`}>
          <Tooltip title="Edit">
            <IconButton size="small" style={{float: 'right'}}>
               <EditRounded />
            </IconButton>
          </Tooltip>
                    
         </Link>
    
      <Tooltip title="Delete">
        <IconButton size="small" style={{float: 'right'}} >
          <DeleteOutlineIcon />
        </IconButton>
      </Tooltip>
      </Grid>
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
            select
            required="true"
            label="Tipe Log"
            style={{ margin: 10, width: "30%" }}
            margin="normal"
            className={classes.textField}
            value={tipe}
            disabled={true}
            isDetail
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
            style={{ margin: 10, width: "34%" }}
            margin="normal"
            className={classes.textField}
            value={keterangan}
            disabled={true}
            isDetail
            />

            <TextField id="outlined-multiline-static"
            label="Aktivitas"
            required="true"
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
              required="true"
              label="Link Deliverables"
              style={{ margin: 8, width: "30%" }}
              margin="normal"
              className={classes.textField}
              value={linkDeliverables}
              disabled={true}
              isDetail
              />

            <TextField id="outlined-full-width"
              required="true"
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
            required="true"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            className={classes.textField}
            value={notes}
            disabled={true}
            isDetail
            />
          </Grid>

          <Grid item xs={12}>
            {tipe &&
              <TextField id="outlined-multiline-static"
              label="Alasan Lembur"
              required="true"
              style={{ margin: 8, width: "30%" }}
              margin="normal"
              className={classes.textField}
              value={alasanLembur}
              disabled={true}
              isDetail
              />
            }

              <TextField id="outlined-multiline-static"
              label="Komentar"
              required="true"
              style={{ margin: 8, width: "30%" }}
              margin="normal"
              className={classes.textField}
              value={komentar}
              disabled={true}
              isDetail
              />

              <TextField id="outlined-multiline-static"
              label="Status Log"
              required="true"
              style={{ margin: 8, width: "30%" }}
              margin="normal"
              className={classes.textField}
              value={statusLog}
              disabled={true}
              isDetail
              />


          </Grid>
          
          
          {role === "Manager" ?
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
                onClick={sendKomentarSetuju}
                type="button"
                buttonStyle="btnGreen"
                buttonSize="btnMedium"
              >
                Setujui
              </TemplateButton>

              <TemplateButton
                onClick={sendKomentarTolak}
                type="button"
                buttonStyle="btnDanger"
                buttonSize="btnMedium"
                
              >
                Tolak
              </TemplateButton>
            </div>
            :  
            <div className="flex justify-end py-6">
            <Link to={`/daftar-log-karyawan`}>
              <TemplateButton
                onClick={sendKomentarSetuju}
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
export default DetailLogAktivitas; 




// const DetailLogAktivitas = props => {
//   const classes = useStyles();
//   const [tipe, setTipe] = React.useState('reguler');

//   const [selectedDate, setSelectedDate] = React.useState(new Date(''));
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleChange = (event) => {
//     setTipe(event.target.value);
//   };
  
//     return (
//       <div className="m-10">
//         <MainTitle title="Detail Log Aktivitas" className="mb-8" />
//         <Container component={Paper} className={classes.paper}>

//           <Grid item xs={12}>
//             <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
//             fontWeight: 600, fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
//             variant="subtitle1">
//               Log Aktivitas
//             </Typography>
//           </Grid>
          
          
//             <Grid item xs={12}>

//             <TextField
//               id="standard-read-only-input"
//               label="Tanggal"
//               defaultValue="21/01/2021"
//               style= {{margin: 8, width: "30%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />

//             <TextField
//               id="standard-read-only-input"
//               label="Jam masuk"
//               defaultValue="11.11"
//               style= {{margin: 8, width: "34%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             /> 

//             <TextField
//               id="standard-read-only-input"
//               label="Jam keluar"
//               defaultValue="16.11"
//               style= {{margin: 8, width: "30%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />  
            
//             </Grid>


//           <Grid item xs={12}>
//             <TextField
//               id="standard-read-only-input"
//               label="Tipe log"
//               defaultValue="Reguler"
//               style= {{margin: 8, width: "30%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             /> 

//             <TextField
//               id="standard-read-only-input"
//               label="Keterangan"
//               defaultValue="Selesai dikerjakan"
//               style= {{margin: 8, width: "34%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             /> 
        
//             <TextField
//               id="standard-read-only-input"
//               label="Aktivitas"
//               defaultValue="Rapat, belajar, rapat, belajar, rapat, belajar, sampe gumoh"
//               style= {{margin: 8, width: "30%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             /> 
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               id="standard-read-only-input"
//               label="Link Deliverables"
//               defaultValue="www.google.com"
//               style= {{margin: 8, width: "30%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             /> 

//             <TextField
//               id="standard-read-only-input"
//               label="Status Deliverables"
//               defaultValue="Berhasil dikerjakan"
//               style= {{margin: 8, width: "34%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             /> 

//             <TextField
//               id="standard-read-only-input"
//               label="Notes"
//               defaultValue="Butuh review"
//               style= {{margin: 8, width: "30%"}}
//               InputProps={{
//                 readOnly: true,
//               }}
//             /> 
//           </Grid>

//           <Grid item xs={12}>
//             <TextField id="outlined-full-width"
//               required="true"
//               label="Komentar"
//               style={{ margin: 10, width: "98%" }}
//               margin="normal"
//               variant="outlined"
//               className={classes.textField}
//               multiline
//               rows={2}
//               />
//           </Grid>

//           <div className="flex justify-end py-6">
//               <TemplateButton
//                 type="button"
//                 buttonStyle="btnGreen"
//                 buttonSize="btnMedium"
//               >
//                 Setujui
//               </TemplateButton>

//               <TemplateButton
//                 type="button"
//                 buttonStyle="btnDanger"
//                 buttonSize="btnMedium"
                
//               >
//                 Tolak
//               </TemplateButton>
//             </div>
        

//         </Container>
//       </div>
//     )
// };
// export default DetailLogAktivitas; 