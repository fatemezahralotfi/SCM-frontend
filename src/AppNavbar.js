import React, {Component} from "react";
import "./App.css";

export default class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="App">
                <header>
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <ul>
                        <li><a className="App-title" href={"/"}>SCM</a></li>
                        <li><a href={"/Inventory.js"}>inventory</a></li>
                        <li><a href={"/Suppliers.js"}>suppliers</a></li>
                        <li><a href={"/Distributors.js"}>distributors</a></li>
                        <li><a href={"/Producers.js"}>producers</a></li>
                        <li><a href={"/Product.js"}>product</a></li>
                        <li><a href={"/RawMaterial.js"}>raw material</a></li>
                        <li><a href={"/Profile.js"}>profile</a></li>

                        <li><a className="active">logout</a></li>
                    </ul>
                </header>
            </div>
        );
    }
}
