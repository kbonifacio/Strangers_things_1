import React, { useState, useEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import './Posts.css'



const baseURL = 'https://strangers-things.herokuapp.com/api'
const cohort = '/2108-CSE-RM-WEB-PT'
const postURL = `${baseURL}${cohort}/posts`

const Posts = ({token, currentUser, posts, setPosts, isLoggedIn}, {author: _id, username}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('searchTerm')


  const postMatches = (post, text) => {
    text = text.toLowerCase()
    const {title, description, price, location } = post

    for (const field of [title, description, price, location ]) {
      if(field.toLowerCase().includes(text)){
        return true;
      }
    }
  }

  const filteredPosts = searchTerm ? posts.filter(post => postMatches(post, searchTerm)) : posts


  
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
  return <>
    <div className='searchBoxContainer'>
      <div className='searchHeader'>Search</div><input type='text' name='search' placeholder='title, description, price...' value={searchTerm} onChange={(event) => {
      setSearchParams({searchTerm:event.target.value})}} />
    </div>
    
    { filteredPosts && filteredPosts.length
      ? filteredPosts.map((post) => {
        return (
            <div key={post._id} className='post'>
                <div className='description'>
                    <div className='postTitle'><b>{post.title}</b></div>   
                    <div className='sellerDetails'><b>Seller: </b> {post.author.username}
                     </div>
                    <div><b>Item Description: </b><i>{post.description}</i></div>
                    {isLoggedIn && <NavLink to={`/posts/${post._id}`} className='sendMessageButton'>Send message</NavLink> }
                </div>
                <div>
                    <div>
                        <div className='price'><b>Price </b>{post.price}</div>
                    </div>
                    <div>
                        <div className='delivery'>
                            <b>Delivery </b> {post.willDeliver ? 'available' : 'not available'}
                        </div>
                    </div>
                </div>
            </div>
        )
      })
      : <h1>No results</h1>
    } 
  </>
}
export default Posts;