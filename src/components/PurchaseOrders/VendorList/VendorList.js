import React from 'react'
import './vendor.css'
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class VendorList extends React.Component {
   
    render(){
        return(
            <div className='main'>
                   <div> 
                    <h1>Select Vendor</h1>
                </div>
                <div className="searchBar">
                <TextField id="outlined-search" label="Vendor Name" type="search" variant="outlined" />
                </div>
                <div className='customerTable'> 
                <TableContainer >
                 <Table  aria-label="simple table">
                     <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
        </TableBody>
      </Table>
    </TableContainer>
                </div>
            </div>
        )
    }
}

export default VendorList