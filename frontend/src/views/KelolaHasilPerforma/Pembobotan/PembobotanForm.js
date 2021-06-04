import React, { useEffect, useState } from 'react';
import {
  Paper,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import TemplateButton from 'components/TemplateButton';
// import {getPaketPertanyaanAPI} from 'api/borang';
import CircularProgress from 'components/Loading/CircularProgress';
import { getSumScoringAPI, postHasilPerformaAPI } from 'api/hasilperforma';
import DialogSuccess from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import Loading from 'components/Loading';
import { periodFormated } from 'utils/periodeConverter';

const PembobotanForm = ({classes, match, history, setYangBelum, yangBelum}) => {
  const [loading, setLoading] = useState(false);
  const [fullLoading, setFullLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);
  const [success, setSuccess] = useState(false);

  const [list_aspek, setListAspek] = useState(null);
  const [skorKumulatif, setSkorKumulatif] = useState(0);
  const [nama, setNamaPaket] = useState(null);
  const [catatan, setCatatan] = useState("");
  const [hasilExist, setHasilPerformaExist] = useState(false);
  // const [kumulatif, setKumulatif] = useState(0);
  const params = new URLSearchParams(history.location.search);
  const periode = params.get("periode") || new Date().toISOString().substr(0,7)

  const {idPaket, idDinilai} = match.params;

  useEffect(()=>{
    setLoading(true);
    setListAspek(null);
    setSkorKumulatif(0);
    setCatatan("");
    setHasilPerformaExist(false);
    getSumScoringAPI(idDinilai, idPaket, periodFormated(periode)).then(res=>{
      setNamaPaket(res.data?.nama);
      setListAspek(res.data?.list_aspek.map(asp=>({...asp, deskripsi: ""})));
      let cumulative = 0;
      res.data?.list_aspek && res.data.list_aspek.forEach(asp=>{
        cumulative += asp.skor*asp.bobot;
      });
      setSkorKumulatif(cumulative/100);
      setHasilPerformaExist(res.data?.hasil_performa_exist)
      setYangBelum(res.data?.list_not_answered || []);
    }).catch(err=>{
      console.log(err)
      setNamaPaket("");
      setListAspek(null)
      setSkorKumulatif(0)
      setHasilPerformaExist(false)
      setYangBelum([]);
    }).finally(()=>{
      setLoading(false);
    })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDinilai, idPaket, periode, setYangBelum]);

  const submitHasilPerforma = () => {
    const data = {
      nama,
      deskripsi: catatan,
      skor: skorKumulatif,
      user: idDinilai/1,
      paket: idPaket/1,
      periode: periodFormated(periode),
      list_aspek: list_aspek
    }
    console.log(data)
    setFullLoading(true)
    postHasilPerformaAPI(data).then(res=>{
      setSuccess(true);
    }).catch(err=>{
      setErrorState(err.response?.data)
    }).finally(()=>{
      setFullLoading(false);
    })
  }

  const handleSuccess = () => {
    setSuccess(false)
    // sabi periode
    history.push(`/kelola-performa`)
  }

  const setCatatanAspek = index => e => {
    const newListAspek = Array.from(list_aspek);
    newListAspek[index].deskripsi = e.target.value;
    setListAspek(newListAspek);
  }
  
  return (
    <Container component={Paper} className={classes.paper} style={{minHeight: '100%'}}>
      {/* <MainTitle title="Rekap Hasil Performa" className="mb-8"></MainTitle> */}

      <Grid item xs={12}>
      <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
      fontSize: 24, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
      variant="subtitle1">
        Hasil Performa
      </Typography>
      </Grid>
      {loading && <CircularProgress />}
      {list_aspek && list_aspek.map((asp, index)=>(
        <>
        <Grid item xs={12}>
          <Typography style={{ fontWeight: 600, marginLeft: '1%', marginBottom: '3%', fontFamily: 'IBM Plex Sans', fontStyle: 'normal', 
          fontSize: 20, lineHeight: '138%', display: 'flex', alignItems: 'center', letterSpacing: '0.0075em', color: '#0A3142' }} 
          variant="subtitle1">
            {asp.nama}
          </Typography>
        </Grid>
  
        <Grid item xs={12}>
  
          <TextField
            label="Skor"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            className={classes.disabledtextField}
            value={asp.skor}
            disabled
            />
            {/* DISABLE DULU YA BENTAR SAMPE UDA TAU CARA NGITUNG SKORNYA */}
    
          <TextField
            required
            label="Bobot"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            value={asp.bobot}
            disabled
            /> 
    
    
          <TextField
            label="Skor Akhir"
            style={{ margin: 8, width: "30%" }}
            margin="normal"
            variant="outlined"
            className={classes.disabledtextField}
            value={asp.skor*asp.bobot/100}
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
          value={asp.deskripsi}
          onChange={setCatatanAspek(index)}
          />
        </Grid>
        </>
      ))}
      {list_aspek && (list_aspek?.length > 0 ? (
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
            disabled
            value={skorKumulatif}
            type="number"
            />
    
          <TextField
            label="Catatan"
            style={{ margin: 8, width: "96%" }}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            disabled={loading}
            value={catatan}
            onChange={e=>setCatatan(e.target.value)}
            /> 
            </Grid>
    
          <div className="flex justify-center py-6">
            {!hasilExist ? 
              <>
                {yangBelum && yangBelum.length !== 0 &&  
                  <h6 className="text-yellow-500 mb-2">
                    Masih ada {yangBelum.length} penilai yang belum mengisi penilaian
                  </h6>
                }
                <TemplateButton
                type="button"
                buttonStyle="btnBlue"
                buttonSize="btnLong"
                disabled={loading}
                onClick={submitHasilPerforma}
                >
                    Simpan
                </TemplateButton>
              </>
            : <h6>Hasil Performa Telah Dibuat</h6>  
          }
          </div>
        </>
      ) : <h6>Belum Ada Penilai yang menjawab</h6>
      )}
      <Loading open={fullLoading} />
      <DialogSuccess open={success} handleClose={()=>handleSuccess()} />
      <DialogFail 
        open={!!errorState} 
        handleClose={()=>setErrorState(null)} 
        text={errorState?.detail || (errorState?.non_field_errors && "Hasil Performa Sudah ada untuk user, periode, paket tersebut")}
        />
      </Container>
  );
};

export default PembobotanForm;

