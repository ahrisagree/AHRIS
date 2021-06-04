import React, { useEffect, useState  } from 'react';
import Pagination from "@material-ui/lab/Pagination";
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
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import { getListAssignment } from 'api/borang';
import { PAGE_SIZE } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
// import { setQueryParams } from 'utils/setQueryParams';
import TextField from 'components/CustomTextField';
import { periodFormated } from 'utils/periodeConverter';
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

const DaftarKaryawanDinilai = ({history, user}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    // const [update, setUpdate] = useState(0);
    // const params = new URLSearchParams(history.location.search);
    // const [roleFilter, setFilterRole] = useState(params.get("role"));
    // const [searchFilter, setFilterSearch] = useState(params.get("search"));
    const [periodeFilter, setPeriodeFilter] = useState(new Date().toISOString().substr(0,7));

    useEffect(()=>{
      setLoading(true)
      // const search = params.get("search");
      const periode = periodeFilter
      // const id = params.idUser;
      getListAssignment({
        user_penilai: user.pk,
        page, 
        periode: periodFormated(periode)
        // search, 
      }).then(res=>{
        setListItem(res.data?.results);
        setCount(Math.ceil(res.data?.count/PAGE_SIZE));
      }).catch(err=>{
      // Handle ERROR
      }).finally(()=>{
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, periodeFilter]);


    const handleChangePeriod = (val) => {
      setPeriodeFilter(val);
      setPage(1);
    }
    // const doQuery = () => {
    //   setQueryParams({
    //     periode: periodeFilter || "",
    //     search: searchFilter || ""
    //   }, history);
    //   setPage(1);
    //   setUpdate(update+1);
    // }
  
    // const resetQuery = () => {
    //   setQueryParams({}, history);
    //   setPage(1);
    //   setPeriodeFilter(null)
    //   setFilterSearch(null)
    // }

   
    return (

      <div className={classes.root}>
    
    <div className={classes.root1}>
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Daftar Karyawan yang Dinilai" className={classes.title} />
            {/* </div> */}
          </Grid>
          <Grid item xs={8}/>
        </Grid>

        <Grid item xs={12} container>
        <Grid item xs={4} md={3} alignContent="">
        <div style={{position: 'relative', padding: 2}}>
             <TextField
            label="Periode"
            variant="outlined"
            size="small"
            className={classes.mb}
            fullWidth
            type="month"
            bordered={true}
            value={periodeFilter}
            onChange={e=>handleChangePeriod(e.target.value)}
         />
          </div>
          </Grid>
        {/* <Grid item xs={6} md={4} alignContent="">
        <div style={{position: 'relative', padding: 2}}>
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
          </div>
        </Grid> */}
        {/* <Grid item xs={2}>
        <div style={{position: 'relative', padding: 2}}>
          {!(params.get("periode") === periodeFilter && 
          params.get("search") === searchFilter) &&
            <TemplateButton 
            type="button"
            buttonStyle="btnBlueOutline"
            buttonSize="btnMedium" onClick={doQuery}>Apply</TemplateButton>  
          }
          {(params.get("search") ||
            params.get("periode")) &&
            <TemplateButton type="button"
            buttonStyle="btnBlueOutline"
            buttonSize="btnMedium" onClick={resetQuery}>Reset</TemplateButton>  
          }
        </div>
        </Grid> */}
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
                <StyledTableCell align="left">Progress</StyledTableCell>
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
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.user_dinilai.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.user_dinilai.role}</StyledTableCell>
                    <StyledTableCell align="left">{row.user_dinilai.divisi.map(x=> x.nama_divisi+", ")}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.list_paket_jawaban.length >= row.list_paket_pertanyaan.length ? 
                      <Status status="Done" />
                      :
                      `${row.list_paket_jawaban.length} / ${row.list_paket_pertanyaan.length}`
                      }
                    </StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                    {row.list_paket_jawaban.length < row.list_paket_pertanyaan.length &&
                      <TemplateButton
                          onClick={()=>history.push(`/mengisi-borang/${row.id}`)}
                          type="button"
                          buttonStyle="btnGreen"
                          buttonSize="btnMedium"
                      >
                          Lihat Borang
                      </TemplateButton>
                    }
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

export default DaftarKaryawanDinilai;