import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  Typography,
  MenuItem,
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import MainTitle from 'components/MainTitle';
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import TemplateButton from 'components/TemplateButton';
import { buatLogAPI } from 'api/log';
import Loading from 'components/Loading';


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

const EvaluasiDiri = props => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});

  
    return (
      <div className="m-10">
        <MainTitle title="Tambah Evaluasi Diri" className="mb-8" />
        <Container component={Paper} className={classes.paper}>

          <Grid item xs={12}>
            <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
            fontWeight: 600, fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
            variant="subtitle1">
              Evaluasi Diri
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Periode"
              style={{ margin: 8, width: "30%" }}
              margin="normal"
              variant="outlined"
              disabled={loading}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-full-width"
              required="true"
              label="Current Performance"
              style={{ margin: 8, width: "98%" }}
              margin="normal"
              variant="outlined"
              disabled={loading}
              />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Action(s) to do"
            multiline
            rows={4}
            variant="outlined"
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            disabled={loading}
            />
            
          </Grid>
          
          <Grid item xs={12}>
            <TextField id="outlined-multiline-static"
            label="Parameter"
            multiline
            rows={4}
            variant="outlined"
            required="true"
            style={{ margin: 8, width: "98%" }}
            margin="normal"
            disabled={loading}
            />
            
          </Grid>

          <div className="flex justify-center py-6">
          <TemplateButton
              type="button"
              buttonStyle="btnBlue"
              buttonSize="btnLong"
              disabled={loading}
          >
              Simpan
          </TemplateButton>
        </div>

        </Container>
        <Loading open={loading} />
      </div>
    )
};
export default EvaluasiDiri;     