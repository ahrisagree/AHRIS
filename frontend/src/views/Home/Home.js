import React, { useEffect, useState } from 'react';
import Pagination from "@material-ui/lab/Pagination";
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
  MenuItem,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { buatPresensiAPI, getListPresensiKaryawan } from 'api/log';
import { getDivisiAPI } from 'api/akun';
import { PAGE_SIZE } from 'utils/constant';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import CircularProgress from 'components/Loading/CircularProgress';
import Loading from 'components/Loading';
import TextField from 'components/CustomTextField';
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import { setQueryParams } from 'utils/setQueryParams';
import Moment from 'moment';
import CustomTextField from 'components/CustomTextField';
import { exportPresensi } from 'utils/csv';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

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

const Home = ({history}) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(0);

  const date = new Date();
  const new_date = Moment(date).format('YYYY-MM-DD');
  const new_time = date.getHours() + ':' + date.getMinutes();
  const [tanggal, setTanggal] = useState(new_date);
  const [jamMasuk, setJamMasuk] = useState(new_time.toString());
  const [keterangan, setKeterangan] = useState("");
  const [createPresensi, setCreatePresensi] = React.useState(false);
  
  const [divisiOptions, setDivisiOptions] = useState([]);
 
  const params = new URLSearchParams(history.location.search);

  const [searchFilter, setFilterSearch] = useState(params.get("search"));
  const [divisiFilter, setFilterDivisi] = useState(params.get("divisi"));
  const [tanggalFilter, setFilterTanggal] = useState(params.get("tanggal"));

  const [error, setError] = React.useState({});


  useEffect(()=>{
    setLoading(true)
    const search = params.get("search");
    const divisi = params.get("divisi");
    const tanggal = params.get("tanggal");
    
    getListPresensiKaryawan({  
      page, search, divisi, tanggal
    }).then(res=>{
      setListItem(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })
    

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, update]);

  useEffect(()=>{
    getDivisiAPI().then(res=>{
      setDivisiOptions(res.data);
    }).catch(err=>{
      console.error(err.response);
    })
  }, [])

  const doQuery = () => {
    setQueryParams({
      search: searchFilter || "",
      divisi: divisiFilter || "",
      tanggal: tanggalFilter || ""
    }, history);
    setPage(1);
    setUpdate(update+1);
  }

  const resetQuery = () => {
    setQueryParams({}, history);
    setPage(1);
    setUpdate(update+1);
    setFilterSearch("");
    setFilterDivisi("");
    setFilterTanggal("");
  }

  const exportCSV = () => {
    const search = params.get("search");
    const divisi = params.get("divisi");
    const tanggal = params.get("tanggal");

    getListPresensiKaryawan({
      search, divisi, tanggal, disablepagination: true 
    }).then(res=>{
      exportPresensi(res.data, `Presensi ${tanggal}` || "List Presensi");
    })
  }

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
      setUpdate(true);
    }).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })

  }

  return (
        
    <div className={classes.root1}>

      <MainTitle title="Isi Presensi" className="mb-8" />
      <Container component={Paper} className={classes.paper}>
      
      <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
          <TextField
          required="true"
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
          disabled={true}
          />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required="true"
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
          onChange={e=>{setJamMasuk(e.target.value); delete error.jam_masuk}}
          error={!!error.jam_masuk}
          helperText={error.jam_masuk && error.jam_masuk[0]}
          disabled={true}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField id="outlined-full-width"
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
      <br></br>
      <br></br>
      


      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title="Daftar Hadir" className="mb-8" />
          </Grid>
          <Grid item xs={8}/>
      </Grid>

      <div className="flex w-full flex-wrap p-2">
          <div className="w-full md:w-1/3 my-2 md:mr-2">

            <CustomTextField
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
              bordered={true}
              value={searchFilter}
              onChange={e=>setFilterSearch(e.target.value)}
              />
            
          </div>

          <div className="w-full md:w-1/3 my-2 md:mr-2">
              <TextField
                label="Divisi"
                variant="outlined"
                size="small"
                className={classes.mb}
                fullWidth
                value={divisiFilter}
                onChange={e=>setFilterDivisi(e.target.value)}
                select
                bordered={true}
              >
                {divisiOptions.map(d=>(
                  <MenuItem value={d.nama_divisi}>{d.nama_divisi}</MenuItem>
                ))}
              </TextField>
          </div>

          <div className="w-full md:w-1/3 my-2 md:mr-2">
              <CustomTextField
                variant="outlined"
                id="date"
                label="Tanggal"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={tanggalFilter}
                onChange={e=>{setFilterTanggal(e.target.value)}}
                disabled={loading}
                />
          </div>
          
          <div className="flex items-center">
            {!(params.get("search") === searchFilter &&
              params.get("divisi") === divisiFilter && 
              params.get("tanggal") === tanggalFilter) &&
              <button onClick={doQuery} className="m-1">Apply</button>  
            }
            {(params.get("search") ||
             params.get("divisi") || 
             params.get("tanggal")) &&
            <button onClick={resetQuery} className="m-1">Reset</button>  
            }
          </div>
        </div>
      
      <div>
        <Grid item xs={1} alignContent="flex-end">
            <Tooltip title="Download">
                <IconButton size="medium">
                  <CloudDownloadIcon style={{ color: "#0A3142", position:"absolute", right: 0}} onClick={exportCSV}/>
                </IconButton>
              </Tooltip>
        </Grid>
      </div>

      <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left"> No </StyledTableCell>
                <StyledTableCell align="left"> Nama </StyledTableCell>
                <StyledTableCell align="left"> Role </StyledTableCell>
                <StyledTableCell align="left"> Tanggal </StyledTableCell>
                <StyledTableCell align="left"> Jam Masuk </StyledTableCell>
                <StyledTableCell align="left"> Keterangan </StyledTableCell>
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
                    Tidak ada Presensi
                  </StyledTableCell>
                </StyledTableRow>
                :
                listItem.map((row, i) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.user === null ? "Tidak ada user" : row.user?.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.user === null ? "Tidak ada user" : row.user?.role}</StyledTableCell>
                    <StyledTableCell align="left">{row.tanggal}</StyledTableCell>
                    <StyledTableCell align="left">{row.jam_masuk.split(".")[0]}</StyledTableCell>
                    <StyledTableCell align="left">{row.keterangan}</StyledTableCell>
                  </StyledTableRow>
                )))}
            </TableBody>
          </MuiTable>
        </TableContainer>

      
        <div className={classes.pagination}>
          <Pagination 
            count={count} 
            page={page} 
            onChange={(_e,val)=>setPage(val)}
            />
        </div>
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