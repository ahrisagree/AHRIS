import React, { useState } from 'react';
import { 
  makeStyles, 
  MenuItem, 
  Paper, 
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SectionPertanyaan from 'components/PaketPertanyaan/SectionPertanyaan';
import MainTitle from 'components/MainTitle';

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

const BuatPaketPertanyaan = () => {
  const classes = useStyles()
  const kategoriOption = [
    "Finance", "IT", "Buat Gue", "DLL", "sadas", "sakd", "asd"
  ]

  const [nama, setNama] = useState("")
  const [template, setTemplate] = useState("")
  const [tipe, setTipe] = useState("")
  const [kategori, setkategori] = useState("")
  const [data, setData] = useState({
    list_aspek: [
      {
        nama: "",
        list_pertanyaan: [
          {
            pertanyaan: "",
            tipe: 0
          },
          {
            pertanyaan: "",
            tipe: 0
          },
        ]
      },
      {
        nama: "",
        list_pertanyaan: [
          {
            pertanyaan: "",
            tipe: 0
          },
          {
            pertanyaan: "",
            tipe: 0
          },
        ]
      }
    ]
  })

  const onAspekChange = (index, aspek) => {
    const newListAspek = Array.from(data.list_aspek)
    newListAspek[index] = aspek
    setData({
      ...data,
      list_aspek: newListAspek
    })
  }
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
                value={tipe}
                onChange={e=>setTipe(e.target.value)}
                size="small"
                fullWidth
                className={classes.mb}
                // className={classes.smallSelection}
                select
                >
                <MenuItem value={0}>AntarDivisi</MenuItem>
                <MenuItem value={1}>Divisi</MenuItem>
              </TextField>
            </div>
            <div className="w-5/12 sm:w-4/12 md:w-3/12 lg:w-1/6 ml-1">
              <Autocomplete
                freeSolo
                options={kategoriOption.map(o=>o)}
                className={classes.mb}
                // className={classes.smallSelection}
                size="small"
                fullWidth
                renderInput={props=>(
                  <TextField
                    required
                    label="Kategori"
                    variant="outlined"
                    value={kategori}
                    onChange={e=>setkategori(e.target.value)}
                    {...props}
                  />
                )}
              />
            </div>
          </div>
          {data.list_aspek.map((aspek, i)=>(
            <SectionPertanyaan
              key={`aspek-${i}`}
              onChangeCallback={a=>onAspekChange(i, a)}
              aspek={aspek}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default BuatPaketPertanyaan;