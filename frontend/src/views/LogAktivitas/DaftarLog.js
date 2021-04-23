import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import Breadcrumbs from 'components/Breadcrumbs';
import CustomButton from 'components/CustomButton';
import CustomTextField from 'components/CustomTextField';
import Button  from "components/Button";
import TemplateButton  from "components/TemplateButton";
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
} from '@material-ui/core';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";


function createData(no, tanggal, tipeLog, status) {
  return { no, tanggal, tipeLog, status };
}

const rows = [
  createData(1, "27/12/20", "Reguler", "Disetujui"),
  createData(2, "27/12/20", "Reguler", "Disetujui"),
  createData(3, "27/12/20", "Reguler", "Disetujui"),
  createData(4, "27/12/20", "Reguler", "Disetujui"),
  createData(5, "27/12/20", "Reguler", "Disetujui"),
  createData(6, "27/12/20", "Reguler", "Disetujui"),
  createData(7, "27/12/20", "Reguler", "Disetujui"),
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
      right : -160
    }
}));

  export default function BasicPagination() {
    const classes = useStyles();

    return (
    <div className={classes.root1}>
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            <MainTitle title="Daftar Log" className={classes.title} />
          </Grid>
          <Grid item xs={8}/>
        </Grid>

        <Grid item container direction="row" justify="space-between">
          <Grid item xs={10}>
            <Button
                variant="outlined"
                color="primary" 
                size="small"
                >
            + Create Log
            </Button>
          </Grid>

          <Grid item xs={2}>
                <TemplateButton size="small"
                    type="button"
                    buttonStyle="btnGreenOutline"
                    >
                    Daftar Karyawan
                </TemplateButton>
          </Grid>

        </Grid>
      </Grid>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Tanggal </StyledTableCell>
                <StyledTableCell align="left">Tipe Log </StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell style={{ width: "10%" }} component="th" scope="row">
                    {row.no}
                  </StyledTableCell>
                  <StyledTableCell  align="left">{row.tanggal}</StyledTableCell>
                  <StyledTableCell  align="left">{row.tipeLog}</StyledTableCell>
                  <StyledTableCell  align="left">{row.status}</StyledTableCell>
                  
                  <StyledTableCell align="center"> 
                      <TemplateButton 
                      type="button" 
                      buttonStyle="btnGreen" 
                      buttonSize="btnMedium"
                      >
                      View
                      </TemplateButton>
 
                      <TemplateButton
                      type="button"
                      buttonStyle="btnYellow"
                      buttonSize="btnMedium"
                      >
                      Edit
                      </TemplateButton>
 
                      <TemplateButton
                      type="button"
                      buttonStyle="btnDanger"
                      buttonSize="btnMedium"
                      >
                      Delete
                    </TemplateButton>
                    
                    </StyledTableCell>
                    
                </StyledTableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <div className={classes.pagination}>
          <Pagination count={5} />
        </div>
    </div>
  );
}