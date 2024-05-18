import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux';
import store from './Store/store.js';
import {RouterProvider,createBrowserRouter } from 'react-router-dom';
import {AuthLayout} from "./components"
import Home from "./Pages/Home.jsx"
import LoginPage from './Pages/LoginPage.jsx';
import AllPost from "./Pages/AllPost.jsx";
import EditPost from "./Pages/EditPost.jsx"
import AddPost from "./Pages/AddPost.jsx";

import Post from "./Pages/Post.jsx";
import SignUpPage from './Pages/SignUpPage.jsx';

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <LoginPage/>
          </AuthLayout>
        )

      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <SignUpPage/>
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },

      {
        path:"/all-posts",
        element:(<AuthLayout authentication>
          <AllPost/>
        </AuthLayout>)
      },
      {
        path:"/edit-post/:slug",
        element:(
        
        <AuthLayout authentication>
          <EditPost/>

        </AuthLayout>)
      },
      {
        path:"/post/:slug",
        element:(<AuthLayout authentication={true}>

          <Post/>

        </AuthLayout>)
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
