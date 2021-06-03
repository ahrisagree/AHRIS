import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { Divider, IconButton, List, ListItem, Tooltip } from '@material-ui/core';
import { NotificationsNoneRounded } from '@material-ui/icons';
import { getNotifAPI } from 'api/notif';
import CircularProgress from 'components/Loading/CircularProgress';

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: theme.zIndex.drawer + 100
  },
  paper: {
    width: 300,
  },
  typography: {
    padding: theme.spacing(1.5),
    fontSize: "0.9rem",
  },
}));

function Notification({push}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [listNotif, setListNotif] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  useEffect(()=> {
    setLoading(true);
    getNotifAPI().then(res=>{
      setListNotif(res.data?.results || []);
    }).finally(()=>{
      setLoading(false);
    })
  }, []);

  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition className={classes.popper}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
              {loading && <CircularProgress />}
              {listNotif?.length !== 0 && !loading ? 
                <List>
                  {listNotif.map(item=>(
                    <>
                      <ListItem button onClick={()=>push(item.link)} className={classes.typography}>
                        <div className="flex flex-row justify-between">
                          <span className="w-8/12">
                            {item.text}
                          </span>
                          <span className="w-3/12 text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleString("en-GB")}
                          </span>
                        </div>
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                </List>
              : 
                <Typography className={classes.typography}>No Notification</Typography>
              }
            </Paper>
          </Fade>
        )}
      </Popper>
      <Tooltip title="Notifications">
        <IconButton onClick={handleClick}>
          <NotificationsNoneRounded style={{color:"#0B3242"}} />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default React.memo(Notification);