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
    <Tooltip title="Delete">
      <IconButton size="small" onClick={onDelete||null}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Move up">
      <IconButton size="small" onClick={onUp||null}>
        <KeyboardArrowUpRoundedIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Move down">
      <IconButton size="small" onClick={onDown||null}>
        <KeyboardArrowDownRoundedIcon />
      </IconButton>
    </Tooltip>
  </div>
);

export default React.memo(FormActionController);