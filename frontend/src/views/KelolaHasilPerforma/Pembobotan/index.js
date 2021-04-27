import React, { useState } from 'react';
import {
  makeStyles,
} from '@material-ui/core';

import PembobotanForm from './PembobotanForm';
import DaftarPemberi from './DaftarPemberi';
import JawabanBorang from './JawabanBorang';


const useStyles = makeStyles((theme) => ({
  root: {
    background: "#E5E5E5",
    flexGrow: 1,
  },
  paper: {
    paddingTop: 25,
    fontWeight: "bold",
    color: "0A3142",
    boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily:"IBM Plex Sans"
  },
  disabledtextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontFamily:"IBM Plex Sans",
    backgroundColor:"rgba(229, 229, 229, 0.51)"
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
  title: {
    position: "relative",
    top: 40,
    right : -160
  },
  splitScreen: {
    display: "flex",
    flexDirection: "row",
    position: 'relative'
  },
  topPane: {
    width: "calc(50% + 1.5rem)",
    position: 'absolute',
    left: 0,
    top: 0,
    height: 'calc(100vh - 5.5rem)',
    overflowY: 'scroll',
  },
  bottomPane: {
    width: "50%",
    position: 'absolute',
    right: '-1.5rem',
    top: '-1.5rem',
    height: 'calc(100vh - 4rem)',
    overflowY: 'scroll',
  },
  mb: {
    marginBottom: '1rem'
  },
  table: {
    // width: 550,
  }
}));

const Pembobotan = props => {
  const classes = useStyles();
  const [idAssignment, setIdAssignment] = useState(null);
  // const handlesetDetailJawaban = val => {
  //   setDetailJawaban(val);
  //   console.log(val)
  // }
  // useEffect(()=>{
  //   getDivisiAPI().then(res=>{
  //     setDivisiOptions(res.data);
  //   }).catch(err=>{
  //     console.error(err.response);
  //   })
  // }, [])

  // const doQuery = () => {
  //   setQueryParams({
  //     role: roleFilter || "",
  //     divisi: divisiFilter || "",
  //     search: searchFilter || ""
  //   }, history);
  //   setPage(1);
  //   setUpdate(update+1);
  // }

  // const resetQuery = () => {
  //   setQueryParams({}, history);
  //   setPage(1);
  //   setFilterDivisi(null);
  //   setFilterSearch(null);
  //   setFilterRole(null);
  // }

  
    return (
      <div className={classes.splitScreen}>
        <div className={classes.topPane}>
          {idAssignment ? 
            <JawabanBorang
              classes={classes}
              idAssignment={idAssignment}
              back={()=>setIdAssignment(null)}
              {...props}
            />
          :
            <DaftarPemberi
              classes={classes}
              selectJawaban={setIdAssignment}
              {...props} 
            />
          }
        </div>
        <div className={classes.bottomPane}>
          <PembobotanForm classes={classes} />
        </div>
      </div>

    )
};
export default Pembobotan;     