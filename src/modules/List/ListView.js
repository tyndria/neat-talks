import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export const ListView = ({
  items,
  onLoadMore,
  onEndReachedThreshold,
  loadingMore,
}) => {
  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <FlatList
      style={styles.container}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={onLoadMore}
      ListFooterComponent={() =>
        loadingMore ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : null
      }
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
