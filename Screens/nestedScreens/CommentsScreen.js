import { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { Feather } from '@expo/vector-icons'; 

import { UserExapmle } from '../../utils/UserExample';



const PhotoAbove = ({ photo }) => {
  return (
    <View style={styles.postPhotoContainer}>
      <Image style={styles.postPhoto} source={photo} />
    </View>
  );
};

const CommentsListItem = ({ item }) => {
  const { ownerId, ownerPhoto, date, text } = item;
  const isOwner = ownerId === UserExapmle.id;

  return (
    <View
      style={{
        ...styles.commentContainer,
        flexDirection: isOwner ? 'row-reverse' : 'row',
      }}
    >
      <View style={styles.userPhotoContainer}>
        <Image style={styles.userPhoto} source={ownerPhoto} />
      </View>
      <View
        style={{
          ...styles.commentTextContainer,
          marginRight: isOwner ? 16 : 0,
          marginLeft: isOwner ? 0 : 16,
          borderTopLeftRadius: isOwner ? 6 : 0,
          borderTopRightRadius: isOwner ? 0 : 6,
        }}
      >
        <Text style={styles.text}>{text}</Text>
        <Text style={{ ...styles.date, textAlign: isOwner ? 'left' : 'right' }}>{date}</Text>
      </View>
    </View>
  );
};

export default function CommentsScreen({ route, item }) {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);

  const [isKeyboardHide, setIsKeyboardHide] = useState(true);
  const [focusedInput, setFocusedInput] = useState(false);
  // console.log(route)


  const { photo, postId } = route.params;
  const isCommentsExist = allComments.length > 0;

  const hideKeyboard = () => {
    setIsKeyboardHide(true);
    Keyboard.dismiss();
  };

  const commentHandler = text => {
    setComment(text);
  };

  const resetForm = () => {
    setComment('');
  };

  const onComment = () => {
    console.log('Comment:', comment);
    hideKeyboard();
    resetForm();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {isKeyboardHide && isCommentsExist ? (
            <FlatList
              data={allComments}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => false} activeOpacity={1}>
                    {index === 0 && <PhotoAbove photo={photo} />}
                    <CommentsListItem item={item} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          ) : (
            <>
              {isKeyboardHide &&  (
                <>
                  <PhotoAbove photo={photo} />
                  <Text style={styles.label}>There are no comments yet...</Text>
                </>
              )}
            </>
          )}
          <View>
            <TextInput
              placeholder={'Comment...'}
              placeholderTextColor="#bdbdbd"
              textAlign={'left'}
              maxLength={200}
              onSubmitEditing={onComment}
              style={{
                ...styles.input,
                borderColor: focusedInput ? '#ff6c00' : '#e8e8e8',
              }}
              value={comment}
              onChangeText={commentHandler}
              onFocus={() => {
                setIsKeyboardHide(false);
                setFocusedInput(true);
              }}
              onBlur={() => setFocusedInput(false)}
            />
            <TouchableOpacity style={styles.sendCommentButton} onPress={onComment}>
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: Dimensions.get('window').width * 0.045,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  postPhotoContainer: {
    width: Dimensions.get('window').width * 0.91,
    marginBottom: 32,
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  postPhoto: {
    width: Dimensions.get('window').width * 0.91,
    height: 240,
    resizeMode: 'cover',
  },
  commentContainer: {
    marginBottom: 24,
  },
  userPhotoContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  userPhoto: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
  commentTextContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  text: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  date: {
   
    fontSize: 10,
    lineHeight: 12,
    color: '#bdbdbd',
  },
  label: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 18,
    color: '#212121',
  },
  input: {
    height: 50,
    paddingHorizontal: 16,
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '500',
    color: '#212121',
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderRadius: 100,
  },
  sendCommentButton: {
    position: 'absolute',
    top: 24,
    right: 8,
    backgroundColor: '#FF6C00',
    width: 34,
    height: 34,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: 'center',
  },
});