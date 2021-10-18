import {useEffect, useState} from "react";
import axios from "axios";

const Test = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/scm/producer')
            .then((res) => {
                setData(res.data[1]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h4> Apps</h4>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>App Name</th>
                    <th>Date Created</th>
                </tr>
                </thead>

                <tbody>
                {[data] ? [data].map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.producerName}</td>
                    </tr>
                )) : <div>Custom error message</div>}
                </tbody>
            </table>
        </div>
    );
};

export default Test;
