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
} from '@material-ui/core';
import { getListPresensi } from 'api/log';
import { PAGE_SIZE } from 'utils/constant';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import CircularProgress from 'components/Loading/CircularProgress';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import { setQueryParams } from 'utils/setQueryParams';
import CustomTextField from 'components/CustomTextField';


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
    
    title: {
      right : -160
    }
}));

const MyPresensi = (props) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [fullLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const {user} = props;
  const {history} = props;

  const params = new URLSearchParams(history.location.search);
  const [tanggalFilter, setFilterTanggal] = useState();


  useEffect(()=>{
    setLoading(true)
    const tanggal = params.get("tanggal");

    getListPresensi({
      user: user.pk,  
      page,
      tanggal
    }).then(res=>{
      setListItem(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })

  }, [page, update, user]);

  const doQuery = () => {
    setQueryParams({
      tanggal: tanggalFilter || ""
    }, history);
    setPage(1);
    setUpdate(update+1);
  }

  const resetQuery = () => {
    setQueryParams({}, history);
    setPage(1);
    setUpdate(update+1);
    setFilterTanggal(null);
  }


    return (
    <div className={classes.root1}>
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title="Daftar Presensi" className={classes.title} />
          </Grid>
          <Grid item xs={8}/>
        </Grid>
        
      </Grid>

      <Grid item container direction="row" justify="space-between">
          <Grid item xs={10}>
            <Link to={`/log-aktivitas`}>
              <TemplateButton 
                type="button" 
                buttonStyle="btnGreen" 
                buttonSize="btnMedium"
                >
                Buat Log
                </TemplateButton>
            </Link>
          </Grid>
      </Grid>

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

        <div className="flex items-center">
              {!(params.get("tanggal") === tanggalFilter) &&
                <button onClick={doQuery} className="m-1">Apply</button>  
              }
              {(params.get("tanggal")) &&
              <button onClick={resetQuery} className="m-1">Reset</button>  
              }
        </div>
      
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
                <StyledTableCell align="left"> Status Log Aktivitas </StyledTableCell>
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
                  <StyledTableRow key={row.tanggal}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.user?.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.user?.role}</StyledTableCell>
                    <StyledTableCell align="left">{row.tanggal}</StyledTableCell>
                    <StyledTableCell align="left">{row.jam_masuk.split(".")[0]}</StyledTableCell>
                    <StyledTableCell align="left">{row.keterangan}</StyledTableCell>
                    <StyledTableCell align="left">{row.log !== null ? "Sudah mengisi log" : "Belum mengisi log"}</StyledTableCell>
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
        <Loading open={fullLoading} />
    </div>
  );
}

export default MyPresensi;