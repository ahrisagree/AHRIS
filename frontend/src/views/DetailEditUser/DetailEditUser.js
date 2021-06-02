import React, { useEffect } from 'react';
import {
  makeStyles,
  Paper,
  Container,
  Grid,
  MenuItem,
  Chip,
  IconButton,
  Tooltip
} from '@material-ui/core';
import TextField from 'components/CustomTextField';
import Dialog from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import MainTitle from 'components/MainTitle';
import TemplateButton from 'components/TemplateButton';
import { ROLES } from 'utils/constant';
import { getDivisiAPI, editUser, getKaryawan, deleteKaryawanAPI } from 'api/akun';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Loading from 'components/Loading';
import { EditRounded } from '@material-ui/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlineRounded';
import DeleteConfirmationDialog from 'components/DialogConf';

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E5E5E5",
    flexGrow: 1,
  },
  paper: {
    // position: "absolute",
    paddingTop: 50,
    fontWeight: "bold",
    color: "#FFFF",
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    // width: 1000,
    // height : 500,
    // left: 200,
    // top: 150
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily:"IBM Plex Sans"
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#0A3142",
    color: '#FFFFFF',
    fontWeight: 600,
    fontFamily: "IBM Plex Sans",
    borderRadius: 25.86,
    width: 286,
    height: 50,
    top: 30,
    left: 300
  },
  foto: {
    marginLeft: 160
  },
  title: {
    position: "relative",
    top: 40,
    right : -160
  }
}));

const filter = createFilterOptions();

const DetailEditUser = ({history, match}) => {
  const classes = useStyles();
  const { path } = match

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const [success, setSuccess] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [username, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [divisi, setDivisi] = React.useState([]);
  const [gaji, setGaji] = React.useState("");
  const [opsiDivisi, setOpsiDivisi] = React.useState([]);
  const [editMode, setEditMode] = React.useState(path.substr(-4) === "edit");
  const [deleteKaryawan, setDeleteKaryawan] = React.useState(null);
  const [update, setUpdate] = React.useState(0);
  const [fullLoading, setFullLoading] = React.useState(false);

  
  useEffect(()=>{
    setLoading(true);
    const id = match.params.idUser;
    getKaryawan(id).then(res => {
        const { data } = res;
        setNama(data.username);
        setEmail(data.email);
        setGaji(data.gaji);
        setDivisi(data.divisi);
        setRole(data.role);
        console.log(data)
    }).catch(err=>{
      // HANDLE ERROR
    }).finally(()=>{
      setLoading(false)
    })

    getDivisiAPI().then(res=>{
      setOpsiDivisi(res.data);
    }).catch(err=>{
      // HANDLE ERRROR
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cancelEdit = () => {
    setEditMode(false)
  }

  const handleDeleteKaryawan = () => {
    setFullLoading(true);
    const { idUser } = match.params;
    deleteKaryawanAPI(idUser).then(()=>{
     setDeleteKaryawan(null);
     setUpdate(update+1);
    }).catch(err=>{
      // Handle ERROR
      }).finally(()=>{
        setFullLoading(false);
      });
    }

  const onSubmit = () => {
    const { idUser } = match.params;
    setLoading(true)
    editUser(idUser, {
      username: username,
      divisi: divisi,
      role: role,
      gaji: gaji
    }).then(res=>{
      setSuccess(true);
      console.log(res.data)
    }).catch(err=>{
      console.error(err.response);
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })
  }

  return (
    <div className="m-10">
      {/* <div className={classes.title}>
          <h4 style={{fontFamily: "IBM Plex Sans", fontSize: "24px", fontWeight:600}}>Buat Akun</h4>
          <div style={{width:414, height: 12, backgroundColor:"#FFB800", borderRadius: 4}}></div>
      </div> */}
      <Grid item xs={12}>
      {!editMode && 
      <Tooltip title="Edit">
        <IconButton onClick={()=>setEditMode(true)} style={{float: 'right'}}>
          <EditRounded />
        </IconButton>
      </Tooltip>
        
      }
      <Tooltip title="Delete">
        <IconButton size="small" style={{float: 'right', marginTop:'1%'}} onClick={()=>setDeleteKaryawan(true)}>
          <DeleteOutlineIcon />
        </IconButton>
      </Tooltip>
      </Grid>
      
      <MainTitle title={editMode ? "Edit Akun" : "Detail Akun"} className="mb-8" />
      <Container component={Paper} className={classes.paper}>
        <Grid item xs={12}>
          <TextField id="outlined-full-width"
          required="true"
          label="Nama"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="outlined"
          value={username}
          onChange={e=>{setNama(e.target.value); delete error.username}}
          error={!!error.username}
          helperText={error.username && error.username[0]}
          disabled={!editMode}
          isDetail={true}
          />
        </Grid>

        <div>
        <TextField
          id="outlined-margin-normal"
          required="true"
          label="Email"
          style={{ margin: 8 , width: '75ch'}}
          margin="normal"
          variant="outlined"
          value={email}
          onChange={e=>{setEmail(e.target.value); delete error.email}}
          error={!!error.email}
          helperText={error.email && error.email[0]}
          disabled={true}
          isDetail={!editMode}
        />
        <TextField
          id="outlined-medium"
          required="true"
          label="Role"
          select
          style={{ margin: 8 , width: '21ch'}}
          margin="normal"
          variant="outlined"
          className={classes.textField}
          value={role}
          onChange={e=>{setRole(e.target.value); delete error.role}}
          error={!!error.role}
          helperText={error.role && error.role[0]}
          disabled={!editMode}
          isDetail={true}
        >
          {ROLES.map(peran=>(
            <MenuItem key={peran} value={peran}>{peran}</MenuItem>
          ))}
        </TextField>
      </div>  

        <Grid item xs={12}>
          {/* <TextField id="outlined-full-width"
            required="true"
            label="Divisi"
            style={{ margin: 8 }}
            fullWidth
            select
            margin="normal"
            variant="outlined"
            value={role}
            onChange={e=>setRole(e.target.value)}
            >
          </TextField> */}
            <Autocomplete
              style={{ margin: 8 }}
              margin="normal"
              multiple
              id="tags-filled"
              options={opsiDivisi}
              getOptionLabel={opt=>opt.newInput||opt.nama_divisi}
              value={divisi}
              freeSolo
              error={!!error.divisi}
              helperText={error.divisi && "Not Valid"}
              disabled={!editMode}
              isDetail={true}
              filterOptions={(opts, params) => {
                const filtered = filter(opts, params);
                // Suggest the creation of a new value
                if (params.inputValue !== '' && !opts.find(x => x.nama_divisi === params.inputValue)) {
                  filtered.push({
                    newInput: `Add "${params.inputValue}"`,
                    nama_divisi: params.inputValue,
                    id: 0
                  });
                }
                return filtered;
              }}
              onChange={(_e, newValue)=>setDivisi(newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option.nama_divisi} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} 
                label="Divisi"
                variant="outlined"
                isDetail={true}
                />
              )}
            />
        </Grid>
        
        <Grid item xs={12}>
          <TextField id="outlined-full-width"
          required="true"
          label="Gaji Pokok"
          style={{ margin: 8 }}
          fullWidth
          type="number"
          margin="normal"
          variant="outlined"
          value={gaji}
          onChange={e=>{setGaji(e.target.value); delete error.gaji}}
          error={!!error.gaji}
          helperText={error.gaji && error.gaji[0]}
          disabled={!editMode}
          isDetail={true}
          />
        </Grid>
        {/* <Dialog2></Dialog2> */}
        <div className="flex justify-center py-6">
          {editMode && 
            <TemplateButton
              onClick={cancelEdit}
              type="button"
              buttonStyle="btnBlueOutline"
              buttonSize="btnLong"
              style={{marginRight: '2rem'}}
            >
              Cancel
            </TemplateButton>
          }
          {editMode && 
            <TemplateButton
              onClick={onSubmit}
              type="button"
              buttonStyle="btnBlue"
              buttonSize="btnLong"
              disabled={loading}
              >
              Simpan
            </TemplateButton>
          }
        </div>
        {/* <Button className={classes.button} onClick={toggleModal}>Simpan</Button> */}
        {/* <Dialog2 canShow={showModal} updateModalState={toggleModal}></Dialog2> */}
      </Container>
      <Loading open={loading} />
      <Dialog open={success} handleClose={()=>history.push(`/akun`)} />
      
      <DialogFail
        open={!!error.detail} 
        handleClose={()=>{
          setError({})
        }} 
        text={error.detail}
        />
        <DeleteConfirmationDialog 
          open={!!deleteKaryawan}
          handleCancel={()=>setDeleteKaryawan(null)}
          handleConfirm={handleDeleteKaryawan}
        />
        <Loading open={fullLoading} />

    </div>
  )
};

export default DetailEditUser;                                                                                                                                                                                
