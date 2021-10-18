import React, {Component} from "react";
import "../App.css";
import 'react-dropdown/style.css';
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import AppNavbar from "../AppNavbar";

class Producers extends Component {

    constructor(props) {
        super(props);
        this.state = {producers: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/scm/producer')
            .then(response => response.json())
            .then(data => this.setState({producers: data}));
    }

    async remove(id) {
        await fetch(`/scm/producer/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProducers = [...this.state.producers].filter(i => i.id !== id);
            this.setState({producers: updatedProducers});
        });
    }

    render() {
        const {producers, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const producersList = producers.map(producers => {
            return <tr key={producers.id}>
                <td style={{whiteSpace: 'nowrap'}}>{producers.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{producers.producerName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{producers.productCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{producers.productName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{producers.address}</td>
                <td style={{whiteSpace: 'nowrap'}}>{producers.phoneNumber}</td>
                <td style={{whiteSpace: 'nowrap'}}>{producers.nationalCode}</td>
                <td style={{whiteSpace: 'nowrap'}}>{producers.companyName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{producers.numberOfAvailableProducts}</td>
                <td>
                    <ButtonGroup>
                        <Button className="editButton" size="sm" color="primary" tag={Link}
                                to={"/EditProducers.js/" + producers.id}>Edit</Button>
                        <Button className="deleteButton" size="sm" color="danger"
                                onClick={() => this.remove(producers.id)}>Delete</Button>
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
                                to="/EditProducers.js/new">Add Producer</Button>
                    </div>
                    <h3 className="title">Producers</h3>
                    <Table className="table">
                        <thead>
                        <tr className="tr">
                            <th className="th" width="10ß%">producer id</th>
                            <th className="th" width="10%">producer name</th>
                            <th className="th" width="10%">product code</th>
                            <th className="th" width="10%">product name</th>
                            <th className="th" width="10%">phone number</th>
                            <th className="th" width="10%">national code</th>
                            <th className="th" width="10%">company name</th>
                            <th className="th" width="20%">number of available products</th>
                            <th className="th" width="10%">address</th>
                            <th className="th" width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {producersList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Producers;
