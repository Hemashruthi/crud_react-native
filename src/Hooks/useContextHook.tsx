import { createContext, useState, useReducer, useEffect, SetStateAction } from "react";
import axios from "axios";
import { PostContextType, Post, State, Action } from "../types/PostContextType";

const initialState = {
  data: [],
};


export const PostContext = createContext<PostContextType>(undefined);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_POST":
      return {
        ...state,
        data: action.payload,
      };
    case "ADD_POST":
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case "EDIT_POST":
      const updatedData = state.data.map((item) =>
        item.id === action.value.id
          ? { ...item, title: action.value.title, body: action.value.body }
          : item
      );
      return {
        ...state,
        data: updatedData,
      };
    case "DELETE_POST":
      const updatedPosts = state.data.filter(
        (item) => item.id !== action.value
      );
      return {
        ...state,
        data: updatedPosts,
      };

    default:
      return state;
  }
};

const PostProvider = ({ children }) => {
  //const [check, setCheck] = useState(false);
  const [editPost, setEditPost] = useState({id: null, title: '', body: '' });
  const [addPost, setAddPost] = useState({ title: '', body: '' });
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mode, setMode] = useState(false);

 
  const URL = "https://jsonplaceholder.typicode.com/posts/";

  useEffect(() => {
    fetchData();
  }, [URL]);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const filter = response.data.slice(0,10);
      dispatch({
        type: "FETCH_POST",
        payload: filter,
        //value: undefined,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  

 
  const handleSave = async (e: any) => {
    const newPost = {
      title: addPost.title,
      body: addPost.body,
    };

    try {
      const response = await axios.post<Post>(
        "https://jsonplaceholder.typicode.com/posts/",
        newPost
      );
      if (response.status === 201) {
        console.log(response.status);
        dispatch({
          type: "ADD_POST",
          payload: response.data,
          //value: undefined,
        });
        setAddPost({ title: "", body: "" });
        setMode(false);
        console.log("Post Added", newPost);
      } else {
        alert("Failed to Add!");
      }
    } catch (e) {
      console.log("error");
    }
  };

  const editData = async () => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editPost.id}`,
        {
          title: editPost.title,
          body: editPost.body,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "EDIT_POST",
          value: {
            id: editPost.id,
            title: editPost.title,
            body: editPost.body,
          },
          payload: undefined,
        });
        setEditPost({ id: null, title: '', body: '' });
      } else {
        alert("Failed to Edit!");
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const deleteData = async (itemId) => {
    try {
      const response = await axios({
        url: "https://jsonplaceholder.typicode.com/posts/" + itemId,
        method: "DELETE",
      });
      if (response.status === 200) {
        //deletePost(itemId);
        dispatch({
          type: "DELETE_POST",
          value: itemId,
          payload: undefined,
        });
        console.log("Status: ", response.status);
        alert("Deleted Successfully");
      } else {
        alert("Failed to Delete!");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const contextValue: PostContextType = {
    state,
    dispatch,
    editPost,
    setEditPost,
    addPost,
    setAddPost,
    fetchData,
    handleSave,
    deleteData,
    editData,
    mode,
    setMode,
  };

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
};

export default PostProvider;
