import React, {Component} from "react";
import "../App.css";
import 'react-dropdown/style.css';
import AppNavbar from "../AppNavbar";


class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            students: [
                {
                    row: 1,
                    inventor: 'Wasif',
                    phone: 21,
                    orderDate: '1376/10/25',
                    transportDate: '1376/10/25',
                    deliveryDate: '1376/10/25'
                },
                {
                    row: 2,
                    inventor: 'Ali',
                    phone: 19,
                    orderDate: '1376/10/25',
                    transportDate: '1376/10/25',
                    deliveryDate: '1376/10/25'
                },
                {
                    row: 3,
                    inventor: 'Saad',
                    phone: 16,
                    orderDate: '1376/10/25',
                    transportDate: '1376/10/25',
                    deliveryDate: '1376/10/25'
                },
                {
                    row: 4,
                    inventor: 'Asad',
                    phone: 25,
                    orderDate: '1376/10/25',
                    transportDate: '1376/10/25',
                    deliveryDate: '1376/10/25'
                }
            ]
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const {id, row, inventor, phone, orderDate, transportDate, deliveryDate} = student //destructuring
            return (
                <tr key={id}>
                    <td>{row}</td>
                    <td>{inventor}</td>
                    <td>{phone}</td>
                    <td>{orderDate}</td>
                    <td>{transportDate}</td>
                    <td>{deliveryDate}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="App">
                <AppNavbar/>
                <p className="App-intro">
                    hello manager
                </p>
            </div>
        );
    }
}

export default Profile;
