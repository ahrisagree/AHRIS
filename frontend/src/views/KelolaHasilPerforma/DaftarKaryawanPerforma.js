import React, { useEffect, useState } from 'react';
import TemplateButton from 'components/TemplateButton';
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
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import TextField from 'components/CustomTextField';
import Pagination from '@material-ui/lab/Pagination';
import { getDivisiAPI, getListDaftarKaryawan } from 'api/akun';
import { PAGE_SIZE, ROLES } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import { setQueryParams } from 'utils/setQueryParams';

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
      // color: "primary",
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
      // position: "relative",
      // top: 40,
      right : -160
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));
  const DaftarKaryawanPerforma = ({history}) => {
    
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [update, setUpdate] = useState(0);
    const [divisiOptions, setDivisiOptions] = useState([]);
    const params = new URLSearchParams(history.location.search);

      // buat ngefiltet

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
      setFilterDivisi(null);
      setFilterSearch(null);
      setFilterRole(null);
    }

  return (
    <div className={classes.root}>
      <div className={classes.root1}>

      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title="Daftar Karyawan" className={classes.title} />
          </Grid>
          <Grid item xs={8}/>
        </Grid>
        <Grid item xs={12} spacing={2} direction="row" container>
        <Grid item xs={2} alignContent="">
          <div style={{position: 'relative', padding: 2}}>
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
        </Grid>

          
        <Grid item xs={2} alignContent="">
        <div style={{position: 'relative', padding: 2}}>
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
        </Grid>

        <Grid item xs={5}/>
          <Grid item lg={2} alignContent="">
          <TextField
              label="Search"
              type="search"
              fullWidth
              bordered={true}
              value={searchFilter}
              onChange={e=>setFilterSearch(e.target.value)}
              variant="outlined"
              className={classes.mb}
              size="small"
              hintText="Search by Name"
              // onChange={_,debounce((event, value) => this.handleSearch(value), 500)}
            />
          </Grid>
          <Grid item xs={1}>
          <div style={{position: 'relative', padding: 2}}>
            {!(params.get("search") === searchFilter &&
              params.get("role") === roleFilter && 
              params.get("divisi") === divisiFilter) &&
              <TemplateButton 
              type="button"
              buttonStyle="btnBlueOutline"
              buttonSize="btnMedium" onClick={doQuery}>Apply</TemplateButton>   
            }
            {(params.get("search") ||
              params.get("role") || 
              params.get("divisi")) &&
              <TemplateButton type="button"
              buttonStyle="btnBlueOutline"
              buttonSize="btnMedium" onClick={resetQuery}>Reset</TemplateButton> 
            }
        </div>
        </Grid>
        </Grid>
      </Grid>
      <br></br>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama Karyawan </StyledTableCell>
                <StyledTableCell align="left">Role </StyledTableCell>
                <StyledTableCell align="left">Divisi</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell> 

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
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.role}</StyledTableCell>
                    <StyledTableCell align="left">{row.divisi.map(x=> x.nama_divisi+", ")}</StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                        <TemplateButton
                        onClick={()=>history.push(`/kelola-performa/${row.pk}`)}
                        type="button"
                        buttonStyle="btnGreen"
                        buttonSize="btnMedium"
                    >
                        Lihat Borang
                    </TemplateButton>
                    </Grid>
                    </StyledTableCell>
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
    </div>
    </div>
  );
};  

export default DaftarKaryawanPerforma;