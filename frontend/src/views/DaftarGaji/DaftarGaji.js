import React, { useEffect, useState } from 'react';
import Button  from "components/TemplateButton";
import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  MenuItem,
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getDivisiAPI, getListDaftarKaryawan, deleteKaryawanAPI } from 'api/akun';
import { PAGE_SIZE, ROLES } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import DeleteConfirmationDialog from 'components/DialogConf';
import SearchIcon from '@material-ui/icons/Search';
import _, {debounce} from 'lodash';
import Loading from 'components/Loading';
import { setQueryParams } from 'utils/setQueryParams';
import CustomButton from 'components/CustomButton';
// import { PinDropSharp } from '@material-ui/icons';


const useStyles = makeStyles({
  mb: {
    marginBottom: '1rem'
  }
})
const DaftarGaji = ({history}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [divisiOptions, setDivisiOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [deleteKaryawan, setDeleteKaryawan] = useState(null);
  const [fullLoading, setFullLoading] = useState(false);

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
    setFullLoading(true);
    deleteKaryawanAPI(deleteKaryawan.pk).then(()=>{
     setDeleteKaryawan(null);
     setUpdate(update+1);
    }).catch(err=>{
      // Handle ERROR
      }).finally(()=>{
        setFullLoading(false);
      });
    }

  return (
    <div className={classes.root1}>

      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={2} alignContent="flex-start">
            <MainTitle title="Daftar Gaji" className={classes.title} />
          </Grid>
          <Grid item xs={10}>
          
          </Grid>
        </Grid>

        
        <Grid item xs={12} container>

        <Grid item xs={2} alignContent="">
        <div style={{position: 'relative', display: 'inline-block', padding: 2}}>
                <SearchIcon style={{position: 'absolute', right: 0, top: 10, width: 25, height: 25}}/>
                <TextField
                    label="Search"
                    fullWidth
                    bordered={true}
                    value={searchFilter}
                    onChange={e=>setFilterSearch(e.target.value)}
                    variant="outlined"
                    className={classes.mb}
                    size="small"
                    hintText="Search by Name"
                  />
          </div>
        </Grid>
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
        <Grid item xs={5}>
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
        <Grid item xs={1} alignContent="flex-end">
        <Tooltip title="Download">
                        <IconButton size="medium">
                          <CloudDownloadIcon style={{ color: "#0A3142", position:"absolute", right: 0}}/>
                        </IconButton>
                      </Tooltip>
          </Grid>
        </Grid>
      </Grid>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
                <StyledTableCell align="left">Gaji </StyledTableCell>
                <StyledTableCell align="left">Jumlah Log</StyledTableCell>
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
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.gaji}</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                    <Button
                        variant="outlined"
                        color="primary" 
                        size="small"
                        onClick={()=>history.push('/kelola-gaji')}
                    >
                    Edit
                    </Button>
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
        {/* </Paper> */}
        <DeleteConfirmationDialog 
          open={!!deleteKaryawan}
          handleCancel={()=>setDeleteKaryawan(null)}
          handleConfirm={handleDeleteKaryawan}
        />
         <Loading open={fullLoading} />
    </div>
  );
};

export default DaftarGaji;
