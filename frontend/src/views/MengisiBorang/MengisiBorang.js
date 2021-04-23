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
  Radio,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import CreateIcon from '@material-ui/icons/CreateRounded';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getListPaketPertanyaanAPI, deletePaketPertanyaanAPI, getKategoriAPI, getDetailAssignment } from 'api/borang';
import { JENIS_PAKET, PAGE_SIZE } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import DeleteConfirmationDialog from 'components/DialogConf';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import { setQueryParams } from 'utils/setQueryParams';
import CustomTextField from 'components/CustomTextField';
import TextField from 'components/CustomTextField';

const useStyles = makeStyles({})
const DaftarPaketPertanyaan = ({match}) => {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
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
//   const params = new URLSearchParams(history.location.search);

//   const [kategoriFilter, setFilterKategori] = useState(params.get("kategori"));
//   const [jenisFilter, setFilterJenis] = useState(params.get("jenis"));
//   const [searchFilter, setFilterSearch] = useState(params.get("search"));
  const [list_paket_pertanyaan, setListPaketPertanyaan] = useState([]);
  const [assignment, setAssignment] = useState(null);

  useEffect(()=>{
    const { id } = match.params;
    setLoading(true)
    getDetailAssignment(id).then(res=>{
      setAssignment(res.data)
      setListPaketPertanyaan(res.data?.list_paket_pertanyaan);
    }).catch(err=>{

    }).finally(()=>{
      setLoading(false);
    })
  }, [match]);

  useEffect(()=>{
    setLoading(true)
    // const params = new URLSearchParams(history.location.search)
    // const kategori = params.get("kategori");
    // const jenis = params.get("jenis");
    // const search = params.get("search");

    // console.log(history.location.search)
    // console.log(params.get("page"))z
    getListPaketPertanyaanAPI({
      page, 
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

  
  

//   const doQuery = () => {
//     setQueryParams({
//       kategori: kategoriFilter || "", 
//       jenis: jenisFilter || "", 
//       search: searchFilter || ""
//     }, history);
//     setPage(1);
//     setUpdate(update+1);
//   }

//   const resetQuery = () => {
//     setQueryParams({}, history);
//     setPage(1);
//     setUpdate(update+1);
//     setFilterJenis(null);
//     setFilterSearch(null);
//     setFilterKategori(null);
//   }
  
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
            <MainTitle title="Isi Borang | nama yg dinilai" className={classes.title} />
            {/* </div> */}
          </Grid>
        </Grid>
        <div className="flex w-full flex-wrap p-2">
          {/* <div className="w-full md:w-1/3 my-2 md:mr-2"> */}

            {/* <CustomTextField
              label="Search"
              variant="outlined"
              size="small"
              fullWidth
              bordered={true}
              value={searchFilter}
              onChange={e=>setFilterSearch(e.target.value)}
              />
          </div> */}
          {/* <div className="w-1/4 md:w-1/6 my-2 md:mx-2">
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
          </div> */}
          {/* <div className="w-1/4 md:w-1/6 m-2">
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
          </div> */}
          {/* <div className="flex items-center">
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
          </div> */}
        </div>

      </Grid>
        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell align="left">Skala </StyledTableCell>
                <StyledTableCell align="left"> 1 2 3 4 5</StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="left">Nama Aspek </StyledTableCell>
                <StyledTableCell align="left"> </StyledTableCell>
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
                list_paket_pertanyaan?.length === 0 ? 
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan="5">
                    Tidak ada Paket Pertanyaan
                  </StyledTableCell>
                </StyledTableRow>
                :
                list_paket_pertanyaan.map((row, i) => (
                  <StyledTableRow key={row.name}>
                    {/* ini harusnya per pertanyaan per baris gitu tp blm nemu caranya */}
                    <StyledTableCell align="left">{row.list_aspek.map(x=> x.list_pertanyaan.map(r=> r.pertanyaan))}</StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                    <Radio
                        checked={selectedValue === '1'}
                        onChange={handleChange}
                        value="1"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '1' }}
                    />
                    <Radio
                        checked={selectedValue === '2'}
                        onChange={handleChange}
                        value="2"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '2' }}
                    />
                    <Radio
                        checked={selectedValue === '3'}
                        onChange={handleChange}
                        value="3"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '3' }}
                    />
                    <Radio
                        checked={selectedValue === '4'}
                        onChange={handleChange}
                        value="4"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '4' }}
                    />
                    <Radio
                        checked={selectedValue === '5'}
                        onChange={handleChange}
                        value="5"
                        name="radio-button-demo"
                        inputProps={{ 'aria-label': '5' }}
                    />
                    </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                )))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left"> Pertanyaan </StyledTableCell>
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
                    {/* <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell> */}
                    <StyledTableCell align="left">
                                <TextField
                        required
                        label="Jawaban"
                        margin="normal"
                        style={{width: '50%', minWidth: '20rem', marginBottom: '2rem'}}
                    />
                    </StyledTableCell>
                  </StyledTableRow>
                )))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <h1>Test</h1>
        <TextField
            required
            label="Jawaban"
            margin="normal"
            style={{width: '50%', minWidth: '20rem', marginBottom: '2rem'}}
          />
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
};

export default DaftarPaketPertanyaan;