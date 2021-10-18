import React, {Component} from "react";
import "../App.css";
import 'react-dropdown/style.css';
import {Link} from "react-router-dom";
import {Button, ButtonGroup, Container, Table} from "reactstrap";
import AppNavbar from "../AppNavbar";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {products: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/scm/product')
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }

    async remove(id) {
        await fetch(`/scm/product/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedProducts = [...this.state.products].filter(i => i.id !== id);
            this.setState({products: updatedProducts});
        });
    }

    render() {
        const {products, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const productsList = products.map(products => {
            return <tr key={products.id}>
                <td style={{whiteSpace: 'nowrap'}}>{products.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{products.productName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{products.productUnit}</td>
                <td>
                    <ButtonGroup>
                        <Button className="editButton" size="sm" color="primary" tag={Link}
                                to={"/EditProduct.js/" + products.id}>Edit</Button>
                        <Button className="deleteButton" size="sm" color="danger"
                                onClick={() => this.remove(products.id)}>Delete</Button>
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
                                to="/EditProduct.js/new">Add Product</Button>
                    </div>
                    <h3 className="title">Products</h3>
                    <Table className="table">
                        <thead>
                        <tr className="tr">
                            <th className="th" width="25%">Product Code</th>
                            <th className="th" width="25%">Product Name</th>
                            <th className="th" width="25%">Product Unit</th>
                            <th className="th" width="25%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {productsList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Product;
