import React, { useEffect, useState } from 'react';
import Button  from "components/TemplateButton";
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
  Tooltip,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import CreateIcon from '@material-ui/icons/CreateRounded';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getListPaketPertanyaan } from 'api/borang';
import { PAGE_SIZE } from 'utils/constant';
// import { setQueryParams } from 'utils/setQueryParams';

const useStyles = makeStyles({})
const DaftarPaketPertanyaan = ({history}) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  
  useEffect(()=>{
    setLoading(true)
    // const params = new URLSearchParams(history.location.search)

    // console.log(history.location.search)
    // console.log(params.get("page"))
    getListPaketPertanyaan({
      page
    }).then(res=>{
      setListItem(res.data?.results);
      setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })
  }, [page]);

  // const doQuery = () => {
  //   setQueryParams({page}, history);
  // }

  return (
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}
      <Grid container spacing={2} direction="column">
      <Grid item xs={12} container>
          <Grid item xs={4} alignContent="flex-start">
            {/* <div className="m-12"> */}
            <MainTitle title="Kelola Paket Pertanyaan" className={classes.title} />
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
          + Buat Paket
        </Button>
          </Grid>
        </Grid>
      </Grid>

        <TableContainer component={Paper}>
          <MuiTable className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
                <StyledTableCell align="left">Jenis </StyledTableCell>
                <StyledTableCell align="left">Kategori</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? "LOADING...": 
              listItem.map((row, i) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {`${i+1}.`}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.nama}</StyledTableCell>
                  <StyledTableCell align="left">{row.jenis}</StyledTableCell>
                  <StyledTableCell align="left">{row.kategori?.nama}</StyledTableCell>
                  <StyledTableCell align="left">
                  <Grid item sm={10}>
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <CreateIcon style={{ color: "green"}}/>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small">
                        <DeleteOutlineIcon style={{ color: "red"}}/>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <div className={classes.pagination}>
          <Pagination 
            count={count} 
            page={page} 
            onChange={(_e,val)=>setPage(val)}
            />
        </div>
        {/* </Paper> */}
    </div>
  );
};

export default DaftarPaketPertanyaan;