import { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Image,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { customAlphabet } from 'nanoid/non-secure';

import { Feather } from "@expo/vector-icons";


export default function CreatePostsScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [locality, setLocality] = useState('');
  const [isKeyboardHide, setIsKeyboardHide] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGeolocationPermission, setHasGeolocationPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isPhotoDownloaded, setIsPhotoDownloaded] = useState(false);

  useEffect(() => {
    (async () => {
      let { status: geolocationStatus } = await Location.requestForegroundPermissionsAsync();
      if (geolocationStatus !== 'granted') {
        Alert.alert('Alert', 'Permission to access location was denied');
      }
      setHasGeolocationPermission(geolocationStatus === 'granted');

      let { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert('Alert', 'Permission to access camera was denied');
      }
      setHasCameraPermission(cameraStatus === 'granted');
    })();
  }, []);

  const hideKeyboard = () => {
    setIsKeyboardHide(true);
    Keyboard.dismiss();
  };

  const titleHandler = text => {
    setTitle(text);
  };

  const localityHandler = text => {
    setLocality(text);
  };

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo.uri);
    setIsPhotoDownloaded(true);
  };

  const resetForm = () => {
    setTitle('');
    setLocality('');
    setHasCameraPermission(null);
    setHasGeolocationPermission(null);
    setPhoto(null);
    setIsPhotoDownloaded(false);
  };

  const onPost = () => {
    hideKeyboard();

    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
      const post = {
        id: nanoid(),
        title,
        photo: { uri: photo },
        comments: [],
        likesNumber: 0,
        locationRegion: locality,
        location: coords,
      };

      resetForm();
      navigation.navigate('Publications', post);
    })();
  };

  const isPublishAllowed =
    title && locality && hasCameraPermission && hasGeolocationPermission && isPhotoDownloaded;

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
          >
            {isKeyboardHide ? (
              <>
                <View style={styles.postPhotoContainer}>
                  <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                    ref={ref => {
                      setCameraRef(ref);
                    }}
                  >
                    {photo ? (
                      <Image
                        style={{
                          ...styles.postPhoto,
                          width: isPhotoDownloaded ? Dimensions.get('window').width * 0.91 : 0,
                          height: isPhotoDownloaded ? Dimensions.get('window').width * 0.91 : 0,
                        }}
                        source={{ uri: photo }}
                      />
                    ) : null}
                    <TouchableOpacity
                      style={styles.photoButtonContainer}
                      onPress={
                        isPhotoDownloaded ? () => setIsPhotoDownloaded(false) : () => takePhoto()
                      }
                    >
                      {isPhotoDownloaded ? (
                        <Feather name="camera" size={24} color="#FFFFFF" />
                      ) : (
                        <Feather name="camera" size={24} color="#BDBDBD" />
                      )}
                    </TouchableOpacity>
                  </Camera>
                </View>
                <Text style={styles.photoMessage}>
                  {isPhotoDownloaded ? 'Edit photo' : 'Load photo'}
                </Text>
              </>
            ) : null}
            <View
              style={{
                ...styles.inputContainer,
                marginBottom: 16,
                borderColor: focusedInput === 'title' ? '#ff6c00' : '#e8e8e8',
              }}
            >
              <TextInput
                placeholder={'Name...'}
                placeholderTextColor="#bdbdbd"
                textAlign={'left'}
                maxLength={40}
                onSubmitEditing={hideKeyboard}
                style={{ ...styles.input, fontWeight: '500' }}
                value={title}
                onChangeText={titleHandler}
                onFocus={() => {
                  setIsKeyboardHide(false);
                  setFocusedInput('title');
                }}
                onBlur={() => {
                  setFocusedInput(null);
                  setIsKeyboardHide(true);
                }}
              />
            </View>
            <View
              style={{
                ...styles.inputContainer,
                ...styles.locationContainer,
                borderColor: focusedInput === 'location' ? '#ff6c00' : '#e8e8e8',
              }}
            >
<Feather name="map-pin" size={24} color="#BDBDBD" />             
 <TextInput
                placeholder={'Location...'}
                placeholderTextColor="#bdbdbd"
                textAlign={'left'}
                maxLength={40}
                onSubmitEditing={hideKeyboard}
                style={{ ...styles.input, marginLeft: 4 }}
                value={locality}
                onChangeText={localityHandler}
                onFocus={() => {
                  setIsKeyboardHide(false);
                  setFocusedInput('locality');
                }}
                onBlur={() => {
                  setFocusedInput(null);
                  setIsKeyboardHide(true);
                }}
              />
            </View>
            {isKeyboardHide ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.button,
                  backgroundColor: isPublishAllowed ? '#ff6c00' : '#f6f6f6',
                }}
                disabled={!isPublishAllowed}
                onPress={onPost}
              >
                <Text
                  style={{
                    ...styles.buttonTitle,
                    color: isPublishAllowed ? '#fff' : '#bdbdbd',
                  }}
                >
                  Publish
                </Text>
              </TouchableOpacity>
            ) : null}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: Dimensions.get('window').width * 0.045,
    paddingVertical: 32,
    backgroundColor: '#fff',
  },
  postPhotoContainer: {
    width: Dimensions.get('window').width * 0.91,
    height: 240,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
  },
  camera: {
    height: Dimensions.get('window').width,
  },
  postPhoto: {
    flex: 1,
    resizeMode: 'cover',
  },
  photoButtonContainer: {
    position: 'absolute',
    top: 90,
    left: Dimensions.get('window').width * 0.455 - 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  photoMessage: {
    marginBottom: 32,
   
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  inputContainer: {
    width: Dimensions.get('window').width * 0.91,
    height: 50,
    borderBottomWidth: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  button: {
    height: 51,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonTitle: {
  
    fontSize: 16,
    fontWeight: '400',
  },
});