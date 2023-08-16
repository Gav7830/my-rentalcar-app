import { useState, useEffect } from "react";
import { getAPI, locationToString } from '../components/Utilities'

const OrderList = () => {

    let [orders, setOrders] = useState([])
    var userId = 0;

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = () => getAPI(`orders?userId=${userId}`).then((res) => {
        if (res.status === 200) {
            setOrders(res.data)
        } else {
            console.log(res)
        }
    })

    function getOrderListMainTitles() {
        return <>
            <div className="regMainTitle1">
                <h1>Order List</h1>
            </div>

            <hr />
        </>
    }

    return (
        <>
            {getOrderListMainTitles()}

            <table className="ordersTable">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Date & Time</th>
                        <th>Full Name</th>
                        <th>Make</th>
                        <th>Car Model</th>
                        <th>Location</th>
                        <th>Pick-up date</th>
                        <th>Return date</th>
                        <th>Total Price</th>
                    </tr>
                
                    {orders.map(obj => <tr key={obj.order.id}>
                        <td>{obj.order.id}</td>
                        <td>{obj.order.orderDate.split('T')[0].split('-').reverse().join('/')}</td>
                        <td>{obj.user.firstName + " " + obj.user.lastName}</td>
                        <td>{obj.carCompanyName.name}</td>
                        <td>{obj.carModel.name}</td>
                        <td>{locationToString(obj.location)}</td>
                        <td>{obj.order.startDate.split('T')[0].split("-").reverse().join("/")}</td>
                        <td>{obj.order.endDate.split('T')[0].split("-").reverse().join("/")}</td>
                        <td>{`$${obj.order.price}`}</td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}

export default OrderList;

