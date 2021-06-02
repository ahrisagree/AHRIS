import { withStyles, TableCell, TableRow } from "@material-ui/core";


export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0B3242",
    color: theme.palette.common.white,
    // width: "20%",
    align: "Left",
    size: "50%",
  },
  body: {
    fontSize: "1rem",
    color:"#0B3242",
    // padding: '8px 16px'
  }
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    width: 700
  },
}))(TableRow);