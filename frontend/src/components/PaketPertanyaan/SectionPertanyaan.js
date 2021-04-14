import { Paper, TextField } from '@material-ui/core';
import React from 'react';
import Pertanyaan from './Pertanyaan';

const SectionPertanyaan = ({aspek, onChangeCallback}) => {
  const {nama, list_pertanyaan} = aspek
  const onChangeNama = val => onChangeCallback({...aspek, nama: val});
  const onPertanyaanChange = (index, pertanyaan) => {
    const newListPertanyaan = Array.from(list_pertanyaan)
    newListPertanyaan[index] = pertanyaan
    onChangeCallback({
      ...aspek,
      list_pertanyaan: newListPertanyaan
    })
  }
  return (
    <Paper
      style={{
        border: '1px solid #0A3142',
        marginBottom: '2rem',
        borderRadius: 8,
      }}
    >
      <div className="p-4">
        <TextField
          required
          placeholder="Aspek"
          value={nama}
          onChange={e=>onChangeNama(e.target.value)}
          inputProps={{style: {fontWeight: 'bold'}}}
          style={{width: '50%', minWidth: '20rem', marginBottom: '1.5rem'}}
        />
        {list_pertanyaan.map((pertanyaan, i)=>(
          <Pertanyaan
            key={`pertanyaan-${i}`}
            {...pertanyaan}
            onChangeCallback={p=>onPertanyaanChange(i, p)}
          />
        ))}
      </div>
    </Paper>
  )
}

export default SectionPertanyaan;