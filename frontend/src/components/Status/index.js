import React from 'react';
import { STATUS_LOG } from 'utils/constant';

const Status = ({status, text}) => {
  const fontColor = {
    [STATUS_LOG[0]]: 'text-yellow-500', 
    [STATUS_LOG[1]]: 'text-green-600',
    [STATUS_LOG[2]]: 'text-red-500',
    'Done': 'text-green-600',
    'Sudah Diisi': 'text-green-600',
    'Belum isi': 'text-red-500',
  }
  return (
    <span className={`text-sm ${fontColor[status]}`}>{status || text}</span>
  )
}

export default Status;