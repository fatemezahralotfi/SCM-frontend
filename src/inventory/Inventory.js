import React, {Component} from "react";
import "../App.css";
import 'react-dropdown/style.css';
import AppNavbar from "../AppNavbar";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import {Link} from "react-router-dom";

class Inventory extends Component {

    constructor(props) {
        super(props);
        this.state = {inventory: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/scm/inventory')
            .then(response => response.json())
            .then(data => this.setState({inventory: data}));
    }

    async remove(id) {
        await fetch(`/scm/inventory/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedInventory = [...this.state.inventory].filter(i => i.id !== id);
            this.setState({inventory: updatedInventory});
        });
    }

    render() {
        const {inventory, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const inventoryList = inventory.map(inventory => {
            return <tr key={inventory.id}>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.producerENTCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.productName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.productCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.producerName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.amountOfProductAvailable}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.productionStartDate}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.preparationDate}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.supplierENTCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.supplyRawMaterialCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.supplyRawMaterialName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.supplierName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.amountOfProductSupplied}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.supplyStartDate}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.deliveryDateOfRawMaterials}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.amountOfRawMaterialUsed}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.distributorENTCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.distributorName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.amountOfDistributions}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.distributionStartDate}</td>
                <td style={{whiteSpace: 'nowrap'}}>{inventory.distributionEndDate}</td>

                <td>
                    <ButtonGroup>
                        <Button className="editButton" size="sm" color="primary" tag={Link}
                                to={"/EditInventory.js/" + inventory.id}>Edit</Button>
                        <Button className="deleteButton" size="sm" color="danger"
                                onClick={() => this.remove(inventory.id)}>Delete</Button>
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
                                to="/EditInventory.js/new">Add Inventory</Button>
                    </div>
                    <h3 className="title">Inventory</h3>
                    <Table className="table">
                        <thead>
                        <tr className="tr">
                            <th className="th" width="5%">producer code</th>
                            <th className="th" width="5%">product name</th>
                            <th className="th" width="5%">product code</th>
                            <th className="th" width="5%">producer name</th>
                            <th className="th" width="5%">amount of product available</th>
                            <th className="th" width="5%">production start date</th>
                            <th className="th" width="5%">preparation date</th>
                            <th className="th" width="5%">supplier code</th>
                            <th className="th" width="5%">supply raw material code</th>
                            <th className="th" width="5%">supply raw material name</th>
                            <th className="th" width="5%">supplier name</th>
                            <th className="th" width="5%">amount of product supplied</th>
                            <th className="th" width="5%">supply start date</th>
                            <th className="th" width="5%">delivery date of raw materials</th>
                            <th className="th" width="5%">amount of raw material used</th>
                            <th className="th" width="5%">distributor code</th>
                            <th className="th" width="5%">distributor name</th>
                            <th className="th" width="5%">amount of distributions</th>
                            <th className="th" width="5%">distribution start date</th>
                            <th className="th" width="5%">distribution end date</th>
                            <th className="th" width="15%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inventoryList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Inventory;
