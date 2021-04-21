
import { withStyles } from '@material-ui/core';
import MuiProgress from '@material-ui/core/CircularProgress';

const CircularProgress = withStyles((theme) => ({
  circle: {
    color: '#0B3242',
  },
}))(MuiProgress);

export default CircularProgress;
