import React, { useEffect, useState } from 'react';
import Button  from "components/TemplateButton";
import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  MenuItem,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import CreateIcon from '@material-ui/icons/CreateRounded';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getListPaketPertanyaanAPI, deletePaketPertanyaanAPI, getKategoriAPI } from 'api/borang';
import { JENIS_PAKET, PAGE_SIZE } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import DeleteConfirmationDialog from 'components/DialogConf';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import { setQueryParams } from 'utils/setQueryParams';
import CustomTextField from 'components/CustomTextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TemplateButton from 'components/TemplateButton';


const useStyles = makeStyles({})
const DaftarPaketPertanyaan = ({history}) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [optionKategori, setOptionKategori] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [deletePaket, setDeletePaket] = useState(null);
  const [fullLoading, setFullLoading] = useState(false);
  const [update, setUpdate] = useState(0);

  // FILTER
  const params = new URLSearchParams(history.location.search);

  const [kategoriFilter, setFilterKategori] = useState(params.get("kategori"));
  const [jenisFilter, setFilterJenis] = useState(params.get("jenis"));
  const [searchFilter, setFilterSearch] = useState(params.get("search"));

  useEffect(()=>{
    setLoading(true)
    // const params = new URLSearchParams(history.location.search)
    const kategori = params.get("kategori");
    const jenis = params.get("jenis");
    const search = params.get("search");

    // console.log(history.location.search)
    // console.log(params.get("page"))z
    getListPaketPertanyaanAPI({
      page, kategori, jenis, search
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
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container>
          <Grid item alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Kelola Paket Pertanyaan" className={classes.title} />
            {/* </div> */}
          </Grid>
        </Grid>
        <Grid item xs={12} container justify="flex-end">
            <Button
              variant="outlined"
              color="primary" 
              size="small"
              onClick={()=>history.push('/paket-pertanyaan/add')}
              >
              + Buat Paket
            </Button>
          </Grid>
        <div className="flex w-full flex-wrap p-2">
          <div className="w-full md:w-1/3 my-2 md:mr-2">

            <CustomTextField
              label="Search"
              variant="outlined"
              size="small"
              type="search"
              fullWidth
              bordered={true}
              value={searchFilter}
              onChange={e=>setFilterSearch(e.target.value)}
              />
          </div>
          <div className="w-1/4 md:w-1/6 my-2 md:mx-2">
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
          <div className="w-1/4 md:w-1/6 m-2">
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
          <div className="flex items-center">
            {!(params.get("search") === searchFilter &&
              params.get("kategori") === kategoriFilter && 
              params.get("jenis") === jenisFilter) &&
              <TemplateButton type="button"
              buttonStyle="btnBlueOutline"
              buttonSize="btnMedium" onClick={doQuery} className="m-1">Apply</TemplateButton>  
            }
            {(params.get("search") ||
              params.get("kategori") || 
              params.get("jenis")) &&
              <TemplateButton type="button"
              buttonStyle="btnBlueOutline"
              buttonSize="btnMedium" onClick={resetQuery} className="m-1">Reset</TemplateButton>  
            }
          </div>
        </div>

      </Grid>
        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
                <StyledTableCell align="left">Jenis </StyledTableCell>
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
                listItem?.length === 0 ? 
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan="5">
                    Tidak ada Paket Pertanyaan
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
                      <Tooltip title="View">
                        <Link to={`/paket-pertanyaan/${row.id}`}>
                          <IconButton size="small">
                            <VisibilityIcon style={{ color: "#0A3142"}}/>
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Link to={`/paket-pertanyaan/${row.id}/edit`}>
                          <IconButton size="small">
                            <CreateIcon style={{ color: "green"}}/>
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={()=>setDeletePaket(row)}>
                          <DeleteOutlineIcon style={{ color: "red"}}/>
                        </IconButton>
                      </Tooltip>
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
          open={!!deletePaket}
          handleCancel={()=>setDeletePaket(null)}
          handleConfirm={handleDeletePaket}
        />
        <Loading open={fullLoading} />
    </div>
  );
};

export default DaftarPaketPertanyaan;