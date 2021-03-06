import React, { useEffect, useState } from 'react';
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
  MenuItem,
  Checkbox,
  withStyles
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getDivisiAPI, getListDaftarKaryawan } from 'api/akun';
import { PAGE_SIZE, ROLES } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import { setQueryParams } from 'utils/setQueryParams';



const useStyles = makeStyles((theme) => ({
  root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    
  root1: {
      flexGrow: 1,
  
  },
title: {
  /*position: "relative",*/
  top: 0,
},
table: {
  minWidth: 500,
},
pagination: {
  marginTop: theme.spacing(1),
  color: "#0B3242",
  display: 'flex',
  justifyContent: 'flex-end'
  
},
button: {
  display: 'flex',
  justifyContent: 'space-evenly'
},

}));
const CustomCheckbox = withStyles({
  root: {
    color: '#0A3142',
    '&$checked': {
      color: '#0A3142',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const AssignResponden = ({
  history,
  selectedDinilai,
  setSelectedDinilai,
  onSelect,
  nextStep,
  prevStep
}) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [divisiOptions, setDivisiOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  // const [deleteKaryawan, setDeleteKaryawan] = useState(null);

  // buat ngefilter
  const [update, setUpdate] = useState(0);
  
  const params = new URLSearchParams(history.location.search);

  const [roleFilter, setFilterRole] = useState(params.get("roleDinilai"));
  const [divisiFilter, setFilterDivisi] = useState(params.get("divisiDinilai"));
  const [searchFilter, setFilterSearch] = useState(params.get("searchDinilai"));

  useEffect(()=>{
    setLoading(true)
    
    const search = params.get("searchDinilai");
    const role = params.get("roleDinilai");
    const divisi = params.get("divisiDinilai");


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
      roleDinilai: roleFilter || "",
      divisiDinilai: divisiFilter || "",
      searchDinilai: searchFilter || ""
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

  const handleSelect = val => () => {
    onSelect(setSelectedDinilai, selectedDinilai, val, 'pk')
  }

  return (
    <div className={classes.root1}>

      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Pilih Penerima Evaluasi" className={classes.title} />
            {/* </div> */}
          </Grid>
        </Grid>
        </Grid>

        <div className="flex w-full flex-wrap p-2">
          <div className="w-full md:w-1/3 my-2 md:mr-2">
          <TextField
            label="Search"
            variant="outlined"
            type="search"
            size="small"
            className={classes.mb}
            fullWidth
            bordered={true}
            value={searchFilter}
            onChange={e=>setFilterSearch(e.target.value)}
          />
          </div>
          <div className="w-1/4 md:w-1/6 my-2 md:mx-2">
          <TextField
            label="Role"
            variant="outlined"
            size="small"
            className={classes.mb}
            fullWidth
            select
            bordered={true}
            value={roleFilter}
            onChange={e=>setFilterRole(e.target.value)}
          >
            {ROLES.map(r=>(
              <MenuItem value={r}>{r}</MenuItem>
            ))}
          </TextField>
        </div>
        <div className="w-1/4 md:w-1/6 m-2">
        <TextField
          label="Divisi"
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
        </div>
        <div className="flex items-center">
          {!(params.get("searchDinilai") === searchFilter &&
            params.get("roleDinilai") === roleFilter && 
            params.get("divisiDinilai") === divisiFilter) &&
            <button onClick={doQuery}>Apply</button>  
          }
          {(params.get("searchDinilai") ||
            params.get("roleDinilai") || 
            params.get("divisiDinilai")) &&
            <button onClick={resetQuery}>Reset</button>  
          }
        </div>
      </div>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left"></StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
                <StyledTableCell align="left">Role </StyledTableCell>
                <StyledTableCell align="left">Divisi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* INI yang selected yah */}
              {selectedDinilai.map(row => (
                <StyledTableRow key={row.username}>
                  <StyledTableCell component="th" scope="row">
                      <CustomCheckbox checked={true} onChange={handleSelect(row)}/>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.username}</StyledTableCell>
                  <StyledTableCell align="left">{row.role}</StyledTableCell>
                  <StyledTableCell align="left">{row.divisi.map(x=> x.nama_divisi+", ")}</StyledTableCell>
                </StyledTableRow>
              ))}
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
                listItem.map((row) => !selectedDinilai.find(x=>x.pk===row.pk) && ( // check gada di selected
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                    <CustomCheckbox onChange={handleSelect(row)} />
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.role}</StyledTableCell>
                    {/* <StyledTableCell align="left">{row.nama_divisi?.username}</StyledTableCell> */}
                    <StyledTableCell align="left">{row.divisi.map(x=> x.nama_divisi+", ")}</StyledTableCell>
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
        <Grid item xs={12} justify="center">
          {selectedDinilai.length === 0 && !loading &&
            <p className="text-red-500 text-center text-sm">Harap pilih karyawan yang akan dinilai</p>
          }
        </Grid>
        <Grid item xs={12} className={classes.button}>
        <TemplateButton 
          onClick={prevStep}
          type="button"
          buttonStyle="btnBlueOutline"
          buttonSize="btnLong"
          disabled={loading}
        >
          Sebelumnya
        </TemplateButton>
        <TemplateButton 
          onClick={nextStep}
          type="button"
          buttonStyle="btnBlue"
          buttonSize="btnLong"
          disabled={loading || selectedDinilai.length === 0}
        >
          Selanjutnya
        </TemplateButton>
        </Grid>
    </div>
  );
};

export default AssignResponden;
