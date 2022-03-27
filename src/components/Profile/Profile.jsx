import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Col, Row, Container, Carousel, Navbar, Form, FormControl, Nav, NavDropdown, Fade, Modal, Button } from "react-bootstrap";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Address from './Address/Address'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import NavbarCom from '../Navbar/NavbarComponent'
import axios from "axios";
// import Avatar from '@mui/material/Avatar';

import "./Profile.css"

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MediaQuery from 'react-responsive'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function saveAddress(addressDetail) {
  console.log(addressDetail)
  return fetch('https://ed13-2405-9800-b600-6272-128-35b3-4634-6a19.ngrok.io/api/address/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: addressDetail.userId, place: addressDetail.place
      , houseNumber: addressDetail.houseNumber, address: addressDetail.addesses,
      recieverName: addressDetail.recieverName, recieverTel: addressDetail.recieverTel,
      province: addressDetail.province, postal: addressDetail.postal
    })
  })
  // .then(data => data.json())

}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Profile = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  const [address, setAddress] = useState([]);
  const [signinModalShow, setSigntinModalShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://ed13-2405-9800-b600-6272-128-35b3-4634-6a19.ngrok.io/api/address/address/' + user.id,
      );
      setAddress(result.data)
      console.log(result)
    };

    fetchData();

  }, []);

  const [edit, showEdit] = useState(false);

  const [open, setOpen] = useState(false);
  let no = 1;
  let no_mobile = 1;

  const [place, setPlace] = useState(address.place)
  const [recieverName, setRecieverName] = useState(address.recieverName)
  const [recieverTel, setRecieverTel] = useState(address.recieverTel)
  const [houseNumber, setHouseNo] = useState(address.houseNumber)
  const [province, setProvince] = useState(address.province)
  const [postal, setPostal] = useState(address.postal)
  const [addesses, setAddesses] = useState(address.address)
  const [userId, setUserId] = useState(user.id)

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };


  const handleSubmit = async e => {
    // e.preventDefault();
    const response = await saveAddress({
      userId,
      place,
      recieverName, recieverTel, houseNumber, province, postal, addesses
    });

    setTimeout(() => {
      window.location.href = "/profile";
    }, 1000);

  }

  const [validated, setValidated] = useState(false);

  const handleSubmitForm = async (event) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      console.log("samut")
    }

    setValidated(true);
    
    

  };


  return (
    <div className="page-container">

      <NavbarCom />

      <div className='content-wrap'>
        <div className='container'>
          <h1> Profile  </h1>

          <MediaQuery minWidth={1224}>
            <Row>
              <Col>
                <div hidden={edit} >
                  <h2> Detail  </h2>
                  {/* <Avatar alt="Remy Sharp" src={user.img} sx={{ width: 200, height: 200 }} /> */}
                  <h4> Name : {user.name} </h4>
                  <h4> Email : {user.email} </h4>
                </div>
              </Col>
              <Col>
                <div hidden={edit} >
                  <h2> Address <Button color='success' size='large' onClick={() => setSigntinModalShow(true)}> Add <AddLocationIcon /> </Button> </h2>
                  {address.map((address) => (
                    <Address key={address.id} address={address} no={no++} />
                  ))}
                </div>
              </Col>
            </Row>
          </MediaQuery>

          <MediaQuery maxWidth={1224}>

            <div hidden={edit} >
              {/* <h2> Detail  </h2> */}
              {/* <Avatar alt="Remy Sharp" src={user.img} sx={{ width: 200, height: 200 }} /> */}
              <h4> Name : {user.name} </h4>
              <h4> Email : {user.email} </h4>
            </div>
            <hr className='hr'></hr>

            <div hidden={edit} >
              <h2> Address <Button color='success' size='large' onClick={() => setSigntinModalShow(true)}> Add <AddLocationIcon /> </Button> </h2>
              {address.map((address) => (
                <Address key={address.id} address={address} no={no_mobile++} />
              ))}
            </div>

          </MediaQuery>
        </div>
      </div>


      <Modal className="cart-modal" show={signinModalShow}
        onHide={() => setSigntinModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add your new address.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="formSignin" validated={validated} onSubmit={handleSubmitForm} >
            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
              <Form.Label>Place</Form.Label>
              <Form.Control required type="text" onChange={e => { setPlace(e.target.value) }} />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
              <Form.Label>Reciever Name</Form.Label>
              <Form.Control required type="text" onChange={e => { setRecieverName(e.target.value) }} />
            </Form.Group>
            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
              <Form.Label>Reciever Tel#</Form.Label>
              <Form.Control required type="text" onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
                onChange={e => { setRecieverTel(e.target.value) }}
                maxLength="10"
              />
            </Form.Group>
            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
              <Form.Label>House Number</Form.Label>
              <Form.Control required type="text" onChange={e => { setHouseNo(e.target.value) }} />
            </Form.Group>
            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
              <Form.Label>Address</Form.Label>
              <Form.Control required as="textarea" onChange={e => { setAddesses(e.target.value) }} rows={3} />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="signinInput mb-3" controlId="fromBasicPlace" >
              <Form.Label>Province</Form.Label>
              <Form.Select required aria-label="Default select example" onChange={e => { setProvince(e.target.value) }}>
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
              <Form.Control required type="text" onChange={e => { setPostal(e.target.value) }} />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" type="submit"
              // onClick={handleSubmitForm}
              // onClick={() => { handleSubmit(); handleClick() }}
              >
                Confirm.
              </Button>

            </div>
          </Form>
        </Modal.Body>
      </Modal>


      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Address already added.
        </Alert>
      </Snackbar>


    </div >
  );
}

export default Profile;