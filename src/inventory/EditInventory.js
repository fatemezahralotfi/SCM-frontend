import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AppNavbar from "../AppNavbar";
import "../App.css";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

class EditInventory extends Component {

    emptyItem = {

        producerENTCode: '',
        amountOfProductAvailable: '',
        productionStartDate: '',
        preparationDate: '',
        supplierENTCode: '',
        supplyStartDate: '',
        deliveryDateOfRawMaterials: '',
        amountOfRawMaterialUsed: '',
        distributorENTCode: '',
        amountOfProductSupplied: '',
        distributionStartDate: '',
        distributionEndDate: '',
        productName: '',
        productCode: '',
        producerName: '',
        supplyRawMaterialCode: '',
        supplyRawMaterialName: '',
        supplierName: '',
        distributorName: '',
        amountOfDistributions: '',

    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            producer: [],
            supplier: [],
            distributor: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const inventory = await (await fetch(`/scm/inventory/${this.props.match.params.id}`)).json();
            this.setState({item: inventory});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async findProducer() {
        const inputVal = document.getElementById("producerENTCode").value;
        const producer = await (await fetch(`/scm/producer/` + inputVal)).json();
        (document.getElementById("producerName")).setAttribute("value", (producer.producerName));
        (document.getElementById("productCode")).setAttribute("value", (producer.productCode));
        (document.getElementById("productName")).setAttribute("value", (producer.productName));
    }

    async findSupplier() {
        const inputVal = document.getElementById("supplierENTCode").value;
        const supplier = await (await fetch(`/scm/suppliers/` + inputVal)).json();
        (document.getElementById("supplierName")).setAttribute("value", (supplier.supplierName));
        (document.getElementById("supplyRawMaterialCode")).setAttribute("value", (supplier.supplyRawMaterialCode));
        (document.getElementById("supplyRawMaterialName")).setAttribute("value", (supplier.supplyRawMaterialName));
    }

    async findDistributor() {
        const inputVal = document.getElementById("distributorENTCode").value;
        const supplier = await (await fetch(`/scm/distributor/` + inputVal)).json();
        (document.getElementById("distributorName")).setAttribute("value", (supplier.distributorName));
        (document.getElementById("amountOfDistributions")).setAttribute("value", (supplier.amountOfDistributions));
    }

    async handleSubmit(event) {

        event.preventDefault();
        const {item} = this.state;

        await fetch('/scm/inventory' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push('/Inventory.js');
    }

    render() {
        const {item} = this.state;
        const title = <h2 className="title">{this.state.id ? 'Edit Inventory' : 'Add Inventory'}</h2>;

        return <div>
            <AppNavbar/>
            <Container fluid>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="producerENTCode">Producer Code : </Label>
                        <TextField
                            type="number"
                            label="type producer code"
                            name="producerENTCode" id="producerENTCode"
                            autoComplete="producerENTCode"
                            value={item.producerENTCode || ''}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon onClick={this.findProducer}/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="producerName">Producer Name : </Label>
                        <Input type="text" name="producerName" id="producerName" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productCode">Product Code : </Label>
                        <Input type="text" name="productCode" id="productCode" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productName">Product Name : </Label>
                        <Input type="text" name="productName" id="productName" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amountOfProductAvailable">Amount Of Product Available : </Label>
                        <Input type="text" name="amountOfProductAvailable" id="amountOfProductAvailable"
                               value={item.amountOfProductAvailable || ''}
                               onChange={this.handleChange} autoComplete="amountOfProductAvailable"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productionStartDate">Production Start Date : </Label>
                        <Input type="date" name="productionStartDate" id="productionStartDate"
                               value={item.productionStartDate || ''}
                               onChange={this.handleChange} autoComplete="productionStartDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="preparationDate">Preparation Date : </Label>
                        <Input type="date" name="preparationDate" id="preparationDate"
                               value={item.preparationDate || ''}
                               onChange={this.handleChange} autoComplete="preparationDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="supplierENTCode">Supplier Code : </Label>
                        <TextField
                            type="number"
                            label="type supplier code"
                            name="supplierENTCode" id="supplierENTCode"
                            autoComplete="supplierENTCode"
                            value={item.supplierENTCode || ''}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon onClick={this.findSupplier}/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="supplierName">Supplier Name : </Label>
                        <Input type="text" name="supplierName" id="supplierName" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="supplyRawMaterialCode">Raw Material Code : </Label>
                        <Input type="text" name="supplyRawMaterialCode" id="supplyRawMaterialCode" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="supplyRawMaterialName">Raw Material Name : </Label>
                        <Input type="text" name="supplyRawMaterialName" id="supplyRawMaterialName" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="supplyStartDate">Supply Start Date : </Label>
                        <Input type="date" name="supplyStartDate" id="supplyStartDate"
                               value={item.supplyStartDate || ''}
                               onChange={this.handleChange} autoComplete="supplyStartDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amountOfProductSupplied">Amount Of Product Supplied : </Label>
                        <Input type="number" name="amountOfProductSupplied" id="amountOfProductSupplied"
                               value={item.amountOfProductSupplied || ''}
                               onChange={this.handleChange} autoComplete="amountOfProductSupplied"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="deliveryDateOfRawMaterials">Delivery Date Of Raw Materials : </Label>
                        <Input type="date" name="deliveryDateOfRawMaterials" id="deliveryDateOfRawMaterials"
                               value={item.deliveryDateOfRawMaterials || ''}
                               onChange={this.handleChange} autoComplete="deliveryDateOfRawMaterials"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amountOfRawMaterialUsed">Amount Of Raw Material Used : </Label>
                        <Input type="text" name="amountOfRawMaterialUsed" id="amountOfRawMaterialUsed"
                               value={item.amountOfRawMaterialUsed || ''}
                               onChange={this.handleChange} autoComplete="amountOfRawMaterialUsed"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="distributorENTCode">Distributor Code : </Label>
                        <TextField
                            type="number"
                            label="type distributor code"
                            name="distributorENTCode" id="distributorENTCode"
                            autoComplete="distributorENTCode"
                            value={item.distributorENTCode || ''}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon onClick={this.findDistributor}/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="distributorName">Distributor Name : </Label>
                        <Input type="text" name="distributorName" id="distributorName" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amountOfDistributions">Amount Of Distributions : </Label>
                        <Input type="text" name="amountOfDistributions" id="amountOfDistributions" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="distributionStartDate">Distribution Start Date : </Label>
                        <Input type="date" name="distributionStartDate" id="distributionStartDate"
                               value={item.distributionStartDate || ''}
                               onChange={this.handleChange} autoComplete="distributionStartDate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="distributionEndDate">Distribution End Date : </Label>
                        <Input type="date" name="distributionEndDate" id="distributionEndDate"
                               value={item.distributionEndDate || ''}
                               onChange={this.handleChange} autoComplete="distributionEndDate"/>
                    </FormGroup>
                    <br/><br/>
                    <FormGroup>
                        <Button color="primary" type="submit" value="Submit" className="saveButton">Save</Button>
                        <Button color="secondary" tag={Link} to="/Inventory.js" className="cancelButton">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EditInventory);
