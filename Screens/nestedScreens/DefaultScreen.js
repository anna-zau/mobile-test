import React from "react";
import { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { Feather } from "@expo/vector-icons";


import {userExample} from '../../utils/UserExample';

const PostListItem = ({ item, navigation }) => {
  const { comments, photo, title, locationRegion, locationCountry } = item;
  const commentsNumber = comments.length;
  return (
    <View>
      <View style={styles.postPhotoContainer}>
        <Image style={styles.postPhoto} source={photo} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.postDescriptionContainer}>
          <TouchableOpacity
            style={styles.postCommentsContainer}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Comments', item)}
          >
           <Feather name="message-circle" size={24} color="#BDBDBD" />
            <Text
              style={{
                ...styles.postCommentsNumber,
                color: commentsNumber === 0 ? '#bdbdbd' : '#212121',
              }}
            >
              {commentsNumber}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postLocationContainer}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Map', item)}
          >
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text style={styles.postLocation}>
              {locationCountry
                ? `${locationRegion}, ${locationCountry}`
                : locationRegion}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function DefaultScreen({ navigation, route }) {
  const [posts, setPosts] = useState(userExample.posts);

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userPhotoContainer}>
          <Image style={styles.userPhoto} source={require('../../assets/images/user.jpg')} />
        </View>
        <View style={styles.userDataContainer}>
          <Text style={styles.name}>{userExample.name}</Text>
          <Text style={styles.email}>{userExample.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: Dimensions.get('window').width * 0.045,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  userContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  userPhotoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  userPhoto: {
    flex: 1,
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  userDataContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  name: {
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 15,
    color: '#212121',
  },
  email: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(33, 33, 33, 0.8)',
  },
  postPhotoContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.91,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  postPhoto: {
    flex: 1,
    width: Dimensions.get('window').width * 0.91,
    height: 240,
    resizeMode: 'cover',
  },
  title: {
    marginVertical: 8,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  postDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  postCommentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postCommentsNumber: {
    marginLeft: 6,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
  },
  postLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postLocation: {
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: 'underline',
    color: '#212121',
  },
});