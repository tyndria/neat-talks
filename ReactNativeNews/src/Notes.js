import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';

import { NotesView } from './NotesView';

export const Notes = () => {
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const handlePress = () => {
    if (data.length > 4) {
      throw Error('Number of posts is limited')
    }
    if (!loadingMore) {
      setLoadingMore(true);
      fetch(`https://jsonplaceholder.typicode.com/posts/${data.length + 1}`)
        .then(response => response.json())
        .then(newData => {
          setData([...data, newData])
          setLoadingMore(false);
        })
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={handlePress}
        hitSlop={10}
        style={({ pressed }) => ({
          backgroundColor: pressed ? 'lightskyblue' : 'white'
        })}>
        <Text>Add Post</Text>
      </Pressable>
      <NotesView
        items={data}
      />
    </View>
  );
};
