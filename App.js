import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList'

export default function App() {
  const [task, setTask] = useState([
    { key: 1, task: 'Comprar Pão'},
    { key: 2, task: 'Estudar React Native'},
    { key: 3, task: 'Ir na academia hoje a noite'},
    { key: 4, task: 'Comprar chocolate e coca-cola'},
    { key: 5, task: 'Assistir o 1 video'},
    
  ]);
  

 return(
   <SafeAreaView style={styles.container}>
     <StatusBar backgroundColor='#171d31' barStyle='light-content'/>

     <View style={styles.content}>
       <Text style={styles.title}>Minhas Tarefas</Text>
     </View>
     
     <FlatList 
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={ (item) => String(item.key) }
      renderItem={ ({ item }) => <TaskList data={item}/> }
     />

     <TouchableOpacity style={styles.fab}>
       <Ionicons name="ios-add" size={35} color="#FFF" />
     </TouchableOpacity>

   </SafeAreaView>
 ) 
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#171d31"
  },
  title:{
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF'
  },
  fab:{
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset:{
      width: 1,
      height: 3,
    }
  }
});