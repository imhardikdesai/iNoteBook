import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    
    const [credential, setCredential] = useState({ email: '', password: '' })
    let history = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            history('/')
            props.showAlert('Logged in Successfully', 'success')
        } else {
            props.showAlert('Invalid Details', 'danger')
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="container my-5">

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" value={credential.email} id="email" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" value={credential.password} id="password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
