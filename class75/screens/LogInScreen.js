import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,TextInput,KeyboardAvoidingView,Image} from 'react-native';
import  * as firebase from 'firebase';

export default class LoginScreen extends React.Component{
  constructor(){
    super()
    this.state={
      email:"",
      password:""  
    }
  }
  login =async(email,password)=>{
    alert(email + " " + password)
    if(email  &&  password){
      try{
          console.log("r") 
        const response=await firebase.auth().signInWithEmailAndPassword(email,password)
       
        if(response){
           
          this.props.navigation.navigate("Transaction")
        }
      }
      catch(error){
        switch(error.code){
          case "auth/user-not-found":
          alert("User DoesN't exist")
          console.log("DoesN't Exist")
          break;
          case "auth/invalid-email":
          alert("incorrect email or password")
          console.log("invalid")

        }

      }}else {
        alert("enter email Id and password")
      }
  }
  render(){
    return(
      <KeyboardAvoidingView  
           style={{alignItems:"center",marginTop:20}}
      >
      <View>
        <Image
        style={{width:100,height:100,marginTop:40}}
         source= {require('../assets/booklogo.jpg')}
        />
        <Text style={{textAlign:"center",fontSize:30,fontFamily: 'French Script MT'}}> Wily App</Text>
      </View>
      <View>
      <TextInput
       style={styles.loginBox}
       placeholder="abc@example.com"
       keyboardType="email-address"
       onChangeText={(text)=>{
         this.setState(
        {
           email:text  
        }
         )
       }}
      />

       <TextInput
       style={styles.loginBox}
       placeholder="enter password"
       secureTextEntry={true}
       onChangeText={(text)=>{
         this.setState(
        {
           password:text  
        }
         )
       }}
      />
      </View>
      <View>
        <TouchableOpacity
         style={styles.loginButton}
         onPress={()=>
         {
           this.login(this.state.email,this.state.password)
         }}
        >
        <Text  style={{textAlign:'center'}}> Login</Text>
        </TouchableOpacity>
       </View>
        
      </KeyboardAvoidingView>
      
    )
  }
}

const styles=StyleSheet.create({
  loginBox:{
     width:300,
     height:40,
     borderWidth:1.5,
     fontSize:20,
     margin:10,
     paddingLeft:10
  },
  loginButton:{
    width:90,
    heigth:30,
    borderWidth:1,
    marginTop:20,
     paddingTop:5,
     borderRadius:7,
     backgroundColor:"pink"
  }


})

