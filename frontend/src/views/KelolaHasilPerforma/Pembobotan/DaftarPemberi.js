import React, { useEffect, useState } from 'react';
import MainTitle from 'components/MainTitle';
import { StyledTableCell, StyledTableRow } from "components/Table";
import { Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import TextField from 'components/CustomTextField';
import { getListAssignment } from 'api/borang';
import { setQueryParams } from 'utils/setQueryParams';
import CircularProgress from 'components/Loading/CircularProgress';


const DaftarPemberi = ({classes, history, match, selectJawaban}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [listItem, setListItem] = useState([]);
  // const [page, setPage] = useState(1);

  // const [update, setUpdate] = useState(0);
  
  const params = new URLSearchParams(history.location.search);
  // const [periodeFilter, setPeriodeFilter] = 
  //   useState(params.get("periode") || new Date().toISOString().substr(0,10));


  // const [roleFilter, setFilterRole] = useState(params.get("role"));
  // const [divisiFilter, setFilterDivisi] = useState(params.get("divisi"));
  // const [searchFilter, setFilterSearch] = useState(params.get("search"));

  const { idDinilai, idPaket } = match.params;
  const periode = params.get("periode") || new Date().toISOString().substr(0,10)

  useEffect(()=>{
    setLoading(true)
    getListAssignment({
      disablepagination: true,
      user_dinilai: idDinilai,
      paket_pertanyaan: idPaket,
      periode
    }).then(res=>{
      setListItem(res.data);
      // setCount(Math.ceil(res.data?.count/PAGE_SIZE));
    }).catch(err=>{
    // Handle ERROR
    }).finally(()=>{
      setLoading(false);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periode]);

  const handleFilterPeriode = (val) => {
    // setPeriodeFilter(val);
    setQueryParams({
      periode: val
    }, history);
  }
  return (
    <>
      <MainTitle title="Daftar Pemberi Evaluasi" className="mb-8"></MainTitle>

      <Grid item xs={12} container justify="flex-end">
      <Grid item xs={8} md={6}>
        <div style={{position: 'relative', padding: 2}}>
            <TextField
            label="Periode"
            variant="outlined"
            size="small"
            className={classes.mb}
            fullWidth
            type="date"
            bordered={true}
            value={periode}
            onChange={e=>handleFilterPeriode(e.target.value)}
            />
        </div>
      </Grid>
      </Grid>

      <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="left">No </StyledTableCell>
          <StyledTableCell align="left">Nama Karyawan </StyledTableCell>
          <StyledTableCell align="left">Role </StyledTableCell>
          <StyledTableCell align="left">Divisi</StyledTableCell>
          <StyledTableCell align="left"></StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? 
        <StyledTableRow>
          <StyledTableCell align="center" colSpan="5">
            <CircularProgress />
          </StyledTableCell>
        </StyledTableRow>
        : (
          listItem?.length === 0 ? 
          <StyledTableRow>
            <StyledTableCell align="center" colSpan="5">
              Tidak ada Daftar Karyawan
            </StyledTableCell>
          </StyledTableRow>
          :
          listItem.map((row, i) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {`${i+1}.`}
              </StyledTableCell>
              <StyledTableCell align="left">{row.user_penilai.username}</StyledTableCell>
              <StyledTableCell align="left">{row.user_penilai.role}</StyledTableCell>
              <StyledTableCell align="left">{row.user_penilai.divisi.map(x=> x.nama_divisi+", ")}</StyledTableCell>
              <StyledTableCell align="left">
                  <button
                  onClick={()=>selectJawaban(row.id)}
                  >Lihat</button>
              </StyledTableCell>
            </StyledTableRow>
          )))}
      </TableBody>
      </Table>
      </TableContainer>
    </>
  );
};

export default DaftarPemberi;
