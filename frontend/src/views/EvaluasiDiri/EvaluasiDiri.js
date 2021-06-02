import React from 'react';
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import MainTitle from 'components/MainTitle';
// import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import TemplateButton from 'components/TemplateButton';
import { postEvaluasiDiri } from 'api/hasilperforma';
// import Loading from 'components/Loading';


const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E5E5E5",
    flexGrow: 1,
  },
  paper: {
    paddingTop: 50,
    fontWeight: "bold",
    color: "0A3142",
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily:"IBM Plex Sans"
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#0A3142",
    color: '#FFFFFF',
    fontWeight: 600,
    fontFamily: "IBM Plex Sans",
    borderRadius: 25.86,
    width: 286,
    height: 50,
    top: 30,
    left: 300
  },
  title: {
    position: "relative",
    top: 40,
    right : -160
  }
}));

const EvaluasiDiri = ({match, history}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});

  
  const [current_performance, setCurrent_Performance] = React.useState("");
  const [to_do, setTo_do] = React.useState("");
  const [parameter, setParameter] = React.useState("");
  // const [feedback, setFeedback] = React.useState("");  // INI
  // const [createEvaluasi, setCreateEvaluasi] = React.useState(false);
  const [update, setUpdate] = React.useState(0);




  const onSubmit = (
  ) => {
    const { id } = match.params;
    setLoading(true);
    postEvaluasiDiri({
      current_performance,
      to_do,
      parameter,
      // feedback,  pantes kmrn gabisa, harusnya null tp diatas diisi "" strng kosong
      hasil_performa : id,
    }).then(()=>history.push(`/hasil-performa/${id}`)
    ).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })
  }

  
    return (
      <div className="m-10">
        <MainTitle title="Tambah Evaluasi Diri" className="mb-8" />
        <Container component={Paper} className={classes.paper}>

          <Grid item xs={12}>
            <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Evaluasi Diri
            </Typography>
          </Grid>


          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              value = {current_performance}
              onChange = {e=>setCurrent_Performance(e.target.value)}
              label="Current Performance"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              error={!!error.current_performance}
              helperText={error.current_performance && error.current_performance[0]}
              disabled={loading}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            value = {to_do}
            onChange = {e=>setTo_do(e.target.value)}
            label="Action(s) to do"
            multiline
            rows={4}
            variant="outlined"
            required="true"
            style={{ margin: 8, width: "98%" }}
            error={!!error.to_do}
            margin="normal"
            helperText={error.to_do && error.to_do[0]}
            disabled={loading}
            />
            
          </Grid>
          
          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Parameter"
            value = {parameter}
            onChange = {e=>setParameter(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            error={!!error.parameter}
            helperText={error.parameter && error.parameter[0]}
            disabled={loading}
            />
            
          </Grid>

          <div className="flex justify-center py-6">
          <TemplateButton
              onClick={onSubmit}              
              type="button"
              buttonStyle="btnBlue"
              buttonSize="btnLong"
              disabled={loading}
          >
              Simpan
          </TemplateButton>
        </div>

        </Container>
        {/* <Dialog open={!!createEvaluasi} handleClose={()=>setCreateEvaluasi(false)} ></Dialog> */}
        <DialogFail
          open={!!error.detail} 
          handleClose={()=>{
            delete error.detail;
            setUpdate(update+1);
          }} 
          text={error.detail}
          />
      </div>
    )
};
export default EvaluasiDiri;     
