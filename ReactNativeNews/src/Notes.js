import React, { useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

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
        style={({ pressed }) => [{
          opacity: pressed ? 0.7 : 1,
        }, styles.button]}>
        <Text style={styles.text}>Add Post</Text>
      </Pressable>
      <NotesView
        items={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 15,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#f9c2ff'
  },
  text: {
    textAlign: 'center'
  }
});

