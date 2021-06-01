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
import Rating from '@material-ui/lab/Rating';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import { getDetailHasilPerforma} from 'api/hasilperforma';
import CircularProgress from 'components/Loading/CircularProgress';
import TemplateButton from 'components/TemplateButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import DeleteConfirmationDialog from 'components/DialogConf';
import CreateIcon from '@material-ui/icons/CreateRounded';
import { deleteEvaluasiDiriAPI } from 'api/hasilperforma';


const useStyles = makeStyles({})
const HasilPerforma = ({match, history, user}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  

  const [update, setUpdate] = useState(0);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(null); 
  
  const [assignment, setAssignment] = useState(null);
  const [deleteEvaluasiDiri, setDeleteEvaluasiDiri] = useState(null);
  
  
  const { id } = match.params;
  useEffect(()=>{
    setLoading(true)
    
    getDetailHasilPerforma(id).then(res=>{
      const hasilperformaData = res.data;
      setAssignment(hasilperformaData);
    }).catch(err=>{
      console.log(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })

  
  }, []);

  const handleDeleteEvaluasiDiri = () => {
    setLoading(true);
    deleteEvaluasiDiriAPI(deleteEvaluasiDiri.id).then(()=>{
     setDeleteEvaluasiDiri(null);
     setUpdate(update+1);
    }).catch(err=>{
      // Handle ERROR
      }).finally(()=>{
        setLoading(false);
      });
    }


  return (
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container>
          <Grid item alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title={`Hasil Performa | ${assignment?.nama} | ${assignment?.periode.substr(0,7)} `} className={classes.title} />
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
                             </div> )
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
          <Grid item alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title={`Evaluasi Diri`} className={classes.title} />
            {/* </div> */}
          </Grid>
         </Grid>
         <Grid item xs={12} container>
              {
                assignment?.evaluasi_diri.length === 0 ? 
                
                  <TemplateButton
                      onClick={()=>history.push(`/hasil-performa/${assignment.id}/add`)}
                      type="button"
                      buttonStyle="btnBlueOutline"
                      buttonSize="btnMedium"
                  >Tambah </TemplateButton>
                  
                :
                <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                
                <StyledTableCell align="left"> Current Performance </StyledTableCell>
                <StyledTableCell align="left">Action(s) to do </StyledTableCell>
                <StyledTableCell align="left">Parameter</StyledTableCell>
                <StyledTableCell align="left">Komentar Manajer</StyledTableCell>
                <StyledTableCell align="left">Manajer</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
               { assignment?.evaluasi_diri.map((row, i) => (
                  <StyledTableRow>
                  
                    <StyledTableCell align="left">{row.current_performance}</StyledTableCell>
                    <StyledTableCell align="left">{row.to_do}</StyledTableCell>
                    <StyledTableCell align="left">{row.parameter}</StyledTableCell>
                    <StyledTableCell align="left">{row.feedback}</StyledTableCell>
                    <StyledTableCell align="left">{row.manager_feedbacker?.username}</StyledTableCell>

                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                    <Tooltip title="Delete">
                        <IconButton size="small" 
                        onClick={()=>setDeleteEvaluasiDiri(row)}
                        >
                          <DeleteOutlineIcon style={{ color: "red"}}/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                )
                )}
                </TableBody>
          </MuiTable>
        </TableContainer>
              }
          </Grid>
            
        
        <div className="flex w-full flex-wrap p-2">
          
        </div>

      </Grid>
      <DeleteConfirmationDialog 
          open={!!deleteEvaluasiDiri}
          handleCancel={()=>setDeleteEvaluasiDiri(null)}
          handleConfirm={handleDeleteEvaluasiDiri}
        />
    </div>
  );
};

export default HasilPerforma;