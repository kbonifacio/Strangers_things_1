import React from "react"
import './Registration.css';

const baseURL = 'https://strangers-things.herokuapp.com/api'
const cohort = '/2108-CSE-RM-WEB-PT'
const registerURL = `${baseURL}${cohort}/users/register`

const Register = () => {
    const createAccount = (event) => {
        event.preventDefault();
    }
    return (
        <>
        <h1>Create a New Account</h1>
        <form onSubmit={createAccount}>
            <input type='text' placeholder='Username' />
            <button type='submit'>Create Account</button>
        </form>
        </>
    )
    
}

export default Register;