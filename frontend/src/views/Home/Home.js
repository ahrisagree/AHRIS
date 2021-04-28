import React, { useEffect, useState } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import Button  from "components/TemplateButton";
import TemplateButton  from "components/TemplateButton";
import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Container,
} from '@material-ui/core';
import { getKaryawan, getListDaftarKaryawan } from 'api/akun';
import { buatPresensiAPI, getListPresensi } from 'api/log';
import { PAGE_SIZE } from 'utils/constant';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import CircularProgress from 'components/Loading/CircularProgress';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import DeleteConfirmationDialog from 'components/DialogConf';
import TextField from 'components/CustomTextField';
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import Moment from 'moment';

const useStyles = makeStyles((theme) =>({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  root1: {
    flexGrow: 1,
  },
  table: {
    minWidth: 500
  },
  pagination: {
    '& > *': {
      marginTop: theme.spacing(1),
      color: "#0B3242",
      marginLeft: "77%",
    },
  },
  page: {
    width: "92%",
    height: "100%",
    position: "absolute",
    padding: "3%",
    fontWeight: "bold",
    color: "#FFFF",
    background: "#E5E5E5",
    left: 0,
    top: 0,
    textAlign:"right"
  },
  container: {
    position: "absolute",
    paddingTop: "10%",
    fontWeight: "bold",
    color: "#FFFF",
    background: "linear-gradient(180deg, #00A96F 0%, #437B74 100%)",
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    width: 524,
    height: "100%",
    minHeight: 700,
    left: 0,
    top: 0,
  },
  paper: {
    paddingTop: 50,
    fontWeight: "bold",
    color: "0A3142",
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
  },
  title: {
    right : -160
  }
}));

const Home = (props) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [fullLoading, setFullLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const [deleteLog, setDeleteLog] = useState(null);
  const [hadir, setHadir] = useState(false);

  const date = new Date();
  const new_date = Moment(date).format('YYYY-MM-DD');
  const new_time = date.getHours() + ':' + date.getMinutes();
  const [tanggal, setTanggal] = useState(new_date);
  const [jamMasuk, setJamMasuk] = useState(new_time.toString());
  const [keterangan, setKeterangan] = useState("");
  const [createPresensi, setCreatePresensi] = React.useState(false);
  const [id, setId] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [role, setRole] = React.useState("");

  const [error, setError] = React.useState({});

  const history = props.match.params.history;

  useEffect(()=>{
    // setLoading(true)
    
    // getListDaftarKaryawan({
    //   page
    // }).then(res=>{
    //   setListItem(res.data?.results);
    //   setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    // }).catch(err=>{
    // // Handle ERROR
    // }).finally(()=>{
    //   setLoading(false);
    // })

    getListPresensi({
      page
    }).then(res=>{
      setListItem(res.data?.results);
      console.log(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })
    

  }, [page, update]);

  const onSubmit = () => {
    buatPresensiAPI(
      {tanggal: tanggal,
      jam_masuk: jamMasuk,
      keterangan: keterangan},
    ).then(res=>{
      setTanggal("");
      setJamMasuk("");
      setKeterangan("");
      setCreatePresensi(true); 
      setId(res.data.user);
      // console.log(res.data.user);    
      // console.log(res.data.tanggal);
      // console.log(res.data.jam_masuk);
      // console.log(res.data.keterangan); 
    }).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })

    getKaryawan(id).then(res => {
      const { data } = res
      setId(data.pk);
      setUsername(data.username);
      setRole(data.role);
    })

  }


    return (
    <div className={classes.root1}>

      <MainTitle title="Buat Log Aktivitas" className="mb-8" />
      <Container component={Paper} className={classes.paper}>
      
      <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
          <TextField
          required="false"
          variant="outlined"
          id="date"
          label="Tanggal"
          type="date"
          style= {{margin: 8, width: "100%"}}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          value={tanggal}
          onChange={e=>{setTanggal(e.target.value); delete error.tanggal}}
          error={!!error.tanggal}
          helperText={error.tanggal && error.tanggal[0]}
          disabled={false}
          />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required="false"
          variant="outlined"
          id="time"
          label="Jam masuk"
          type="time"
          style= {{margin: 8, width: "100%"}}
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
          disabled={loading}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField id="outlined-full-width"
          required="false"
          label="Keterangan"
          style={{ margin: 10, width: "100%" }}
          margin="normal"
          variant="outlined"
          className={classes.textField}
          value={keterangan}
          onChange={e=>{setKeterangan(e.target.value); delete error.keterangan}}
          error={!!error.keterangan}
          helperText={error.keterangan && error.keterangan[0]}
          disabled={loading}
          />
      </Grid>

      <div className="flex justify-center py-6">
        <TemplateButton
            onClick={onSubmit}
            type="button"
            buttonStyle="btnBlue"
            buttonSize="btnLong"
            disabled={loading}
        >
            Simpan
        </TemplateButton>
      </div>

      </Grid>
      </Container>
      


      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title="Daftar Hadir" className="mb-8" />
          </Grid>
          <Grid item xs={8}/>
      </Grid>
      
        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
                <StyledTableCell align="left">Role </StyledTableCell>
                <StyledTableCell align="left">Status Presensi</StyledTableCell>
                <StyledTableCell align="left">Keterangan</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? 
              <StyledTableRow>
                <StyledTableCell align="center" colSpan="5">
                  <CircularProgress />
                </StyledTableCell>
              </StyledTableRow>
              : (
                listItem?.length === 0 ? 
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan="5">
                    Tidak ada karyawan
                  </StyledTableCell>
                </StyledTableRow>
                : 
                listItem.map((row, i) => (
                  <StyledTableRow key={row.user.pk}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.user.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.user.role}</StyledTableCell>
                    <StyledTableCell align="left">Hadir</StyledTableCell>
                    <StyledTableCell align="left">{row.keterangan}</StyledTableCell>
                  </StyledTableRow>
                ))) }
            </TableBody>
          </MuiTable>
        </TableContainer>
        {/* <div className={classes.pagination}>
          <Pagination 
            count={count} 
            page={page} 
            onChange={(_e,val)=>setPage(val)}
            />
        </div> */}
        <Loading open={loading} />
        <Dialog open={!!createPresensi} handleClose={()=>setCreatePresensi(false)} ></Dialog>
        <DialogFail
          open={!!error.detail} 
          handleClose={()=>{
            delete error.detail;
            setUpdate(update+1);
          }} 
          text={error.detail}
          />
    
    </div>
  );
}

export default Home;  
