import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Grid, Button } from '@material-ui/core';
import AHRIS from 'images/agree.png';
import logo from 'images/logo.png';
import TextField from 'components/CustomTextField';
import Loading from 'components/Loading';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        // position: "absolute",
        paddingTop: "20%",
        fontWeight: "bold",
        color: "#FFFFFF",
        background: "linear-gradient(180deg, #00A96F 0%, #437B74 100%)",
        boxShadow: "11px 13px 37px rgba(0, 0, 0, 0.25)",
        // width: 524,
        // height: "100%",
        minHeight: "100vh",
        // left: 0,
        // top: 0,
    },
    foto: {

    }
}));

const Login = ({
    loading,
    error,
    token,
    history,
    tokenError,
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
            <Loading open={loading} />
            <Grid container direction="row">

            <Grid item lg={4} xs={12} sm={6} >

                <Paper className={classes.paper}>
                    <h1 style={{fontSize: 36, textAlign: "center" }}>Selamat datang!</h1>
                    <h1 style={{fontSize: 30, textAlign: "center"}}>Silakan login untuk</h1>
                    <h1 style={{fontSize: 30, textAlign: "center"}}>melanjutkan</h1>

                    {tokenError && <p className="text-red-600 px-7 max-w-lg m-auto">{tokenError}</p>}
                    {error.non_field_errors && <p className="text-red-600 px-7 max-w-lg m-auto">{error.non_field_errors[0]}</p>}
                    <div className="px-7 max-w-lg m-auto" style={{ textAlign: "left"}}> 
                        <h1>E-mail</h1>
                        <TextField
                            id="email"
                            style={{ background: "#FFFF", borderRadius: 8, boxShadow: "8px 4px 30px 1px rgba(0, 0, 0, 0.25)"}}
                            fullWidth
                            placeholder="E-mail"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            error={!!error.email}
                            helperText={error.email && error.email[0]}
                        />
                    </div>
                    
                    <div className="px-7 max-w-lg m-auto" style={{ textAlign: "left"}}>
                        <h1>Password</h1>
                        <TextField
                            id="password"
                            style={{ background: "#FFFF", borderRadius: 8, boxShadow: "8px 4px 30px 1px rgba(0, 0, 0, 0.25)" }}
                            fullWidth
                            placeholder="Password"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            onKeyDown={e=>e.key==='Enter' && goLogin()}
                            variant="outlined"
                            error={!!error.password}
                            helperText={error.password && error.password[0]}
                        />
                    </div>

                    <div className="m-7 p-2" style={{ textAlign: "center" }}>
                    <Button onClick={goLogin} size="large" variant="contained" style={{ paddingLeft: '2rem', paddingRight: '2rem', borderRadius: 23, color: "#FFFF", background: "#0A3142", boxShadow: "3.67797px 4.20339px 8.9322px rgba(0, 0, 0, 0.25)" }}>
                            Login
                    </Button>
                    </div>
                </Paper>

            </Grid>
            
            <Grid item lg={8} sm={6} className="hidden sm:block self-center">
                <img src={AHRIS} alt="foto AHRIS" style={{ width: "80%", maxWidth: 640, margin: 'auto'}} />
            </Grid>

            {/* <Grid item xs={10} sm={6}> */}
                <img src={logo} alt="logo AHRIS" style={{ width: "8rem", position: "absolute", top: '0.5rem', right: '0.5rem'}} />
            {/* </Grid> */}

            </Grid>
        </div>
    )
}

export default Login;
