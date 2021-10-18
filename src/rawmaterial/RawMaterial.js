import React, {Component} from "react";
import "../App.css";
import 'react-dropdown/style.css';
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import AppNavbar from "../AppNavbar";

class RawMaterial extends Component {

    constructor(props) {
        super(props);
        this.state = {rawMaterials: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/scm/rawMaterial')
            .then(response => response.json())
            .then(data => this.setState({rawMaterials: data}));
    }

    async remove(id) {
        await fetch(`/scm/rawMaterial/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedRawMaterials = [...this.state.rawMaterials].filter(i => i.id !== id);
            this.setState({rawMaterials: updatedRawMaterials});
        });
    }

    render() {
        const {rawMaterials, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const rawMaterialsList = rawMaterials.map(rawMaterials => {
            return <tr key={rawMaterials.id}>
                <td style={{whiteSpace: 'nowrap'}}>{rawMaterials.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{rawMaterials.rawMaterialName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{rawMaterials.rawMaterialUnit}</td>
                <td>
                    <ButtonGroup>
                        <Button className="editButton" size="sm" color="primary" tag={Link}
                                to={"/EditRawMaterial.js/" + rawMaterials.id}>Edit</Button>
                        <Button className="deleteButton" size="sm" color="danger"
                                onClick={() => this.remove(rawMaterials.id)}>Delete</Button>
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
                                to="/EditRawMaterial.js/new">Add Raw Material</Button>
                    </div>
                    <h3 className="title">Raw Materials</h3>
                    <Table className="table">
                        <thead>
                        <tr className="tr">
                            <th className="th" width="10%">Raw Material Code</th>
                            <th className="th" width="10%">Raw Material Name</th>
                            <th className="th" width="10%">Raw Material Unit</th>
                            <th className="th" width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rawMaterialsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default RawMaterial;
