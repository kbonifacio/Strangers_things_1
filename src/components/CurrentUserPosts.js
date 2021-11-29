import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CurrentUserPosts.css';
import { DeletePost } from '.';
import { EditPost } from '.';

const CurrentUserPosts = ({currentUser, token, posts, setPosts, currentUserPosts, setCurrentUserPosts}) => {
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
      useEffect (
          fetchUserData, []
      )
    return <>
        {
            currentUserPosts && currentUserPosts.map((post)=> {
                if (post.active === true) {
                return  <>
                <div className='currentUserPostTitle'>{post.title} ({post.price})</div>
                <div className='currentUserPostDescription'>Item Description: {post.description}</div>
                <div className='postButtons'>
                    {/* <EditPost token={token} currentUser={currentUser} posts={posts} setPosts={setPosts} post_id={post._id} currentUserPosts={currentUserPosts} setCurrentUserPosts={setCurrentUserPosts}/> */}
                    <DeletePost token={token} currentUser={currentUser} posts={posts} setPosts={setPosts} post_id={post._id} currentUserPosts={currentUserPosts} setCurrentUserPosts={setCurrentUserPosts}/>
                </div>
                </>
                }
            })
        } 
        
    </>   
    }
    
export default CurrentUserPosts;