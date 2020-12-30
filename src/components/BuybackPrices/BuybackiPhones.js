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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { apiEndpoint } from "../../config.js";
import axios from "axios";


class BuybackiPhone extends React.Component {
    
    constructor(props) {
        super(props);
 this.getPrice = this.getPrice.bind(this)
        this.ref =  firebase.firestore().collection("unlockedBbList").orderBy('id')
        this.state = {
            unlockedBbList: [], 
      
        }
     

    }
    
    componentDidMount() {
          this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
      }
 
  async getPrice( e,carrier, model, phoneMemory, i) {
    // e.preventDefault()
    const unlockedBbList = JSON.parse(JSON.stringify(this.state.unlockedBbList));
    const device = unlockedBbList[i]
    console.log(device)
    let phoneModel = model
    console.log('Model: ', model)
    let phoneCarrier = carrier
    console.log(phoneCarrier)
    console.log(phoneMemory)
    const newUrl = apiEndpoint + "/price";
    const body = { phone: `${phoneModel}-${phoneCarrier}?capacity=${phoneMemory}` };
    try {
      const response = await axios.post(newUrl, body);
      const { data } = response;

      const buybackResults = data.filter(data=> data.condition==='good')
      
      
      console.log('this is bb', buybackResults)
      let newDevice = {...device,buybackResults}

      const newDeviceList = [...this.state.unlockedBbList];
      newDeviceList.splice(i, 1, newDevice)
     
      
      this.setState({ unlockedBbList: newDeviceList });
      console.log(newDeviceList)
      firebase
      .firestore()
      .collection("unlockedBbList")
      .set({
        unlockedBbList: newDeviceList
      })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });

      
    } catch (e) {
      console.log("ERrror getting price: ", e);
    }

  }
    onCollectionUpdate = (querySnapshot) => {
        const unlockedBbList = [];
        querySnapshot.forEach((doc) => {
          const {
            model, 
             carrier, 
             memory, 
             buybackMs, 
             retailPrice
          } = doc.data();
          
          unlockedBbList.push({
            unlockedBbList: doc.id,
            model, 
            carrier, 
            memory, 
            buybackMs,
            retailPrice
     
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
             <TableCell align="left">Retail Price</TableCell>
            <TableCell align="left">MobileSource BB</TableCell>
           

            <TableCell align='left'>Others</TableCell>
            <TableCell align="left">ACTIONS</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         {this.state.unlockedBbList.map((item, i) => (
             <TableRow key={`${i} - 1`}>
                 <TableCell>{item.model}</TableCell>
                 <TableCell>{item.carrier}</TableCell>
                 <TableCell>{item.memory}</TableCell>
                <TableCell>${item.retailPrice}</TableCell>
                 <TableCell>${item.buybackMs}</TableCell>

                  
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
               
                 <TableCell>
                       <AttachMoneyIcon
                        onClick={(e) => this.getPrice( e, item.carrier, item.model, item.memory, i)}
                         variant="contained"
                         disabled={i === 0}
                        style={{ color: "#ff1744", cursor: "pointer" }}
            />
                 </TableCell>
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