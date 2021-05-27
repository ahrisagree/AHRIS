import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  MenuItem,
  fade,
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getDivisiAPI, getListDaftarKaryawan, registerAkunAPI } from 'api/akun';
import { PAGE_SIZE, ROLES } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import DeleteConfirmationDialog from 'components/DialogConf';
import { setQueryParams } from 'utils/setQueryParams';
import TemplateButton from 'components/TemplateButton';

function RedditTextField(props) {
    const classes = useStylesReddit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }

  const useStylesReddit = makeStyles((theme) => ({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }));

const useStyles = makeStyles({
  mb: {
    marginBottom: '1rem'
  }
})
const EvaluasiPerforma = ({history}) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [divisiOptions, setDivisiOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [deleteKaryawan, setDeleteKaryawan] = useState(null);

  // buat ngefilter
  const [update, setUpdate] = useState(0);
  
  const params = new URLSearchParams(history.location.search);

  const [roleFilter, setFilterRole] = useState(params.get("role"));
  const [divisiFilter, setFilterDivisi] = useState(params.get("divisi"));
  const [searchFilter, setFilterSearch] = useState(params.get("search"));

  useEffect(()=>{
    setLoading(true)
    
    const search = params.get("search");
    const role = params.get("role");
    const divisi = params.get("divisi");


    getListDaftarKaryawan({
      page, search, role, divisi 
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
      role: roleFilter || "",
      divisi: divisiFilter || "",
      search: searchFilter || ""
    }, history);
    setPage(1);
    setUpdate(update+1);
  }

  const resetQuery = () => {
    setQueryParams({}, history);
    setPage(1);
    setUpdate(update+1);
    setFilterDivisi(null)
    setFilterSearch(null)
    setFilterRole(null)
  }
  
  const handleDeleteKaryawan = () => {
    setDeleteKaryawan(null);
    console.log(deleteKaryawan)
    // DElete trus confirmation
  }

const [error, setError] = React.useState({});
const [comment, setComment] = React.useState("");

  const onSubmit = () => {
    // generate password
    setLoading(true);
    registerAkunAPI({
      comment,
    }).then(res=>{
        setComment("");
    }).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })
  }

  return (
    <div className={classes.root1}>

      <Grid container spacing={2} direction="column">
        <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Hasil Performa" className={classes.title} />
            {/* </div> */}
          </Grid>
          <Grid item xs={8}/>
        </Grid>
        </Grid>

        <Grid item xs={12} container>
        <Grid item xs={2} alignContent="">
        <TextField
          label="Periode"
          variant="outlined"
          size="small"
          className={classes.mb}
          fullWidth
          value={divisiFilter}
          onChange={e=>setFilterDivisi(e.target.value)}
          // multiple
          select
          bordered={true}
        >
          {divisiOptions.map(d=>(
            <MenuItem value={d.nama_divisi}>{d.nama_divisi}</MenuItem>
          ))}
        </TextField>
        </Grid>
        <Grid item xs={4}>
          {!(params.get("search") === searchFilter &&
            params.get("role") === roleFilter && 
            params.get("divisi") === divisiFilter) &&
            <button onClick={doQuery}>Apply</button>  
          }
          {(params.get("search") ||
            params.get("role") || 
            params.get("divisi")) &&
            <button onClick={resetQuery}>Reset</button>  
          }
        </Grid>
        </Grid>
      </Grid>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Jenis Paket </StyledTableCell>
                <StyledTableCell align="left">Score </StyledTableCell>
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
                    Tidak ada Daftar Karyawan
                  </StyledTableCell>
                </StyledTableRow>
                :
                listItem.map((row, i) => (
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                  </StyledTableRow>
                )))}
            </TableBody>
          </MuiTable>
        </TableContainer>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Final Score </StyledTableCell>
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
                    Tidak ada Daftar Karyawan
                  </StyledTableCell>
                </StyledTableRow>
                :
                listItem.map((row, i) => (
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                  </StyledTableRow>
                )))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <br></br>
        <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Evaluasi Diri" className={classes.title} />
            {/* </div> */}
          </Grid>
          <Grid item xs={8}/>
        </Grid>
        </Grid>
        <br></br>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Current Performance </StyledTableCell>
                <StyledTableCell align="left">Action(s) to do </StyledTableCell>
                <StyledTableCell align="left">Parameter</StyledTableCell>
                <StyledTableCell align="left">Komentar Manajemen</StyledTableCell>
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
                    Tidak ada Daftar Karyawan
                  </StyledTableCell>
                </StyledTableRow>
                :
                listItem.map((row, i) => (
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.role}</StyledTableCell>
                  </StyledTableRow>
                )))}
            </TableBody>
          </MuiTable>
        </TableContainer>

        <br></br>

        <Grid item xs={12}>
            <Typography style={{ fontWeight: 600, marginBottom: '2%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontWeight: 600, fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Comment
            </Typography>
          </Grid>

        <RedditTextField
                label="Answer text"
                className={classes.margin}
                // defaultValue="react-reddit"
                variant="filled"
                fullWidth="400"
                // id="reddit-input"
            />

        <div className="flex justify-center py-6">
          <TemplateButton
          // Lo gabisa bikin GIni
              onClick={onSubmit}
              type="button"
              buttonStyle="btnBlue"
              buttonSize="btnLong"
              disabled={loading}
              >
              Simpan
            </TemplateButton>
        </div>

        <div className={classes.pagination}>
          <Pagination 
            count={count} 
            page={page} 
            onChange={(_e,val)=>setPage(val)}
            />
        </div>
        {/* </Paper> */}
        <DeleteConfirmationDialog 
          open={!!deleteKaryawan}
          handleCancel={()=>setDeleteKaryawan(null)}
          handleConfirm={handleDeleteKaryawan}
        />
    </div>
  );
};

export default EvaluasiPerforma;