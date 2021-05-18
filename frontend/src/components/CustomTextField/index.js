import React, {useState} from 'react';
import { TextField, withStyles } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


const TheTextField = ({type, ...props}) => {
  const [show, setShow] = useState(false);
  return (
    <TextField 
      InputProps = {{
        endAdornment: type==='password' ? (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShow(!show)}
              onMouseDown={e=>e.preventDefault()}
              edge="end"
            >
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
          ) : null
      }}
      type = {show ? 'text' : type}
      {...props}
    /> 
  )
}

const CustomTextField = withStyles({
  root: {
    marginBottom: '1rem',
    '& label.Mui-focused': {
      color: '#0B3242',
    },
    '& .MuiInput-underline:not(.Mui-error):after, & .MuiFilledInput-underline:not(.Mui-error):after': {
      borderBottomColor: '#0B3242',
    },
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      top: '100%',
      marginTop: 0,
    },
    '& .MuiOutlinedInput-root': {
      '&:not(.Mui-disabled):hover fieldset': {
        borderColor: '#0B3242',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0B3242',
      },
    },
    '& label.Mui-disabled, .Mui-disabled': {
      color: props => props.isDetail || props.bordered ? '#0B3242':'',
    }
  },
})(TheTextField);

export default CustomTextField;