import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';

function Login() {
  let [login, setLogin] = useState({});
  let [sign, setSign] = useState({});
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState('tab1');
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  ///////////input data access///////
  const loginchange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const signupchange = (e) => {
    setSign({
      ...sign,
      [e.target.name]: e.target.value,
    });
  };

  //////////register////////////
  const register = async () => {
    // console.log(sign);
    // if (sign.name == '') {
    //   alert('Enter your name');
    // } else if (sign.email == '') {
    //   alert('Enter your email');
    // } else if (sign.password == '') {
    //   alert('Enter your password');
    // } else {
    console.log(sign);
    let res = await fetch(`http://localhost:8000/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(sign),
    });
    let data = await res.json();
    console.log(data);
    // }
  };
  ////////////login////////////
  const logindata = async () => {
    // if (sign.email == '') {
    //   alert('Enter your email');
    // } else if (sign.password == '') {
    //   alert('Enter your password');
    // } else {
    // }
    let res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(login),
    });
    let data = await res.json();
    if (data.message !== 'Wrong credentials') {
      localStorage.setItem('token', JSON.stringify(data.token));
      alert('login succesfully');
      navigate('/adminpage');
    }
  };
  return (
    // <div>
    //   <input
    //     type="text"
    //     name="name"
    //     placeholder="Name"
    //     onChange={(e) => signupchange(e)}
    //   />
    //   <input
    //     type="text"
    //     name="email"
    //     placeholder="email"
    //     onChange={(e) => signupchange(e)}
    //   />
    //   <input
    //     type="text"
    //     name="password"
    //     placeholder="password"
    //     onChange={(e) => signupchange(e)}
    //   />
    //   <button onClick={register}>submit</button>
    // </div>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick('tab1')}
            active={justifyActive === 'tab1'}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick('tab2')}
            active={justifyActive === 'tab2'}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'}>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            name="email"
            onChange={(e) => loginchange(e)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            name="password"
            onChange={(e) => loginchange(e)}
          />

          <MDBBtn className="mb-4 w-100" onClick={logindata}>
            Sign in
          </MDBBtn>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>
          <MDBInput
            wrapperClass="mb-4"
            label="Name"
            id="form1"
            type="text"
            name="name"
            onChange={(e) => signupchange(e)}
          />

          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            id="form1"
            type="email"
            name="email"
            onChange={(e) => signupchange(e)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form1"
            type="password"
            name="password"
            onChange={(e) => signupchange(e)}
          />

          <MDBBtn className="mb-4 w-100" onClick={register}>
            Sign up
          </MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;
