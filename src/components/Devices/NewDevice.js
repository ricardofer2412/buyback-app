import React from 'react'
import firebase from '../firebase/Firebase.js'
import {
    withRouter
} from 'react-router-dom';

const uuid = require("uuid");


class NewDevice extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection("devices")
        this.state = {
            imei: "",
            carrier: "",
            model: "",
            cost: "",
            notes: ""
        };
    }

    onChange = e => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = e => {
        e.preventDefault();


        const { imei, model, carrier, notes, cost } = this.state;
        const deviceId = uuid();

        console.log("deviceId: ", deviceId);
        this.ref
            .doc(deviceId)
            .set({
                imei,
                model,
                carrier,
                cost,
                notes,
            })
            .then(() => {
                this.setState({
                    imei: "",
                    model: "",
                    carrier: "",
                    cost: "",
                    notes: ""
                });
                this.props.history.push('/purchaseOrders');
            })
            .catch(error => {
                console.error("Errod adding document: ", error);
            });
    };

    render() {
        const { imei, model, carrier, cost, notes } = this.state;
        return (
            <div class="form-inline">
                <form onSubmit={this.onSubmit.bind(this)} class="form-inline">
                    <div class="form-inline">
                        <label htmlFor="title">IMEI</label>
                        <input
                            type="text"
                            className="form-control"
                            name="imei"
                            value={imei}
                            onChange={this.onChange}
                            placeholder="IMEI"
                        />
                    </div>
                    <div class="form-inline">
                        <input
                            type="text"
                            className="form-control"
                            name="model"
                            value={model}
                            onChange={this.onChange}
                            placeholder="Model"
                        />
                    </div>
                    <div class="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            name="carrier"
                            value={carrier}
                            onChange={this.onChange}
                            placeholder="Carrier"
                        />
                    </div>
                    <div class="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            name="cost"
                            value={cost}
                            onChange={this.onChange}
                            placeholder="$0.00"
                        />
                    </div>
                    <div class="form-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            name="notels"
                            value={notes}
                            onChange={this.onChange}
                            placeholder="Notes"
                        />
                        <div class="form-group mb-2"></div>

                        <button onClick={this.return} type="submit" className="btn btn-success">
                            Add New
                       </button>

                    </div>
                </form>
            </div>



        )

    }
}
export default withRouter(NewDevice);
