import React, {Component} from "react";
import "../App.css";
import 'react-dropdown/style.css';
import AppNavbar from "../AppNavbar";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";

class Suppliers extends Component {

    constructor(props) {
        super(props);
        this.state = {suppliers: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/scm/suppliers')
            .then(response => response.json())
            .then(data => this.setState({suppliers: data}));
    }

    async remove(id) {
        await fetch(`/scm/suppliers/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedSuppliers = [...this.state.suppliers].filter(i => i.id !== id);
            this.setState({suppliers: updatedSuppliers});
        });
    }

    render() {

        const {suppliers, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const suppliersList = suppliers.map(suppliers => {
            return <tr key={suppliers.id}>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.supplierName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.supplyRawMaterialCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.supplyRawMaterialName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.unit}</td>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.address}</td>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.phoneNumber}</td>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.nationalCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{suppliers.companyName}</td>
                <td>
                    <ButtonGroup>
                        <Button className="editButton" size="sm" color="primary" tag={Link}
                                to={"/EditSuppliers.js/" + suppliers.id}>Edit</Button>
                        <Button className="deleteButton" size="sm" color="danger"
                                onClick={() => this.remove(suppliers.id)}>Delete</Button>
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
                                to="/EditSuppliers.js/new">Add Supplier</Button>
                    </div>
                    <h3 className="title">Suppliers</h3>
                    <Table className="table">
                        <thead>
                        <tr className="tr">
                            <th className="th" width="10%">supplier id</th>
                            <th className="th" width="10%">supplier name</th>
                            <th className="th" width="10%">supply raw material code</th>
                            <th className="th" width="10%">supply raw material name</th>
                            <th className="th" width="10%">unit</th>
                            <th className="th" width="10%">phone number</th>
                            <th className="th" width="10%">national code</th>
                            <th className="th" width="10%">company name</th>
                            <th className="th" width="10%">address</th>
                            <th className="th" width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {suppliersList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Suppliers;
