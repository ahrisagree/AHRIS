import React, { useEffect, useState } from 'react';
import ReactExport from "react-export-excel";
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
import Loading from 'components/Loading';
import Pagination from '@material-ui/lab/Pagination';
import { getDivisiAPI } from 'api/akun';
import { getListLog } from 'api/log';
import { PAGE_SIZE, ROLES } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import { setQueryParams } from 'utils/setQueryParams';
import { StyledTableCell, StyledTableRow } from "components/Table";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { editGaji, getListGaji } from 'api/gaji';


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
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const KelolaGaji = ({history, match}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const [listItem, setListItem] = useState([]);
  const [divisiOptions, setDivisiOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [jam, setJam] = useState(0);
  const [penyesuaian, setPenyesuaian] = useState(0);
  const [honor, setHonor] = useState(0);
  const [role, setRole] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [nominal, setNominal] = React.useState("");
  const [id, setId] = React.useState("");
  const [divisi, setDivisi] = React.useState([]);
  const [gaji, setGaji] = React.useState("");
  const [listLog, setListLog] = useState([]);
  const [total, setTotal] = useState(gaji+penyesuaian);
  const [detail, setDetail] = useState(null);
  const [update, setUpdate] = useState(0);
  const [periodeFilter, setPeriodeFilter] = useState(new Date().toISOString().substr(0,10));
  const [success, setSuccess] = useState(false);
  const params = new URLSearchParams(history.location.search);
  const { idUser } = match.params;

  const [roleFilter, setFilterRole] = useState(params.get("role"));
  const [divisiFilter, setFilterDivisi] = useState(params.get("divisi"));
  const [searchFilter, setFilterSearch] = useState(params.get("search"));
  
  useEffect(()=>{
    setLoading(true)
    const periode = periodeFilter;
    const search = params.get("search");
    const role = params.get("role");
    const divisi = params.get("divisi");

    getListGaji({
      page,
      periode,
      search,
      role,
      divisi
    }).then(res=>{
      setListItem(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })
  }, [page, update, periodeFilter]);

  useEffect(()=>{
    getDivisiAPI().then(res=>{
      setDivisiOptions(res.data);
    }).catch(err=>{
      console.error(err.response);
    })
  }, [])


  /*useEffect(()=>{
    setLoading(true);
    const id = match.params.id;
    getGaji(id).then(res => {
        const { data } = res;
        setUsername(data.user.username);
        setRole(data.user.role);
        setGaji(data.user.gaji);
        setNominal(data.nominal);
        setId(data.user.pk);
        console.log(data)
    }).catch(err=>{
      // HANDLE ERROR
    }).finally(()=>{
      setLoading(false)
    })
  }, [])*/

  useEffect(()=>{
    setLoading(true)
    if(detail !== null){
      getListLog({ 
        //disablepagination:true,
        user: detail.user.pk,
        status: 1
      }).then(res=>{
        setListLog(res.data?.results);
        //setCount(Math.ceil(res.data?.count/PAGE_SIZE));
      }).catch(err=>{
      // Handle ERROR
      }).finally(()=>{
        setLoading(false);
      })
    }
    }
    

  , [detail]);

  const onSubmit = () => {
    setLoading(true)
    editGaji(detail.id, {
      nominal: detail.user.gaji+honor*jam+penyesuaian
    }).then(res=>{
      setUpdate(update+1);
      setSuccess(true);
      console.log(res.data)
    }).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })

    
  }

  /*useEffect(()=>{
    setLoading(true)

    //const id = match.params.id;

    getListGaji({
      //user: id,  
      page
    }).then(res=>{
      setListItem(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })

  }, [page, update]);*/

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

  const detailUser = (row) => {
    setDetail(row);
    setPenyesuaian(row.nominal-row.user.gaji);
  }

  const handleChangePeriod = (val) => {
    setPeriodeFilter(val);
    setPage(1);
  }

  

  console.log(jam*honor)
  console.log(penyesuaian)
    return (
        <div className={classes.splitScreen}>
        <div className={classes.topPane}>
            <MainTitle title="Daftar Gaji" className="mb-8"></MainTitle>

            <Grid item xs={10} alignContent="">
        <div style={{position: 'relative', padding: 2}}>
             <TextField
            label="Periode"
            variant="outlined"
            size="small"
            className={classes.mb}
            fullWidth
            type="date"
            bordered={true}
            value={periodeFilter}
            onChange={e=>handleChangePeriod(e.target.value)}
         />
          </div>
          </Grid>

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
            style= {{ width: "45%"}}
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
          style= {{width: "45%", marginLeft: "9%"}}
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

        <Grid item xs={10}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            className={classes.mb}
            fullWidth
            bordered={true}
            value={searchFilter}
            onChange={e=>setFilterSearch(e.target.value)}
          />
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
                <StyledTableCell align="left">Divisi</StyledTableCell>
                
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
                  <StyledTableRow key={row.user}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <a style={{color:"#00A96F", textDecorationLine: "underline"}} onClick={()=>detailUser(row)}>{row.user.username}</a></StyledTableCell>
                    
                    <StyledTableCell align="left">{row.nominal}</StyledTableCell>
                    <StyledTableCell align="left">{row.user.divisi.map(x=> x.nama_divisi+", ")}</StyledTableCell>
                    
                    
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
        {detail !== null ?

         
        <div className={classes.bottomPane}>
            
            <Container component={Paper} className={classes.paper}>
            <MainTitle title={detail.user.username} style={{marginBottom:0}} className="mb-8"></MainTitle>
            <Typography style={{ fontWeight: 600, marginBottom: '5%',fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 16, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: 'black' }} 
            variant="subtitle1">
              {detail.user.role}
            </Typography>

            <div className="row">
           
           <div className="col">
           <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Gaji Pokok
              <Typography style={{ fontWeight: 400,  fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', position:'absolute', right:50, letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Rp.{detail.user.gaji}
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
              Rp.{jam*honor}
              
            </Typography>

            <TextField
            required
            label="Jumlah Jam"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            type="number"
            value={jam}
            onChange={e=>setJam(e.target.value)}
            /> 
            <TextField
            required
            label="Honor per Jam"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            type="number"
            value={honor}
            onChange={e=>setHonor(e.target.value)}
            /> 
           
            </div>
           
            </div>

            <div className="row">
           
           <div className="col" style={{marginBottom: '5%'}}>
             
           <Typography style={{ fontWeight: 600, marginLeft: '1%',fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Penyesuaian Gaji
              <Typography style={{ fontWeight: 400,  fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 18, lineHeight: '138%', position:'absolute', right:120, letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Rp.
            </Typography>
            <TextField
            required
            style={{ width: "5%", position:'absolute', right:50 }}
            margin="normal"
            variant="outlined"
            type="number"
            value={penyesuaian}
            onChange={e=>setPenyesuaian(e.target.value/1)}
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
              {detail.user.gaji+jam*honor+penyesuaian}
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
              onClick={onSubmit}
              >
              Simpan
            </TemplateButton>
            
           
            </div>

            <MainTitle title="Daftar Log" style={{marginTop:75}} className="mb-8"></MainTitle>
            <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Tanggal </StyledTableCell>
                <StyledTableCell align="left">Tipe Log </StyledTableCell>
                <StyledTableCell align="left">Waktu </StyledTableCell>
              
               
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
                listLog?.length === 0  ? 
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan="5">
                    Tidak ada Log Aktivitas
                  </StyledTableCell>
                </StyledTableRow>
                : 
                listLog.map((row, i) => (row.status_log === 1 ? <StyledTableRow key={row.tanggal}>
                <StyledTableCell component="th" scope="row">
                  {`${i+1}.`}
                </StyledTableCell>
                <StyledTableCell align="left">{row.tanggal}</StyledTableCell>
                <StyledTableCell align="left">{row.is_lembur ? "Lembur" : "Reguler"}</StyledTableCell>
                <StyledTableCell align="left">{row.total_jam/3600}</StyledTableCell>
               
              </StyledTableRow>
              :
              <a></a>
                  
                )))}
            </TableBody>
          </MuiTable>
        </TableContainer>
            </Container>
        </div>
        :
        <Container></Container>
      }
      <Dialog open={success} handleClose={()=>setSuccess(false)} ></Dialog>
        <DialogFail
          open={!!error.detail} 
          handleClose={()=>{
            setError({});
          }} 
          text={error.detail}
          />

<ExcelFile element={<button>Download Data</button>}>
                <ExcelSheet data={listItem} name="Employees">
                    <ExcelColumn label="Name" value="user.username"/>
                    <ExcelColumn label="Gaji" value="nominal"/>
                </ExcelSheet>
            </ExcelFile>
      </div>

      
    )
};
export default KelolaGaji;   