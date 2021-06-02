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
  MenuItem,
  Tooltip,
  IconButton
} from '@material-ui/core';
import { getListLogKaryawan, setujuiLogAPI } from 'api/log';
import { getListDaftarKaryawan } from 'api/akun';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
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
import { exportLog } from 'utils/csv';

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
  const [update, setUpdate] = useState(false);

  const {user} = props;
  const {history} = props;
  const [role] = React.useState(user.role);
  const [karyawanOptions, setKaryawanOptions] = useState([]);

  const params = new URLSearchParams(history.location.search);

  const [searchFilter, setFilterSearch] = useState(params.get("search"));
  const [userFilter, setFilterUser] = useState(params.get("user"));
  const [statusFilter, setFilterStatus] = useState(params.get("status"));
  const [penyetujuFilter, setFilterPenyetuju] = useState(params.get("penyetuju"));
  const [tanggalSetelahFilter, setFilterTanggalSetelah] = useState(params.get("date_after"));
  const [tanggalSebelumFilter, setFilterTanggalSebelum] = useState(params.get("date_before"));


  useEffect(()=>{
    setLoading(true)
    const search = params.get("search");
    const user = params.get("user");
    const status = params.get("status");
    const penyetuju = params.get("penyetuju");
    const date_after = params.get("date_after");
    const date_before = params.get("date_before");
    
    
    getListLogKaryawan({
      page, search, status, penyetuju, date_after, date_before, user
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
    getListDaftarKaryawan({
      disablepagination: true
    }).then(res=>{
      setKaryawanOptions(res.data);
    }).catch(err=>{
      console.error(err.response);
    })
  }, [])


  const sendDisetujui = (id) => {
    setFullLoading(true);
    setujuiLogAPI(id, {
      status_log: 1,
    }).then(res => {
      setUpdate(true);
    }).catch(err => {

    }).finally(() => {
      setFullLoading(false);
    })
  }

  const sendDitolak = (id) => {
    setFullLoading(true);
    setujuiLogAPI(id, {
      status_log: 2,
    }).then(res => {
      setUpdate(true);
    }).catch(err => {

    }).finally(() => {
      setFullLoading(false);
    })
  }

  const doQuery = () => {
    setQueryParams({
      search: searchFilter || "",
      user: userFilter || "",
      status: statusFilter || "",
      penyetuju: penyetujuFilter || "",
      date_after: tanggalSetelahFilter || "",
      date_before: tanggalSebelumFilter || ""
    }, history);
    setPage(1);
    setUpdate(update+1);
  }

  const resetQuery = () => {
    setQueryParams({}, history);
    setPage(1);
    setUpdate(update+1);
    setFilterSearch("");
    setFilterUser("");
    setFilterStatus("");
    setFilterPenyetuju("");
    setFilterTanggalSetelah("");
    setFilterTanggalSebelum("");
  }

  const exportCSV = () => {
    const search = params.get("search");
    const user = params.get("user");
    const status = params.get("status");
    const penyetuju = params.get("penyetuju");
    const date_after = params.get("date_after");
    const date_before = params.get("date_before");

    getListLogKaryawan({
      search, user, status, penyetuju, date_after, date_before, disablepagination: true 
    }).then(res=>{
      exportLog(res.data, karyawanOptions.find(x => x.pk === user/1)?.username || "List Log");
    })
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
              label="Cari Karyawan"
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
                label="Nama Karyawan"
                variant="outlined"
                size="small"
                className={classes.mb}
                fullWidth
                value={userFilter}
                onChange={e=>setFilterUser(e.target.value)}
                select
                bordered={true}
              >
                {karyawanOptions.map(k=>(
                  <MenuItem value={k.pk}>{k.username}</MenuItem>
                ))}
              </TextField>
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
                  <MenuItem value={s.value ===  0 ? '0' : s.value}>{s.label}</MenuItem>
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
                id="date_dari"
                label="Dari Tanggal"
                size="small"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={tanggalSetelahFilter}
                onChange={e=>{setFilterTanggalSetelah(e.target.value)}}
                disabled={loading}
                />
          </div>

          <div className="w-full md:w-1/3 my-2 md:mr-2">
              <CustomTextField
                variant="outlined"
                id="date_sampai"
                label="Sampai Tanggal"
                size="small"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={tanggalSebelumFilter}
                onChange={e=>{setFilterTanggalSebelum(e.target.value)}}
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
                  <StyledTableRow key={row.id}>
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
                    
                    <>
                    
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

                    </>
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
