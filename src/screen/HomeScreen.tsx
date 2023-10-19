import { useEffect, useContext, useState } from "react";
import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { TouchableOpacity } from "react-native";
import { PostContext } from "../Hooks/useContextHook";
import Post from "./Post";


export default function Home() {
  const {
    state,
    dispatch,
    editPost,
    setEditPost,
    addPost,
    setAddPost,
    editData,
    handleSave,
    deleteData,
    mode,
    setMode,
  } = useContext(PostContext);
  




const editPostItem = (item) => {
  setEditPost({ id: item.id, title: item.title, body: item.body });
  setMode(false);
};

// const handleTextInputChange = (text) => {
//   if (mode) {
//     // In add mode, update the addPost state
//     setAddPost((prevAddPost) => ({
//       ...prevAddPost,
//       body: text,
//     }));
//   } else {
//     // In edit mode, update the editPost state
//     setEditPost((prevEditPost) => ({
//       ...prevEditPost,
//       body: text,
//     }));
//   }
// };


  return (
    <View style={styles.container}>
        <Text>HOME </Text>

      {mode ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Post Title"
            value={mode ? addPost.title : editPost.title}
            onChangeText={(text) => {
              
                setAddPost({ ...addPost, title: text });
             
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Post Description"
            value={addPost.body}
            onChangeText={(text) => {
              
              setAddPost({ ...addPost, body: text });
           
          }}
          />
       <TouchableOpacity onPress={mode ? handleSave : editData}>
            <Text style={styles.button}>Add Post</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => setMode(true)}>
          <Text style={styles.button}>Create Post</Text>
        </TouchableOpacity>
      
      )}
     {editPost.id !== null && (
        <View>
          
        <TextInput
          style={styles.input}
          placeholder="Post Title"
          value={editPost.title}
          onChangeText={(text) => setEditPost({ ...editPost, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Post Description"
          value={editPost.body}
          onChangeText={(text) => setEditPost({ ...editPost, body: text })}
        />
        <TouchableOpacity onPress={editData}>
          <Text style={styles.button}>Update</Text>
        </TouchableOpacity>
        </View>
     )}

      {state.data.map((item, index) => {
        return (
          <View key={index}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.body}</Text>

            <View>
              <TouchableOpacity onPress={() => editPostItem(item)}>
                <Text style={styles.edit}> Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteData(item.id)}>
                <Text style={styles.del}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 13,
  },
  
  button: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#AECCE4",
    color: "black",
    padding: 10,
    width: "15%",
    margin: 7,
  },
  edit: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#f7f5bc",
    color: "black",
   
    padding: 10,
    width: "10%",
    margin: 7,

    
  },
  del: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#ffccd8",
    color: "black",

    padding: 10,
    width: "10%",
    margin: 7,
   
  },
  input: {
    height: 25,
    width: "20%",
    margin: 7,
    borderWidth: 1,
    padding: 10,
  },
});
