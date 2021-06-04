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
  TextField,
  fade,
  Typography,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import { getDetailHasilPerforma, commentManager} from 'api/hasilperforma';
import CircularProgress from 'components/Loading/CircularProgress';
import TemplateButton from 'components/TemplateButton';
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import Loading from 'components/Loading';


function RedditTextField(props) {
  const classes = useStylesReddit();

  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const useStylesReddit = makeStyles((theme) => ({
  root: {
    border: '1px solid #e2e2e1',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
  focused: {},
}));

const useStyles = makeStyles({})
const EvaluasiPerforma = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  // const { id } = props.match.params;
  const [update, setUpdate] = useState(0);
  

  // const [update, setUpdate] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = React.useState({});
  const [feedback, setFeedback] = React.useState("");
  // const [fail, setFail] = useState(null); 
  const [assignment, setAssignment] = useState(null);
  

  useEffect(()=>{
    setLoading(true)
    const id = props.match.params.id;
    getDetailHasilPerforma(id).then(res=>{
      const { data } = res;
      const hasilperformaData = res.data;
      setAssignment(hasilperformaData);
      setFeedback(data.feedback);
      console.log(data)
    }).catch(err=>{
      console.log(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);


  const onSubmit = () => {
    const { id } = props.match.params;
    setLoading(true);
    commentManager( id, {
      feedback: feedback,
    }).then(res=>{
      setFeedback("");
      setSuccess(true);
      setUpdate(update+1);
    }).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })
  }


  return (
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container>
          <Grid item alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title={`Hasil Performa | ${assignment?.user?.username} | ${assignment?.nama} | ${assignment?.periode.substr(0,7)} `} className={classes.title} />
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
            :  !assignment  ? "Not Found" : 
              assignment.list_aspek.map((aspek, indexAspek)=>(
              <>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">{aspek.nama}</StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                      <TableRow>
                        <StyledTableCell align="left">
                        <Grid container>
                          <Grid item xs={12} md={8}>
                            {aspek.deskripsi}
                          </Grid>
                          <Grid item xs={12} md={4} container justify="center">
                              {aspek.skor === 0 ?
                            (<div className={classes.root}>
                              </div>)
                              :
                              ( <div className={classes.root}>
                              <Rating name="half-rating-read" value={aspek.skor} precision={0.5} readOnly />
                             </div>)
                                }
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                        {aspek.skor === 0 ?
                        (<StyledTableCell align="left">
                        </StyledTableCell>)
                        : (<StyledTableCell align="left">
                          {aspek.skor}
                          </StyledTableCell>)}
                      </TableRow>
                </TableBody>
              </>
            ))}
                <TableHead>
                  <TableRow>
                  <StyledTableCell align="left">Final Score</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                      <TableRow>
                        <StyledTableCell align="left">
                        <Grid container>
                          <Grid item xs={12} md={8}>
                            {assignment?.deskripsi}
                          </Grid>
                          <Grid item xs={12} md={4} container justify="center">
                                
                            <div className={classes.root}>
                            
                            {loading ? 
                              <StyledTableRow>
                              <StyledTableCell align="center" colSpan="5">
                                <CircularProgress />
                              </StyledTableCell>
                            </StyledTableRow>
                            : (
                              assignment?.skor.length === 0 ? 
                              <StyledTableRow>
                              <StyledTableCell align="center" colSpan="5">
                              <Rating name="half-rating-read" defaultValue={0}readOnly /> 
                              </StyledTableCell>
                            </StyledTableRow>
                              :
                              <StyledTableRow>
                              <StyledTableCell align="center" colSpan="5">
                              <Rating name="half-rating-read" value={assignment?.skor} precision={0.5} readOnly /> 
                              </StyledTableCell>
                            </StyledTableRow>
                            )
                            }

                             </div>
                                {/* <TextField
                                  required
                                  // value={pertanyaan.jawaban}
                                  // onChange={e=>handleChange(indexAspek, indexPertanyaan, e.target.value)}
                                  label="Jawaban"
                                  margin="normal"
                                  fullWidth
                                  multiline
                            
                                > Test </TextField> */}
                         
                            </Grid>
                          </Grid>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                        {assignment?.skor}
                        </StyledTableCell>
                      </TableRow>
                </TableBody>
          </MuiTable>
        </TableContainer>
    
        <br></br>
        <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Evaluasi Diri" className={classes.title} />
            {/* </div> */}
          </Grid>
          <Grid item xs={8}/>
          </Grid>
      </Grid>
        <br></br>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Current Performance </StyledTableCell>
                <StyledTableCell align="left">Action(s) to do </StyledTableCell>
                <StyledTableCell align="left">Parameter</StyledTableCell>
                <StyledTableCell align="left">Komentar Manajemen</StyledTableCell>
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
                assignment?.evaluasi_diri.length === 0 ? 
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan="5">
                    Tidak ada Evaluasi Diri
                  </StyledTableCell>
                </StyledTableRow>
                :
                assignment?.evaluasi_diri.map((row, i) => (
                  <StyledTableRow>
                    <StyledTableCell align="left">{row.current_performance}</StyledTableCell>
                    <StyledTableCell align="left">{row.to_do}</StyledTableCell>
                    <StyledTableCell align="left">{row.parameter}</StyledTableCell>
                    <StyledTableCell align="left">{row.feedback}</StyledTableCell>
                  </StyledTableRow>
                )
                )
              )
                }
            </TableBody>
          </MuiTable>
        </TableContainer>

        <br></br>
        <Grid container spacing={2} direction="column">

        <Grid item xs={12} container>
              {
                assignment?.evaluasi_diri.length === 0 ?
                
                <Typography style={{ fontWeight: 600, marginBottom: '2%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
                fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
                variant="subtitle1">
                </Typography>
          
                :
          <Grid container>
            <Typography style={{ fontWeight: 600, marginBottom: '2%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Comment
            </Typography>
        

        <RedditTextField
                label="Answer text"
                className={classes.margin}
                // variant="filled"
                fullWidth="2000"
                style={{ margin: 8 }}
                margin="normal"
                variant="outlined"
                value={feedback}
                onChange={e=>{setFeedback(e.target.value); delete error.feedback}}
                error={!!error.feedback}
                helperText={error.feedback && error.feedback[0]}
                disabled={loading}
            />

        <div className="flex justify-center py-6">
          <TemplateButton
          // Lo gabisa bikin GIni
              onClick={onSubmit}
              type="button"
              buttonStyle="btnBlue"
              buttonSize="btnLong"
              disabled={loading}
              >
              Simpan
            </TemplateButton>
        </div>
        </Grid>
        }
        </Grid>
        </Grid>

        {/* </Paper> */}
        <Loading open={loading} />
        <Dialog open={success} handleClose={()=>setSuccess(false)} ></Dialog>
        <DialogFail
          open={!!error.detail} 
          handleClose={()=>{
            setError({});
          }} 
          text={error.detail}
          />
    </div>
  );
};

export default EvaluasiPerforma;