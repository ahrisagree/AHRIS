// source code: https://www.youtube.com/watch?v=n9kn8yQPC4E 

import { Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography,
    makeStyles
 } from '@material-ui/core';
import React from 'react';
import { withRouter } from "react-router-dom";
import logo from 'images/logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    breadcrumbs: {
        position: "absolute",
        width: "100%",
        height: 60,
        left: 0,
        top: 0,
        background: "rgba(255, 255, 255, 0.99)",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        boxSizing: "border-box",
        boxShadow: "0px -16px 57px rgba(0, 0, 0, 0.25)",
        fontFamily: "IBM Plex Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "24px",
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
        fontSize: "24px",
        color: "#0A3142",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        letterSpacing: "0.0075em",
    }
    }));

const Breadcrumbs = props => {
    const classes = useStyles();

    const {
        history,
        location: { pathname }
    } = props;

    const pathnames = pathname.split("/").filter(x => x);
    return (
        <div className={classes.root}>
            <MUIBreadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                {pathnames.length > 0 ? (
                    <Link onClick={() => history.push("/")}>Home</Link>
                ) : (
                    <Typography className={classes.typography}> Home </Typography>
                )}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Typography className={classes.typography}> {name} </Typography>
                    ) : (
                        <Link onClick = {() => history.push(routeTo)}>{name}</Link>
                        );
                })}

                <img src={logo} alt="logo AHRIS" style={{ position: "absolute", top: 0, right: 0}} />
            </MUIBreadcrumbs>
        </div>
    );
};

export default withRouter(Breadcrumbs);
