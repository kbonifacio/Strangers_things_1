import React, {useEffect} from "react"
import { useNavigate } from "react-router";
import { CurrentUserPosts } from ".";
import { SentMessages } from ".";
import { MessagesRecieved } from ".";
import "./Profile.css"

const Profile = ({isLoggedIn, currentUser, token, posts, setPosts, currentUserPosts, setCurrentUserPosts, currentUserMessages, setCurrentUserMessages}) => {
  const navigate = useNavigate()
  console.log(currentUser)

  useEffect(() => {
    if (!isLoggedIn) navigate('/login')
  }, [])

  return <>
    <div className='userGreeting'><b>{`Hello ${currentUser}.`}</b></div>
    <div className='userDetailsContainer'>
      <div className='userMessageHeader'>
      <div className='header'>Your Messages</div>
        <div className='recievedHeader'>Messages Recieved:</div> 
        <MessagesRecieved isLoggedIn={isLoggedIn} token={token} currentUser={currentUser} posts={posts} setPosts={setPosts} currentUserPosts={currentUserPosts} setCurrentUserPosts={setCurrentUserPosts} currentUserMessages={currentUserMessages} setCurrentUserMessages={setCurrentUserMessages}/>
        <div className='sentHeader'>Messages Sent:</div>
        <SentMessages isLoggedIn={isLoggedIn} token={token} currentUser={currentUser} posts={posts} setPosts={setPosts} currentUserPosts={currentUserPosts} setCurrentUserPosts={setCurrentUserPosts} currentUserMessages={currentUserMessages} setCurrentUserMessages={setCurrentUserMessages} />
     </div>
      <div className='userPostHeader'>
        <div className='header'>Your Posts</div>
      <CurrentUserPosts token={token} currentUser={currentUser} posts={posts} setPosts={setPosts} currentUserPosts={currentUserPosts} setCurrentUserPosts={setCurrentUserPosts}/>
      </div>
    </div>
  </>
}

export default Profile;