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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import CreateIcon from '@material-ui/icons/CreateRounded';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getDivisiAPI, getListDaftarKaryawan, deleteKaryawanAPI, editUser } from 'api/akun';
import { PAGE_SIZE, ROLES } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import DeleteConfirmationDialog from 'components/DialogConf';
import SearchIcon from '@material-ui/icons/Search';
import _, {debounce} from 'lodash';
import Loading from 'components/Loading';
import { setQueryParams } from 'utils/setQueryParams';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import { PinDropSharp } from '@material-ui/icons';


const useStyles = makeStyles({
  mb: {
    marginBottom: '1rem'
  }
})
const DaftarKaryawan = ({history}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [divisiOptions, setDivisiOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [deleteKaryawan, setDeleteKaryawan] = useState(null);
  const [fullLoading, setFullLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

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
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title="Kelola Akun" className={classes.title} />
          </Grid>
          <Grid item xs={8}/>
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
                    type="search"
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

          <Grid item xs={2} alignContent="">
          <Button
              variant="outlined"
              color="primary" 
              size="small"
              onClick={()=>history.push('/akun/register')}
              >
              + Tambah Akun
            </Button>
          </Grid>
        </Grid>
      </Grid>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
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
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.role}</StyledTableCell>
                    <StyledTableCell align="left">{row.divisi.map(x=> x.nama_divisi+", ")}</StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                    <Tooltip title="View">
                        <IconButton size="small" onClick={()=>history.push(`/akun/${row.pk}`)}>
                          <VisibilityIcon style={{ color: "#0A3142"}}/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={()=>history.push(`/akun/edit/${row.pk}`)}>
                          <CreateIcon style={{ color: "green"}}/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={()=>setDeleteKaryawan(row)}>
                          <DeleteOutlineIcon style={{ color: "red"}}/>
                        </IconButton>
                      </Tooltip>
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

export default DaftarKaryawan;
