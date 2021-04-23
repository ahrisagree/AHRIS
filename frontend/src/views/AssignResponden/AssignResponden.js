import React from "react";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  TextField,
  Divider,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import TemplateButton  from "components/TemplateButton";
import MainTitle from "components/MainTitle";
import { StyledTableCell, StyledTableRow } from "components/Table";
import Pagination from "@material-ui/lab/Pagination";
import Checkbox from '@material-ui/core/Checkbox';

function createData(calories, fat, carbs) {
    return {calories, fat, carbs  };
  }
  
  const rows = [
    createData("Leonardo","UI/UX", "Finance"),
    createData( "Leonardo", "Product Owner", "Finance"),
    createData( "Leonardo", "UI/UX", "Marketing"),
    createData( "Leonardo", "Product Owner", "Fishery Squads"),
    createData( "Leonardo", "UI/UX", "Management"),
    createData( "Leonardo", "Product Owner", "Engineer"),
    createData( "Leonardo", "UI/UX", "Engineer"),
  ];

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      
    root1: {
        flexGrow: 1,
    
    },
  title: {
    /*position: "relative",*/
    top: 0,
  },
  table: {
    minWidth: 500,
  },
  pagination: {
    '& > *': {
      marginTop: theme.spacing(1),
      color: "#0B3242",
      marginLeft: "77%",
      // color: "primary",
    },
  },
  button: {
      position: "relative",
      alignSelf: "center",
      alignItems: "center",
      marginLeft: "35%"
  },

}));

const GreenCheckbox = withStyles({
  root: {
    color: '#0A3142',
    '&$checked': {
      color: '#0A3142',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AssignResponden = props => {
  const classes = useStyles();
  return (      
    <div className={classes.root1}>
    {/* <Paper className={classes.page}> */}
    <Grid container spacing={2} direction="column">
    <Grid item xs={12} container>
        <Grid item xs={4} alignContent="flex-start">
          {/* <div className="m-12"> */}
          <MainTitle title="Pilih Pemberi Evaluasi" className={classes.title} />
          {/* </div> */}
        </Grid>
        <Grid item xs={8}/>
      </Grid>
    </Grid>

    <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">&nbsp;</StyledTableCell>
                <StyledTableCell align="left">Nama &nbsp;</StyledTableCell>
                <StyledTableCell align="left">Role &nbsp;</StyledTableCell>
                <StyledTableCell align="left">Squads&nbsp;</StyledTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.calories}>
                  <StyledTableCell style={{ width: "10%" }} component="th" scope="row">
                  <Grid item sm={10}>
                    <GreenCheckbox/>
                  </Grid>
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.calories}</StyledTableCell>
                  <StyledTableCell align="left">{row.fat}</StyledTableCell>
                  <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <div className={classes.pagination}>
          <Pagination count={5} />
        </div>

        <Grid item xs={12} className={classes.button}>
        <TemplateButton 
                    className={classes.button}
                    onClick={() => {
                      console.log("You Clicked on Me!");
                    }}
                    type="button"
                    buttonStyle="btnBlue"
                    buttonSize="btnLong"
                  >
                    Sebelumnya
                  </TemplateButton>
                  <TemplateButton 
                    className={classes.button}
                    onClick={() => {
                      console.log("You Clicked on Me!");
                    }}
                    type="button"
                    buttonStyle="btnBlue"
                    buttonSize="btnLong"
                  >
                    Selanjutnya
                  </TemplateButton>
        </Grid>
  </div>
  );
}



export default AssignResponden;