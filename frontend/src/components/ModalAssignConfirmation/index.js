import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import CustomTextField from 'components/CustomTextField';
import TemplateButton from 'components/TemplateButton';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    fontFamily: "IBM Plex Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#0A3142",
  },
});

const ModalAssignConfirmation = ({
  open,
  onCancel,
  selectedDinilai,
  selectedBorang,
  selectedPenilai,
  periode,
  handleChangePeriode,
  submit
}) => {
  const classes = useStyles(styles);

  const summaryList = [
    {title: "Borang", data: selectedBorang, getLabel: x=>x.nama},
    {title: "Penilai", data: selectedPenilai, getLabel: x=>x.username},
    {title: "Dinilai", data: selectedDinilai, getLabel: x=>x.username},
  ]

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogContent className={classes.root}>
        <h3 className="text-2xl text-center font-bold mb-4">Summary</h3>
        <CustomTextField
          variant="outlined"
          id="date"
          label="Periode"
          type="month"
          InputLabelProps={{
            shrink: true,
          }}
          value={periode}
          onChange={e=>handleChangePeriode(e)}
          size="small"
          />
        <div className="flex flex-row">
          
          {summaryList.map(summ => (
            <div className="flex w-1/3 p-4 flex-col">
              <h4 className="text-base font-bold">{summ.title}</h4>
              <ul className="text-base">
                {summ.data.map((item)=><li><h5>- {summ.getLabel(item)}</h5></li>)}
              </ul>
            </div>
          ))}

        </div>
        <div className="flex justify-around pb-4">
        <TemplateButton
          onClick={onCancel}
          type="button"
          buttonStyle="btnBlueOutline"
          buttonSize="btnLong"
        >
          Cancel
        </TemplateButton>
        <TemplateButton 
          onClick={submit}
          type="button"
          buttonStyle="btnBlue"
          buttonSize="btnLong"
        >
          Simpan
        </TemplateButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalAssignConfirmation;