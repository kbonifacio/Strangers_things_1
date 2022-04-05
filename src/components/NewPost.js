import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './NewPost.css';

const AddPost = ({token, currentUser}) => {
    const blankPost = {title: '', description: '', price: ''}
    const [post, setPost] = useState(blankPost)
    const navigate = useNavigate()
    console.log('current User', currentUser)

const handleSubmit = async (event) => {
        event.preventDefault()
        fetch('https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/posts', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: post
            })
            }).then(response => response.json())
            .then(result => {
                console.log(result)
                
            }).finally(navigate('/account'))
            .catch(console.error);
} 
return <>
    <h1>Create a new Thingy Listing.</h1>
    <div className='thingyFormContainer'>
        <form onSubmit={handleSubmit}>
            Title:<input value={post.title} placeholder='Post Title' onChange={(event)=>{
                setPost({...post, title: event.target.value})
            }}></input>
            Description:<input value={post.description} placeholder='Item Description' onChange={(event)=>{
                setPost({...post, description: event.target.value})
            }}></input>
            Price:<input value={post.price} placeholder='Item price' onChange={(event)=>{
                setPost({...post, price: event.target.value})
            }}></input>
            <div className='checkbox'> <input className='checkboxInput' type='checkbox' value='yes' onChange={(event)=>{
                setPost({...post, willDeliver: event.target.value})
            }}></input>Will Deliver (check if delivery is available) </div>
            <div className='thingySubmit'><button type='submit'>Submit</button></div>
        </form>
    </div>
</>
}
export default AddPost;