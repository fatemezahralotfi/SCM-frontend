import {useEffect, useState} from 'react';
import axios from 'axios';
import {Doughnut} from 'react-chartjs-2';
import AppNavbar from "./AppNavbar";

function GraphChart() {
    const [graph, setGraph] = useState([]);

    const [getData, setGetData] = useState([]);


    const inventoryDetail = async () => {
        axios.get("/scm/inventory")

            .then(response => {
                setGetData(response.data);
            });

    }
    useEffect(() => {
        inventoryDetail();
    }, []);


    const selectChart = (e) => {
        axios.get(`/scm/inventory`)
            .then(res => {

                const inventoryData = res.data;

                let amountOfProductAvailable = [];
                let amountOfRawMaterialUsed = [];
                let amountOfProductSupplied = [];

                inventoryData.forEach(element => {
                    amountOfProductAvailable.push(element.amountOfProductAvailable);
                    amountOfRawMaterialUsed.push(element.amountOfRawMaterialUsed);
                    amountOfProductSupplied.push(element.amountOfProductSupplied);

                });

                let sumOfAmountOfProductAvailable = amountOfProductAvailable.reduce((a, b) => {
                    return a + b;
                });

                let sumOfAmountOfRawMaterialUsed = amountOfRawMaterialUsed.reduce((a, b) => {
                    return a + b;
                });

                let sumOfAmountOfProductSupplied = amountOfProductSupplied.reduce((a, b) => {
                    return a + b;
                });

                setGraph({
                    labels: ["Amount Of Product Available", "Amount Of Raw Material Used", "Amount Of Product Supplied"],
                    datasets: [
                        {
                            label: 'In Billions Dollar',
                            backgroundColor: [
                                '#FFBF00',
                                '#DE3163',
                                '#40E0D0'
                            ],
                            borderWidth: 0,
                            width: '10',
                            height: '10',
                            data: [sumOfAmountOfProductAvailable, sumOfAmountOfRawMaterialUsed, sumOfAmountOfProductSupplied],
                        }
                    ]
                });
            });

    }
    useEffect(() => {
        selectChart();
    }, []);

    return (
        <div className="container">
            <AppNavbar/>
            <br/>
            <br/>
            <br/>
            <div className="row mt-3">
                <div className="col-sm-9">
                    <Doughnut
                        data={graph}
                        width={400}
                        height={400}
                        options={{
                            title: {
                                display: false,
                                text: 'Average Rainfall per month',
                                fontSize: 20
                            },
                            legend: {
                                display: false,
                                position: 'right'
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }}
                    />
                </div>

            </div>
        </div>
    )
}

export default GraphChart;
