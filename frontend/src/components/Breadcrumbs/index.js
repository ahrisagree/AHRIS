// source code: https://www.youtube.com/watch?v=n9kn8yQPC4E 

import { Breadcrumbs as MUIBreadcrumbs,
    Link,
    Typography
 } from '@material-ui/core';
import React from 'react';
import { withRouter } from "react-router-dom";

const Breadcrumbs = props => {
    const {
        history,
        location: { pathname }
    } = props;
    const pathnames = pathname.split("/").filter(x => x);
    return (
        <MUIBreadcrumbs aria-label="breadcrumb">
            {pathnames.length > 0 ? (
                <Link onClick={() => history.push("/")}>Home</Link>
            ) : (
                <Typography> Home </Typography>
            )}
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                    <Typography> {name} </Typography>
                ) : (
                    <Link onClick = {() => history.push(routeTo)}>{name}</Link>
                    );
            })}
        </MUIBreadcrumbs>
    );
};

export default withRouter(Breadcrumbs);
