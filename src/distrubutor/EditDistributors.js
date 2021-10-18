import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AppNavbar from "../AppNavbar";
import "../App.css";


class EditDistributors extends Component {

    emptyItem = {
        amountOfDistributions: '',
        distributorName: '',
        distributedProductCode: '',
        distributedProductName: '',
        address: '',
        phoneNumber: '',
        nationalCode: '',
        companyName: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const distributor = await (await fetch(`/scm/distributor/${this.props.match.params.id}`)).json();
            this.setState({item: distributor});
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

    async handleSubmit(event) {

        event.preventDefault();
        const {item} = this.state;

        await fetch('/scm/distributor' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push('/Distributors.js');
    }

    render() {

        const {item} = this.state
        const title = <h2 className="title">{this.state.id ? 'Edit Distributor' : 'Add Distributor'}</h2>;

        return <div>
            <AppNavbar/>
            <Container fluid>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="distributorName">Distributor Name : </Label>
                        <Input type="text" name="distributorName" id="distributorName"
                               value={item.distributorName || ''}
                               onChange={this.handleChange} autoComplete="distributorName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="amountOfDistributions">Amount Of Distributions : </Label>
                        <Input type="number" name="amountOfDistributions" id="amountOfDistributions"
                               value={item.amountOfDistributions || ''}
                               onChange={this.handleChange} autoComplete="amountOfDistributions"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="distributedProductCode">Distributed Product Code : </Label>
                        <Input type="text" name="distributedProductCode" id="distributedProductCode"
                               value={item.distributedProductCode || ''}
                               onChange={this.handleChange} autoComplete="distributedProductCode"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="distributedProductName">Distributed Product Name : </Label>
                        <Input type="text" name="distributedProductName" id="distributedProductName"
                               value={item.distributedProductName || ''}
                               onChange={this.handleChange} autoComplete="distributedProductName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phoneNumber">Phone Number : </Label>
                        <Input type="number" name="phoneNumber" id="phoneNumber" value={item.phoneNumber || ''}
                               onChange={this.handleChange} autoComplete="phoneNumber"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="nationalCode">National Code : </Label>
                        <Input type="number" name="nationalCode" id="nationalCode" value={item.nationalCode || ''}
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
                                  onChange={this.handleChange} autoComplete="address"
                        >address</textarea>
                    </FormGroup>
                    <br/><br/>
                    <FormGroup>
                        <Button color="primary" type="submit" value="Submit" className="saveButton">Save</Button>

                        <Button color="secondary" tag={Link} to="/Distributors.js"
                                className="cancelButton">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EditDistributors);
