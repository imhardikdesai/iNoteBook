import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credential, setCredential] = useState({ name: '', email: '', password: '', cpassword: '' })
  let history = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credential

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      history('/')
      props.showAlert('Account Created Successfully', 'success')
    } else {
      props.showAlert('Invalid Credentials', 'danger')
    }
  }

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name='name' className="form-control" id="name" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' className="form-control" id="email" onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' className="form-control" id="password" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name='cpassword' className="form-control" id="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </>
  )
}

export default Signup
