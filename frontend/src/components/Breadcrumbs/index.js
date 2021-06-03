// source code: https://www.youtube.com/watch?v=n9kn8yQPC4E 

import { Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography,
    makeStyles
 } from '@material-ui/core';
import React from 'react';
import logo from 'images/logo.png';
import Notification from 'components/Notification';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        // position: relative
        '& a': {
            cursor: 'pointer'
        }
    },
    breadcrumbs: {
        // ini breadcrumb beberapa style nya didisable biar ga nimpa trs dipindahin ke navigationdrawer
        position: "relative",  // position absolute nya bwt di navigation drawer biar ga nimpa
        width: "100%",
        minHeight: "2.5rem",
        // height: 60,
        // left: 0,
        // top: 0,
        // background: "rgba(255, 255, 255, 0.99)",  bg disable ikutin styling yg navigation
        // border: "1px solid rgba(0, 0, 0, 0.3)",
        boxSizing: "border-box",
        // boxShadow: "0px -16px 57px rgba(0, 0, 0, 0.25)",
        fontFamily: "IBM Plex Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        // fontSize: "24px",  
        color: "#0A3142",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        letterSpacing: "0.0075em",
    },
    typography: {
        fontFamily: "IBM Plex Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "1rem", // fontsize biasain pake rem   1rem=16px
        color: "#0A3142",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        letterSpacing: "0.0075em",
    }
    }));

const Breadcrumbs = ({pathname, push}) => {
    const classes = useStyles();

    // const {
    //     history,
    //     location: { pathname }
    // } = props;
    // pindahin propsnya dari navigation drawer biar ga ngelag

    const pathnames = pathname.split("/").filter(x => x);
    return (
        <div className={classes.root}>
            <MUIBreadcrumbs aria-label="breadcrumb" separator="›" className={classes.breadcrumbs}>
                {pathnames.length > 0 ? (
                    <Link onClick={() => push("/")}>Home</Link>
                ) : (
                    <Typography className={classes.typography}> Home </Typography>
                )}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Typography key={`${name}-${index}`} className={classes.typography}> {name} </Typography>
                    ) : (
                        <Link key={`${name}-${index}`} onClick = {() => push(routeTo)}>{name}</Link>
                        );
                })}
            </MUIBreadcrumbs>
            <Notification push={push} />
            <img 
                src={logo} 
                alt="logo AHRIS" 
                style={{ height: '40px'}} 
            />
        </div>
    );
};

export default React.memo(Breadcrumbs);