
import React, { useEffect, useState  } from 'react';
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
import { getListPaketPertanyaanAPI } from 'api/borang';
import CircularProgress from 'components/Loading/CircularProgress';
import CustomTextField from 'components/CustomTextField';
import { periodFormated } from 'utils/periodeConverter';



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

const DaftarBorangPerforma = ({history, match}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    // const [assignment, setAssignment] = useState(null);
    const [listBorang, setPaketBorang] = React.useState([]);
    const [periodeFilter, setPeriodeFilter] = useState(new Date().toISOString().substr(0,7));

    const { idDinilai } = match.params;

    useEffect(()=>{
      setLoading(true)
      // const kategori = params.get("kategori");
      // const jenis = params.get("jenis");
      // const search = params.get("search");
      getListPaketPertanyaanAPI({
        disablepagination: true, 
        dinilaiAssigned: idDinilai,
        periodeAssigned: periodFormated(periodeFilter)
      }).then(res=>{
        // setAssignment(res.data);
        setPaketBorang(res.data);
        console.log(res.data);
      }).catch(err=>{
        // Handle ERROR
        }).finally(()=>{
          setLoading(false);
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[periodeFilter]);
      
    //     page, jenis, search, kategori, id 
    //   })).then(res=>{
    //     setListItem(res.data);
    //     setPaketBorang(res.data?.list_paket_pertanyaan);
    //     setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    //     console.log(res.data?.list_paket_pertanyaan);
    //   }).catch(err=>{
    //   // Handle ERROR
    //   }).finally(()=>{
    //     setLoading(false);
    //   })
    // }, []);

    // useEffect(()=>{
    //   getKategoriAPI().then(res=>{
    //     setOptionKategori(res.data);
    //   })
    // },[]);


    // const doQuery = () => {
    //   setQueryParams({
    //     kategori: kategoriFilter || "", 
    //     jenis: jenisFilter || "", 
    //     search: searchFilter || ""
    //   }, history);
    //   setPage(1);
    //   setUpdate(update+1);
    // }
  
    // const resetQuery = () => {
    //   setQueryParams({}, history);
    //   setPage(1);
    //   setFilterJenis(null);
    //   setFilterSearch(null);
    //   setFilterKategori(null);
    // }

   return (    
    <div className={classes.root}>
          <div className={classes.root1}>
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title={`Daftar Borang |`} className={classes.title} />
          </Grid>
          <Grid item xs={8} />

        </Grid>
        <Grid item xs={12} justify="flex-end" container>
          <Grid item xs={4} md={3} >
            <div style={{position: 'relative', padding: 2}}>
                <CustomTextField
                label="Periode"
                variant="outlined"
                size="small"
                className={classes.mb}
                fullWidth
                type="month"
                bordered={true}
                value={periodeFilter}
                onChange={e=>setPeriodeFilter(e.target.value)}
                />
            </div>
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
                        onClick={()=>history.push(`/kelola-performa/${idDinilai}/${row.id}/?periode=${periodeFilter}`)}
                        type="button"
                        buttonStyle="btnGreen"
                        buttonSize="btnMedium"
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
    </div>
    </div>
  );
}

export default DaftarBorangPerforma;