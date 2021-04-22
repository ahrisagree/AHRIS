import { getPaketPertanyaanAPI } from 'api/borang';
import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import BuatPaketPertanyaan from 'views/BuatPaketPertanyaan';

const DetailEditPaketPertanyaan = ({match}) => {
  useEffect(()=>{
    const { id } = match.params;
    setLoading(true)
    getPaketPertanyaanAPI(id).then(res=>{
      setPaket(res.data)
    }).catch(err=>{

    }).finally(()=>{
      setLoading(false);
    })
  }, [match]);
  
  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false); 

  if (paket) {
    return (
      <BuatPaketPertanyaan
        isDetail={!editMode}
        isEdit={editMode}
        paket={paket}
        loading={loading}
        setEditMode={setEditMode}
      />
    )
  } 
  return (
    <>
      <div>{!loading && "Not Found"}</div>
      <Loading open={loading} />
    </>
  )
}

export default DetailEditPaketPertanyaan;