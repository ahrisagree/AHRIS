import { TextField, withStyles } from "@material-ui/core";

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#0B3242',
    },
    '& .MuiInput-underline:not(.Mui-error):after, & .MuiFilledInput-underline:not(.Mui-error):after': {
      borderBottomColor: '#0B3242',
    },
    '& .MuiFormHelperText-root': {
      position: 'absolute',
      top: '100%'
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
      color: props => props.isDetail ? '#0B3242':'',
    }
  },
})(TextField);

export default CustomTextField;