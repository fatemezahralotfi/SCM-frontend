import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AppNavbar from "../AppNavbar";
import "../App.css";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";


class EditSuppliers extends Component {

    emptyItem = {
        supplierName: '',
        supplyRawMaterialCode: '',
        supplyRawMaterialName: '',
        unit: '',
        address: '',
        phoneNumber: '',
        nationalCode: '',
        companyName: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            rawMaterial: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.findRawMaterial = this.findRawMaterial.bind(this)
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const suppliers = await (await fetch(`/scm/suppliers/${this.props.match.params.id}`)).json();
            this.setState({item: suppliers});
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


    async findRawMaterial() {
        const inputVal = document.getElementById("supplyRawMaterialCode").value;
        const rawMaterial = await (await fetch(`/scm/rawMaterial/` + inputVal)).json();
        document.getElementById("supplyRawMaterialName").value = rawMaterial.rawMaterialName;
        document.getElementById("unit").value = rawMaterial.rawMaterialUnit;

    }

    async handleSubmit(event) {

        event.preventDefault();
        const {item} = this.state;

        await fetch('/scm/suppliers' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push('/Suppliers.js');
    }

    render() {

        const {item} = this.state
        const title = <h2 className="title">{this.state.id ? 'Edit Supplier' : 'Add Supplier'}</h2>;

        return <div>
            <AppNavbar/>
            <Container fluid>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="supplierName">Supplier Name : </Label>
                        <Input type="text" name="supplierName" id="supplierName" value={item.supplierName || ''}
                               onChange={this.handleChange} autoComplete="supplierName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="supplyRawMaterialCode">Supply Raw Material Code : </Label>
                        <TextField
                            type="number"
                            label="type raw material code"
                            name="supplyRawMaterialCode" id="supplyRawMaterialCode"
                            autoComplete="supplyRawMaterialCode"
                            value={item.supplyRawMaterialCode || ''}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon onClick={this.findRawMaterial}/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="supplyRawMaterialName">Supply Raw Material Name : </Label>
                        <Input type="text" name="supplyRawMaterialName" id="supplyRawMaterialName" disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="unit">Unit : </Label>
                        <Input type="text" name="unit" id="unit" value={"M"} disabled={true}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNumber">Phone Number : </Label>
                        <Input type="text" name="phoneNumber" id="phoneNumber" value={item.phoneNumber || ''}
                               onChange={this.handleChange} autoComplete="phoneNumber"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="nationalCode">National Code : </Label>
                        <Input type="text" name="nationalCode" id="nationalCode" value={item.nationalCode || ''}
                               onChange={this.handleChange} autoComplete="nationalCode"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="companyName">Company Name : </Label>
                        <Input type="text" name="companyName" id="companyName" value={item.companyName || ''}
                               onChange={this.handleChange} autoComplete="companyName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address : </Label>
                        <textarea className="textarea resize-ta" name="address" id="address" value={item.address || ''}
                                  onChange={this.handleChange} autoComplete="address">address</textarea>
                    </FormGroup>
                    <br/><br/>
                    <FormGroup>
                        <Button color="primary" type="submit" value="Submit" className="saveButton">Save</Button>

                        <Button color="secondary" tag={Link} to="/Suppliers.js" className="cancelButton">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EditSuppliers);
