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

function BuyBackForm({ e, deviceList, onChange, deleteItem, getPrice, rowTotal }) {
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
                variant="outlined"
                 style={{ width: 75 }}
                 label='QTY'
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceCarrier" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceCarrier}
              variant="outlined"
              style={{ width: 75 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceModel" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceModel}
              variant="outlined"
              style={{ width: 175 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceImei" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceImei}
              variant="outlined"
              style={{ width: 175 }}
            />
          </TableCell>
           <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceMemory" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceMemory}
              variant="outlined"
              style={{ width: 175 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "deviceComments" }}
              onChange={(e) => onChange(e, i)}
              value={item.deviceComments}
              variant="outlined"
              style={{ width: 175 }}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              required
              InputProps={{ name: "devicePrice" }}
              onChange={(e) => onChange(e, i)}
              value={item.devicePrice}
              variant="outlined"
              style={{ width: 100 }}
            >
              $
            </TextField>
          </TableCell>
          <TableCell>
            <p style={{fontSize: '16px', paddingTop: '20px'}}>${rowTotal(i, item.deviceQty, item.devicePrice)}</p>
          </TableCell>
          {/* <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={item.deviceCarrier}
          onChange={(e) => onChange(e, i)}
          SelectProps={{
            MenuProps: {

            },
          }}
          helperText="Carrier"
          margin="normal"
        >
          {carriers.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}
          <TableCell>
            <Delete
              onClick={() => deleteItem(i)}
              variant="contained"
              disabled={i === 0}
              style={{ color: "#ff1744", cursor: "pointer" }}
            />
              <AttachMoneyIcon
             onClick={(e) => getPrice( e, item.deviceCarrier, item.deviceModel, item.deviceMemory, i)}
              variant="contained"
              disabled={i === 0}
              style={{ color: "#ff1744", cursor: "pointer" }}
            />
          </TableCell>
         
          <TableCell> 
            {item.buybackResults != null ? (
              <div>
              {item.buybackResults.map((bb) => (
                     <p >{bb.vendor}: {bb.price}</p>
          ))}
          </div>
            ) :  (
             <div></div>
            )
            }
         
            </TableCell>
        
     
         
        </TableRow>
      ))}
    </React.Fragment> 
  );
}

export default BuyBackForm;
