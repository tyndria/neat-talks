import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { ListView } from './ListView';

import { generateData, requestData } from './utils';

const prepareItem = (k) => ({ title: k, id: `id:${k}` });

const CHUNK_SIZE = 28;
const initialState = generateData(1, CHUNK_SIZE);

export const List = () => {
  const [data, setData] = useState(initialState);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const newData = await requestData(data.length + 1, CHUNK_SIZE);
      setData([...data, ...newData]);
      setLoadingMore(false);
    }
  };

  const threshold = 1;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 16 }}>
        <Text style={styles.text}>Chunk length: {CHUNK_SIZE}</Text>
        <Text style={styles.text}>Visible length: ~7</Text>
        <Text style={styles.text}>Threshold: {threshold}</Text>
      </View>
      <ListView
        items={data.map(prepareItem)}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
        onEndReachedThreshold={threshold}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});
