import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from './CircularProgress';
import { DialogContent } from '@material-ui/core';

const Loading = (props) => (
  <Dialog {...props}>
    <DialogContent>
      <CircularProgress />
    </DialogContent>
  </Dialog>
);

export default Loading;