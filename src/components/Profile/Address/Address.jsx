import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Nav, NavDropdown, Collapse, Modal, Fade, Button } from "react-bootstrap";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NavbarCom from '../../Navbar/NavbarComponent'
import axios from "axios";
import './Address.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function deleteAddress(addressDetail) {
    console.log(addressDetail)
    return fetch('https://22ce-2405-9800-b600-6272-c873-ef36-e159-44b6.ngrok.io/api/address/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            addressId: addressDetail.addressId
        })
    })
    // .then(data => data.json())
}

async function updateAddress(addressDetail) {

    console.log(addressDetail)

    return fetch('https://22ce-2405-9800-b600-6272-c873-ef36-e159-44b6.ngrok.io/api/address/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            place: addressDetail.place, houseNumber: addressDetail.houseNumber, address: addressDetail.addesses,
            recieverName: addressDetail.recieverName, recieverTel: addressDetail.recieverTel,
            province: addressDetail.province, postal: addressDetail.postal, addressId: addressDetail.addressId
        })
    })
    // .then(data => data.json())
}

export default function Address({ address, no }) {
    const [open, setOpen] = React.useState(false);
    const [signinModalShow, setSigntinModalShow] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const [place, setPlace] = useState(address.place)
    const [recieverName, setRecieverName] = useState(address.recieverName)
    const [recieverTel, setRecieverTel] = useState(address.recieverTel)
    const [houseNumber, setHouseNo] = useState(address.houseNumber)
    const [province, setProvince] = useState(address.province)
    const [postal, setPostal] = useState(address.postal)
    const [addesses, setAddesses] = useState(address.address)
    const [addressId, setAddressId] = useState(address.addressId)

    const [conAddress, setConAddress] = useState(address)

    const [submit, setSubmit] = useState(false);

    const [openAlert, setOpenAlert] = React.useState(false);

    const [openAlertEdit, setOpenAlertEdit] = React.useState(false);

    const handleClick = () => {
        setOpenAlert(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    function handleChange(e) {
        const temp = e.target.value;
        setPlace(temp)
    }

    function click(e) {
        setSubmit(true);
        console.log(place);
    }

    const handleSubmit = async e => {
        // e.preventDefault();
        const response = await deleteAddress({
            addressId
        });

        setTimeout(() => {
            window.location.href = "/profile";
        }, 2000);

    }

    const handleEdit = async e => {

        const response = await updateAddress({
            place, houseNumber, addesses, province, postal, recieverName, recieverTel, addressId
        });

        setTimeout(() => {
            window.location.href = "/profile";
        }, 1000);

    }



    return (
        <div className="main">

            <h4 onClick={() => setOpen(!open)} className="place"> {no}. {address.place}
            </h4>
            <div >
                <Collapse in={open}>
                    <div hidden={editOpen}>
                        <div id="example-collapse-text">
                            <h5 className='address'> Reciever : {address.recieverName} </h5>
                            <h5 className='address'> Tel : {address.recieverTel} </h5>
                            <h5 className='address'> Address : {address.houseNumber} {address.address} {address.province} {address.postal} </h5>
                            <Button variant="text" onClick={() => setSigntinModalShow(true)} >Edit <EditIcon /></Button>
                            <Button variant="text" onClick={() => setModalShow(true)} style={{ color: 'red' }} >Delete <DeleteForeverIcon /></Button>
                        </div>
                    </div>
                </Collapse>
                <hr></hr>
            </div>

            <Modal className="cart-modal" show={signinModalShow}
                onHide={() => setSigntinModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit your address.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="formSignin" >
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Place</Form.Label>
                            <Form.Control type="text" onChange={e => { handleChange(e) }} defaultValue={conAddress.place} />
                        </Form.Group>
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Reciever Name</Form.Label>
                            <Form.Control type="text" onChange={e => { setRecieverName(e.target.value) }} defaultValue={conAddress.recieverName} />
                        </Form.Group>
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Reciever Tel#</Form.Label>
                            <Form.Control type="text" onChange={e => { setRecieverTel(e.target.value) }} defaultValue={conAddress.recieverTel} />
                        </Form.Group>
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>House Number</Form.Label>
                            <Form.Control type="text" onChange={e => { setHouseNo(e.target.value) }} defaultValue={conAddress.houseNumber} />
                        </Form.Group>
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={e => { setAddesses(e.target.value) }} defaultValue={conAddress.address} />
                        </Form.Group>
                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Province</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={e => { setProvince(e.target.value) }}>
                                <option value="same">{conAddress.province}</option>
                                <option value="Bangkok">Bangkok</option>
                                <option value="Krabi">Krabi </option>
                                <option value="Kanchanaburi">Kanchanaburi </option>
                                <option value="Kalasin">Kalasin </option>
                                <option value="Kamphaeng Phet">Kamphaeng Phet </option>
                                <option value="Khon Kaen">Khon Kaen</option>
                                <option value="Chanthaburi">Chanthaburi</option>
                                <option value="Chachoengsao">Chachoengsao </option>
                                <option value="Chonburi">Chonburi </option>
                                <option value="Chaiyaphum">Chaiyaphum </option>
                                <option value="Chumphon">Chumphon </option>
                                <option value="Chai Nat">Chai Nat </option>
                                <option value="Chiang Mai">Chiang Mai </option>
                                <option value="Chiang Rai">Chiang Rai </option>
                                <option value="Trang">Trang </option>
                                <option value="Trat">Trat </option>
                                <option value="Tak">Tak </option>
                                <option value="Nakhon Nayok">Nakhon Nayok </option>
                                <option value="Nakhon Pathom">Nakhon Pathom </option>
                                <option value="Nakhon Phanom">Nakhon Phanom </option>
                                <option value="Nakhon Ratchasima">Nakhon Ratchasima </option>
                                <option value="Nakhon Si Thammarat">Nakhon Si Thammarat </option>
                                <option value="Nakhon Sawan">Nakhon Sawan </option>
                                <option value="Narathiwat">Narathiwat </option>
                                <option value="Nan">Nan </option>
                                <option value="Nonthaburi">Nonthaburi </option>
                                <option value="Bueng Kan">Bueng Kan</option>
                                <option value="Buriram">Buriram</option>
                                <option value="Prachuap Khiri Khan">Prachuap Khiri Khan </option>
                                <option value="Pathum Thani">Pathum Thani </option>
                                <option value="Prachinburi">Prachinburi </option>
                                <option value="Pattani">Pattani </option>
                                <option value="Phayao">Phayao </option>
                                <option value="Phra Nakhon Si Ayutthaya">Phra Nakhon Si Ayutthaya </option>
                                <option value="Phang Nga">Phang Nga </option>
                                <option value="Phichit">Phichit </option>
                                <option value="Phitsanulok">Phitsanulok </option>
                                <option value="Phetchaburi">Phetchaburi </option>
                                <option value="Phetchabun">Phetchabun </option>
                                <option value="Phrae">Phrae </option>
                                <option value="Phatthalung">Phatthalung </option>
                                <option value="Phuket">Phuket </option>
                                <option value="Maha Sarakham">Maha Sarakham </option>
                                <option value="Mukdahan">Mukdahan </option>
                                <option value="Mae Hong Son">Mae Hong Son </option>
                                <option value="Yasothon">Yasothon </option>
                                <option value="Yala">Yala </option>
                                <option value="Roi Et">Roi Et </option>
                                <option value="Ranong">Ranong </option>
                                <option value="Rayong">Rayong </option>
                                <option value="Ratchaburi">Ratchaburi</option>
                                <option value="Lopburi">Lopburi </option>
                                <option value="Lampang">Lampang </option>
                                <option value="Lamphun">Lamphun </option>
                                <option value="Loei">Loei </option>
                                <option value="Sisaket">Sisaket</option>
                                <option value="Sakon Nakhon">Sakon Nakhon</option>
                                <option value="Songkhla">Songkhla </option>
                                <option value="Samut Sakhon">Samut Sakhon </option>
                                <option value="Samut Prakan">Samut Prakan </option>
                                <option value="Samut Songkhram">Samut Songkhram </option>
                                <option value="Sa Kaeo">Sa Kaeo </option>
                                <option value="Saraburi">Saraburi </option>
                                <option value="Sing Buri">Sing Buri </option>
                                <option value="Sukhothai">Sukhothai </option>
                                <option value="Suphan Buri">Suphan Buri </option>
                                <option value="Surat Thani">Surat Thani </option>
                                <option value="Surin">Surin </option>
                                <option value="Satun">Satun </option>
                                <option value="Nong Khai">Nong Khai </option>
                                <option value="Nong Bua Lamphu">Nong Bua Lamphu </option>
                                <option value="Amnat Charoen">Amnat Charoen </option>
                                <option value="Udon Thani">Udon Thani </option>
                                <option value="Uttaradit">Uttaradit </option>
                                <option value="Uthai Thani">Uthai Thani </option>
                                <option value="Ubon Ratchathani">Ubon Ratchathani</option>
                                <option value="Ang Thong">Ang Thong </option>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
                            <Form.Label>Postal</Form.Label>
                            <Form.Control type="text" onChange={e => { setPostal(e.target.value) }} defaultValue={conAddress.postal} />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" onClick={() => { handleEdit() ; setOpenAlertEdit(true)}}>
                                Confirm.
                            </Button>

                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal className="cart-modal" show={modalShow}
                onHide={() => setModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete your address confirmation.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5> Delete this address.</h5>

                    <Button variant='danger' style={{ display: 'block', marginLeft: 'auto' }}
                        onClick={() => { handleSubmit(); handleClick() }}
                    > Delete</Button>
                </Modal.Body>
            </Modal>

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Address already deleted.
                </Alert>
            </Snackbar>

            <Snackbar open={openAlertEdit} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Address already edited.
                </Alert>
            </Snackbar>



        </div>
    );
}