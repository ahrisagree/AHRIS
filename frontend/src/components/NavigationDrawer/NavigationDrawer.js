import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { EditRounded } from '@material-ui/icons';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Breadcrumbs from 'components/Breadcrumbs';
import { withRouter } from 'react-router';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TemplateButton from 'components/TemplateButton';
import {
  // ADMINISTRASI_NAVIGATION,
  // ADMIN_NAVIGATION,
  // KARYAWAN_NAVIGATION,
  // MANAGER_NAVIGATION,
  TEST_NAVIGATION 
} from 'utils/navigation';
// import { ROLE } from 'utils/constant';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // border: "1px solid rgba(0, 0, 0, 0.3)", // pindahan dari drawer
    background: "rgba(255, 255, 255, 0.99)"  // pindahan dari drawer
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: "#0A3142",
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerBg: {
    background: "linear-gradient(180deg, #00A96F 0%, #437B74 100%)",
    boxShadow: "4px 4px 15px rgba(0, 0, 0, 0.25)",
    borderRadius: '0 0 7px 0',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },

  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  accordionSummary: {
    display: 'block',
    padding: 0,
    background: 'none',
    margin: "0!important",
    minHeight: 'unset!important',
    '& .MuiAccordionSummary-content': {
      margin: "0!important"
    }
  },
  collection: {
    marginTop: '1.5rem',
    color: 'white',
    fontFamily: "IBM Plex Sans",
    fontStyle: "normal",
    fontWeight: "normal",
  },
  accordion: {
    color: 'white',
    background: 'none',
    boxShadow: 'none',
    '&:before': {
      content: 'unset!important',
    },
    '&.Mui-expanded': {
      margin: 0
    }
  },
  accordionDetails: {
    background: 'rgba(196, 196, 196, 0.24)',
    padding: 0
  },
}));


// // gini dulu nanti dipisahin ke constant
// const navigationMenu = [
//   {
//     menu: 'Kelola Akun',
//     icon: <PeopleAltIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'List Akun',
//         path: '/akun',
//       },
//       {
//         menu: 'Buat Akun',
//         path: '/akun/register',
//       }
//     ]
//   },
//   {
//     menu: 'Presensi',
//     icon: <CheckIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'Buat Presensi',
//         path: '/',
//       },
//       {
//         menu: 'My Presensi',
//         path: '/log/daftar-presensi',
//       }
//     ]
//   },
//   {
//     menu: 'Daily Log',
//     icon: <BookIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'List Daily Log',
//         path: '/daftar-log',
//       },
//       {
//         menu: 'Submit Log',
//         path: '/log-aktivitas',
//         icon: <AddRounded />
//       }
//     ]
//   },
//   {
//     menu: 'Paket Pertanyaan',
//     icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'List Paket Pertanyaan',
//         path: '/paket-pertanyaan'
//       },
//       {
//         menu: 'Buat Paket Pertanyaan',
//         path: '/paket-pertanyaan/add',
//       }
//     ]
//   },
//   {
//     menu: 'Assign Borang',
//     icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
//     path: '/assign'
//   },
//   {
//     menu: 'Performa',
//     icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'Kelola Hasil Performa',
//         path: '/kelola-performa'
//       },
//       {
//         menu: 'Isi Borang',
//         path: '/mengisi-borang'
//       },
//     ]
//   },
//   {
//     menu: 'Gaji',
//     path: '/',
//     icon: <LocalAtmRoundedIcon style={{ color: 'white' }}/>,
//   }
// ]

const NavigationDrawer = ({children, history, location, user, logoutThunk}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [accordion, setAccordion] = React.useState(-1);
  const {pathname} = location;

  // gini dulu nanti dipisahin ke constant
  let navigationMenu = TEST_NAVIGATION

  // switch (user.role) {
  //   case ROLE.admin:
  //     navigationMenu = ADMIN_NAVIGATION
  //     break;
  //   case ROLE.karyawan:
  //     navigationMenu = KARYAWAN_NAVIGATION
  //     break;
  //   case ROLE.manager:
  //     navigationMenu = MANAGER_NAVIGATION
  //     break;
  //   case ROLE.administrasi:
  //     navigationMenu = ADMINISTRASI_NAVIGATION
  //     break;
  //   default:
  //     break;
  // }

  const handleAccordion = panel => (_e, isExpanded) => {
    setAccordion(isExpanded ? panel : -1);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (pathname === "/login") {
    return children;
  }
  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Breadcrumbs 
            pathname={pathname}
            push={history.push}  
          />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawerBg, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />

        <div className={classes.collection}>

          <ListItem className={clsx(classes.profile, {
            [classes.hide]: !open
          })}
            onClick={()=>history.push('/profil')}
            button
          >
            <AccountCircleIcon style={{
              width: 'auto', 
              height: 'auto', 
              maxWidth: '5rem',
              textAlign: 'center', 
              color: 'white'
              }} />
              <IconButton>
              <EditRounded style={{color: 'white'}} />
            </IconButton>
            <h1 style={{textAlign: 'center'}}>{user?.username}</h1>
            <h1 style={{textAlign: 'center'}}>{user?.role || "No Role"}</h1>
          </ListItem>
          <div style={{marginTop: '1.5rem'}} />
          {navigationMenu.map((nav, i)=>nav.children?
          (
            <Accordion 
              TransitionProps={{ unmountOnExit: true }} 
              className={classes.accordion} 
              key={nav.menu} 
              expanded={accordion===i}
              onChange={handleAccordion(i)}
            >
              <AccordionSummary className={classes.accordionSummary}>
                <ListItem button key={nav.menu}>
                  <ListItemIcon>{nav.icon}</ListItemIcon>
                  <ListItemText primary={nav.menu} />
                </ListItem>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                <List>
                  {nav.children.map(child => (
                    <ListItem button key={child.menu} onClick={()=>history.push(child.path)}>
                      {/* <ListItemIcon>{child.icon || <MailIcon />}</ListItemIcon> */}
                      <ListItemText primary={child.menu} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ):(
            <ListItem button key={nav.menu} onClick={()=>history.push(nav.path)}>
              {/* <ListItemIcon>{nav.icon || <InboxIcon />}</ListItemIcon> */}
              <ListItemIcon>{nav.icon}</ListItemIcon>
              <ListItemText primary={nav.menu} />
            </ListItem>
          ))}

        </div>
        <div className={`text-center mt-8 ${open ? '' : 'hidden'}`}>
          <TemplateButton
            onClick={logoutThunk}
            type="button"
            buttonStyle="btnBlueOutline"
            buttonSize="btnLong"
          >
            Logout
          </TemplateButton>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default withRouter(NavigationDrawer);