import React, { useEffect, useState } from "react";
import authService from "../Appwrite/auth";

import { Container, Header, Footer, PostCard } from "../components/index";
import Service  from "../Appwrite/database";
import { logout } from "../Store/authSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Home() {
    const [posts,setPosts]=useState(null);
     const status=useSelector(state=>state.authstore.status);

    // console.log(Service.getAllPost)
    useEffect(()=>{

        
        status ? Service.getAllPost([]).then(posts=>{
            if(posts) setPosts(posts.documents);
        }):setPosts(null);
    },[status])
    // console.log(posts);
    return !posts?
  <div className="w-full py-8 text-center mt-4">
    <Container>
        <div className="flex flex-wrap">
            <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500"><Link to="/login">Login To read Posts</Link></h1>
            </div>
        </div>
    </Container>

  </div>:
  <div className="w-full py-8">

    <Container>
        <div className="flex flex-wrap">

        {posts.map(post=>(
            <div key={post.$id} className="p-2 w-1/4" >
                <PostCard {...post}/>
            </div>)
        )}
        </div>
    </Container>
  </div>;
}

export default Home;
