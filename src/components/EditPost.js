import React, { useEffect } from 'react';

const baseURL = 'https://strangers-things.herokuapp.com/api'
const cohort = '/2108-CSE-RM-WEB-PT'
const postURL = `${baseURL}${cohort}/posts`

const EditPost = ({token, currentUser, posts, setPosts, post_id, currentUserPosts, setCurrentUserPosts}) => {
    const fetchPosts = async () => {
        try {
          const response = await fetch(postURL)
          const result = await response.json()
          setPosts(result.data.posts)
          
    
        } catch (error) {
          throw error
        }
      }
      useEffect (
          fetchPosts, []
      )
  
      const fetchUserData = async () => {
        try {
            const response = await fetch ('https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/users/me', {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          })
            const result = await response.json()
            setCurrentUserPosts(result.data.posts)
        } catch (error) {
            
        }
      }

const handleEdit = async (event) => {
    event.preventDefault()
    
    fetch(`http://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/posts/${post_id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        post: post
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error);

  }
  return <>
    <form>
      <input value={post.title} placeholder='Post Title' onChange={(event)=>{
              setPost({...post, title: event.target.value})}}></input>
      <input type='text'></input>

      <button onClick={handleEdit}>Edit</button>
    </form>
  </>
}


export default EditPost;