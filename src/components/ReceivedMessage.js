import React, { useEffect } from 'react';
import './CurrentUserPosts.css';
import './SentMessage.css'


const MessagesRecieved = ({posts, isLoggedIn, currentUser, token, currentUserMessages, setCurrentUserMessages}) => {
    const fetchUserData = async () => {
        try {
            const response = await fetch ('https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/users/me', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
            const result = await response.json()
            setCurrentUserMessages(result.data.messages)
            const sender = result.data.messages.fromUser.username

        } catch (error) {   
            }
        }  
      useEffect (
          fetchUserData, []
      )
    return <>
        {   
            currentUserMessages && currentUserMessages.map((message)=> {
                if(message.fromUser.username !== currentUser) {
                return  <>
                <div className='sentMessage'>
                    <div className='sentPostTitle'>
                        <div>Post Title: {message.post.title} </div>
                        <div className='fromUser'>From: {message.fromUser.username}</div>
                    </div>
                    <div className='sentPostContent'>Message: {message.content}</div>
                </div>
                </>
                }
            })
        }   
    </>   
}

export default MessagesRecieved;