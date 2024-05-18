import React, { useEffect, useState } from 'react'
import Service from '../Appwrite/database'
import {Button, Container,PostCard} from "../components/index";
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from "html-react-parser";


function Post() {
    const {slug}=useParams();
    const [post,setPost]=useState(null);
    const navigator=useNavigate();
    const userData=useSelector((state)=>state.authstore.userData);
    const isAuthor=userData && post ? post.$id===userData.userID :false;
    useEffect(()=>{
        if(slug){
            Service.getPost(slug).then(post=>{
                if(post) setPost(post);
            })
        }
        else{
            navigator("/");
        }
    },[])

    const deletePost= ()=>{
        Service.deletePost(post.$id).then((status) => {
            if (status) {
                Service.deleteFile(post.featuredImg);
                navigator("/");
            }
        });
    }

    
  return  post ? (
    <div className="py-8">
        <Container>
            <Button onClick={()=>navigator(`/edit-post/${slug}`)}>Edit Post</Button>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={Service.getFilePreview(post.featuredImg)}
                    alt={post.title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="mr-3">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
                </div>
        </Container>
    </div>
) : null;
}

export default Post
