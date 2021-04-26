
import React, { useEffect, useState  } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from "@material-ui/lab/Pagination";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Breadcrumbs from 'components/Breadcrumbs';
import TemplateButton from 'components/TemplateButton';
import CustomTextField from 'components/CustomTextField';
import Button  from "components/Button";
import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Tooltip,
  MenuItem,
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import { getDetailAssignment, getKategoriAPI } from 'api/borang';
import { PAGE_SIZE, JENIS_PAKET } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import { setQueryParams } from 'utils/setQueryParams';
import TextField from 'components/CustomTextField';
import { PanoramaSharp } from '@material-ui/icons';



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

const DaftarBorangPerforma = ({history}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [optionKategori, setOptionKategori] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [update, setUpdate] = useState(0);
    const params = new URLSearchParams(history.location.search);
    const [kategoriFilter, setFilterKategori] = useState(params.get("kategori"));
    const [jenisFilter, setFilterJenis] = useState(params.get("jenis"));
    const [searchFilter, setFilterSearch] = useState(params.get("search"));
    // const [jenis, setRole] = React.useState("");
    const [listBorang, setPaketBorang] = React.useState([]);

  

    useEffect(()=>{
      setLoading(true)
      const kategori = params.get("kategori");
      const jenis = params.get("jenis");
      const search = params.get("search");
      const {id} = params;
      getDetailAssignment(({
        page, jenis, search, kategori, id 
      })).then(res=>{
        setListItem(res.data);
        setPaketBorang(res.data?.list_paket_pertanyaan);
        setCount(Math.ceil(res.data?.count/PAGE_SIZE));
        console.log(res.data?.list_paket_pertanyaan);
      }).catch(err=>{
      // Handle ERROR
      }).finally(()=>{
        setLoading(false);
      })
    }, []);

    useEffect(()=>{
      getKategoriAPI().then(res=>{
        setOptionKategori(res.data);
      })
    },[])


    const doQuery = () => {
      setQueryParams({
        kategori: kategoriFilter || "", 
        jenis: jenisFilter || "", 
        search: searchFilter || ""
      }, history);
      setPage(1);
      setUpdate(update+1);
    }
  
    const resetQuery = () => {
      setQueryParams({}, history);
      setPage(1);
      setFilterJenis(null);
      setFilterSearch(null);
      setFilterKategori(null);
    }

   
    return (    
    <div className={classes.root1}>
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title="Daftar Borang" className={classes.title} />
          </Grid>
          <Grid item xs={8}/>
        </Grid>
        <Grid item xs={12} spacing={2} direction="row" container>
        <Grid item xs={2} alignContent="">
          <div style={{position: 'relative', padding: 2}}>
          <TextField
            label="Jenis"
            variant="outlined"
            size="small"
            className={classes.mb}
            fullWidth
            select
            bordered={true}
            value={jenisFilter}
            onChange={e=>setFilterJenis(e.target.value)}
          >
              {JENIS_PAKET.map(j=>(
                <MenuItem value={j.value}>{j.label}</MenuItem>
              ))}
          </TextField>
          </div>
        </Grid>

        <Grid item xs={2} alignContent="">
        <div style={{position: 'relative', padding: 2}}>
        <TextField
              label="Kategori"
              variant="outlined"
              size="small"
              fullWidth
              select
              bordered={true}
              value={kategoriFilter}
              onChange={e=>setFilterKategori(e.target.value)}
            >
              {optionKategori.map(k=>(
                <MenuItem value={k.nama}>{k.nama}</MenuItem>
              ))}
            </TextField>
        </div>
        </Grid>

        <Grid item xs={5}/>
          <Grid item lg={2} alignContent="">
          <div style={{position: 'relative', padding: 2}}>
          <SearchIcon style={{position: 'absolute', right: 0, top: 10, width: 25, height: 25}}/>
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
          </Grid>

          <Grid item xs={1}>
          {!(params.get("jenis") === jenisFilter && 
          params.get("search") === searchFilter &&
          params.get("kategori") === kategoriFilter) &&
            <TemplateButton 
            type="button"
            buttonStyle="btnBlueOutline"
            buttonSize="btnMedium" onClick={doQuery}>Apply</TemplateButton>  
          }
          {(params.get("search") ||
            params.get("jenis") &&
            params.get("kategori")) &&
            <TemplateButton type="button"
            buttonStyle="btnBlueOutline"
            buttonSize="btnMedium" onClick={resetQuery}>Reset</TemplateButton>  
          }
        </Grid>
        </Grid>
      </Grid>

      <br></br>
      <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama Borang </StyledTableCell>
                <StyledTableCell align="left">Jenis Paket </StyledTableCell>
                <StyledTableCell align="left">Kategori</StyledTableCell>
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
                listBorang?.length === 0 ? 
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan="5">
                    Tidak ada borang yang perlu diisi
                  </StyledTableCell>
                </StyledTableRow>
                :
                listBorang.map((row, i) => (
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.nama}</StyledTableCell>
                    <StyledTableCell align="left">{row.jenis}</StyledTableCell>
                    <StyledTableCell align="left">{row.kategori.nama}</StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                    <TemplateButton
                        // onClick={()=>history.push(`/akun/${row.pk}`)}
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
  );
}

export default DaftarBorangPerforma;