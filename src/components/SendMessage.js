import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import './SendMessage.css';

const SendMessage = ({token, currentUser, posts, post_id}) => {
    const blankMessage = {Content: ''}
    const [message, setMessage] = useState(blankMessage)
    const {postId} = useParams();
    const navigate = useNavigate()

    const handleSubmitMessage = (event) => {
        event.preventDefault()
        fetch(`https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/posts/${postId}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: message
            })
            }).then(response => response.json())
            .then(result => {
                console.log('message result',result);
            }).finally(navigate('/posts'))
            .catch(console.error);
                }
     return <>
    <h1>Ask the Seller.</h1>
    <div className='formContainer'>
        <form onSubmit={handleSubmitMessage}>
            <input className='messageField' value={message.content} placeholder='Type message here' onChange={(event)=>{
                setMessage({...message, content: event.target.value})
            }}></input>
            <div className='button'><button type='submit'>Send Message</button> </div>
        </form>
    </div>
</>
}
export default SendMessage;
