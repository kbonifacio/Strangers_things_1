import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, NavLink, BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import './style.css'
import {
   Posts,
   Home,
   AccountForm,
   Profile,
   AddPost,
   SendMessage,
   EditPost,
   SinglePost
} from './components'


const AddPostButton = () => {
    return <>
    <NavLink to='/new_post' className='addPostLink'>Add a Post</NavLink>
    </>
}

const Main = () => {
    const [token, setToken] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [posts, setPosts] = useState([])
    const [currentUserPosts, setCurrentUserPosts] = useState([])
    const [currentUserMessages, setCurrentUserMessages] = useState([])

    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        console.log('token exists')
        if (savedToken) {
            setToken(savedToken)
            setIsLoggedIn(true)
        }
    })

    return (
        <>
        <div>
        
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/account'>Account</NavLink> 
            <NavLink to='/posts'>Posts</NavLink>
        </nav>
       
        <Routes>
            <Route path='/' exact element={ 
                <>
                <Home /> 
                <div className='accountSubmissionContainer'>
                    <div className='homeRegistrationContainer'>
                        <h1>Hello Stranger. </h1>
                        { !isLoggedIn && <AccountForm action='register' setToken={setToken} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/> } 
                    </div>
                    <div className='homeLoginContainer'>
                        <h1>Welcome Back.</h1>
                        { !isLoggedIn && <AccountForm action='login' setToken={setToken} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/> }
                    </div>
                </div>
                </>
                }/>
            <Route path='/register' exact element= { <AccountForm action='register' setToken={setToken} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser}/> } />
            <Route path='/login' element={ <>
                <AccountForm setToken={setToken} action="login" setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} />  
                <div className='loginImage'><img src='https://www.seekpng.com/png/full/804-8044394_lets-get-moving-house-things-in-cartoon.png' /></div> 
                </> } />
                
            <Route path='/account' exact element = { <Profile isLoggedIn={isLoggedIn} token={token} currentUser={currentUser} posts={posts} setPosts={setPosts} currentUserPosts={currentUserPosts} setCurrentUserPosts={setCurrentUserPosts} currentUserMessages={currentUserMessages} setCurrentUserMessages={setCurrentUserMessages}/> } />
            <Route path='/posts' exact element={
                <> 
                <div className='postHeader'><h1>Thingy Listings</h1></div>
                {isLoggedIn && <div className='addPostButton'><AddPostButton /></div> } 
                <Posts posts={posts} setPosts={setPosts} currentUser={currentUser} token={token} isLoggedIn={isLoggedIn}/>
                </> } />
            <Route path='/message' exact element={ <SendMessage posts={posts}/> } />
            <Route path='/new_post' exact element={ <AddPost token={token} currentUser={currentUser}/> } />
            <Route path='/edit' exact element={<EditPost token={token} currentUser={currentUser} posts={posts} setPosts={setPosts} currentUserPosts={currentUserPosts} setCurrentUserPosts={setCurrentUserPosts}/>} />
            <Route path='/posts/:postId' exact element ={ <SinglePost posts={posts} setPosts={setPosts} currentUser={currentUser} token={token} isLoggedIn={isLoggedIn}/>} />
        </Routes>
        </div>
        </>
        
    )

}



ReactDOM.render(
    <Router>
        <Main />
    </Router>,
    document.querySelector('#app')
)