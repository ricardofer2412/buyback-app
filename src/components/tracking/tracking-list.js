import React from "react";
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Create, Visibility, DockSharp } from '@material-ui/icons'
import Container from '@material-ui/core/Container'
import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import firebase from '../firebase/Firebase';
import { track } from "../../fedexservice";




const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
}));

class TrackingList extends React.Component {
  constructor(props) {
    super(props);
    this.customerRef = firebase.firestore().collection('customers');
    this.ref = firebase.firestore().collection('trackings');
    this.unsubscribe = null;



    this.state = {
      poNumber: '',
      trackings: [],
      trackingStatuses: []
    };
  }

  getTrackingStatus = async (trackingNums) => {
    const promises = []
    trackingNums.forEach(number => {
      promises.push(track(number))
    })
    const response = await Promise.all(promises);
    this.setState({ trackingStatuses: response })
  }

  onCollectionUpdate = (querySnapshot) => {
    const trackings = [];
    const trackingNumbers = [];
    querySnapshot.forEach(async (doc) => {
      const { poNumber, trackingNum, currentCustomer, } = doc.data();
      trackingNumbers.push(trackingNum)
      trackings.push({
        trackingId: doc.id,
        doc,
        trackingNum,
        currentCustomer,
        poNumber

      });
    });
    this.getTrackingStatus(trackingNumbers)
    this.setState({
      trackings
    });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  delete = tracking => {
    const { trackingId } = tracking;
    console.log("key", trackingId, "tracking", tracking);
    firebase
      .firestore()
      .collection("trackings")
      .doc(trackingId)
      .delete()
      .then(() => {
        console.log("tracking deleted");
      })
      .catch(error => {
        console.error("Tracking deleted ", error);
      });
  }
  render() {
    console.log(this.state.trackingStatuses)
    const classes = useStyles
    return (
      <Container fixed>
        <Container fixed>
          <Container>


            <h3>Tracking Orders</h3>
            <Fab
              variant="extended"
              component={Link} to="/new-tracking"
              color="secondary"
              aria-label="Add"
              className={classes.fab}
            >
              <AddIcon className={classes.extendedIcon} />
            </Fab>
          </Container>
          <br />
          <Paper >
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell>Tracking Number</TableCell>
                  <TableCell>PO#</TableCell>
                  <TableCell>Vendor</TableCell>
                  <TableCell> Status</TableCell>
                  <TableCell>Method</TableCell>
                  
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.trackings.map((tracking, idx) =>
                  <tr>
                    <td>{tracking.trackingNum} </td>
                    <td>{tracking.poNumber}</td>
                    <td>{tracking.currentCustomer}</td>
                    <td>{this.state.trackingStatuses[idx] && this.state.trackingStatuses[idx].status}</td>
                    <td>{this.state.trackingStatuses[idx] && this.state.trackingStatuses[idx].carrierDesc}</td>
                    <td>  <IconButton onClick={() => this.delete(tracking)} aria-label="Delete" >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                      <IconButton
                        component={Link} to={`/edit-tracking/${tracking.trackingId}`}
                      ><Create />
                      </IconButton></td>
                  </tr>)}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Container>

    );
  }
}

export default TrackingList;
