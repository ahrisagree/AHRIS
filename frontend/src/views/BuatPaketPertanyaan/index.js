import React, { useState } from 'react';
import { 
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

const kategoriOption = [
  {id: 1, nama: "Finance"},
  {id: 2, nama: "Fi2n13ance"},
  {id: 3, nama: "Financdse"},
  {id: 4, nama: "Finance44"},
]

const BuatPaketPertanyaan = () => {
  const classes = useStyles()

  const [nama, setNama] = useState("")
  const [template, setTemplate] = useState("")
  const [jenis, setJenis] = useState("")
  const [kategori, setkategori] = useState("")
  const [data, setData] = useState({  // data isinya list_aspek aja nanti pas post baru gabungin
    list_aspek: [ newAspekTemplate ]
  })

  const sendData = () => {
    console.log({
      nama,
      jenis,
      kategori,
      ...data
    })
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
      <MainTitle title="Buat Paket Pertanyaan" style={{marginBottom: '2rem'}}/>
      <Paper>
        <div className="p-4">
          <TextField
            required
            label="Nama Paket"
            value={nama}
            onChange={e=>setNama(e.target.value)}
            margin="normal"
            style={{width: '50%', minWidth: '20rem', marginBottom: '2rem'}}
          />
          <div className="flex flex-row items-end justify-end flex-wrap mb-8">
            <div className="w-full md:w-4/12 lg:w-3/12 md:mr-1">
              <TextField
                label="Copy of Template"
                variant="outlined"
                value={template}
                onChange={e=>setTemplate(e.target.value)}
                size="small"
                className={classes.mb}
                fullWidth
                select
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </TextField>
            </div>
            <div className="w-5/12 sm:w-4/12 md:w-3/12 lg:w-1/6 mx-1">
              <TextField
                required
                label="Jenis Paket"
                variant="outlined"
                value={jenis}
                onChange={e=>setJenis(e.target.value)}
                size="small"
                fullWidth
                className={classes.mb}
                select
                >
                  {JENIS_PAKET.map(pkt=>(
                    <MenuItem value={pkt.value}>{pkt.label}</MenuItem>
                  ))}
              </TextField>
            </div>
            <div className="w-5/12 sm:w-4/12 md:w-3/12 lg:w-1/6 ml-1">
              <CreateableSelection 
                className={classes.mb}
                options={kategoriOption}
                labelKey="nama"
                value={kategori}
                setData={setkategori}
                size="small"
                fullWidth
                renderInput={props=>(
                  <TextField
                    required
                    label="Kategori"
                    variant="outlined"
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
            />
          ))}
        </div>
        <TemplateButton
          onClick={sendData}
          type="button"
          buttonStyle="btnBlue"
          buttonSize="btnLong"
        >
          Simpan
        </TemplateButton>
      </Paper>
    </div>
  );
}

export default BuatPaketPertanyaan;