import React, { useState, useEffect } from "react";
import {
  Container,
  Carousel,
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  NavDropdown,
  Fade,
  Modal,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
// import './OrderDetail.css'
import axios from "axios";
// import InfoOfOrderDetail from "./InfoOfOrderDetail/InfoOfOrderDetail"
import MediaQuery from "react-responsive";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import InfoOfOrderDetail from "../../Order/OrderDetail/InfoOfOrderDetail/InfoOfOrderDetail";
import moment from "moment";
// async function cancelOrder(order) {
//     return fetch(' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/order/cancel/' + order.orderId, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         //   body: JSON.stringify({
//         //     id: product.productId
//         //   })
//     })
//     // .then(data => data.json())
// }

// async function updateOrder(order) {

//     console.log(order)

//     return fetch(' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/payment/upload', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             orderId : order.orderId , userId : order.userId , paymentSlip : order.postImage.myFile
//         })
//     })
//     // .then(data => data.json())
// }

const OrderSummarize = ({ order }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [signinModalShow, setSigntinModalShow] = useState(false);
  const [infoOrder, setInfoOrder] = useState([]);
  const [price, setPrice] = useState();
  const [address, setAddress] = useState([]);
  const [orderId, setOrderId] = useState(order.orderId);
  // const [payment, setPayment] = useState([]);
  // const [noPayment , setNoPayment] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [userId, setUserId] = useState(user ? user.id : "100");
  const [paymentSlip, setPaymentSlip] = useState("samut");
  const [files, setFile] = useState([]);
  const [price2, setPrice2] = useState(
    order.sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );

  // if(price2.length >3){
  //     console.log(price2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  // }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        " https://4593-2405-9800-b840-ee03-95f4-56b1-ae06-3678.ngrok.io/api/orderDetail/orderdetail/" +
          order.orderId
      );

      const result2 = await axios(
        " https://4593-2405-9800-b840-ee03-95f4-56b1-ae06-3678.ngrok.io/api/order/getSumPrice/" +
          order.orderId
      );

      const result3 = await axios(
        " https://4593-2405-9800-b840-ee03-95f4-56b1-ae06-3678.ngrok.io/api/address/orderAddress/" +
          order.addressId
      );

      // const result4 = await axios(
      //     ' https://67b7-2405-9800-b600-6272-78c8-6ba8-7835-6aca.ngrok.io\/api/payment/getPayment/' + order.orderId,
      // );

      // console.log(result4)
      // setPayment(result4.data)
      setPrice(result2);
      setAddress(result3.data);
      setInfoOrder(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log(payment.length)
    // setNoPayment(payment.length)
  }, [infoOrder]);

  const check = () => {
    // console.log(infoOrder)
  };

  const handleCancelorder = async (e) => {
    const response = await cancelOrder({
      orderId,
    });

    setTimeout(() => {
      window.location.href = "/order";
    }, 500);
  };

  const handleUploadSlip = async (e) => {
    setIsUpload(true);
    setStatus("Waiting for Confirmation");

    const response = await updateOrder({
      orderId,
      userId,
      postImage,
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
    console.log(postImage.myFile.length);
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    let allfiles = [];

    // I've kept this example simple by using the first image instead of multiple
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      setFile(allfiles);
    }
  };

  useEffect(() => {
    console.log(postImage);
  }, [postImage]);

  const [orderStatus, setOrderStatus] = useState(order.status);

  const [date, setDate] = useState(moment(order.date).format("YYYY-MM-DD"));

  // const check = () => {
  //     console.log(order.sumPrice)
  // }

  const check2 = () => {
    return "samut";
  };

  return (
    <TableRow
      key={order.orderId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell
        component="th"
        scope="row"
        onClick={() => setSigntinModalShow(true)}
      >
        {order.orderId}
      </TableCell>
      <TableCell onClick={() => setSigntinModalShow(true)} align="right">
        {order.userId}
      </TableCell>
      {order.status === "Cancelled" ? (
        <TableCell
          onClick={() => setSigntinModalShow(true)}
          align="right"
          style={{ color: "red" }}
        >
          {order.status}
        </TableCell>
      ) : null}
      {order.status === "Waiting for payment" ? (
        <TableCell
          onClick={() => setSigntinModalShow(true)}
          align="right"
          style={{ color: "purple" }}
        >
          {order.status}
        </TableCell>
      ) : null}
      {order.status === "Waiting for Confirmation" ? (
        <TableCell
          onClick={() => setSigntinModalShow(true)}
          align="right"
          style={{ color: "black" }}
        >
          {order.status}
        </TableCell>
      ) : null}
      {order.status === "Confirm , Waiting for shipment" ? (
        <TableCell
          onClick={() => setSigntinModalShow(true)}
          align="right"
          style={{ color: "orange" }}
        >
          {order.status}
        </TableCell>
      ) : null}
      {order.status === "Shipping" ? (
        <TableCell
          onClick={() => setSigntinModalShow(true)}
          align="right"
          style={{ color: "black" }}
        >
          {order.status} - {order.trackingNo}
        </TableCell>
      ) : null}

      {order.status === "Completed" ? (
        <TableCell
          onClick={() => setSigntinModalShow(true)}
          align="right"
          style={{ color: "green" }}
        >
          {order.status}
        </TableCell>
      ) : null}

      <TableCell onClick={() => setSigntinModalShow(true)} align="right">
        {moment(order.date.slice(0, 10)).format("D MMMM YYYY")}
      </TableCell>
      <TableCell onClick={() => setSigntinModalShow(true)} align="right">
        {" "}
        {order.sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
      </TableCell>

      <Modal
        className="cart-modal"
        show={signinModalShow}
        onHide={() => setSigntinModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Your order information. #{order.orderId}
            {order.status === "Cancelled" ? (
              <h5 style={{ color: "red" }}> Status : {order.status} </h5>
            ) : null}
            {order.status === "Waiting for payment" ? (
              <h5 style={{ color: "purple" }}> Status : {order.status} </h5>
            ) : null}
            {order.status === "Waiting for Confirmation" ? (
              <h5 style={{ color: "green" }}> Status : {order.status} </h5>
            ) : null}
            {order.status === "Confirm , Waiting for shipment" ? (
              <h5 style={{ color: "orange" }}> Status : {order.status} </h5>
            ) : null}
            {order.status === "Shipping" ? (
              <h5 style={{ color: "violet" }}>
                {" "}
                Status : {order.status} - {order.trackingNo}
              </h5>
            ) : null}
            {order.status === "Completed" ? (
              <h5 style={{ color: "green" }}> Status : {order.status} </h5>
            ) : null}
            {/* {order.status === 'Cancelled' ?
                            null :
                            <Button hidden={order.hasPayment !== "no-slip" || isUpload} variant="danger" size="sm" onClick={handleCancelorder}> Cancel Order </Button>
                        } */}
            <h5 style={{ color: "grey", fontSize: "16px" }}>
              {" "}
              Date : {moment(order.date.slice(0, 10)).format(
                "D MMMM YYYY"
              )}{" "}
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <h5> Menu </h5>
            </Col>
            <Col>
              <h5>Quantity</h5>
            </Col>
            <Col>
              <h5>Price</h5>
            </Col>
          </Row>

          {infoOrder.map((infoOrder) => (
            <InfoOfOrderDetail key={infoOrder.orderId} infoOrder={infoOrder} />
          ))}

          <Row style={{ textAlign: "center" }}>
            <Col> </Col>

            <Col>
              {" "}
              <h4 style={{ marginLeft: "3rem" }}> Total : {price2} </h4>
            </Col>
          </Row>

          <hr></hr>

          <Row>
            <Col>
              <h5> Address for Shipping.</h5>
              <h5 style={{ fontSize: "18px" }}> {address.place} </h5>
              <h5 style={{ fontSize: "16px" }}>
                {" "}
                Reciever : {address.recieverName}{" "}
              </h5>
              <h5 style={{ fontSize: "16px" }}>
                {" "}
                Reciever Tel : {address.recieverTel}{" "}
              </h5>
              <h5 style={{ fontSize: "16px" }}>
                {" "}
                Address : {address.houseNumber} {address.address}{" "}
                {address.province} {address.postal}
              </h5>

              <br></br>
              <br></br>
            </Col>
            <Col>
              <h5> Payment </h5>

              {order.hasPayment === "no-slip" ? null : (
                <img src={order.hasPayment} width="100%"></img>
              )}

              {order.status === "Waiting for payment" ? (
                <h5 style={{ fontSize: "16px", color: "purple" }}>
                  {" "}
                  Waiting for customer upload slip.
                </h5>
              ) : null}

              {order.status === "Cancelled" ? (
                <h5 style={{ fontSize: "16px", color: "red" }}>
                  {" "}
                  Your order has been canceled.
                </h5>
              ) : null}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </TableRow>
  );
};

export default OrderSummarize;
