import { makeStyles, MenuItem } from '@material-ui/core';
import TextField from 'components/CustomTextField';
import React from 'react';
import FormActionController from './FormActionController';

const useStyles = makeStyles({
  root: {
    marginBottom: '1rem',
    '&:focus-within #foac-pertanyaan': {
      display: 'flex'
    },
    '& > #foac-pertanyaan': {
      display: 'none'
    }
  }
})


const Pertanyaan = ({
  pertanyaan, 
  tipe, 
  onChangeCallback,
  onAddCallback,
  onDeleteCallback,
  onUpCallback,
  onDownCallback
}) => {
  const classes = useStyles()

  const onChangeTipe = newTipe => onChangeCallback({pertanyaan, tipe: newTipe});
  const onChangePertanyaan = newPertanyaan => 
      onChangeCallback({tipe, pertanyaan: newPertanyaan});

  return (
    <div className={classes.root}>
      <div className="flex flex-row">
        <div className="w-full mb-1 mr-1">
          <TextField 
            variant="filled"
            placeholder="Pertanyaan"
            value={pertanyaan}
            onChange={e=>onChangePertanyaan(e.target.value)}
            size="small"
            fullWidth
          />
        </div>
        <div className="w-3/12 flex items-center mb-1 ml-1">
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
      <FormActionController
        id="pertanyaan"
        onAdd={onAddCallback}
        onDelete={onDeleteCallback}
        onUp={onUpCallback}
        onDown={onDownCallback}
      />
    </div>
  )
}

export default React.memo(Pertanyaan);