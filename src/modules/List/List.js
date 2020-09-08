import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {ListView} from './ListView';

import {generateData, requestData} from './utils';

const prepareItem = (k) => ({title: k, id: `id:${k}`});

const CHUNK_SIZE = 20;
const initialState = generateData(0, CHUNK_SIZE);

export const List = () => {
  const [data, setData] = useState(initialState);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const newData = await requestData(data.length, CHUNK_SIZE);
    setData([...data, ...newData]);
    setLoadingMore(false);
  };

  return (
    <React.Fragment>
      <View>
        <Text>Chunk size: {CHUNK_SIZE}</Text>
      </View>
      <ListView
        items={data.map(prepareItem)}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
      />
    </React.Fragment>
  );
};
