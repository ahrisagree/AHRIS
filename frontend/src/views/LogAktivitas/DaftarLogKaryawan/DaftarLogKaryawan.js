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
  MenuItem
} from '@material-ui/core';
import { getListLogKaryawan, getKaryawan, setujuiLogAPI } from 'api/log';
import { PAGE_SIZE, STATUS_LOG_LABEL, STATUS_LOG } from 'utils/constant';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import CircularProgress from 'components/Loading/CircularProgress';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import { setQueryParams } from 'utils/setQueryParams';
import CustomTextField from 'components/CustomTextField';
import TextField from 'components/CustomTextField';
import Status from 'components/Status';


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

const DaftarLogKaryawan = (props) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [fullLoading, setFullLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const [statusLog, setStatusLog] = React.useState("");
  const {user} = props;
  const {history} = props;
  const [role, setRole] = React.useState(user.role);

  const params = new URLSearchParams(history.location.search);

  const [searchFilter, setFilterSearch] = useState(params.get("search"));
  const [statusFilter, setFilterStatus] = useState(params.get("status"));
  const [penyetujuFilter, setFilterPenyetuju] = useState(params.get("penyetuju"));
  const [tanggalSetelahFilter, setFilterTanggalSetelah] = useState(params.get("date_after"));
  const [tanggalSebelumFilter, setFilterTanggalSebelum] = useState(params.get("date_before"));


  useEffect(()=>{
    setLoading(true)
    const search = params.get("search");
    const status = params.get("status");
    const penyetuju = params.get("penyetuju");
    const tanggalSetelah = params.get("date_after");
    const tanggalSebelum = params.get("date_before");
    
    
    getListLogKaryawan({
      page, search, status, penyetuju, tanggalSetelah, tanggalSebelum
    }).then(res=>{
      setListItem(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })

  }, [page, update]);


    const sendDisetujui = (id) => {
      setLoading(true)
      setujuiLogAPI(id, {
        status_log: 1,
      }).then(res => {
        setUpdate(true);
      }).catch(err => {

      }).finally(() => {
        setLoading(false);
      })
    }

  const sendDitolak = (id) => {
    setLoading(true);
    setujuiLogAPI(id, {
      status_log: 2,
    }).then(res => {
      setUpdate(true);
    }).catch(err => {

    }).finally(() => {
      setLoading(false);
    })
  }

  const doQuery = () => {
    setQueryParams({
      search: searchFilter || "",
      status: statusFilter || "",
      penyetuju: penyetujuFilter || "",
      tanggalSetelah: tanggalSetelahFilter || "",
      tanggalSebelum: tanggalSebelumFilter || ""
    }, history);
    setPage(1);
    setUpdate(update+1);
  }

  const resetQuery = () => {
    setQueryParams({}, history);
    setPage(1);
    setUpdate(update+1);
    setFilterSearch(null);
    setFilterStatus(null);
    setFilterPenyetuju(null);
    setFilterTanggalSetelah(null);
    setFilterTanggalSebelum(null);
  }

    return (
    <div className={classes.root1}>
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title="Daftar Log Karyawan" className={classes.title} />
          </Grid>
          <Grid item xs={8}/>
        </Grid>
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
                label="Status"
                variant="outlined"
                size="small"
                className={classes.mb}
                fullWidth
                value={statusFilter}
                onChange={e=>setFilterStatus(e.target.value)}
                select
                bordered={true}
              >
                {STATUS_LOG_LABEL.map(s=>(
                  <MenuItem value={s.value}>{s.label}</MenuItem>
                ))}
              </TextField>
          </div>

          <div className="w-full md:w-1/3 my-2 md:mr-2">

            <CustomTextField
              label="Penyetuju"
              variant="outlined"
              size="small"
              fullWidth
              bordered={true}
              value={penyetujuFilter}
              onChange={e=>setFilterPenyetuju(e.target.value)}
              />
            
          </div>

          <div className="w-full md:w-1/3 my-2 md:mr-2">
              <CustomTextField
                variant="outlined"
                id="date"
                label="Dari"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={tanggalSebelumFilter}
                onChange={e=>{setFilterTanggalSebelum(e.target.value)}}
                disabled={loading}
                />
          </div>

          <div className="w-full md:w-1/3 my-2 md:mr-2">
              <CustomTextField
                variant="outlined"
                id="date"
                label="Sampai"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={tanggalSetelahFilter}
                onChange={e=>{setFilterTanggalSetelah(e.target.value)}}
                disabled={loading}
                />
          </div>


          <div className="flex items-center">
            {!(params.get("search") === searchFilter &&
              params.get("date_after") === tanggalSetelahFilter &&
              params.get("date_before") === tanggalSebelumFilter &&
              params.get("status") === statusFilter &&
              params.get("penyetuju") === penyetujuFilter) &&
              <button onClick={doQuery} className="m-1">Apply</button>  
            }
            {(params.get("search") ||
             params.get("date_after") ||
             params.get("date_before") ||
             params.get("status") ||
             params.get("penyetuju")) &&
            <button onClick={resetQuery} className="m-1">Reset</button>  
            }
          </div>
      
      </div>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama Karyawan </StyledTableCell>
                <StyledTableCell align="left">Tanggal </StyledTableCell>
                <StyledTableCell align="left">Tipe Log </StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Aktivitas</StyledTableCell>
                <StyledTableCell align="left">Pengevaluasi</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
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
                    Tidak ada Log Aktivitas
                  </StyledTableCell>
                </StyledTableRow>
                :
                listItem.map((row, i) => (
                  <StyledTableRow key={row.tanggal}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.user === null ? "Tidak ada user" : row.user?.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.tanggal}</StyledTableCell>
                    <StyledTableCell align="left">{row.is_lembur ? "Lembur" : "Reguler"}</StyledTableCell>
                    <StyledTableCell align="left"><Status status={STATUS_LOG[row.status_log]} /></StyledTableCell>
                    <StyledTableCell align="left">{row.aktivitas}</StyledTableCell>
                    <StyledTableCell align="left">{row.manajer_penyetuju !== null ? row.manajer_penyetuju.username : "" }</StyledTableCell>
                    <StyledTableCell align="center">
                    
                    <Link to={`/log/${row.id}`}>
                    <TemplateButton 
                      type="button" 
                      buttonStyle="btnGreen" 
                      buttonSize="btnMedium"
                      >
                      View
                      </TemplateButton>
                    </Link>
                    
                    </StyledTableCell>
                    
                     {role === "Manager" ?
                    
                    <div>
                    
                    <StyledTableCell align="left">
                      <TemplateButton
                      onClick={()=>{sendDisetujui(row.id)}}
                      type="button"
                      buttonStyle="btnGreen"
                      buttonSize="btnMedium"
                    >
                      Setujui
                    </TemplateButton>
                    </StyledTableCell>
                    
                    <StyledTableCell align="left">
                      <TemplateButton
                        onClick={()=>{sendDitolak(row.id)}}
                        type="button"
                        buttonStyle="btnDanger"
                        buttonSize="btnMedium"
                        
                      >
                        Tolak
                      </TemplateButton>
                    </StyledTableCell>

                    </div>
                    :

                    <StyledTableCell align="left">
                    </StyledTableCell>

                    }                    
                  


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

export default DaftarLogKaryawan;

// import React, { useEffect, useState } from 'react';
// import Pagination from "@material-ui/lab/Pagination";
// import TemplateButton  from "components/TemplateButton";
// import {
//   makeStyles,
//   Table as MuiTable,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Grid,
// } from '@material-ui/core';
// import { getListLogKaryawan, getLog, setujuiLogAPI, getKaryawan } from 'api/log';
// import { PAGE_SIZE, STATUS_LOG } from 'utils/constant';
// import { StyledTableCell, StyledTableRow } from "components/Table";
// import MainTitle from "components/MainTitle";
// import CircularProgress from 'components/Loading/CircularProgress';
// import { Link } from 'react-router-dom';
// import Loading from 'components/Loading';

// const useStyles = makeStyles((theme) =>({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
  
//   root1: {
//     flexGrow: 1,

//   },
//   table: {
//     minWidth: 500
//   },
//   pagination: {
//     '& > *': {
//       marginTop: theme.spacing(1),
//       color: "#0B3242",
//       marginLeft: "77%",
//     },
//   },
//   page: {
//     width: "92%",
//     height: "100%",
//     position: "absolute",
//     padding: "3%",
//     fontWeight: "bold",
//     color: "#FFFF",
//     background: "#E5E5E5",
//     left: 0,
//     top: 0,
//     textAlign:"right"
//   },
//     container: {
//       position: "absolute",
//       paddingTop: "10%",
//       fontWeight: "bold",
//       color: "#FFFF",
//       background: "linear-gradient(180deg, #00A96F 0%, #437B74 100%)",
//       boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
//       width: 524,
//       height: "100%",
//       minHeight: 700,
//       left: 0,
//       top: 0,
//     },
    
//     title: {
//       right : -160
//     }
// }));

// const DaftarLogKaryawan = (props) => {
  
//   const classes = useStyles();
//   const [loading, setLoading] = useState(false);
//   const [listItem, setListItem] = useState([]);
//   const [page, setPage] = useState(1);
//   const [count, setCount] = useState(0);
//   const [fullLoading, setFullLoading] = useState(false);
//   const [update, setUpdate] = useState(0);
//   const [error, setError] = React.useState({});
//   const [statusLog, setStatusLog] = React.useState("");
//   const [role, setRole] = React.useState("");
//   const [manajer, setManajer] = React.useState([]);
//   const {user} = props;

//   useEffect(()=>{
//     setLoading(true)
    
//     getListLogKaryawan({
//       page
//     }).then(res=>{
//       // setListItem(res.data?.results);
//       setCount(Math.ceil(res.data?.count/PAGE_SIZE));
//     }).catch(err=>{
//     // Handle ERROR
//     }).finally(()=>{
//       setLoading(false);
//     })

//     getKaryawan(user.pk).then(res=>{
//       const { data } = res
//       setRole(data.role);
//       setManajer(data);
//     }).catch(err=>{
//       // Handle ERROR
//     }).finally(()=>{
//       setLoading(false);
//     })

//   }, [page, update]);

//     const sendKomentarSetuju = (id) => {
//       setLoading(true);
//       setStatusLog(STATUS_LOG[1]);
//       setujuiLogAPI(id, {
//         status_log: 1,
//       }).then(res => {
//         setUpdate(true);
//       }).catch(err => {
//         setError(err.response && err.response.data);
//       }).finally(() => {
//         setLoading(false);
//       })
//     }

//     const sendKomentarTolak = (id) => {
//       setLoading(true);
//       setStatusLog(STATUS_LOG[2]);
//       setujuiLogAPI(id, {
//         status_log: 2,
//       }).then(res => {
//         setUpdate(true);
//       }).catch(err => {
//         setError(err.response && err.response.data);
//       }).finally(() => {
//         setLoading(false);
//       })
//     }

//     return (
//     <div className={classes.root1}>
//       <Grid container spacing={2} direction="column">
//       <Grid item xs={12} container>
//           <Grid item xs={4} alignContent="flex-start">
//             <MainTitle title="Daftar Log Karyawan" className={classes.title} />
//           </Grid>
//           <Grid item xs={8}/>
//         </Grid>
//       </Grid>

//         <TableContainer component={Paper}>
//           <MuiTable className={classes.table} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="left">No </StyledTableCell>
//                 <StyledTableCell align="left">Nama Karyawan </StyledTableCell>
//                 <StyledTableCell align="left">Tanggal </StyledTableCell>
//                 <StyledTableCell align="left">Tipe Log </StyledTableCell>
//                 <StyledTableCell align="left">Status</StyledTableCell>
//                 <StyledTableCell align="left">Aktivitas</StyledTableCell>
//                 <StyledTableCell align="left">Pengevaluasi</StyledTableCell>
//                 <StyledTableCell align="center">Action</StyledTableCell>
//                 <StyledTableCell align="center"></StyledTableCell>
//                 <StyledTableCell align="center"></StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? 
//               <StyledTableRow>
//                 <StyledTableCell align="center" colSpan="5">
//                   <CircularProgress />
//                 </StyledTableCell>
//               </StyledTableRow>
//               : (
//                 listItem?.length === 0 ? 
//                 <StyledTableRow>
//                   <StyledTableCell align="center" colSpan="5">
//                     Tidak ada Log Aktivitas
//                   </StyledTableCell>
//                 </StyledTableRow>
//                 :
//                 listItem.map((row, i) => (
//                   <StyledTableRow key={row.tanggal}>
//                     <StyledTableCell component="th" scope="row">
//                       {`${i+1}.`}
//                     </StyledTableCell>
//                     <StyledTableCell align="left">{row.user.username}</StyledTableCell>
//                     <StyledTableCell align="left">{row.tanggal}</StyledTableCell>
//                     <StyledTableCell align="left">{row.is_lembur ? "Lembur" : "Reguler"}</StyledTableCell>
//                     <StyledTableCell align="left">{STATUS_LOG[row.status_log]}</StyledTableCell>
//                     <StyledTableCell align="left">{row.aktivitas}</StyledTableCell>
//                     <StyledTableCell align="left">{row.manajer_penyetuju !== null ? row.manajer_penyetuju.username : "" }</StyledTableCell>
//                     <StyledTableCell align="center">
                    
//                     <Link to={`/detail-log/${row.id}`}>
//                     <TemplateButton 
//                       type="button" 
//                       buttonStyle="btnGreen" 
//                       buttonSize="btnMedium"
//                       >
//                       View
//                       </TemplateButton>
//                     </Link>
                    
                  
//                     </StyledTableCell>
                    
//                     {role === "Manager" ?
                    
//                     <div>
                    
//                     <StyledTableCell align="left">
//                       <TemplateButton
//                       onClick={sendKomentarSetuju(row.id)}
//                       type="button"
//                       buttonStyle="btnGreen"
//                       buttonSize="btnMedium"
//                     >
//                       Setujui
//                     </TemplateButton>
//                     </StyledTableCell>
                    
//                     <StyledTableCell align="left">
//                       <TemplateButton
//                         onClick={sendKomentarTolak(row.id)}
//                         type="button"
//                         buttonStyle="btnDanger"
//                         buttonSize="btnMedium"
                        
//                       >
//                         Tolak
//                       </TemplateButton>
//                     </StyledTableCell>

//                     </div>
//                     :

//                     <StyledTableCell align="left">
//                     </StyledTableCell>

//                     }

//                   </StyledTableRow>
//                 )))}
//             </TableBody>
//           </MuiTable>
//         </TableContainer>
//         <div className={classes.pagination}>
//           <Pagination 
//             count={count} 
//             page={page} 
//             onChange={(_e,val)=>setPage(val)}
//             />
//         </div>

//         <Loading open={fullLoading} />
//     </div>
//   );
// }

// export default DaftarLogKaryawan;