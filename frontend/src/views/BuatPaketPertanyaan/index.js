import React, { useEffect, useState } from 'react';
import { 
  IconButton,
  makeStyles, 
  MenuItem, 
  Paper, 
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import SectionPertanyaan from 'components/PaketPertanyaan/SectionPertanyaan';
import MainTitle from 'components/MainTitle';
import TemplateButton from 'components/TemplateButton';
import CreateableSelection from 'components/CreateableSelection';
import { JENIS_PAKET, newAspekTemplate } from 'utils/constant';
import {
  editPaketPertanyaanAPI,
  getKategoriAPI,
  getListPaketPertanyaanAPI,
  getPaketPertanyaanAPI,
  postPaketPertanyaanAPI
} from 'api/borang';
import Loading from 'components/Loading';
import { EditRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  smallSelection: {
      width: '10rem',
  },
  largerSelection: {
      width: '12rem',
  },
  mb: {
    marginBottom: '1rem'
  }
}));

const initialState = {
  nama: "",
  template: "",
  jenis: "",
  kategori: null,
  data: {list_aspek: [newAspekTemplate]} // data nya isi list aspek nanti pas post baru gabungin
}

const BuatPaketPertanyaan = ({paket, isEdit, isDetail, setEditMode}) => {
  const classes = useStyles()

  const [nama, setNama] = useState(paket?.nama || initialState.nama)
  const [template, setTemplate] = useState(paket?.template || initialState.template)
  const [jenis, setJenis] = useState(paket?.jenis || initialState.jenis)
  const [kategori, setKategori] = useState(paket?.kategori || initialState.kategori)
  const [data, setData] = useState((paket?.list_aspek && {list_aspek: paket?.list_aspek}) || initialState.data)
  const [errorState, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [kategoriOption, setKategoriOption] = useState([]);
  const [templateOption, setTemplateOption] = useState([]);

  const editable = !loading && !isDetail;
  
  useEffect(() => {
    if (!isDetail) {
      setLoading(true);
      getKategoriAPI().then(res=>{
        setKategoriOption(res.data);
      }).catch(err=>{
        console.error(err && err.response);
        setError((err?.response && err.response.data) || {});
      }).finally(()=>{
        setLoading(false);
      });
      if (!isEdit) {
        getListPaketPertanyaanAPI({disablepagination: true}).then(res=>{
          setTemplateOption(res.data);
        }).catch(err=>{
          console.error(err && err.response);
          setError((err?.response && err.response.data) || {});
        })
      }
    } 
  }, [isDetail, isEdit]);

  const sendData = () => {
    console.log({
      nama,
      jenis,
      kategori,
      ...data
    })
    setLoading(true);
    postPaketPertanyaanAPI({
      nama, jenis, kategori, ...data
    }).then(res=>{
      // SUCCESS
      setData(initialState.data);
      setNama(initialState.nama);
      setJenis(initialState.jenis);
      setTemplate(initialState.template);
      setKategori(initialState.kategori);
    }).catch(err=>{
      console.error(err && err.response);
      setError((err?.response && err.response.data) || {});
    }).finally(()=>{
      setLoading(false);
    })
  };

  const sendEditData = () => {
    if (paket) {
      setLoading(true);
      editPaketPertanyaanAPI(paket.id, {
        nama, jenis, kategori, ...data
      }).then(res=>{
        // SUCCESS
        const resData = res.data;
        setData({list_aspek: resData.list_aspek});
        setNama(resData.nama);
        setJenis(resData.jenis);
        setKategori(resData.kategori);
        setEditMode(false)
      }).catch(err=>{
        console.error(err && err.response);
        setError((err?.response && err.response.data) || {});
      }).finally(()=>{
        setLoading(false);
      })
    }
  }

  const cancelEdit = () => {
    if (paket) {
      setEditMode(false);
      setNama(paket.nama);
      setKategori(paket.kategori);
      setJenis(paket.jenis);
      setData({list_aspek: paket.list_aspek})
    }
  }

  const fetchTemplate = (tempId) => {
    setTemplate(tempId);
    console.log(tempId)
    if (tempId) {
      setLoading(true);
      getPaketPertanyaanAPI(tempId).then(res=>{
        const templateData = res.data;
        setNama(templateData.nama);
        setKategori(templateData.kategori);
        setJenis(templateData.jenis);
        setData({list_aspek: templateData.list_aspek});
      }).catch(err=>{
        console.error(err && err.response);
        setError((err?.response && err.response.data) || {});
      }).finally(()=>{
        setLoading(false)
      })
    }
  }

  const onAspekChange = (index, aspek) => {
    const newListAspek = Array.from(data.list_aspek)
    newListAspek[index] = aspek
    setData({
      ...data,
      list_aspek: newListAspek
    })}
  const addNewAspek = index => {
    const listBeforeIndex = data.list_aspek.slice(0,index+1)
    const listAfterIndex = data.list_aspek.slice(index+1)
    setData({
      ...data,
      list_aspek: [
        ...listBeforeIndex, 
        newAspekTemplate,
        ...listAfterIndex
      ]})}
  const deleteAspek = index => {
    if (data.list_aspek.length > 1){
      const listBeforeIndex = data.list_aspek.slice(0,index)
      const listAfterIndex = data.list_aspek.slice(index+1)
      setData({
        ...data,
        list_aspek: [...listBeforeIndex, ...listAfterIndex]
      })}}
  const swapAspek = (index1, index2) => {
    const aspek1 = data.list_aspek[index1];
    const newListAspek = Array.from(data.list_aspek)
    newListAspek[index1] = newListAspek[index2]
    newListAspek[index2] = aspek1
    setData({
      ...data,
      list_aspek: newListAspek
    })}
  return (
    <div style={{maxWidth: '55rem', margin: 'auto'}}>
      {isDetail && 
        <IconButton onClick={() => setEditMode && setEditMode(true)} style={{float: 'right'}}>
          <EditRounded />
        </IconButton>
      }
      <MainTitle 
        title={isDetail ? "Detail Paket Pertanyaan" : (
          isEdit ? "Edit Paket Pertanyaan" : "Buat Paket Pertanyaan")} 
        style={{marginBottom: '2rem'}}
      />
      <Paper>
        <div className="p-4">
          <TextField
            required
            label="Nama Paket"
            value={nama}
            onChange={e=>{setNama(e.target.value); delete errorState.nama }}
            margin="normal"
            style={{width: '50%', minWidth: '20rem', marginBottom: '2rem'}}
            error={!!errorState.nama}
            helperText={errorState.nama && errorState.nama[0]}
            disabled={!editable}
            isDetail={isDetail}
          />
          <div className="flex flex-row items-end justify-end flex-wrap mb-8">
          {!isDetail && !isEdit && 
            <div className="w-full md:w-4/12 lg:w-3/12 md:mr-1">
              <TextField
                label="Copy of Template"
                variant="outlined"
                value={template}
                onChange={e=>fetchTemplate(e.target.value)}
                size="small"
                className={classes.mb}
                fullWidth
                select
                disabled={!editable}
                isDetail={isDetail}
                >
                  {templateOption.map(temp=>(
                    <MenuItem value={temp.id}>{temp.nama}</MenuItem>
                  ))}
              </TextField>
            </div>
            }
            <div className="w-5/12 sm:w-4/12 md:w-3/12 lg:w-1/6 mx-1">
              <TextField
                required
                label="Jenis Paket"
                variant="outlined"
                value={jenis}
                onChange={e=>{setJenis(e.target.value); delete errorState.jenis}}
                size="small"
                fullWidth
                className={classes.mb}
                select
                error={!!errorState.jenis}
                helperText={errorState.jenis && errorState.jenis[0]}
                disabled={!editable}
                isDetail={isDetail}
                >
                  {JENIS_PAKET.map(pkt=>(
                    <MenuItem value={pkt.value}>{pkt.label}</MenuItem>
                  ))}
              </TextField>
            </div>
            <div className="w-5/12 sm:w-4/12 md:w-3/12 lg:w-1/6 ml-1">
              <CreateableSelection 
                className={classes.mb}
                options={kategoriOption || []}
                labelKey="nama"
                value={kategori}
                setData={val => {setKategori(val); delete errorState.kategori}}
                size="small"
                disabled={!editable}
                fullWidth
                renderInput={props=>(
                  <TextField
                    required
                    label="Kategori"
                    variant="outlined"
                    error={!!errorState.kategori}
                    helperText={errorState.kategori && errorState.kategori[0]}
                    isDetail={isDetail}
                    {...props}/>
                )}
              />
            </div>
          </div>
          {data.list_aspek.map((aspek, i)=>(
            <SectionPertanyaan
              key={`aspek-${i}`}
              onChangeCallback={a=>onAspekChange(i, a)}
              onAddCallback={()=>addNewAspek(i)}
              onDeleteCallback={()=>deleteAspek(i)}
              onUpCallback={i!==0 ? ()=>swapAspek(i, i-1) : null}
              onDownCallback={i!==data.list_aspek.length-1 ? ()=>swapAspek(i, i+1) : null}
              aspek={aspek}
              editable={editable}
              isDetail={isDetail}
            />
          ))}
        </div>
        <div className="flex justify-center py-6">
          {isEdit && 
            <TemplateButton
              onClick={cancelEdit}
              type="button"
              buttonStyle="btnBlueOutline"
              buttonSize="btnLong"
              style={{marginRight: '2rem'}}
            >
              Cancel
            </TemplateButton>
          }
          {!isDetail && 
            <TemplateButton
              onClick={!isEdit ? sendData : sendEditData}
              type="button"
              buttonStyle="btnBlue"
              buttonSize="btnLong"
              disabled={!editable}
            >
              Simpan
            </TemplateButton>
          }
          <Loading open={loading} />
        </div>
      </Paper>
    </div>
  );
}

export default BuatPaketPertanyaan;