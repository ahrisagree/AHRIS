import React, { useEffect, useState } from 'react';
import {
  Paper,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import TemplateButton from 'components/TemplateButton';
import {getPaketPertanyaanAPI} from 'api/borang';
import CircularProgress from 'components/Loading/CircularProgress';


const PembobotanForm = ({classes, match}) => {
  const [loading, setLoading] = useState(false);
  const [paketPertanyaan, setPaketPertanyaan] = useState(null);
  // const [kumulatif, setKumulatif] = useState(0);

  useEffect(()=>{
    setLoading(true);
    const {idPaket} = match.params;
    getPaketPertanyaanAPI(idPaket).then(res=>{
      setPaketPertanyaan(res.data)
    }).catch(err=>{

    }).finally(()=>{
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    // {/* <MainTitle title="Rekap Hasil Performa" className="mb-8"></MainTitle> */}
      <Container component={Paper} className={classes.paper} style={{minHeight: '100%'}}>

      <Grid item xs={12}>
      <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
      fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
      variant="subtitle1">
        Hasil Performa
      </Typography>
      </Grid>
      {loading && <CircularProgress />}
      {paketPertanyaan && paketPertanyaan.list_aspek.map(asp=>(
        <>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
          fontSize: 20, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
          variant="subtitle1">
            {asp.nama}
          </Typography>
        </Grid>
  
        <Grid item xs={12}>
  
          {/* <TextField
            label="Rata-rata Skor"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            className={classes.disabledtextField}
            disabled
            /> */}
            {/* DISABLE DULU YA BENTAR SAMPE UDA TAU CARA NGITUNG SKORNYA */}
    
          <TextField
            required
            label="Skor"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            disabled={loading}
            type="number"
            /> 
    
    
          {/* <TextField
            label="Skor Akhir"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            className={classes.disabledtextField}
            disabled
            /> */}
  
        </Grid>
  
        <Grid item xs={12}>
          <TextField id="outlined-multiline-static"
          label="Catatan Kualitatif"
          multiline
          rows={4}
          variant="outlined"
          style={{ margin: 8, width: "96%" }}
          margin="normal"
          disabled={loading}
          />
        </Grid>
        </>
      ))}
      {paketPertanyaan && (
        <>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
          fontSize: 20, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
          variant="subtitle1">
            Skor Kumulatif
          </Typography>
          </Grid>
    
          <Grid item xs={12}>
    
          <TextField
            label="Skor Kumulatif"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            className={classes.disabledtextField}
            disabled={loading}
            type="number"
            />
    
          <TextField
            label="Catatan"
            style={{ margin: 8, width: "63%" }}
            margin="normal"
            variant="outlined"
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
        </>
      )}
      {/* <Grid item xs={12}>
      <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
      fontSize: 20, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
      variant="subtitle1">
        Interpersonal Skill
      </Typography>
      </Grid>

      <Grid item xs={12}>

      <TextField
        label="Rata-rata Skor"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        className={classes.disabledtextField}
        disabled
        />

      <TextField
        required={true}
        label="Bobot"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        disabled={loading}
        /> 


      <TextField
        label="Skor Akhir"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        className={classes.disabledtextField}
        disabled
        />

      </Grid>

      <Grid item xs={12}>
      <TextField id="outlined-multiline-static"
      label="Catatan Kualitatif"
      multiline
      rows={4}
      variant="outlined"
      style={{ margin: 8, width: "96%" }}
      margin="normal"
      disabled={loading}
      />
      </Grid>

      <Grid item xs={12}>
      <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
      fontSize: 20, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
      variant="subtitle1">
        Planning & Organizing
      </Typography>
      </Grid>

      <Grid item xs={12}>

      <TextField
        label="Rata-rata Skor"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        className={classes.disabledtextField}
        disabled
        />

      <TextField
        required={true}
        label="Bobot"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        disabled={loading}
        /> 


      <TextField
        label="Skor Akhir"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        className={classes.disabledtextField}
        disabled
        />

      </Grid>

      <Grid item xs={12}>
      <TextField id="outlined-multiline-static"
      label="Catatan Kualitatif"
      multiline
      rows={4}
      variant="outlined"
      style={{ margin: 8, width: "96%" }}
      margin="normal"
      disabled={loading}
      />
      </Grid>

      <Grid item xs={12}>
      <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
      fontWeight: 600, fontSize: 20, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
      variant="subtitle1">
        Decision Making
      </Typography>
      </Grid>

      <Grid item xs={12}>

      <TextField
        label="Rata-rata Skor"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        className={classes.disabledtextField}
        disabled
        />

      <TextField
        required={true}
        label="Bobot"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        disabled={loading}
        /> 


      <TextField
        label="Skor Akhir"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        className={classes.disabledtextField}
        disabled
        />

      </Grid>

      <Grid item xs={12}>
      <TextField id="outlined-multiline-static"
      label="Catatan Kualitatif"
      multiline
      rows={4}
      variant="outlined"
      style={{ margin: 8, width: "96%" }}
      margin="normal"
      disabled={loading}
      />
      </Grid> */}

      {/* <Grid item xs={12}>
      <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
      fontWeight: 600, fontSize: 20, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
      variant="subtitle1">
        Skor Kumulatif
      </Typography>
      </Grid>

      <Grid item xs={12}>

      <TextField
        label="Skor Kumulatif"
        style={{ margin: 8, width: "30%" }}
        margin="normal"
        variant="outlined"
        className={classes.disabledtextField}
        disabled
        />

      <TextField
        label="Catatan"
        style={{ margin: 8, width: "63%" }}
        margin="normal"
        variant="outlined"
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
    </div> */}
      </Container>
  );
};

export default PembobotanForm;

