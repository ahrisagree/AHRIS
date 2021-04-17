import { IconButton, Tooltip } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import React from 'react';

const FormActionController = ({
  id,
  onAdd,
  onDelete,
  onUp,
  onDown,  
  ...rest
}) => (
  <div className="flex flex-row justify-end" id={`foac-${id}`} {...rest}>
    <Tooltip title="Add">
      <IconButton size="small" onClick={onAdd||null}>
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete" onClick={onDelete||null}>
      <IconButton size="small">
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Move up" onClick={onUp||null}>
      <IconButton size="small">
        <KeyboardArrowUpRoundedIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Move down" onClick={onDown||null}>
      <IconButton size="small">
        <KeyboardArrowDownRoundedIcon />
      </IconButton>
    </Tooltip>
  </div>
);

export default React.memo(FormActionController);