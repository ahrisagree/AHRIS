import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Grid, TextField, Button } from '@material-ui/core';
import AHRIS from 'images/agree.png';
import logo from 'images/logo.png';
import Breadcrumbs from 'components/Breadcrumbs';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        position: "absolute",
        paddingTop: "10%",
        fontWeight: "bold",
        color: "#FFFF",
        background: "linear-gradient(180deg, #00A96F 0%, #437B74 100%)",
        boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
        width: 524,
        height: "100%",
        minHeight: 700,
        left: 0,
        top: 0,
    }
}));

const Login = ({
    loading,
    error,
    token,
    history,
    loginThunk
}) => {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        if (token!=null) history.push('/')
    },[history, token])
    
    const goLogin = () => {
        loginThunk({email, password});
    }

    return (
        <div className={classes.root}>
            <Grid container direction="row">

            <Grid item xs={10} sm={6}>

                <Paper className={classes.paper}>
                    <h1 style={{fontSize: 36, textAlign: "center" }}>Selamat datang!</h1>
                    <h1 style={{fontSize: 30, textAlign: "center"}}>Silakan login untuk</h1>
                    <h1 style={{fontSize: 30, textAlign: "center"}}>melanjutkan</h1>

                    <div className="m-7 p-2" style={{ textAlign: "left", paddingBottom: "10%", paddingLeft: 0 }}> 
                        <h1>E-mail</h1>
                        <TextField
                            id="outlined-full-width"
                            style={{ background: "#FFFF", borderRadius: 8, width: 456, height: 55, position: "absolute", boxShadow: "8px 4px 30px 1px rgba(0, 0, 0, 0.25)"}}
                            placeholder="E-mail"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            error={error.email}
                        />
                    </div>
                    
                    <div className="m-7 p-2" style={{ textAlign: "left", paddingBottom: "10%", paddingLeft: 0 }}>
                        <h1>Password</h1>
                        <TextField
                            id="outlined-full-width"
                            style={{ background: "#FFFF", borderRadius: 8, width: 456, height: 55, position: "absolute", boxShadow: "8px 4px 30px 1px rgba(0, 0, 0, 0.25)" }}
                            placeholder="Password"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            variant="outlined"
                            error={error.password}
                            // bikin formcontrol buat error nanti di component -leo
                        />
                    </div>

                    <div className="m-7 p-2" style={{ textAlign: "center" }}>
                    <Button onClick={goLogin} variant="contained" style={{  borderRadius: 23, color: "#FFFF", background: "#0A3142", boxShadow: "3.67797px 4.20339px 8.9322px rgba(0, 0, 0, 0.25)" }}>
                            Login
                    </Button>
                    </div>
                </Paper>

            </Grid>

            <Grid item xs={10} sm={6}>
                <img src={AHRIS} alt="foto AHRIS" style={{ width: "50%", position: "absolute",left: 614, top: 100}} />
            </Grid>

            <Grid item xs={10} sm={6}>
                <img src={logo} alt="logo AHRIS" style={{ width: "10%", position: "absolute", top: 0, right: 0}} />
            </Grid>

            </Grid>
        </div>
    )
}

export default Login;
