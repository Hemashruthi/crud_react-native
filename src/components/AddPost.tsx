// import { TextInput } from "react-native-gesture-handler";
// import { useState, useContext } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { TouchableOpacity } from "react-native";
// import axios from "axios";
// import { PostContext } from "../Hooks/useContextHook";


// export function AddPost() {
//   const [addPost, setAddPost] = useState({});
//   //const contextResponse = useContext(PostContext);
//   const { dispatch} = useContext(PostContext);

//   const handleChange = (input) => (e) => {
//     //console.log(addPost)
//     setAddPost({...addPost, [input]: e.target.value})
//   }
  
//   const handleSave = async (e) => {
 
//     const newPost = {
//       title: addPost.title,
//       body: addPost.body,
//     }
   
 
//     try {
//       const response = await axios.post(
//       "https://jsonplaceholder.typicode.com/posts/",
//         newPost
   
//       );
//       //console.log("Post response: ", response)
//       if (response.status === 201) {
//         console.log(response.status);
//         dispatch({
//           type: 'ADD_POST', payload: response.data,
//           value: undefined
//         })
//         setAddPost({ title: '', body: '' });
//         console.log("o",response.data)
//         //const newPosts = [newPost , ...contextResponse.data]
//         console.log("Post Added",newPost);    
//         //contextResponse.setData(newPosts);
        
//         //alert("Post Added Successfully");
       
//         //console.log("Post: ", data);
//       } else {
//         alert("Failed to Add!");
//       }
//     } catch (e) {
//       console.log("error");
//     }
//   };

//   return (
//     <View>
//       <View>
//         <TextInput
//           style={styles.input}
//           placeholder="Post Title"
//           // value={addPost.title}
//           onChange={handleChange("title")}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Post Description"
//           //value={addPost.body}
//           onChange={handleChange("body")}
//         />
//         <TouchableOpacity onPress={handleSave}>
//           <Text style={styles.button}>Add Post</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     height: 25,
//     width: "20%",
//     margin: 7,
//     borderWidth: 1,
//     padding: 10,
//   },
//   button: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     backgroundColor: '#AECCE4', 
//     color: 'black',
//     padding: 10, 
//    width: "11%",
//    margin: 7,
//   },
// });



import { View, Text } from "react-native";


export default function AddPost() {
  return(
    <View>
      <Text>Add Post</Text>
    </View>
  )
}