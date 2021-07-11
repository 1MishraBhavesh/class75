import React from 'react';
import { Text, View,ScrollView,FlatList ,TextInput, TouchableOpacity,StyleSheet} from 'react-native';
import db from '../config';
export default class Searchscreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
        allTransaction:[],
       lastVisibleTransaction:null,
       search:""
    }
  }
  componentDidMount=async()=>{
    const tran=await db.collection("transactions").get()
    tran.docs.map((doc)=>{
      this.setState({
        allTransaction:[...this.state.allTransaction,doc.data()]
      })
    })
  }
  fetchMoreTransactions=async ()=>{
    
    var text=this.state.search.toUpperCase()
    var enteredText= text.split("")
    if (enteredText[0].toUpperCase()==="B"){
      
    const tran=await db.collection("transactions").where("bookId","==",text).startAfter(this
    .state.lastVisibleTransaction).limit(2).get()
    tran.docs.map((doc)=>{
      this.setState({
        allTransaction:[...this.state.allTransaction,doc.data()],
        lastVisibleTransaction:doc,
      })
    })
  }else if (enteredText[0].toUpperCase()==="S"){
    const tran=await db.collection("transactions").where("studentId","==",text).startAfter(this
    .state.lastVisibleTransaction).limit(2).get()
    tran.docs.map((doc)=>{
      this.setState({
        allTransaction:[...this.state.allTransaction,doc.data()],
        lastVisibleTransaction:doc,
      })
    }) 
  }
  }

  searchTransactions=async(text)=>{
          this.setState({
        allTransaction:[]
      })
      alert(this.state.allTransaction)
    
    var enteredText=text.split("")
    if(enteredText[0].toUpperCase()==="B"){
      var tran= await db.collection("transactions").where("bookId","==",text).get()
      tran.docs.map((doc)=>{
        this.setState({
        allTransaction:[...this.state.allTransaction,doc.data()],
        lastVisibleTransaction:doc,
      })
      })
    } else if(enteredText[0].toUpperCase()==="S"){
        var tran= await db.collection("transactions").where("studentId","==",text).get()
      tran.docs.map((doc)=>{
        this.setState({
        allTransaction:[...this.state.allTransaction,doc.data()],
        lastVisibleTransaction:doc,
      })
      })
    }


  }
   render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.bar}
            placeholder="Enter Book Id or Student Id"
            onChangeText={(text)=>{this.setState({search:text})}}
          />
          <TouchableOpacity style={styles.searchButton}
                             onPress={()=>{this.searchTransactions(this.state.search)}}
                             
          >   
            <Text> Search</Text> 
          
          </TouchableOpacity>
        </View>
   



        <FlatList 
        data={this.state.allTransaction}
        renderItem={({item})=>(
          <View style={{ flex: 1,borderBottomWidth:2 }}>
               <Text> {"Book Id :  "+item.bookId}</Text>
               <Text> {"Student Id :  "+item.studentId}</Text>
               <Text> {"Date :  "+item.date.toDate()}</Text>
               <Text> {"Transaction Type :  "+item.transactionType}</Text>
        </View>
        )}
        keyExtractor={(item,index)=>
         index.toString()
        }
        onEndReached={this.fetchMoreTransactions}
        onEndReachedThreshold={0.7}
       / >
        
          </View>
       
      );
    }
}

const styles=StyleSheet.create({
 container:{
 flex:1,
 marginTop:20
 },
 searchBar:{
   flexDirection:"row",
   height:40,
   width:"auto",
   borderWidth:0.5,
   alignItems:"center",
   backgroundColor:"beige"
 },
 bar:{
   borderWidth:2,
   height:30,
   width:300,
   paddingLeft:10
 },
 searchButton:{
   borderWidth:1,
   height:30,
   width:50,
   alignItems:"center",
   justifyContent:"center",
   backgroundColor:"beige"
 }
})