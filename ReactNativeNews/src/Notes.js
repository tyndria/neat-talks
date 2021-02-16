import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { NotesView } from './NotesView';

export const Notes = () => {
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const handlePress = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      fetch(`https://jsonplaceholder.typicode.com/posts/${data.length + 1}`)
        .then(response => response.json())
        .then(newData => {
          console.log(newData)
          setData([...data, newData])
          setLoadingMore(false);
        })
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={handlePress}><Text>Add new post</Text></TouchableOpacity>
      <NotesView
        items={data}
      />
    </View>
  );
};
