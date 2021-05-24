import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Typography,
  MenuItem,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  GridListTileBar,
  Divider
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import MainTitle from 'components/MainTitle';
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import TemplateButton from 'components/TemplateButton';
import { buatLogAPI } from 'api/log';
import Loading from 'components/Loading';
import Pagination from '@material-ui/lab/Pagination';
import { getDivisiAPI, getListDaftarKaryawan } from 'api/akun';
import { PAGE_SIZE, ROLES } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import DeleteConfirmationDialog from 'components/DialogConf';
import { setQueryParams } from 'utils/setQueryParams';
import { StyledTableCell, StyledTableRow } from "components/Table";
import { getListAssignment } from 'api/borang';
import { getPaketPertanyaanAPI } from 'api/borang';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';


const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E5E5E5",
    flexGrow: 1,
  },
  paper: {
    paddingTop: 25,
    paddingBottom: 50,
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
  disabledtextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily:"IBM Plex Sans",
    backgroundColor:"rgba(229, 229, 229, 0.51)"
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
  },
  splitScreen: {
    display: "flex",
    flexDirection: "row",
  },
  topPane: {
    width: "50%",
    marginRight:'0.5rem',
    marginTop:'1.4rem'
  },
  bottomPane: {
    width: "50%",
    marginLeft:'0.5rem'
  },
  mb: {
    marginBottom: '1rem',
  },
  table: {
  }
}));

const KelolaGaji = ({history}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const [listItem, setListItem] = useState([]);
  const [divisiOptions, setDivisiOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [deleteKaryawan, setDeleteKaryawan] = useState(null);

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
    setFilterDivisi(null);
    setFilterSearch(null);
    setFilterRole(null);
  }

  
    return (
        <div className={classes.splitScreen}>
        <div className={classes.topPane}>
            <MainTitle title="Daftar Gaji" className="mb-8"></MainTitle>

            <Grid item xs={10}>
            
          <TextField
            label="Role"
            variant="outlined"
            size="small"
            className={classes.mb}
            fullWidth
            select
            bordered={true}
            value={roleFilter}
            style= {{ width: "31%"}}
            onChange={e=>setFilterRole(e.target.value)}
          >
            {ROLES.map(r=>(
              <MenuItem value={r}>{r}</MenuItem>
            ))}
          </TextField>
      
        <TextField
          label="Divisi"
          variant="outlined"
          size="small"
          className={classes.mb}
          fullWidth
          value={divisiFilter}
          style= {{width: "31%"}}
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

        <Grid item xs={8}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            className={classes.mb}
            fullWidth
            bordered={true}
            value={searchFilter}
            style= {{width: "92%"}}
            onChange={e=>setFilterSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
        <Tooltip title="Download">
                        <IconButton size="medium">
                          <CloudDownloadIcon style={{ color: "#0A3142"}}/>
                        </IconButton>
                      </Tooltip>
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

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
                <StyledTableCell align="left">Gaji </StyledTableCell>
                <StyledTableCell align="left">Jumlah Log</StyledTableCell>
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
        <div className={classes.bottomPane}>
            
            <Container component={Paper} className={classes.paper}>
            <MainTitle title="Leonardo" className="mb-8"></MainTitle>

            <div className="row">
           
           <div className="col">
           <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Gaji Pokok
              <Typography style={{ fontWeight: 400,  fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', position:'absolute', right:50, letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Rp.14.000.000
            </Typography>
            </Typography>
            
           </div>
            
            </div>
            

            <div className="row">
            <Typography style={{ fontWeight: 600, marginLeft: '1%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
             fontSize: 18, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Penambahan Log
            </Typography>
            </div>

            <div className="row">
            <div className="col" style={{marginBottom: '3%'}}> 
            <Typography style={{ fontWeight: 400,  marginTop:20,fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', position:'absolute', right:50, letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Rp.300.000
              
            </Typography>

            <TextField
            required
            label="Jumlah Jam"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            /> 
            <TextField
            required
            label="Honor per Jam"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            /> 
           
            </div>
           
            </div>

            <div className="row">
           
           <div className="col" style={{marginBottom: '3%'}}>
           <Typography style={{ fontWeight: 600, marginLeft: '1%',fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Penyesuaian Gaji
              <Typography style={{ fontWeight: 400,  fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', position:'absolute', right:150, letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Rp.
            </Typography>
            <TextField
            required
            style={{ width: "20%", position:'relative', right:-240 }}
            margin="normal"
            variant="outlined"
            /> 
            </Typography>
            
           </div>
            
            </div>
            <Divider variant="middle" style={{width:'95%' }}/>
            <div className="row">
           
           <div className="col" style={{marginBottom: '3%', marginTop:'3%'}}>
           <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Total
              <Typography style={{ fontWeight: 400,  fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', position:'absolute', right:50, letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Rp.14.000.000
            </Typography>
            </Typography>
            
            
           </div>
            
            </div>

            <div className="row">
           
           
           <TemplateButton
              style={{position:'absolute', right:50}}
              variant="outlined"
              color="primary" 
              size="small"
              
              >
              Simpan
            </TemplateButton>
            
           
            </div>


            </Container>
        </div>
      </div>

    )
};
export default KelolaGaji;   