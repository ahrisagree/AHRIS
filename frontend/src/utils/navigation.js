import React from 'react';
import AddRounded from '@material-ui/icons/AddRounded';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';
import CheckIcon from '@material-ui/icons/Check';
import BookIcon from '@material-ui/icons/Book';

// export const TEST_NAVIGATION = [
//   {
//     menu: 'Home',
//     icon: <HomeIcon style={{ color: 'white' }}/>,
//     path: '/'
//   },
//   {
//     menu: 'Kelola Akun',
//     icon: <PeopleAltIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'List Akun',
//         path: '/akun',
//       },
//       {
//         menu: 'Buat Akun',
//         path: '/akun/register',
//       }
//     ]
//   },
//   {
//     menu: 'Presensi',
//     icon: <CheckIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'Buat Presensi',
//         path: '/',
//       },
//       {
//         menu: 'Presensi Saya',
//         path: '/my-presensi',
//       }
//     ]
//   },
//   {
//     menu: 'Daily Log',
//     icon: <BookIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'List Daily Log',
//         path: '/log',
//       },
//       {
//         menu: 'Buat Log',
//         path: '/log-aktivitas',
//         icon: <AddRounded />
//       }
//     ]
//   },
//   {
//     menu: 'Paket Borang',
//     icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'List Borang',
//         path: '/paket-pertanyaan'
//       },
//       {
//         menu: 'Buat Borang',
//         path: '/paket-pertanyaan/add',
//       },
//       {
//         menu: 'Assign Borang',
//         path: '/assign'
//       }
//     ]
//   },
//   {
//     menu: 'Performa',
//     icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
//     children: [
//       {
//         menu: 'Kelola Hasil Performa',
//         path: '/kelola-performa'
//       },
//       {
//         menu: 'Isi Borang',
//         path: '/mengisi-borang'
//       },
//       {
//         menu: 'Evaluasi Performa',
//         path: '/daftar-evaluasi-performa'
//       },
//       {
//         menu: 'Hasil Performa',
//         path: '/hasil-performa'
//       },
//     ]
//   },
//   {
//     menu: 'Gaji',
//     path: '/gaji',
//     icon: <LocalAtmRoundedIcon style={{ color: 'white' }}/>,
//   },
// ]


export const KARYAWAN_NAVIGATION = [
  {
    menu: 'Home',
    icon: <HomeIcon style={{ color: 'white' }}/>,
    path: '/'
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
        menu: 'Presensi Saya',
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
        menu: 'Buat Log',
        path: '/log-aktivitas',
        icon: <AddRounded />
      }
    ]
  },
  {
    menu: 'Performa',
    icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'Isi Borang',
        path: '/mengisi-borang'
      },
      {
        menu: 'Hasil Performa',
        path: '/hasil-performa'
      },
    ]
  },
]

export const ADMIN_NAVIGATION = [
  {
    menu: 'Home',
    icon: <HomeIcon style={{ color: 'white' }}/>,
    path: '/'
  },
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
  // {
  //   menu: 'Presensi',
  //   icon: <CheckIcon style={{ color: 'white' }}/>,
  //   children: [
  //     {
  //       menu: 'Buat Presensi',
  //       path: '/',
  //     },
  //     {
  //       menu: 'Presensi Saya',
  //       path: '/my-presensi',
  //     }
  //   ]
  // },
  // {
  //   menu: 'Daily Log',
  //   icon: <BookIcon style={{ color: 'white' }}/>,
  //   children: [
  //     {
  //       menu: 'List Daily Log',
  //       path: '/log',
  //     },
  //     {
  //       menu: 'Buat Log',
  //       path: '/log-aktivitas',
  //       icon: <AddRounded />
  //     }
  //   ]
  // },
  {
    menu: 'Paket Borang',
    icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'List Borang',
        path: '/paket-pertanyaan'
      },
      {
        menu: 'Buat Borang',
        path: '/paket-pertanyaan/add',
      },
      {
        menu: 'Assign Borang',
        path: '/assign'
      }
    ]
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
      {
        menu: 'Hasil Performa',
        path: '/hasil-performa'
      },
    ]
  },
  {
    menu: 'Gaji',
    path: '/gaji',
    icon: <LocalAtmRoundedIcon style={{ color: 'white' }}/>,
  },
]

export const MANAGER_NAVIGATION = [
  {
    menu: 'Home',
    icon: <HomeIcon style={{ color: 'white' }}/>,
    path: '/'
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
        menu: 'Presensi Saya',
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
        menu: 'Buat Log',
        path: '/log-aktivitas',
        icon: <AddRounded />
      }
    ]
  },
  {
    menu: 'Paket Borang',
    icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'List Borang',
        path: '/paket-pertanyaan'
      }
    ]
  },
  {
    menu: 'Performa',
    icon: <InsertDriveFileOutlinedIcon style={{ color: 'white' }}/>,
    children: [
      {
        menu: 'Isi Borang',
        path: '/mengisi-borang'
      },
      {
        menu: 'Evaluasi Performa',
        path: '/daftar-evaluasi-performa'
      },
      {
        menu: 'Hasil Performa',
        path: '/hasil-performa'
      },
    ]
  },
]

export const ADMINISTRASI_NAVIGATION = [
  {
    menu: 'Gaji',
    path: '/gaji',
    icon: <LocalAtmRoundedIcon style={{ color: 'white' }}/>,
  }
]