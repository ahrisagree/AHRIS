import { makeStyles, Paper } from '@material-ui/core';
import TextField from 'components/CustomTextField';
import React from 'react';
import FormActionController from './FormActionController';
import Pertanyaan from './Pertanyaan';

const useStyles = makeStyles({
  paper: {
    marginBottom: '2rem',
    boxSizing: 'border-box',
    borderRadius: 8,
    "&:focus-within": {
      border: '1px solid #0A314280',
    },
    // '&:focus-within #foac-aspek': {
    //   display: 'flex'
    // },
    // '& #foac-aspek': {
    //   display: 'none'
    // }
  }
})
const newPertanyaanTemplate = { 
  pertanyaan: "", 
  tipe: 0 
} 

const SectionPertanyaan = ({
  aspek, 
  onChangeCallback,
  onAddCallback,
  onDeleteCallback,
  onUpCallback,
  onDownCallback,
}) => {
  const classes = useStyles()
  const {nama, list_pertanyaan} = aspek;
  const size = list_pertanyaan.length;
  const onChangeNama = val => onChangeCallback({...aspek, nama: val});
  const onPertanyaanChange = (index, pertanyaan) => {
    const newListPertanyaan = Array.from(list_pertanyaan)
    newListPertanyaan[index] = pertanyaan
    onChangeCallback({
      ...aspek,
      list_pertanyaan: newListPertanyaan
    })}
  const addNewPertanyaan = index => {
    const listBeforeIndex = list_pertanyaan.slice(0,index+1)
    const listAfterIndex = list_pertanyaan.slice(index+1)
    onChangeCallback({
      ...aspek,
      list_pertanyaan: [
        ...listBeforeIndex, 
        newPertanyaanTemplate,
        ...listAfterIndex
      ]})}
  const deletePertanyaan = index => {
    if (list_pertanyaan.length > 1){
      const listBeforeIndex = list_pertanyaan.slice(0,index)
      const listAfterIndex = list_pertanyaan.slice(index+1)
      onChangeCallback({
        ...aspek,
        list_pertanyaan: [...listBeforeIndex, ...listAfterIndex]
      })}}
  const swapPertanyaan = (index1, index2) => {
    const pertanyaan1 = list_pertanyaan[index1];
    const newListPertanyaan = Array.from(list_pertanyaan)
    newListPertanyaan[index1] = newListPertanyaan[index2]
    newListPertanyaan[index2] = pertanyaan1
    onChangeCallback({
      ...aspek,
      list_pertanyaan: newListPertanyaan
    })}
  return (
    <Paper className={classes.paper}>
      <div className="p-4">
        <div className="flex flex-col-reverse md:flex-row md:items-start justify-between">
          <TextField
            required
            placeholder="Aspek"
            value={nama}
            onChange={e=>onChangeNama(e.target.value)}
            inputProps={{style: {fontWeight: 'bold'}}}
            style={{width: '50%', minWidth: '20rem', marginBottom: '1.5rem'
          }}
          />
          <FormActionController 
            id="aspek"
            onAdd={onAddCallback}
            onDelete={onDeleteCallback}
            onUp={onUpCallback}
            onDown={onDownCallback}
          />
        </div>
        {list_pertanyaan.map((pertanyaan, i)=>(
          <Pertanyaan
            key={`pertanyaan-${i}`}
            {...pertanyaan}
            onChangeCallback={p=>onPertanyaanChange(i, p)}
            onAddCallback={()=>addNewPertanyaan(i)}
            onDeleteCallback={()=>deletePertanyaan(i)}
            onUpCallback={i!==0 ? ()=>swapPertanyaan(i, i-1) : null}
            onDownCallback={i!==size-1 ? ()=>swapPertanyaan(i, i+1) : null}
          />
        ))}
      </div>
    </Paper>
  )
}

export default SectionPertanyaan;