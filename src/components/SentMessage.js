import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './CurrentUserPosts.css';
import './SentMessage.css'
const SentMessages = ({posts, isLoggedIn, currentUser, token, currentUserMessages, setCurrentUserMessages}) => {
    const fetchUserData = async () => {
        console.log('fetch user token', token)
        try {
            const response = await fetch ('https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/users/me', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
            const result = await response.json()
            setCurrentUserMessages(result.data.messages)
        } catch (error) {
            
        }
    }  
      useEffect (
          fetchUserData, []
      )
    return <>
        {   
            currentUserMessages && currentUserMessages.map((message)=> {
                if(message.fromUser.username === currentUser) {
                return  <>
                <div className='sentMessage'>
                    <div className='sentPostTitle'>Post Title: {message.post.title} <NavLink to={`/posts/${message.post._id}`} className='sendMessageButton'>New message</NavLink></div>
                    <div className='sentPostContent'>Message: {message.content}</div>
                </div>
                </>
                }

            })
        } 
    </>   
    }

export default SentMessages;