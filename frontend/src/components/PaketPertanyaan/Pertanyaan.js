import { MenuItem, TextField } from '@material-ui/core';
import React from 'react';

const Pertanyaan = ({pertanyaan, tipe, onChangeCallback}) => {

  const onChangeTipe = newTipe => onChangeCallback({pertanyaan, tipe: newTipe});
  const onChangePertanyaan = newPertanyaan => 
      onChangeCallback({tipe, pertanyaan: newPertanyaan});

  return (
    <div>
      <div className="flex flex-row">
        <div className="w-full mb-4 mr-1">
          <TextField 
            variant="filled"
            placeholder="Pertanyaan"
            value={pertanyaan}
            onChange={e=>onChangePertanyaan(e.target.value)}
            size="small"
            fullWidth
          />
        </div>
        <div className="w-3/12 flex items-center mb-4 ml-1">
          <TextField 
            variant="outlined"
            value={tipe}
            onChange={e=>onChangeTipe(e.target.value)}
            size="small"
            fullWidth
            select
          >
            <MenuItem value={0}>Scale</MenuItem>
            <MenuItem value={1}>Paragraph</MenuItem>
          </TextField>
        </div>
      </div>
    </div>
  )
}

export default Pertanyaan;