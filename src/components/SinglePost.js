import React from 'react';
import './Posts.css'
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { SendMessage } from '.';

const SinglePost = ({posts, token}) => {
    const {postId} = useParams();

    return (
        posts.map((post, index)=> {
            if (postId === post._id)
            return (
                <div key={post._id}>
                     <div><SendMessage token={token}/></div>
                     <div  className='post'>
                        <div className='description'>
                            <div className='postTitle'><b>{post.title}</b></div>   
                            <div className='sellerDetails'><b>Seller: </b> {post.author.username}
                            </div>
                            <div><b>Item Description: </b><i>{post.description}</i></div>
                            
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
                   
                    <div className='backButton'>
                        <NavLink to='/posts' className='navButton'>BACK TO POSTS</NavLink>
                    </div> 
                </div>
            )
        })
    )
}
export default SinglePost;