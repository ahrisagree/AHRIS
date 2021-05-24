import { baseUrl } from 'api/constant';
import axios from 'axios';
import React, { useState } from 'react';
import AssignPaket from 'views/AssignPaket';
import AssignPenerima from 'views/AssignPenerima';
import AssignResponden from 'views/AssignResponden';
import DialogSuccess from 'components/Dialog';
import DialogFail from 'components/DialogFail';
import Loading from 'components/Loading';
import CustomTextField from 'components/CustomTextField';
import ModalAssignConfirmation from 'components/ModalAssignConfirmation';


const stepComponent = [
  props => <AssignPaket {...props} />,
  props => <AssignPenerima {...props} />,
  props => <AssignResponden {...props} />
]

const AssignmentManager = (props) => {
  const [step, setStep] = useState(0);
  
  const nextStep = () => setStep(step+1);
  const prevStep = () => setStep(step-1);

  const [selectedBorang, setSelectedBorang] = useState([]);
  const [selectedPenilai, setSelectedPenilai] = useState([]);
  const [selectedDinilai, setSelectedDinilai] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [periode, setPeriode] = useState(new Date().toISOString().substr(0,10));

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({})

  const onSelect = (setFunc, selectedList, val, identifier='id') => {
    console.log(val)
    const foundIndex = selectedList.findIndex(x=>x[identifier]===val[identifier]);
    let newList = Array.from(selectedList);
    if (foundIndex >= 0) {
      // remove
      const listBeforeIndex = newList.slice(0,foundIndex)
      const listAfterIndex = newList.slice(foundIndex+1)
      newList = [...listBeforeIndex, ...listAfterIndex]
    } else {
      // add
      newList.push(val)
    }
    setFunc(newList);
  }

  const submit = () => {
    // console.log(selectedBorang)
    // console.log(selectedPenilai)
    // console.log(selectedDinilai)
    // console.log(periode)
    setLoading(true);
    axios.post(`${baseUrl}/evaluation/assign/`, {
      list_penilai: selectedPenilai.map(x=>x.pk),
      list_dinilai: selectedDinilai.map(x=>x.pk),
      list_borang: selectedBorang.map(x=>x.id),
      periode
    }).then(()=>{
      setSuccess(true);
      setShowConfirmation(false);
      setSelectedPenilai([]);
      setSelectedDinilai([]);
      setSelectedBorang([]);
      setStep(0);
      // ini mau dikemanain pagenya??
    }).catch(err=>{
      console.error(err && err.response?.data)
      setError(err.response && err.response.data);
    }).finally(()=>{
      setLoading(false);
    })
  }

  const component = stepComponent[step];

  return (
    <>
    <CustomTextField
        variant="outlined"
        id="date"
        label="Periode"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={periode}
        onChange={e=>{setPeriode(e.target.value); delete error.periode}}
        error={!!error.periode}
        helperText={error.periode && error.periode[0]}
        disabled={loading}
        style={{float: 'right'}}
        />
      {component({
        ...props,
        selectedBorang,
        setSelectedBorang,
        selectedPenilai,
        setSelectedPenilai,
        selectedDinilai,
        setSelectedDinilai,
        nextStep,
        prevStep,
        onSelect,
        submit: ()=>setShowConfirmation(true)
      })}
      <DialogSuccess open={success} handleClose={()=>setSuccess(false)} />
      <DialogFail
        open={!!error.detail}
        handleClose={()=>setError(null)}
        text={error.detail && error.detail[0]}
      />
      <Loading open={loading} />
      <ModalAssignConfirmation
        open={showConfirmation}
        onCancel={()=>setShowConfirmation(false)}
        selectedBorang={selectedBorang}
        selectedDinilai={selectedDinilai}
        selectedPenilai={selectedPenilai}
        periode={periode}
        handleChangePeriode={e=>{setPeriode(e.target.value); delete error.periode}}
        submit={submit}
      />
    </>
  )
}

export default AssignmentManager;