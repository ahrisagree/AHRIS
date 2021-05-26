import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Radio,
  FormControlLabel,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import { getDetailHasilPerforma} from 'api/hasilperforma';
import CircularProgress from 'components/Loading/CircularProgress';
import SuccessDialog from 'components/Dialog';
import FailDialog from 'components/DialogFail';
import Loading from 'components/Loading';
import TextField from 'components/CustomTextField';
import TemplateButton from 'components/TemplateButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import CreateIcon from '@material-ui/icons/CreateRounded';


const useStyles = makeStyles({})
const HasilPerforma = ({match, history, user}) => {
  const classes = useStyles();
  const [loadingAssignment, setLoadingAssignment] = useState(false);
  const [loadingPaket, setLoadingPaket] = useState(false);
  const loading = loadingAssignment || loadingPaket;
  const [fullLoading, setFullLoading] = useState(false);

  // const [update, setUpdate] = useState(0);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(null); 

  
  const [assignment, setAssignment] = useState(null);
  const [paketPertanyaan, setPaketPertanyaan] = useState(null);
  
  const { id } = match.params;
  useEffect(()=>{
    setLoadingPaket(true)
    setLoadingAssignment(true)
    
    getDetailHasilPerforma(id).then(res=>{
      const hasilperformaData = res.data;
      setAssignment(hasilperformaData);
    }).catch(err=>{
      console.log(err.response && err.response.data);
    }).finally(()=>{
      setLoadingAssignment(false);
    })

    // getPaketPertanyaanAPI(idPaket).then(res=>{
    //   const paketPertanyaanData = res.data;
    //   delete paketPertanyaanData.id;
    //   setPaketPertanyaan(paketPertanyaanData);
    // }).catch(err=>{
    //   console.log(err.response && err.response.data);
    // }).finally(()=>{
    //   setLoadingPaket(false);
    // })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // const handleChange = (indexAspek, indexPertanyaan, jawaban) => {
  //   const newPaket =  {...paketPertanyaan};
  //   newPaket.list_aspek[indexAspek].list_pertanyaan[indexPertanyaan].jawaban = jawaban;
  //   setPaketPertanyaan(newPaket);
  // }

  return (
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container>
          <Grid item alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title={`Hasil Performa`} className={classes.title} />
            {/* </div> */}
          </Grid>
        </Grid>
        <div className="flex w-full flex-wrap p-2">
          
        </div>

      </Grid>
        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            {loading ?
                <TableBody>
                  <TableRow>
                    <StyledTableCell>
                      <CircularProgress />
                    </StyledTableCell>
                  </TableRow>
                </TableBody>
            : ( !assignment  ? "Not Found" : 
              assignment.list_aspek.map((aspek, i)=>(
              <>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">{aspek.nama}</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aspek.deskripsi}
                    <>
                      <TableRow>
                        <StyledTableCell align="left">
                        <Grid container>
                          <Grid item xs={12} md={8}>
                            {aspek.deskripsi}
                          </Grid>
                          <Grid item xs={12} md={4} container justify="center">
                                <TextField
                                  required
                                  // value={pertanyaan.jawaban}
                                  // onChange={e=>handleChange(indexAspek, indexPertanyaan, e.target.value)}
                                  label="Jawaban"
                                  margin="normal"
                                  fullWidth
                                  multiline
                            
                                > Test </TextField>
                              
                              
            
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                      </TableRow>
                    </>
                </TableBody>
              </>
            )))}
          </MuiTable>
        </TableContainer>
        <Loading open={fullLoading} />
        <SuccessDialog open={success} handleClose={()=>history.push(`/mengisi-borang/${id}`)} />
        <FailDialog open={!!fail} handleClose={()=>setFail(null)} text={fail?.detail} />

        <Grid container spacing={2} direction="column">
        <Grid item xs={12} container>
          <Grid item alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title={`Evaluasi Diri | ${assignment?.user_dinilai?.username}`} className={classes.title} />
            {/* </div> */}
          </Grid>

          <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">  </StyledTableCell>
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
                // listItem?.length === 0 ? 
                // <StyledTableRow>
                //   <StyledTableCell align="center" colSpan="5">
                //     Tidak ada Daftar Karyawan
                //   </StyledTableCell>
                // </StyledTableRow>
                // :
                // listItem.map((row, i) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {/* {`${i+1}.`} */}
                    </StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={()=>history.push(`/akun/`)}>
                          <CreateIcon style={{ color: "green"}}/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" >
                          <DeleteOutlineIcon style={{ color: "red"}}/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                )
                // )
                }
            </TableBody>
          </MuiTable>
        </TableContainer>
        </Grid>
        <div className="flex w-full flex-wrap p-2">
          
        </div>

      </Grid>
    </div>
  );
};

export default HasilPerforma;