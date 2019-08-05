import React from 'react'
import firebase from '../firebase/Firebase.js'
import { Link } from "react-router-dom";
import { Container, Fab, TableHead, TableRow } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Create, Visibility } from '@material-ui/icons'
import NavBar from '../NavBar.js'
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginLeft: theme.spacing(1),
    },

    container: {
        marginTop: 64,
    }
    ,
}));


class DeviceList extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection("Devices");
        this.unsubscribe = null;
        this.state = {
            devices: [],
            key: false
        };

    }

    onCollectionUpdate = querySnapshot => {
        const devices = [];
        querySnapshot.forEach(doc => {
            const { carrier, cost, imei, model, notes, deductions } = doc.data();
            devices.push({
                devicesId: doc.id,
                doc,
                carrier,
                cost,
                imei,
                model,
                notes,
                deductions
            });
        });
        this.setState({
            devices
        });
    };

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    };

    render() {
        const classes = useStyles;
        return (
            <Container
                style={{ marginTop: 68 }}
            >
                <NavBar />
                <Paper >
                    <Table >
                        <TableHead >
                            <TableRow>
                                <TableCell>IMEI</TableCell>
                                <TableCell>Carrier</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Cost</TableCell>
                                <TableCell>Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.devices.map(devices =>
                                <TableRow>
                                    <TableCell>{devices.imei}</TableCell>
                                    <TableCell>{devices.carrier}</TableCell>
                                    <TableCell>{devices.model}</TableCell>
                                    <TableCell>{devices.cost}</TableCell>
                                    <TableCell>{devices.notes}</TableCell>
                                </TableRow>

                            )}
                        </TableBody>
                    </Table>
                </Paper>

            </Container>
        );
    }

}
export default DeviceList;
