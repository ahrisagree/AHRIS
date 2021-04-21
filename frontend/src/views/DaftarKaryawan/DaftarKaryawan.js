import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Breadcrumbs from 'components/Breadcrumbs';
import CustomButton from 'components/CustomButton';
import CustomTextField from 'components/CustomTextField';
import Button  from "components/Button";
import {
  makeStyles,
  withStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, "Leonardo", "Karyawan", "Engineer"),
  createData(2, "Leonardo", "Karyawan", "Engineer"),
  createData(3, "Leonardo", "Karyawan", "Engineer"),
  createData(4, "Leonardo", "Karyawan", "Engineer"),
  createData(5, "Leonardo", "Karyawan", "Engineer"),
  createData(6, "Leonardo", "Karyawan", "Engineer"),
  createData(7, "Leonardo", "Karyawan", "Engineer"),
];

const useStyles = makeStyles((theme) =>({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  
  root1: {
    flexGrow: 1,

  },
  table: {
    minWidth: 500
  },
  pagination: {
    '& > *': {
      marginTop: theme.spacing(1),
      color: "#0B3242",
      marginLeft: "77%",
      // color: "primary",
    },
  },
  page: {
    width: "92%",
    height: "100%",
    position: "absolute",
    padding: "3%",
    fontWeight: "bold",
    color: "#FFFF",
    background: "#E5E5E5",
    left: 0,
    top: 0,
    textAlign:"right"
  },
      container: {
        position: "absolute",
        paddingTop: "10%",
        fontWeight: "bold",
        color: "#FFFF",
        background: "linear-gradient(180deg, #00A96F 0%, #437B74 100%)",
        boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
        width: 524,
        height: "100%",
        minHeight: 700,
        left: 0,
        top: 0,
    },
    
    title: {
      // position: "relative",
      // top: 40,
      right : -160
    }
}));

  export default function BasicPagination() {
    const classes = useStyles();

    return (
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Kelola Akun" className={classes.title} />
            {/* </div> */}
          </Grid>
          <Grid item xs={8}/>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={10} />
          <Grid item xs={2} alignContent="flex-end">
          <Button
          variant="outlined"
          color="primary" 
          size="small"
          >
          + Tambah Akun
        </Button>
          </Grid>
        </Grid>
      </Grid>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No &nbsp;</StyledTableCell>
                <StyledTableCell align="left">Nama &nbsp;</StyledTableCell>
                <StyledTableCell align="left">Role &nbsp;</StyledTableCell>
                <StyledTableCell align="left">Divisi&nbsp;</StyledTableCell>
                <StyledTableCell align="left">&nbsp;</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell style={{ width: "5%" }} component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.calories}</StyledTableCell>
                  <StyledTableCell align="left">{row.fat}</StyledTableCell>
                  <StyledTableCell align="left">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="left">
                  <Grid item sm={10}>
                    <CreateIcon style={{ color: "green"}}/>
                    <DeleteOutlineIcon style={{ color: "red"}}/>
                  </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <div className={classes.pagination}>
          <Pagination count={5} />
        </div>
        {/* </Paper> */}
    </div>
  );
}