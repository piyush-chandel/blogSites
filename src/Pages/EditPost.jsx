import React, { useEffect, useState } from "react";
import Service from "../Appwrite/database";
import { PostForm, Container } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigator = useNavigate();
  useEffect(() => {
    if (slug){
      Service.getPost(slug).then((Post) => {
        if (Post) setPost(Post);
      });
    }
    else{
        navigator("/");
    }
  }, []);
  return (post?<div className="py-8">

    <Container>
        <PostForm post={post}/>
    </Container>


  </div>:null);
}

export default EditPost;
