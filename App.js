// Instalando a animação
// > expo install react-native-animatable

// Importação das bibliotecas
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

// Importação dos componentes
import TaskList from "./src/components/TaskList";

// Animar o componente "TouchableOpacity"
const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);

import AsyncStorage from "@react-native-async-storage/async-storage"

export default function App() {

  const [task, setTask] = useState([]); // Inicializa como um vetor vazio
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [input, setInput] = useState('');

  // Buscando todas as tarefas ao iniciar o app
  useEffect(() => {
    async function loadTasks() {
      const taskStorage = await AsyncStorage.getItem('@task')
      
      if (taskStorage) {
        setTask(JSON.parse(taskStorage));
      }


    }	
    loadTasks();
  }, []); // interpreta que o array esta vazio

  // salvando caso
  useEffect(() => {
    
    async function saveTasks() {
      await AsyncStorage.setItem('@task', JSON.stringify(task));
    }

    saveTasks();
  }, [task]); // monitora o task

  function handleAdd() {
    if (id === '') {
      alert('Verifique se foi digitado um TELEFONE válido');
      return;
    }
    const data = {
      key: id,
      task: input
    };
    
    // "...task" vai sempre add "data" ao final do vetor
    setTask([...task, data]);
    setOpen(false); // Fecha o campo de modal
    setInput(''); // Limpa o campo de Input
    setId(''); // LImpa o campo de Id
  }

  const handleDelete = useCallback((data) => {
    // O objeto "find" recebe a lista de tarefas filtrada sem o item que foi selecionado
    const find = task.filter(r => r.key !== data.key); 
    /* RESUMO: 
       - Pega tudo aquilo que não foi selecionado
       - Guarda em uma variável
       - Deleta tudo
       - Depois renderiza a nova variável na tela
    */
    
    // A nova lista atualiza o objeto task que vai ser mostrado
    setTask(find);
  })

  return (
    <SafeAreaView style={styles.container}> {/* SafeAreaView -> Serve para ajustar a visualização no iphone, no android fica normal */}
      <StatusBar backgroundColor="#121d31" barStyle="light-content" />

      <View style={styles.content}>
        <Text style={styles.title}> Contatos do Antonio Pedrosa </Text>
      </View>

      {/* Construção da lista */}
      <FlatList 
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={ (item) => String(item.key) }
        renderItem={ ({ item }) => <TaskList data={item} handleDelete={handleDelete} /> }
      />

      {/* Tela modal */}
      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={ () => setOpen(false) }>
              <Ionicons style={{marginLeft: 5, marginRight: 5}} name="md-arrow-back" size={40} color={"#FFF"} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Novo Contato</Text>
          </View>

          {/* Incluir nova tarefa - área de texto e botão */}
          <Animatable.View style={styles.modalBody} animation={"fadeInUp"} useNativeDriver>
            <TextInput 
              placeholderTextColor={"#747474"}
              autoCorrect={false}
              placeholder="Entre com o telefone"
              style={styles.input}
              value={id}
              onChangeText={ (texto) => setId(texto) }
            />
            <TextInput 
              placeholderTextColor={"#747474"}
              autoCorrect={false}
              placeholder="Entre com o nome"
              style={styles.input}
              value={input}
              onChangeText={ (texto) => setInput(texto) }
            />  
            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text styles={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>

      {/* Botão para add nova tarefa */}
      <AnimatableBtn 
        style={styles.fab}
        animation="bounceInUp"
        duration={1500}
        onPress={ () => setOpen(true) }
      >
        <Ionicons name="ios-add" size={35} color={"#FFF"} />
      </AnimatableBtn>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171d31"
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: "center",
    color: "#FFF"
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: "#0094ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  modal: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#FFF',
  },
  modalBody: {
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: "#FFF",
    padding: 9,
    height: 35,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5,
  },
  handleAdd: {
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5,
  },
  handleAddText: {
    fontSize: 20,
  }
})