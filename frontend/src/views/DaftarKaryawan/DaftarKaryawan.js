// import React from "react";
// import Pagination from "@material-ui/lab/Pagination";
// import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// import CreateIcon from '@material-ui/icons/Create';
// import Breadcrumbs from 'components/Breadcrumbs';
// import CustomButton from 'components/CustomButton';
// import CustomTextField from 'components/CustomTextField';
// import Button  from "components/Button";
// import {
//   makeStyles,
//   withStyles,
//   Table as MuiTable,
//   TableBody,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Grid,
//   IconButton,
// } from '@material-ui/core';
// import { StyledTableCell, StyledTableRow } from "components/Table";
// import MainTitle from "components/MainTitle";


// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData(1, "Leonardo", "Karyawan", "Engineer"),
//   createData(2, "Leonardo", "Karyawan", "Engineer"),
//   createData(3, "Leonardo", "Karyawan", "Engineer"),
//   createData(4, "Leonardo", "Karyawan", "Engineer"),
//   createData(5, "Leonardo", "Karyawan", "Engineer"),
//   createData(6, "Leonardo", "Karyawan", "Engineer"),
//   createData(7, "Leonardo", "Karyawan", "Engineer"),
// ];

// const useStyles = makeStyles((theme) =>({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
  
//   root1: {
//     flexGrow: 1,

//   },
//   table: {
//     minWidth: 500
//   },
//   pagination: {
//     '& > *': {
//       marginTop: theme.spacing(1),
//       color: "#0B3242",
//       marginLeft: "77%",
//       // color: "primary",
//     },
//   },
//   page: {
//     width: "92%",
//     height: "100%",
//     position: "absolute",
//     padding: "3%",
//     fontWeight: "bold",
//     color: "#FFFF",
//     background: "#E5E5E5",
//     left: 0,
//     top: 0,
//     textAlign:"right"
//   },
//       container: {
//         position: "absolute",
//         paddingTop: "10%",
//         fontWeight: "bold",
//         color: "#FFFF",
//         background: "linear-gradient(180deg, #00A96F 0%, #437B74 100%)",
//         boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
//         width: 524,
//         height: "100%",
//         minHeight: 700,
//         left: 0,
//         top: 0,
//     },
    
//     title: {
//       // position: "relative",
//       // top: 40,
//       right : -160
//     }
// }));

//   export default function BasicPagination() {
//     const classes = useStyles();

//     return (
//     <div className={classes.root1}>
//       {/* <Paper className={classes.page}> */}
//       <Grid container spacing={2} direction="column">
//       <Grid item xs={12} container>
//           <Grid item xs={4} alignContent="flex-start">
//             {/* <div className="m-12"> */}
//             <MainTitle title="Kelola Akun" className={classes.title} />
//             {/* </div> */}
//           </Grid>
//           <Grid item xs={8}/>
//         </Grid>

//         <Grid item xs={12} container>
//           <Grid item xs={10} />
//           <Grid item xs={2} alignContent="flex-end">
//           <Button
//           variant="outlined"
//           color="primary" 
//           size="small"
//           >
//           + Tambah Akun
//         </Button>
//           </Grid>
//         </Grid>
//       </Grid>

//         <TableContainer component={Paper}>
//           <MuiTable className={classes.table} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="left">No &nbsp;</StyledTableCell>
//                 <StyledTableCell align="left">Nama &nbsp;</StyledTableCell>
//                 <StyledTableCell align="left">Role &nbsp;</StyledTableCell>
//                 <StyledTableCell align="left">Divisi&nbsp;</StyledTableCell>
//                 <StyledTableCell align="left">&nbsp;</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row) => (
//                 <StyledTableRow key={row.name}>
//                   <StyledTableCell style={{ width: "5%" }} component="th" scope="row">
//                     {row.name}
//                   </StyledTableCell>
//                   <StyledTableCell align="left">{row.calories}</StyledTableCell>
//                   <StyledTableCell align="left">{row.fat}</StyledTableCell>
//                   <StyledTableCell align="left">{row.carbs}</StyledTableCell>
//                   <StyledTableCell align="left">
//                   <Grid item sm={10}>
//                     <CreateIcon style={{ color: "green"}}/>
//                     <DeleteOutlineIcon style={{ color: "red"}}/>
//                   </Grid>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </MuiTable>
//         </TableContainer>
//         <div className={classes.pagination}>
//           <Pagination count={5} />
//         </div>
//         {/* </Paper> */}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import Button  from "components/TemplateButton";
import {
  makeStyles,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  IconButton,
  Tooltip,
  TextField,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import CreateIcon from '@material-ui/icons/CreateRounded';
import { StyledTableCell, StyledTableRow } from "components/Table";
import MainTitle from "components/MainTitle";
import Pagination from '@material-ui/lab/Pagination';
import { getListDaftarKaryawan } from 'api/akun';
import { PAGE_SIZE } from 'utils/constant';
import CircularProgress from 'components/Loading/CircularProgress';
import DeleteConfirmationDialog from 'components/DialogConf';
import CreateableSelection from 'components/CreateableSelection';
// import { setQueryParams } from 'utils/setQueryParams';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

const useStyles = makeStyles({
  mb: {
    marginBottom: '1rem'
  }
})
const DaftarKaryawan = ({history}) => {
  
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [deleteKaryawan, setDeleteKaryawan] = useState(null);
  
  useEffect(()=>{
    setLoading(true)
    // const params = new URLSearchParams(history.location.search)

    // console.log(history.location.search)
    // console.log(params.get("page"))
    getListDaftarKaryawan({
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
  
  const handleDeleteKaryawan = () => {
    setDeleteKaryawan(null);
    console.log(deleteKaryawan)
    // DElete trus confirmation
  }

  return (
    <div className={classes.root1}>
      {/* <Paper className={classes.page}> */}

      {/* <form className={classes.root} noValidate autoComplete="off"> */}
      {/* <div className="p-4"> */}
      {/* </div> */}
    {/* </form> */}

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

        <Grid item xs={2} alignContent="">
        <CreateableSelection 
                className={classes.mb}
                // options={kategoriOption || []}
                labelKey="nama"
                // value={kategori}
                // setData={val => {setkategori(val); delete errorState.kategori}}
                size="small"
                fullWidth
                renderInput={props=>(
                  <TextField
                    label="Cari Karyawan..."
                    variant="outlined"
                    // error={!!errorState.kategori}
                    // helperText={errorState.kategori && errorState.kategori[0]}
                    {...props}/>
                )}
              />
        </Grid>
          <Grid item xs={2} alignContent="">
          <TextField
          label="Role"
          // defaultValue="Default Value"
          // helperText="Some important text"
          variant="outlined"
          size="small"
          className={classes.mb}
          fullWidth
          select
        />
        </Grid>

        <Grid item xs={2} alignContent="">
        <TextField
          // id="Divisi"
          label="Divisi"
          // defaultValue="Default Value"
          // helperText="Some important text"
          variant="outlined"
          size="small"
          className={classes.mb}
          fullWidth
          select
        />
        </Grid>
        <Grid item xs={4} />

          <Grid item xs={2} alignContent="">
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
                <StyledTableCell align="left">No </StyledTableCell>
                <StyledTableCell align="left">Nama </StyledTableCell>
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
                  <StyledTableRow key={row.username}>
                    <StyledTableCell component="th" scope="row">
                      {`${i+1}.`}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.username}</StyledTableCell>
                    <StyledTableCell align="left">{row.role}</StyledTableCell>
                    {/* <StyledTableCell align="left">{row.nama_divisi?.username}</StyledTableCell> */}
                    <StyledTableCell align="left">{row.divisi.map(x=> x.nama_divisi)}</StyledTableCell>
                    <StyledTableCell align="left">
                    <Grid item sm={10}>
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <CreateIcon style={{ color: "green"}}/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={()=>setDeleteKaryawan(row)}>
                          <DeleteOutlineIcon style={{ color: "red"}}/>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                )))}
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
        <DeleteConfirmationDialog 
          open={!!deleteKaryawan}
          handleCancel={()=>setDeleteKaryawan(null)}
          handleConfirm={handleDeleteKaryawan}
        />
    </div>
  );
};

export default DaftarKaryawan;
