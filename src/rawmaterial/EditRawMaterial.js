import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import AppNavbar from "../AppNavbar";
import "../App.css";


class EditRawMaterial extends Component {

    emptyItem = {
        rawMaterialName: '',
        rawMaterialUnit: ''
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
            const rawMaterial = await (await fetch(`/scm/rawMaterial/${this.props.match.params.id}`)).json();
            this.setState({item: rawMaterial});
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

        await fetch('/scm/rawMaterial' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        this.props.history.push('/RawMaterial.js');
    }

    render() {

        const {item} = this.state
        const title = <h2 className="title">{this.state.id ? 'Edit Raw Material' : 'Add Raw Material'}</h2>;

        return <div>
            <AppNavbar/>
            <Container fluid>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="rawMaterialName">Raw Material Name : </Label>
                        <Input type="text" name="rawMaterialName" id="rawMaterialName"
                               value={item.rawMaterialName || ''}
                               onChange={this.handleChange} autoComplete="rawMaterialName"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="rawMaterialUnit">Raw Material Unit : </Label>
                        <select type="text" name="rawMaterialUnit" id="rawMaterialUnit"
                                value={item.rawMaterialUnit || ''}
                                onChange={this.handleChange} autoComplete="rawMaterialUnit">
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
                        <Button color="secondary" tag={Link} to="/RawMaterial.js"
                                className="cancelButton">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EditRawMaterial);
