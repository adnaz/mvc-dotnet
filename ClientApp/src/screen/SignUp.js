import React, { useContext, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { MyContext } from '../App';

const SignUp = () => {
    const {token,setToken,setCredit} = useContext(MyContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("")
    const history = useHistory();

    const send =()=>{
        fetch('https://localhost:5001/api/user', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName,password})
          }).then(res => res.json())
          .then(data => {
              console.log(data)
            if (data?.token) {
                setToken(data?.token)
                setCredit(data?.credit)
                history.push("/");
            } else {
                setToken(null)
                setCredit(null)
            }


        })
    }
    return (
        <Container>
            <Navbar></Navbar>
        <form>
        <h3>Sign Up</h3>


        <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="userName"  value={userName} onChange={e=>setUserName(e.target.value)}/>
        </div>

       

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
            <label>Repeat Password</label>
            <input type="password" className="form-control" placeholder="repeat password" value={repeat} onChange={e=>setRepeat(e.target.value)}/>
        </div>

        <button type="button"  className="btn btn-primary btn-block" onClick={send}>Sign Up</button>
        <p className="forgot-password text-right">
            Already registered <Link to="/login">sign in?</Link>
        </p>
    </form>
    </Container>
    )
}

export default SignUp
