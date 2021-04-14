import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Container,
  Button,
  TextField
} from '@material-ui/core';
import CustomButton from 'components/CustomButton';
import CustomTextField from 'components/CustomTextField';

const Home = props => {
  const dataTable = [
    {
      name: 'Frozen yoghurt',
      calories: 159,
      fat: 6.0,
      carbs: 24, 
      protein: 4.0
    },
    {
      name: 'Padang',
      calories: 159,
      fat: 6.0,
      carbs: 24, 
      protein: 4.0
    },
    {
      name: 'Frozen yoghurt',
      calories: 1339,
      fat: 6.0,
      carbs: 24, 
      protein: 4.0
    },
  ]


  return (
    <Container component={Paper}>

    {/** table */}
      <TableContainer component={Paper}>
        <Table className="" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTable.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/** table */}

      <div className="p-9">
        <Button
          variant="contained" 
          style={{
            boxShadow: "black 2px 2px",
            margin: "1rem",
            backgroundColor: "#FF0000"
          }}
          >
          Click Button
        </Button>

        <Button
          variant="outlined"
          color="primary" 
          size="small"
          >
          Click Button
        </Button>

        <CustomButton
          style={{
            margin: "1rem",
          }}
        >INI CUSTOM</CustomButton>
      </div>

      <div className="m-7 p-2">
          <TextField 
            variant="outlined"
            style={{}}
            size="medium"
            label="Textfield"
          />

          <CustomTextField
            variant="outlined"
            label="Custom Ini"
          />
      </div>
      
    </Container>
  )
};

export default Home; 