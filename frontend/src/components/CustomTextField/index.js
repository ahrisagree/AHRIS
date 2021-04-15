import { TextField, withStyles } from "@material-ui/core";

const CustomTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#0B3242',
    },
    '& .MuiInput-underline:after, & .MuiFilledInput-underline:after': {
      borderBottomColor: '#0B3242',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#0B3242',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0B3242',
      },
    },
  },
})(TextField);

export default CustomTextField;