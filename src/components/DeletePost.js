import React, { useEffect } from 'react';
import './DeletePost.css'

const baseURL = 'https://strangers-things.herokuapp.com/api'
const cohort = '/2108-CSE-RM-WEB-PT'
const postURL = `${baseURL}${cohort}/posts`

const DeletePost = ({token, currentUser, posts, setPosts, post_id, currentUserPosts, setCurrentUserPosts}) => {
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

const handleDelete = async (event) => {
    event.preventDefault()
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2108-CSE-RM-WEB-PT/posts/${post_id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const result = await response.json()
        fetchPosts()
        fetchUserData()
      } catch (error) {
        console.log(error)
      }
  } 
return <>
    <button onClick={handleDelete}>Delete</button>
</>
}
export default DeletePost;
