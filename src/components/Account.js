import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Account.css" 


const AccountForm = ({setToken, action, setIsLoggedIn, isLoggedIn, setCurrentUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showCredentialsError, setShowCredentialsError] = useState(false)
  const [accountError, setAccountError] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    if (isLoggedIn) navigate('/account')
  }, [])

  const fetchUserData = async (auth_user_token) => {
      try {
          const response = await fetch ('https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_user_token}`
            }
        })
          const result = await response.json()
          return result
      } catch (error) {
          
      }
  }

  const submitAccountInfo = async (event) => {
    try {
      event.preventDefault();
      const response = await fetch(`https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/users/${action}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })
      const result = await response.json()
      const auth_user_token = result.data.token
      setToken(auth_user_token)
      setIsLoggedIn(true)
  

      const userData = await fetchUserData(auth_user_token)
      setCurrentUser(userData.data.username)
      setShowCredentialsError(false)
      navigate('/account')
    } catch (error) {
      console.log(error)
      const errorMessage = action === 'login' ? "Incorrect username and password combination." : "Username already taken."
      setAccountError(errorMessage)
      setShowCredentialsError(true)
    }
  }

  return <>
    <div className="actionHeader">{action}</div>
    <div className='formContainer'><form onSubmit={submitAccountInfo}>
      <input type="text" value={username} placeholder="username" onChange={(event)=>{setUsername(event.target.value)}}/>
      <input type="password" value={password} placeholder="password" onChange={(event)=>{setPassword(event.target.value)}}/>
      <div className='buttonContainer'><button type="submit">Submit</button></div>
    </form></div>
    { showCredentialsError ? <div className="error">{accountError}</div> : null }
   
  </>
}

export default AccountForm;
