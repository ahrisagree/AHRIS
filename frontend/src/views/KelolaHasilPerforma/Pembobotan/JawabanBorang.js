import React, { useEffect, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { StyledTableCell } from "components/Table";
import CircularProgress from 'components/Loading/CircularProgress';
import TextField from 'components/CustomTextField';
import MainTitle from 'components/MainTitle';
import { getDetailAssignment } from 'api/borang';
import { KeyboardBackspaceRounded } from '@material-ui/icons';


const JawabanBorang = ({classes, idAssignment, back, match}) => {
  const [loading, setLoading] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [paketJawaban, setPaketJawaban] = useState(null);
  const { idPaket } = match.params;
  
  useEffect(()=>{
    setLoading(true);
    getDetailAssignment(idAssignment).then(res=>{
      const assignmentData = res.data;
      const paketJawabanData = 
        assignmentData?.list_paket_jawaban.find(pj=>pj.paket_pertanyaan === idPaket/1);
      setAssignment(assignmentData);
      setPaketJawaban(paketJawabanData)
    }).catch(err=> {
      console.error(err.response && err.response.data)
    }).finally(()=>{
      setLoading(false);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const mean = listJawaban => {
    let sum = 0;
    let count = 0
    listJawaban.forEach(jwbn=>{
      if (jwbn.tipe === 0 ) {
        sum+=jwbn.jawaban/1;
        count++;
      }
    })
    return sum/count || null;
  }
  return (
    <>
        <MainTitle 
          title={`${assignment?.user_dinilai.username}'s ${paketJawaban?.nama} 
          by ${assignment?.user_penilai.username} `} 
          className="mb-8" />
        <Tooltip title="Back" placement="right">
          <IconButton onClick={back}>
            <KeyboardBackspaceRounded />
          </IconButton>
        </Tooltip>
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
            : !paketJawaban  ? <p className="text-center p-8">Not Found</p> : 
              paketJawaban.list_aspek.map((aspek)=>(
              <>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">
                        <Grid container>
                          <Grid item xs={10}>
                            <p className="font-bold">{aspek.nama}</p>
                          </Grid>
                          <Grid item xs={2} container justify="flex-end">
                            <p className="font-bold">{mean(aspek.list_jawaban)}</p>
                          </Grid>
                        </Grid>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aspek.list_jawaban.map((jwb)=>(
                    <>
                      <TableRow>
                        <StyledTableCell align="left">
                        <Grid container>
                          <Grid item xs={10}>
                            {jwb.pertanyaan}
                          </Grid>
                            {jwb.tipe === 1 ? 
                              ( // paragraf
                                <Grid item xs={12} container justify="center">
                                  <TextField
                                    value={jwb.jawaban}
                                    label="Jawaban"
                                    margin="normal"
                                    fullWidth
                                    disabled
                                    isDetail
                                    multiline
                                  />
                                </Grid>
                              )
                              :
                              ( // Radio
                                  <Grid item xs={2} container justify="flex-end">
                                    <p>{jwb.jawaban}</p>
                                  </Grid>
                              )
                            }
                          </Grid>
                        </StyledTableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </>
            ))}
          </MuiTable>
        </TableContainer>
    </>
  )
};

export default JawabanBorang;