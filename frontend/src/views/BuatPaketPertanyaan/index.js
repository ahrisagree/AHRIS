import { 
  Container, 
  Grid, 
  makeStyles, 
  MenuItem, 
  Paper, 
  TextField 
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  smallSelection: {
      width: '10rem',
  },
  largerSelection: {
      width: '12rem',
  }
}));

const BuatPaketPertanyaan = () => {
  const classes = useStyles()
  const kategoriOption = [
    "Finance", "IT", "Buat Gue", "DLL"
  ]
  return (
    <Container>
      <Paper>
        <div className="p-4">
          <TextField
            required
            label="Nama Paket"
            margin="normal"
            style={{width: '50%', minWidth: '20rem'}}
          />
          <Grid container direction="row" lg={6} md={9} justify="flex-end">
            <TextField
              label="Copy of Template"
              variant="outlined"
              value=""
              size="small"
              className={classes.largerSelection}
              style={{marginRight: '0.5rem'}}
              select
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </TextField>

            <TextField
              required
              label="Jenis Paket"
              variant="outlined"
              value=""
              size="small"
              className={classes.smallSelection}
              style={{margin: '0 0.5rem'}}
              select
            >
              <MenuItem value={0}>AntarDivisi</MenuItem>
              <MenuItem value={1}>Divisi</MenuItem>
            </TextField>

            <Autocomplete
              freeSolo
              options={kategoriOption.map(o=>o)}
              className={classes.smallSelection}
              size="small"
              style={{marginLeft: '0.5rem'}}
              renderInput={props=>(
                <TextField
                  required
                  label="Kategori"
                  variant="outlined"
                  value=""
                  {...props}
                />
              )}
            />
          </Grid>          
        </div>
      </Paper>
    </Container>
  );
}

export default BuatPaketPertanyaan;