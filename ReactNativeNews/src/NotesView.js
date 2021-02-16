import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export const NotesView = ({
  items,
  onLoadMore,
  onEndReachedThreshold,
  loadingMore,
}) => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onLoadMore}
        onScroll={(e) => [console.log(e.nativeEvent.layoutMeasurement)]}
        ListFooterComponent={() =>
          loadingMore ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : null
        }
        onEndReachedThreshold={onEndReachedThreshold}
      />
      {loadingMore ? <View style={styles.highlight} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginVertical: 35,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
  },
  highlight: {
    position: 'absolute',
    bottom: 35,
    width: '100%',
    height: 100,
    backgroundColor: 'red',
    opacity: 0.3,
  },
});
