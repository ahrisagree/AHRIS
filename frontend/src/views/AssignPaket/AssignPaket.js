import React, { useEffect, useState } from 'react';
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
  withStyles,
  Checkbox
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getListPaketPertanyaanAPI, getKategoriAPI } from 'api/borang';
import { JENIS_PAKET, PAGE_SIZE } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import { setQueryParams } from 'utils/setQueryParams';
import CustomTextField from 'components/CustomTextField';
const useStyles = makeStyles((theme) => ({
  root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    
  root1: {
      flexGrow: 1,
  
  },
title: {
  /*position: "relative",*/
  top: 0,
},
table: {
  minWidth: 500,
},
pagination: {
    marginTop: theme.spacing(1),
    color: "#0B3242",
    display: 'flex',
    justifyContent: 'flex-end'
},
button: {
  display: 'flex',
  justifyContent: 'space-evenly'
},

}));
const CustomCheckbox = withStyles({
  root: {
    color: '#0A3142',
    '&$checked': {
      color: '#0A3142',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AssignPaket = ({
  history,
  selectedBorang,
  setSelectedBorang,
  onSelect,
  nextStep
}) => {
  
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
  const [searchFilter, setFilterSearch] = useState(params.get("searchPaket"));

  useEffect(()=>{
    setLoading(true)
    const kategori = params.get("kategori");
    const jenis = params.get("jenis");
    const search = params.get("searchPaket");

    getListPaketPertanyaanAPI({
      page, kategori, jenis, search
    }).then(res=>{
      setListItem(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
  
    }).finally(()=>{
      setLoading(false);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, update]);

  useEffect(()=>{
    getKategoriAPI().then(res=>{
      setOptionKategori(res.data);
    })
  },[])

  const doQuery = () => {
    setQueryParams({
      kategori: kategoriFilter || "", 
      jenis: jenisFilter || "", 
      searchPaket: searchFilter || ""
    }, history);
    setPage(1);
    setUpdate(update+1);
  }

  const resetQuery = () => {
    setQueryParams({}, history);
    setPage(1);
    setUpdate(update+1);
    setFilterJenis(null);
    setFilterSearch(null);
    setFilterKategori(null);
  }

  const handleSelect = val => () => {
    // console.log(onSelect, selectedBor)
    onSelect(setSelectedBorang, selectedBorang, val)
  }

  return (
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Pilih Borang Pertanyaan" className={classes.title} />
            {/* </div> */}
          </Grid>
        </Grid>

        <Grid item xs={12} container >
          <Grid item xs={2} alignContent=""> 
          <div style={{position: 'relative', padding: 2}}>
            <CustomTextField
              label="Search"
              variant="outlined"
              type="search"
              size="small"
              fullWidth
              bordered={true}
              value={searchFilter}
              onChange={e=>setFilterSearch(e.target.value)}
              />
            </div>
          </Grid>

          <Grid item xs={2} alignContent=""> 
          <div style={{position: 'relative', padding: 2}}>
            <CustomTextField
              label="Jenis"
              variant="outlined"
              size="small"
              fullWidth
              select
              bordered={true}
              value={jenisFilter}
              onChange={e=>setFilterJenis(e.target.value)}
            >
              {JENIS_PAKET.map(j=>(
                <MenuItem value={j.value}>{j.label}</MenuItem>
              ))}
            </CustomTextField>
            </div>
            </Grid>

            <Grid item xs={2} alignContent=""> 
             <div style={{position: 'relative', padding: 2}}>
            <CustomTextField
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
            </CustomTextField>
            </div>
            </Grid>


            {!(params.get("searchPaket") === searchFilter &&
              params.get("kategori") === kategoriFilter && 
              params.get("jenis") === jenisFilter) &&
              <button onClick={doQuery} className="m-1">Apply</button>  
            }
            {(params.get("searchPaket") ||
              params.get("kategori") || 
              params.get("jenis")) &&
              <button onClick={resetQuery} className="m-1">Reset</button>  
            }
            </Grid>


      </Grid>
        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left"> </StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
                <StyledTableCell align="left">Jenis </StyledTableCell>
                <StyledTableCell align="left">Kategori</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* INI yang selected yah */}
              {selectedBorang.map(row => (
                <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                <CustomCheckbox checked={true} onChange={handleSelect(row)}/>
                </StyledTableCell>
                <StyledTableCell align="left">{row.nama}</StyledTableCell>
                <StyledTableCell align="left">{row.jenis}</StyledTableCell>
                <StyledTableCell align="left">{row.kategori?.nama}</StyledTableCell>
              </StyledTableRow>
              ))}
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
                    Tidak ada Paket Pertanyaan
                  </StyledTableCell>
                </StyledTableRow>
                :
                listItem.map(row => !selectedBorang.find(x=>x.id===row.id) && ( // check gada di selected
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                    <CustomCheckbox onChange={handleSelect(row)}/>
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.nama}</StyledTableCell>
                    <StyledTableCell align="left">{row.jenis}</StyledTableCell>
                    <StyledTableCell align="left">{row.kategori?.nama}</StyledTableCell>
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
        <Grid item xs={12} justify="center">
          {selectedBorang.length === 0 && !loading &&
            <p className="text-red-500 text-center text-sm">Harap pilih Paket Pertanyaan untuk penilaian</p>
          }
        </Grid>
        <Grid item xs={12} className={classes.button}>
          <TemplateButton 
            onClick={nextStep}
            type="button"
            buttonStyle="btnBlue"
            buttonSize="btnLong"
            disabled={loading || selectedBorang.length === 0}
          >
            Selanjutnya
          </TemplateButton>
        </Grid>
    </div>
  );
};

export default AssignPaket;