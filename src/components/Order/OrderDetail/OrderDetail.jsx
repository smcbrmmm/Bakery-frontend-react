import React, { useState } from "react";
import { Container, Carousel, Navbar, Form, FormControl, Button, Nav, NavDropdown, Fade, Modal, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import './OrderDetail.css'

const OrderDetail = ({ order }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [infoOrder, setInfoOrder] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             'http://localhost:8090/api/order/order',
    //         );

    //         setInfoOrder(result.data)
    //     };

    //     fetchData()

    // }, []);

    return (

        <div>
            <h3 className="orderDetail" style={{ textAlign: 'center' }}  onClick={() => setSigntinModalShow(true)} > {order.orderId} # {order.status} </h3>


            <Modal className="cart-modal" show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Your order information.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1> samut </h1>
                </Modal.Body>
            </Modal>




        </div>

    );
};



export default OrderDetail;
