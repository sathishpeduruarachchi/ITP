import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const AllOrder = ({ order }) => {
    const logo = new Image();
    logo.src = "/images/Hospital-logo-W.png";

    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState("");
    const [editedOrder, setEditedOrder] = useState(null);
    const [searchError, setSearchError] = useState("");
    const [report, setReport] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        axios
            .get(`http://localhost:8070/order/`)
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const searchOrders = () => {
        if (/^[A-Za-z0-9]+$/.test(query)) {
            const lowerCaseQuery = query.toLowerCase();
            const filteredOrders = orders.filter((order) =>
                order.order_id.toLowerCase().includes(lowerCaseQuery)
            );
            setOrders(filteredOrders);
            setSearchError("");
        } else {
            setSearchError("Please enter only item code (letters and numbers).");
        }
    };

    const deleteOrder = (order_id) => {
        axios
            .delete(`http://localhost:8070/order/delete/${order_id}`)
            .then((res) => {
                alert("Order deleted");
                console.log("Order deleted");
                getOrders();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getReport();
    }, []);

    const getReport = async (order_id) => {
        axios
            .get(`http://localhost:8070/order/${order_id}`)
            .then((res) => {
                console.log(res.data.report);
                setReport(res.data.report);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    function downloadOrder(order_id) {
        const doc = new jsPDF();
        const margin = 10;
        const lineHeight = 5;

        // You can access the order details using the order_id
        const order = orders.find((o) => o._id === order_id);

        const text = `\n\nPurchase Order \n\n
        Order ID : ${order.order_id}\n
        Supplier : ${order.supplier}\n
        Request Date : ${order.date}\n
        Destination : ${order.destination}\n
        Quantity : ${order.quantity}\n
        `;

        const splitText = doc.splitTextToSize(
            text,
            doc.internal.pageSize.width - margin * 2
        );
        doc.text(splitText, 10, 60);

        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        const canvas1 = document.createElement("canvas");
        canvas1.width = logo.width;
        canvas1.height = logo.height;
        const ctx1 = canvas1.getContext("2d");
        ctx1.drawImage(logo, 0, 0, logo.width, logo.height);
        const dataURL1 = canvas1.toDataURL("image/png");

        doc.addImage(
            dataURL1,
            "PNG",
            5,
            5,
            pdfWidth / 4,
            (pdfWidth / 4) * (logo.height / logo.width)
        );

        doc.text(
            "Ceylon Health \nTel: 0771231231 \nAddress No: No:11,Kandy road,Malabe",
            pdfWidth / 4 + 15,
            20
        );

        doc.save(`${order._id}.pdf`);
    }

    const openEditForm = (order) => {
        setEditedOrder(order);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedOrder({
            ...editedOrder,
            [name]: value,
        });
    };

    const saveEditedOrder = () => {
        const selectedDate = new Date(editedOrder.date);
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            setSearchError(
                <h3 className="error-message">
                    The selected date must be in the future or today.
                </h3>
            );
            return;
        }

        axios
            .put(`http://localhost:8070/order/update/${editedOrder._id}`, editedOrder)
            .then((res) => {
                alert("Order Updated");
                console.log("Order updated");
                setOrders((prevOrder) => {
                    const updatedOrder = prevOrder.map((order) => {
                        if (order._id === editedOrder._id) {
                            return editedOrder;
                        } else {
                            return order;
                        }
                    });
                    return updatedOrder;
                });
                setEditedOrder(null);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const cancelEdit = () => {
        setEditedOrder(null);
    };

    return (
        <div>
            <h2 className="">ORDERS</h2>

            <input
                type="text"
                onKeyUp={searchOrders}
                onKeyDown={searchOrders}
                className="search-tests-input"
                placeholder="Search by Order ID"
                onChange={(e) => {
                    setQuery(e.target.value);
                    setSearchError("");
                }}
            />
            {searchError && <p className="search-error">{searchError}</p>}

            <table className="tests-table">
                <thead>
                    <tr className="th-tests">
                        <th>Order ID</th>
                        <th>Supplier</th>
                        <th>Date</th>
                        <th>Destination</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr className="tr-tests" key={order._id}>
                            <td>{order.order_id}</td>
                            <td>{order.supplier}</td>
                            <td>{order.date}</td>
                            <td>{order.destination}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <a
                                    href="#"
                                    type="button"
                                    className="delete-order-btn"
                                    onClick={() => deleteOrder(order._id)}
                                >
                                    Delete
                                </a>
                                <a
                                    href="#"
                                    type="button"
                                    className="add-order-for"
                                    onClick={() => openEditForm(order)}
                                >
                                    Edit
                                </a>
                                <a
                                    href="#"
                                    type="button"
                                    className="download-order-btn"
                                    onClick={() => downloadOrder(order._id)}
                                >
                                    Report
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editedOrder && (
                <div>
                    <h2>Edit Order</h2>
                    <label>
                        Supplier:
                        <input
                            type="text"
                            name="supplier"
                            value={editedOrder.supplier}
                            onChange={handleEditChange}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={editedOrder.date}
                            onChange={handleEditChange}
                        />
                    </label>
                    <label>
                        Destination:
                        <input
                            type="text"
                            name="destination"
                            value={editedOrder.destination}
                            onChange={handleEditChange}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={editedOrder.quantity}
                            onChange={handleEditChange}
                        />
                    </label>
                    <button onClick={saveEditedOrder}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AllOrder;
