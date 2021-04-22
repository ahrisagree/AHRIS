import React, { useEffect, useState } from 'react';
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
  TextField,
  MenuItem,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import _, {debounce} from 'lodash';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getListPaketPertanyaanAPI, deletePaketPertanyaanAPI, getKategoriAPI } from 'api/borang';
import { JENIS_PAKET, PAGE_SIZE } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import DeleteConfirmationDialog from 'components/DialogConf';
import { setQueryParams } from 'utils/setQueryParams';
import CustomTextField from 'components/CustomTextField';

const useStyles = makeStyles({
    mb: {
      marginBottom: '1rem'
    }
  })
  const DaftarBorangPerforma = ({history}) => {
    
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [listItem, setListItem] = useState([]);
    const [optionKategori, setOptionKategori] = useState([]);
    const [divisiOptions, setDivisiOptions] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [deleteKaryawan, setDeleteKaryawan] = useState(null);
    const [deletePaket, setDeletePaket] = useState(null);
    const [fullLoading, setFullLoading] = useState(false);
    const [update, setUpdate] = useState(0);

      // buat ngefilter
      const params = new URLSearchParams(history.location.search);

      const [kategoriFilter, setFilterKategori] = useState(params.get("kategori"));
      const [jenisFilter, setFilterJenis] = useState(params.get("jenis"));
      const [searchFilter, setFilterSearch] = useState(params.get("search"));
    
    useEffect(()=>{
        setLoading(true)
        const kategori = params.get("kategori");
        const jenis = params.get("jenis");
        const search = params.get("search");

        getListPaketPertanyaanAPI({
        page, search, jenis, kategori 
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
        setUpdate(update+1);
        setFilterJenis(null);
        setFilterSearch(null);
        setFilterKategori(null);
      }

    
      const handleDeletePaket = () => {
        setFullLoading(true);
        deletePaketPertanyaanAPI(deletePaket.id).then(()=>{
          setDeletePaket(null);
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
            <MainTitle title="Daftar Borang" className={classes.title} />
          </Grid>
          <Grid item xs={8}/>
        </Grid>
        <Grid item xs={12} spacing={2} direction="row" container>
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

        <Grid item xs={5}/>
          <Grid item lg={2} alignContent="">
          <div style={{position: 'relative', display: 'inline-block'}}>
            <SearchIcon style={{position: 'absolute', right: 0, top: 10, width: 25, height: 25}}/>
                <TextField
                    label="Search"
                    fullWidth
                    bordered={true}
                    value={searchFilter}
                    onChange={e=>setFilterSearch(e.target.value)}
                    variant="outlined"
                    className={classes.mb}
                    size="small"
                    hintText="Search by Name"
                    // onChange={_,debounce((event, value) => this.handleSearch(value), 500)}
                  />

          </div>
          </Grid>
          <Grid item xs={1}>
          {!(params.get("search") === searchFilter &&
              params.get("kategori") === kategoriFilter && 
              params.get("jenis") === jenisFilter) &&
              <button onClick={doQuery} className="m-1">Apply</button>  
            }
            {(params.get("search") ||
              params.get("kategori") || 
              params.get("jenis")) &&
              <button onClick={resetQuery} className="m-1">Reset</button>  
            }
        </Grid>
        </Grid>
      </Grid>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama Karyawan </StyledTableCell>
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
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {`${i+1}.`}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.nama}</StyledTableCell>
                      <StyledTableCell align="left">{row.jenis}</StyledTableCell>
                      <StyledTableCell align="left">{row.kategori?.nama}</StyledTableCell>
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
                        Lihat Penilaian
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
        {/* </Paper> */}
        <DeleteConfirmationDialog 
          open={!!deleteKaryawan}
          handleCancel={()=>setDeleteKaryawan(null)}
          handleConfirm={handleDeletePaket}
        />
    </div>
  );
};  

export default DaftarBorangPerforma;