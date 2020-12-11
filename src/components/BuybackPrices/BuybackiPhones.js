import React from 'react'
import './bb.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import firebase from '../firebase/Firebase'
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab'
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";


class BuybackiPhone extends React.Component {
    
    constructor(props) {
        super(props);

        this.ref =  firebase.firestore().collection("unlockedBbList")
        this.state = {
            unlockedBbList: []
        }
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      }
 
    onCollectionUpdate = (querySnapshot) => {
        const unlockedBbList = [];
        querySnapshot.forEach((doc) => {
          const {
            model, 
             carrier, 
             memory, 
             buybackMs
          } = doc.data();
          
          unlockedBbList.push({
            unlockedBbList: doc.id,
            model, 
            carrier, 
            memory, 
            buybackMs
          });
        });
    
        this.setState({
            unlockedBbList,
        });
      };
    render(){
        return(
            <div className="main">
                <div>
                    Unlocked iPhone 
                </div> 
                <div style={{marginTop: '75px', marginBottom: '-75px', marginLeft: '75px'}}>
                 <Tooltip title="Add Model">
            <Fab
              component={Link}
              to="/buybackiPhones/new"
              aria-label="Add"
            >
              <AddIcon />
            </Fab>
        
        </Tooltip>

          
          </div>
                <div className="paper">
                <TableContainer>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell align="left">Model</TableCell>
            <TableCell align="left">Carrier</TableCell>
            <TableCell align="left">Memory</TableCell>
            <TableCell align="left">MobileSource BB</TableCell>
            <TableCell align="left">The Whiz Cell</TableCell>
            <TableCell align="left">BuyBack World</TableCell>
            <TableCell align="left">Decluttr</TableCell>
            <TableCell align="left">ACTIONS</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         {this.state.unlockedBbList.map((item) => (
             <TableRow>
                 <TableCell>{item.model}</TableCell>
                 <TableCell>{item.carrier}</TableCell>
                 <TableCell>{item.memory}</TableCell>
                 <TableCell>${item.buybackMs}</TableCell>
                 <TableCell>$0</TableCell>
                 <TableCell>$0</TableCell>
                 <TableCell>$0</TableCell>
                 <TableCell>Get Prices</TableCell>
             </TableRow>
         ))}
        </TableBody>
      </Table>
    </TableContainer>
                </div>

            </div>
        )
    }
}

export default BuybackiPhone