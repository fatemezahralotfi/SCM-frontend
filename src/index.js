import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Inventory from "./inventory/Inventory";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Suppliers from "./supplier/Suppliers";
import Distributors from "./distrubutor/Distributors";
import Profile from "./profile/Profile";
import EditDistributors from "./distrubutor/EditDistributors";
import EditInventory from "./inventory/EditInventory";
import EditSuppliers from "./supplier/EditSuppliers";
import EditProducers from "./producer/EditProducers";
import Producers from "./producer/Producers";
import Product from "./product/Product";
import EditProduct from "./product/EditProduct";
import RawMaterial from "./rawmaterial/RawMaterial";
import EditRawMaterial from "./rawmaterial/EditRawMaterial";
import App from "./App";
import GraphChart from "./GraphChart";
import Test from "./Test";


const rootElement = document.getElementById("root");

ReactDOM.render(
    <BrowserRouter>
        <Switch>

            <Route exact path="/" component={App}/>

            <Route path="/Inventory.js" component={Inventory}/>
            <Route path="/EditInventory.js/:id" exact={true} component={EditInventory}/>

            <Route path="/Suppliers.js" component={Suppliers}/>
            <Route path="/EditSuppliers.js/:id" exact={true} component={EditSuppliers}/>

            <Route path="/Distributors.js" component={Distributors}/>
            <Route path="/EditDistributors.js/:id" exact={true} component={EditDistributors}/>

            <Route path="/Producers.js" component={Producers}/>
            <Route path="/EditProducers.js/:id" exact={true} component={EditProducers}/>

            <Route path="/Product.js" component={Product}/>
            <Route path="/EditProduct.js/:id" exact={true} component={EditProduct}/>

            <Route path="/RawMaterial.js" component={RawMaterial}/>
            <Route path="/EditRawMaterial.js/:id" exact={true} component={EditRawMaterial}/>

            <Route path="/Profile.js" component={Profile}/>

            <Route path="/GraphChart.js" component={GraphChart}/>

            <Route path="/Test.js" component={Test}/>


        </Switch>
    </BrowserRouter>,
    rootElement
);


