import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AppNavbar from "../AppNavbar";
import "../App.css";


class EditProducers extends Component {

    emptyItem = {
        producerName: '',
        productCode: '',
        productName: '',
        address: '',
        phoneNumber: '',
        nationalCode: '',
        companyName: '',
        numberOfAvailableProducts: ''
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
            const producers = await (await fetch(`/scm/producer/${this.props.match.params.id}`)).json();
            this.setState({item: producers});
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

        await fetch('/scm/producer' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push('/Producers.js');
    }

    render() {

        const {item} = this.state
        const title = <h2 className="title">{this.state.id ? 'Edit Producer' : 'Add Producer'}</h2>;

        return <div>
            <AppNavbar/>
            <Container fluid>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="producerName">Producer Name : </Label>
                        <Input type="text" name="producerName" id="producerName" value={item.producerName || ''}
                               onChange={this.handleChange} autoComplete="producerName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productCode">Product Code : </Label>
                        <Input type="text" name="productCode" id="productCode" value={item.productCode || ''}
                               onChange={this.handleChange} autoComplete="productCode"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productName">Product Name : </Label>
                        <Input type="text" name="productName" id="productName" value={item.productName || ''}
                               onChange={this.handleChange} autoComplete="productName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="numberOfAvailableProducts">Number Of Available Products : </Label>
                        <Input type="text" name="numberOfAvailableProducts" id="numberOfAvailableProducts"
                               value={item.numberOfAvailableProducts || ''}
                               onChange={this.handleChange} autoComplete="numberOfAvailableProducts"/>
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
                                  onChange={this.handleChange} autoComplete="address"
                        >address</textarea>
                    </FormGroup>
                    <br/><br/>
                    <FormGroup>
                        <Button color="primary" type="submit" value="Submit" className="saveButton">Save</Button>
                        <Button color="secondary" tag={Link} to="/Producers.js" className="cancelButton">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EditProducers);
