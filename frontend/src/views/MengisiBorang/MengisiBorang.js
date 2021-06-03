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
} from '@material-ui/core';
import { StyledTableCell } from "components/Table";
import MainTitle from "components/MainTitle";
import { getDetailAssignment, getPaketPertanyaanAPI } from 'api/borang';
import { postJawabanAPI } from 'api/jawaban';
import CircularProgress from 'components/Loading/CircularProgress';
import SuccessDialog from 'components/Dialog';
import FailDialog from 'components/DialogFail';
import Loading from 'components/Loading';
import TextField from 'components/CustomTextField';
import TemplateButton from 'components/TemplateButton';

const useStyles = makeStyles({})
const DaftarPaketPertanyaan = ({match, history}) => {
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
  const { idPaket } = match.params; // cek routes.js
  useEffect(()=>{
    setLoadingPaket(true)
    setLoadingAssignment(true)
    
    getDetailAssignment(id).then(res=>{
      const assignmentData = res.data;
      setAssignment(assignmentData);
    }).catch(err=>{
      console.log(err.response && err.response.data);
    }).finally(()=>{
      setLoadingAssignment(false);
    })

    getPaketPertanyaanAPI(idPaket).then(res=>{
      const paketPertanyaanData = res.data;
      delete paketPertanyaanData.id;
      setPaketPertanyaan(paketPertanyaanData);
    }).catch(err=>{
      console.log(err.response && err.response.data);
    }).finally(()=>{
      setLoadingPaket(false);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendData = () => {
    setFullLoading(true);
    const formatedListAspek = paketPertanyaan.list_aspek.map(aspek=>({
      nama: aspek.nama,
      bobot: aspek.bobot,
      list_jawaban: aspek.list_pertanyaan
    }));
    postJawabanAPI({
      ...paketPertanyaan,
      paket_pertanyaan: idPaket,
      kategori: paketPertanyaan.kategori.nama,
      assignment: assignment.id,
      list_aspek: formatedListAspek
    }).then(()=>{
      setSuccess(true);
    }).catch(err=>{
      console.error(err.response && err.response.data)
      setFail(err && err.response && err.response.data);
    }).finally(()=>{
      setFullLoading(false);
    })
  }

  const handleChange = (indexAspek, indexPertanyaan, jawaban) => {
    const newPaket =  {...paketPertanyaan};
    newPaket.list_aspek[indexAspek].list_pertanyaan[indexPertanyaan].jawaban = jawaban;
    setPaketPertanyaan(newPaket);
  }

  return (
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container>
          <Grid item alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title={`Isi Borang | ${assignment?.user_dinilai?.username}`} className={classes.title} />
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
            : !paketPertanyaan  ? "Not Found" : 
              paketPertanyaan.list_aspek.map((aspek, indexAspek)=>(
              <>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">{aspek.nama}</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aspek.list_pertanyaan.map((pertanyaan, indexPertanyaan)=>(
                    <>
                      <TableRow>
                        <StyledTableCell align="left">
                        <Grid container>
                          <Grid item xs={12} md={8}>
                            {pertanyaan.pertanyaan}
                          </Grid>
                          <Grid item xs={12} md={4} container justify="center">
                            {pertanyaan.tipe === 1 ? 
                              ( // paragraf
                                <TextField
                                  required
                                  value={pertanyaan.jawaban}
                                  onChange={e=>handleChange(indexAspek, indexPertanyaan, e.target.value)}
                                  label="Jawaban"
                                  margin="normal"
                                  fullWidth
                                  multiline
                                />
                              )
                              :
                              ( // Radio
                                  <>
                                    {[...Array(5)].map((_x, i) => (
                                      <FormControlLabel
                                        onChange={e=>handleChange(indexAspek, indexPertanyaan, e.target.value)}
                                        checked={pertanyaan.jawaban === `${i+1}`}
                                        value={i+1}
                                        label={i+1}
                                        labelPlacement="bottom"
                                        style={{marginLeft: 0}}
                                        control={
                                          <Radio
                                            color="primary"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': `${i+1}` }}
                                          />}
                                      />
                                    ))
                                    }
                                  </>
                              )
                            }
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </>
            ))}
            <TableBody>
              <TableRow>
                <StyledTableCell align="center">
                  <TemplateButton 
                    onClick={sendData}
                    type="button"
                    buttonStyle="btnBlue"
                    buttonSize="btnLong"
                    disabled={loading}
                    style={{marginTop: "3rem", marginBottom: '1rem'}}
                  >
                    Submit
                  </TemplateButton>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </MuiTable>
        </TableContainer>
        <Loading open={fullLoading} />
        <SuccessDialog open={success} handleClose={()=>history.push(`/mengisi-borang/${id}`)} />
        <FailDialog open={!!fail} handleClose={()=>setFail(null)} text={fail?.detail} />
    </div>
  );
};

export default DaftarPaketPertanyaan;