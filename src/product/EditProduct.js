import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AppNavbar from "../AppNavbar";
import "../App.css";


class EditProduct extends Component {

    emptyItem = {
        productName: '',
        productUnit: ''
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
            const product = await (await fetch(`/scm/product/${this.props.match.params.id}`)).json();
            this.setState({item: product});
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

        await fetch('/scm/product' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push('/Product.js');
    }

    render() {

        const {item} = this.state
        const title = <h2 className="title">{this.state.id ? 'Edit Product' : 'Add Product'}</h2>;

        return <div>
            <AppNavbar/>
            <Container fluid>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="productName">Product Name : </Label>
                        <Input type="text" name="productName" id="productName" value={item.productName || ''}
                               onChange={this.handleChange} autoComplete="productName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="productUnit">Product Unit : </Label>
                        <select type="text" name="productUnit" id="productUnit" value={item.productUnit || ''}
                                onChange={this.handleChange} autoComplete="productUnit">
                            <option value={1}>KG</option>
                            <option value={2}>GR</option>
                            <option value={3}>INCH</option>
                            <option value={4}>YARD</option>
                            <option value={5}>M</option>
                            <option value={6}>CM</option>
                        </select>
                    </FormGroup>
                    <br/><br/>
                    <FormGroup>
                        <Button color="primary" type="submit" value="Submit" className="saveButton">Save</Button>
                        <Button color="secondary" tag={Link} to="/Product.js" className="cancelButton">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EditProduct);
