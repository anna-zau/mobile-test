import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";

const image = {uri: 'https://i.ibb.co/Ptk9bqr/Photo-BG.jpg'};





export default function RegistrationScreen ()  {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  
  const [paswrdVisibility, setPaswrdVisibility] = useState(true);

  const loginEnter = (value) => setLogin(value);
  const emailEnter = (value) => setEmail(value);
  const passwordEnter = (value) => setPassword(value);



  const onRegister = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    resetForm();

    console.log("Login:", login, "Email:", email, "Password:",  password)
  };

  const  resetForm= () => {
    setLogin("");
    setEmail("");
    setPassword("");
  }

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const onFocus = () => {
    setIsShowKeyboard(true);
  };

  const onBlur = () => {
    setIsShowKeyboard(false);
  };


  const passVisibility = () => {
    setPaswrdVisibility(!paswrdVisibility)
  }
  


  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.box}>
        <ImageBackground
          style={styles.background}
          source={image}
        >
          <View style={styles.container}>
          <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}
>
            <View style={{marginBottom: isShowKeyboard ? 150 : 0}}
             >
                <Text style={styles.text}>Register</Text> 
              <View >
                <TextInput
                placeholder="Login"
                  style={styles.input}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChangeText={loginEnter}
                  value={login}
                />
              </View>
              <View >
                <TextInput
                  placeholder="Email"
                  style={styles.input}

                  // secureTextEntry={true}
                  onBlur={onBlur}
                  onFocus={onFocus}
                
                  value={email}
                  onChangeText={emailEnter}
                />
              </View>
              <View style={styles.passBox}>
                <TextInput
                                   style={styles.input}
                  placeholder="Password"

                  secureTextEntry={paswrdVisibility}
                  onBlur={onBlur}
                  onFocus={onFocus}
                
                  value={password}
                  onChangeText={passwordEnter}
                />
                <TouchableOpacity
                      style={styles.passShow}
                      onPress={passVisibility}
                    >
                      <Text style={{color: "#1B4371", fontSize: 16}}>Show</Text>
                    </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
               style={styles.button}
                onPress={onRegister}
              >
                <Text style={styles.btnText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.textLink} >Already have an account? Log in here</Text>
                </TouchableOpacity>
                            

            </View>
          </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "flex-start",
  }, 
  container: {
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 16,
  paddingVertical: 10,
 borderTopLeftRadius: 25,
 borderTopRightRadius: 25,
},
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: "flex-end",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 32,
    marginBottom: 17,
  },

  input: {
    padding: 10,
    height: 50,
    marginTop: 16,


    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",

    backgroundColor: "#F6F6F6",
  },
  button: {
    marginTop: 43,
    paddingTop: 16,
    paddingBottom: 16,
    
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",

    borderRadius: 100,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  passBox: {
    position: "relative",
  },
  passShow: {
    position: "absolute",
    top: "45%",
    right: 15,
    
  },
  textLink: {
    marginBottom: 66,
    marginTop: 16,
    fontSize: 16,

    textAlign: "center",
    color: "#1B4371",
    
  }
});

