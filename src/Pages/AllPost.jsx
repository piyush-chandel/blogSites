import React, { useEffect, useState } from 'react'
import Service from '../Appwrite/database'
import {Container,PostCard} from "../components/index";


function AllPost() {
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        Service.getAllPost([]).then((Posts)=>{
            // console.log(Posts);
            if(Posts) setPosts(Posts.documents);
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">

            {posts.map(value=>(
                <div className='p-2 w-1/4' key={value.$id}>
                    <PostCard  {...value}/>

                </div>
            ))}
            </div>
        </Container>
      
    </div>
  )
}

export default AllPost
