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
import { getListHasilPerforma } from 'api/hasilperforma';
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

const DaftarHasilPerforma = ({history, match, user}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [listHasilPerforma, setHasilPerforma] = React.useState([]);
    const [periodeFilter, setPeriodeFilter] = useState(new Date().toISOString().substr(0,7));


  

    useEffect(()=>{
      setLoading(true)
      // const { id } = match.params;
      getListHasilPerforma( {
        periode: periodFormated(periodeFilter),
        user: user.pk}).then(res=>{
        setAssignment(res.data?.results);
        setHasilPerforma(res.data?.results);
        console.log(res.data?.nama);
      }).catch(err=>{
      // Handle ERROR
      }).finally(()=>{
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [periodeFilter]);
   
    return (

      <div className={classes.root}>
    
    <div className={classes.root1}>
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title={`Daftar Hasil Performa`} className={classes.title} />
            {/* </div> */}
          </Grid>
          <Grid item xs={8}/>
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

        <Grid item xs={12} container>
        {/* <Grid item xs={2} alignContent="">
        <TextField
          label="Periode"
          variant="outlined"
          size="small"
          className={classes.mb}
          fullWidth
          value={divisiFilter}
          onChange={e=>setFilterDivisi(e.target.value)}
          // multiple
          select
          bordered={true}
        >
          {divisiOptions.map(d=>(
            <MenuItem value={d.nama_divisi}>{d.nama_divisi}</MenuItem>
          ))}
        </TextField>
        </Grid> */}
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama Borang </StyledTableCell>
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
                listHasilPerforma?.length === 0 ? 
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan="5">
                    Belum ada hasil penilaian performa
                  </StyledTableCell>
                </StyledTableRow>
                :
                listHasilPerforma?.map((row, i) => (
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.nama}</StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                    {/* ini ganti */}
                    {/* {assignment.list_paket_jawaban.find(x=>x.paket_pertanyaan===row.id) ? 
                    "Sudah Diisi": */}
                      <TemplateButton
                          onClick={()=>history.push(`/hasil-performa/${row.id}/?periode=${periodeFilter}`)}
                          type="button"
                          buttonStyle="btnGreen"
                          buttonSize="btnLong"
                      >
                          Lihat Hasil Penilaian
                      </TemplateButton>
                    {/* } */}
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

export default DaftarHasilPerforma;