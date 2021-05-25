import React, { useEffect, useState } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import Button  from "components/TemplateButton";
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
import { getListLog, deleteLogAPI, getKaryawan } from 'api/log';
import { PAGE_SIZE, STATUS_LOG } from 'utils/constant';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import CircularProgress from 'components/Loading/CircularProgress';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import DeleteConfirmationDialog from 'components/DialogConf';
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

const DaftarLog = (props) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [fullLoading, setFullLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const [deleteLog, setDeleteLog] = useState(null);
  const [role, setRole] = useState("");
  const history = props.match.params.history;

  useEffect(()=>{
    setLoading(true)

    const id = props.match.params.id;

    getKaryawan(id).then(res=>{
      const { data } = res
      setRole(data.role);
    }).catch(err=>{
      // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })

    getListLog({
      user: id,  
      page
    }).then(res=>{
      setListItem(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })

  }, [page, update]);


  const handleDeleteLog = () => {
    setFullLoading(true);
    deleteLogAPI(deleteLog.id).then(()=>{
      setDeleteLog(null);
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
            <MainTitle title="Daftar Log" className={classes.title} />
          </Grid>
          <Grid item xs={8}/>
        </Grid>

        <Grid item container direction="row" justify="space-between">
          <Grid item xs={10}>
          <Link to={`/log-aktivitas`}>
            <Button
                variant="outlined"
                color="primary" 
                size="small"
                >
            + Create Log
            </Button>
          </Link>
          </Grid>

          {role === "Manager" ?
          <Grid item xs={2}>
            <Link to={`/daftar-log-karyawan`}>
              <TemplateButton size="small"
                  type="button"
                  buttonStyle="btnGreenOutline"
                  >
                  Daftar Log Karyawan
              </TemplateButton>
              </Link>
          </Grid>
          :
          <Grid item xs={2}>
            
          </Grid>
          
          }

        </Grid>
        
      </Grid>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Tanggal </StyledTableCell>
                <StyledTableCell align="left">Tipe Log </StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
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
                    <StyledTableCell align="left">{row.tanggal}</StyledTableCell>
                    <StyledTableCell align="left">{row.is_lembur ? "Lembur" : "Reguler"}</StyledTableCell>
                    <StyledTableCell align="left"><Status status={STATUS_LOG[row.status_log]} /></StyledTableCell>
                    <StyledTableCell align="center">
                    
                    <Link to={`/detail-log/${row.id}`}>
                    <TemplateButton 
                      type="button" 
                      buttonStyle="btnGreen" 
                      buttonSize="btnMedium"
                      >
                      View
                      </TemplateButton>
                    </Link>
                    
                    <Link to={`/edit-log/${row.id}`}>
                    <TemplateButton
                      type="button"
                      buttonStyle="btnYellow"
                      buttonSize="btnMedium"
                      disabled={STATUS_LOG[row.status_log] === "Disetujui" ? true : false}
                      >
                      Edit
                    </TemplateButton>
                    </Link>
 
                      <TemplateButton
                      type="button"
                      buttonStyle="btnDanger"
                      buttonSize="btnMedium"
                      onClick={()=>setDeleteLog(row)}
                      >
                      Delete
                    </TemplateButton>
                  
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
        <DeleteConfirmationDialog 
          open={!!deleteLog}
          handleCancel={()=>setDeleteLog(null)}
          handleConfirm={handleDeleteLog}
        />
        <DeleteConfirmationDialog 
          open={!!deleteLog}
          handleCancel={()=>setDeleteLog(null)}
          handleConfirm={handleDeleteLog}
        />
        <Loading open={fullLoading} />
    </div>
  );
}

export default DaftarLog;
