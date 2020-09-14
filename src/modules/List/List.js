import React, { useState } from 'react';
import { Text, View, Alert, TextInput } from 'react-native';

import { ListView } from './ListView';

import { generateData, requestData } from './utils';

const prepareItem = (k) => ({ title: k, id: `id:${k}` });

const CHUNK_SIZE = 28;
const initialState = generateData(1, CHUNK_SIZE);

export const List = () => {
  const [threshold, setThreshold] = useState('1');

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

  const reload = () => setData(initialState);

  const handleThresholdChange = (value) => {
    value && setThreshold(value);
    reload();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 16 }}>
        <Text>Chunk length: {CHUNK_SIZE}</Text>
        <Text>Visible length: ~7</Text>
        <Text>Threshold</Text>
        <TextInput
          style={{ paddingVertical: 5 }}
          value={threshold}
          defaultValue={threshold}
          onChange={handleThresholdChange}
        />
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
