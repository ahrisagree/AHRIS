import React from 'react';
import AddRounded from '@material-ui/icons/AddRounded';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';
import CheckIcon from '@material-ui/icons/Check';
import BookIcon from '@material-ui/icons/Book';

export const TEST_NAVIGATION = [
  {
    menu: 'Kelola Akun',
    icon: <PeopleAltIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'List Akun',
        path: '/akun',
      },
      {
        menu: 'Buat Akun',
        path: '/akun/register',
      }
    ]
  },
  {
    menu: 'Presensi',
    icon: <CheckIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'Buat Presensi',
        path: '/',
      },
      {
        menu: 'My Presensi',
        path: '/my-presensi',
      }
    ]
  },
  {
    menu: 'Daily Log',
    icon: <BookIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'List Daily Log',
        path: '/log',
      },
      {
        menu: 'Submit Log',
        path: '/log-aktivitas',
        icon: <AddRounded />
      }
    ]
  },
  {
    menu: 'Paket Pertanyaan',
    icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'List Paket Pertanyaan',
        path: '/paket-pertanyaan'
      },
      {
        menu: 'Buat Paket Pertanyaan',
        path: '/paket-pertanyaan/add',
      }
    ]
  },
  {
    menu: 'Assign Borang',
    icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
    path: '/assign'
  },
  {
    menu: 'Performa',
    icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'Kelola Hasil Performa',
        path: '/kelola-performa'
      },
      {
        menu: 'Isi Borang',
        path: '/mengisi-borang'
      },
    ]
  },
  {
    menu: 'Gaji',
    path: '/gaji',
    icon: <LocalAtmRoundedIcon style={{ color: 'white' }}/>,
  }
]


export const KARYAWAN_NAVIGATION = [

]

export const ADMIN_NAVIGATION = [
  
]

export const MANAGER_NAVIGATION = [
  
]

export const ADMINISTRASI_NAVIGATION = [
  {
    menu: 'Gaji',
    path: '/',
    icon: <LocalAtmRoundedIcon style={{ color: 'white' }}/>,
  }
]