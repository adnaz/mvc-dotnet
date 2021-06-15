import React, { useContext, useState } from 'react'
import { MyContext } from '../App';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { getData } from '../fetch';
const Login = () => {
    const { token, setToken, setCredit } = useContext(MyContext);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [state, setState] = useState("")
    const history = useHistory();
    const send = () => {
        // localStorage.setItem('token', 'test')
        getData('https://localhost:5001/api/user/login?username=' + username + '&password=' + password)
            .then(data => {
                if (data?.token) {
                    setToken(data?.token)
                    setCredit(data?.credit)
                    history.push("/");
                } else {
                    setToken(null)
                    setCredit(null)
                }


            })
        // setToken("test")
       

    }
    return (
        <Container>
            <Navbar></Navbar>

            <form>

                <h3>Log in</h3>
                <h3>{token}</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="email" className="form-control" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Passwordd</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

    

                <button type="button"  className="btn btn-dark btn-lg btn-block" onClick={send}>Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <Link to="/signup">register?</Link>
                </p>
            </form>
        </Container>
    )
}

export default Login

