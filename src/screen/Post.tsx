import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput } from 'react-native';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [editPost, setEditPost] = useState({ id: null, title: '', body: '' });
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [isCreating, setIsCreating] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const filter = response.data.slice(0,2)
      setData(filter);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const editData = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`, {
        title: editPost.title,
        body: editPost.body,
      });
      if (response.status === 200) {
        updateEditedPost();
        alert('Edited Successfully');
      } else {
        alert('Failed to Edit!');
      }
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const updateEditedPost = () => {
    const updatedData = data.map(item =>
      item.id === editPost.id ? { ...item, title: editPost.title, body: editPost.body } : item
    );
    setData(updatedData);
    setEditPost({ id: null, title: '', body: '' });
  };

  const editPostItem = (item) => {
    setEditPost({ id: item.id, title: item.title, body: item.body });
    setIsCreating(false); // Switch to editing mode
  };

  const createNewPost = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      if (response.status === 201) {
        const newPostData = response.data;
        setData([newPostData, ...data]);
        setNewPost({ title: '', body: '' });
        setIsCreating(false); // Switch back to viewing mode
        alert('Post Created Successfully');
      } else {
        alert('Failed to Create Post!');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View>
      <Text>Posts</Text>
      {isCreating ? (
        <View>
          <Text>Create New Post</Text>
          <TextInput
            placeholder="Title"
            value={newPost.title}
            onChangeText={(text) => setNewPost({ ...newPost, title: text })}
          />
          <TextInput
            placeholder="Body"
            value={newPost.body}
            onChangeText={(text) => setNewPost({ ...newPost, body: text })}
          />
          <Button title="Create Post" onPress={createNewPost} />
        </View>
      ) : (
        <Button title="Create New Post" onPress={() => setIsCreating(true)} />
      )}

      {editPost.id !== null && (
        <View>
          <Text>Edit Post</Text>
          <TextInput
            placeholder="Title"
            value={editPost.title}
            onChangeText={(text) => setEditPost({ ...editPost, title: text })}
          />
          <TextInput
            placeholder="Body"
            value={editPost.body}
            onChangeText={(text) => setEditPost({ ...editPost, body: text })}
          />
          <Button title="Save Edit" onPress={editData} />
        </View>
      )}

      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button title="Edit" onPress={() => editPostItem(item)} />
          </View>
        )}
      />
      
    </View>
  );
};

export default MyComponent;


