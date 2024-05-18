import React, { useCallback, useEffect } from "react";
import { Button, Input, Select, RTE } from "../index";
import { useForm } from "react-hook-form";
import Service from "../../Appwrite/database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  console.log(post.content);
  const navigator = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

    
  const userData = useSelector((state) => state.authstore.userData);
  console.log("Postform",userData);
 
  const submitHandler = async (data) => {

    // console.log(userData);
   
    if (post) {
      const file = data.image[0] ? await Service.uploadFile(data.image[0]) : null;
      if (file) {
        await Service.deleteFile(post.featuredImg);
      }
       try {
        const dbPost = await Service.updatePost(post.$id, {
          ...data,
          featuredImg: file ? file.$id : undefined,
        });
        if (dbPost) {
          navigator(`/post/${dbPost.$id}`);
        }
       } catch (error) {
        file && await Service.deleteFile(file.$id);
        console.log("error in create db post after upload file",error);

        
       }
     
    } else {
      // console.log("hii i am there")
      const file =  await Service.uploadFile(data.image[0]);
      // console.log(file);
      if(file){
        const fieldId=file.$id;
        data.featuredImg=fieldId;
        console.log(userData);
         try {
          const dbPost = await Service.createPost({
            ...data,
           userID: userData.$id
          });
          if (dbPost) {
            // console.log(dbPost);
            navigator(`/post/${dbPost.$id}`);
          }
         } catch (error) {
            file && await Service.deleteFile(file.$id);
            console.log("after upload file error in create new post",error); 
         }
        
        
  
      }
      
      
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      

      const temp = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
     
      return temp;
    } else return "";
  }, []);

  
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <form className="flex flex-wrap" onSubmit={handleSubmit(submitHandler)}>
      <div className="w-2/3 px-2">
        <Input
          label="title :"
          placeholder="title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
           
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
          
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues('content')}
          type="File"
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image: "
          type="file"
          className="mb-4"
          accept="image/png,image/jpg, image/jpeg,image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={Service.getFilePreview(post.featuredImg)}
              alt={post.title}
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
