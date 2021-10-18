import React, {Component} from "react";
import "../App.css";
import 'react-dropdown/style.css';
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import AppNavbar from "../AppNavbar";

class Distributors extends Component {

    constructor(props) {
        super(props);
        this.state = {distributors: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/scm/distributor')
            .then(response => response.json())
            .then(data => this.setState({distributors: data}));
    }

    async remove(id) {
        await fetch(`/scm/distributor/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedDistributors = [...this.state.distributors].filter(i => i.id !== id);
            this.setState({distributors: updatedDistributors});
        });
    }

    render() {
        const {distributors, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const distributorsList = distributors.map(distributor => {
            return <tr key={distributor.id}>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.distributorName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.distributedProductCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.distributedProductName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.address}</td>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.phoneNumber}</td>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.nationalCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.amountOfDistributions}</td>
                <td style={{whiteSpace: 'nowrap'}}>{distributor.companyName}</td>
                <td>
                    <ButtonGroup>
                        <Button className="editButton" size="sm" color="primary" tag={Link}
                                to={"/EditDistributors.js/" + distributor.id}>Edit</Button>
                        <Button className="deleteButton" size="sm" color="danger"
                                onClick={() => this.remove(distributor.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <br/>
                    <br/>
                    <div style={{display: "flex"}}>
                        <Button className="addButton" style={{marginLeft: "auto"}} color="success" tag={Link}
                                to="/EditDistributors.js/new">Add Distributor</Button>
                    </div>
                    <h3 className="title">Distributors</h3>
                    <Table className="table">
                        <thead>
                        <tr className="tr">
                            <th className="th" width="10%">distributor id</th>
                            <th className="th" width="10%">distributor name</th>
                            <th className="th" width="10%">distributed product code</th>
                            <th className="th" width="10%">distributed product name</th>
                            <th className="th" width="10%">address</th>
                            <th className="th" width="10%">phone number</th>
                            <th className="th" width="10%">national code</th>
                            <th className="th" width="10%">company name</th>
                            <th className="th" width="10%">amount of distributions</th>
                            <th className="th" width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {distributorsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Distributors;
