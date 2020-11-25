import React from "react";
import {
  TableRow,
  TableCell,
  TextField,
  MenuItem,
  Table,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


const carriers = [
  {
    value: "AT&T",
    label: "AT&T",
    color: "red",
  },
  {
    value: "T-Mobile",
    label: "T-Mobile",
  },
  {
    value: "Sprint",
    label: "Sprint",
  },
  {
    value: "Verizon",
    label: "Verizon",
  },
  {
    value: "Unlocked",
    label: "Unlocked",
  },
];

function BuyBackForm({ e, deviceList, onChange, deleteItem, getPrice }) {
  return (
    <React.Fragment>
      {deviceList.map((item, i) => (
        <TableRow key={`${i} - 1`}>
          <TableCell component="th" scope="row">
            <TextField
              required
              InputProps={{ name: "deviceQty" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceQty}
              variant="standard"
              style={{ width: 75 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceCarrier" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceCarrier}
              variant="standard"
              style={{ width: 75 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceModel" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceModel}
              variant="standard"
              style={{ width: 175 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceImei" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceImei}
              variant="standard"
              style={{ width: 175 }}
            />
          </TableCell>
           <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceMemory" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceMemory}
              variant="standard"
              style={{ width: 175 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceComments" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceComments}
              variant="standard"
              style={{ width: 175 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "devicePrice" }}
              onChange={(e) => onChange(e, i)}
              value={item.devicePrice}
              variant="standard"
              style={{ width: 100 }}
            >
              $
            </TextField>
          </TableCell>
          <TableCell>
            <p>${item.devicePrice * item.deviceQty}</p>
          </TableCell>
          <TableCell align="right"></TableCell>
          <TableCell>
            <Delete
              onClick={() => deleteItem(i)}
              variant="contained"
              disabled={i === 0}
              style={{ color: "#ff1744", cursor: "pointer" }}
            />
              <AttachMoneyIcon
             onClick={(e) => getPrice( e, item.deviceCarrier, item.deviceModel)}
              variant="contained"
              disabled={i === 0}
              style={{ color: "#ff1744", cursor: "pointer" }}
            />
          </TableCell>
         
        </TableRow>
      ))}
    </React.Fragment>
  );
}

export default BuyBackForm;
