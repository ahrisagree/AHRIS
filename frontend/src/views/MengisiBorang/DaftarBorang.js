import React, { useEffect, useState  } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Breadcrumbs from 'components/Breadcrumbs';
import TemplateButton from 'components/TemplateButton';
import CustomTextField from 'components/CustomTextField';
import Button  from "components/Button";
import {
  makeStyles,
  withStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import { getListAssignment } from 'api/borang';
import { PAGE_SIZE } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';



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

export default function BasicPagination() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    
    useEffect(()=>{
      setLoading(true)
  
      getListAssignment({
        page
      }).then(res=>{
        setListItem(res.data?.results);
        setCount(Math.ceil(res.data?.count/PAGE_SIZE));
      }).catch(err=>{
      // Handle ERROR
      }).finally(()=>{
        setLoading(false);
      })
    }, [page]);



    const [role, setRole] = React.useState('');

    const handleChange = (event) => {
        setRole(event.target.value);
      };

   
    return (

      <div className={classes.root}>
      {/* // <div className={classes.title}>
      //   <h4 style={{fontFamily: "IBM Plex Sans", fontSize: "24px", fontWeight:600}}>Daftar Borang</h4>
      //   <div style={{width:414, height: 12, backgroundColor:"#FFB800", borderRadius: 4}}></div>
      // </div> */}
    
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Daftar Borang" className={classes.title} />
            {/* </div> */}
          </Grid>
          <Grid item xs={8}/>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={2} alignContent="flex-end">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="role">Role</InputLabel>
            <Select
            labelId="role"
            id="role"
            value={role}
            onChange={handleChange}
            label="role"
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10} />
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
                    Tidak ada borang yang perlu diisi
                  </StyledTableCell>
                </StyledTableRow>
                :
                listItem.map((row, i) => (
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.user_dinilai.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.user_dinilai.role}</StyledTableCell>
                    <StyledTableCell align="left">{row.user_dinilai.divisi.map(x=> x.nama_divisi+", ")}</StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                    <TemplateButton
                        onClick={() => {
                        console.log("Ini nanti diganti");
                        }}
                        type="button"
                        buttonStyle="btnGreen"
                        buttonSize="btnLong"
                    >
                        Isi Penilaian
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
}

// export default DaftarBorang;