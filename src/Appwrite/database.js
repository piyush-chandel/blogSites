import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../config/config";

export class Service {
  Client = new Client();
  Databases;
  bucket;

  constructor() {
    this.Client.setEndpoint(conf.appWriteUrl).setProject(
      conf.appWriteProjectId
    );
    this.Databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }
  async createPost({ title, slug, content, featuredImg, status, userID }) {
    try {
      const response = await this.Databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          content,
          title,
          featuredImg,
          status,
          userID,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return this.Databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      return await this.Databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.Databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.Databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      throw error;
    }
  }

  //   upload file services for image

  async uploadFile(file) {
     
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
      
    } catch (error) {
      console.log("Database service error upload file",error);
      return false;
    }
  }

  async deleteFile(fileId){
    try {
         await this.bucket.deleteFile(conf.appWriteBucketId,fileId);

         return true;

    } catch (error) {
        throw error;
        return false;
    }
  }

   getFilePreview(fileId){
    try {
       return  this.bucket.getFilePreview(conf.appWriteBucketId,fileId);
    } catch (error) {
        throw error;
        return false;
    }
  }


}

export default new Service();
