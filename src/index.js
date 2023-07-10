import {View, Text, TextInput, Button, FlatList, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import CustomButton from './CustomButton';
import 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { getAnswer, setCompleted, setData } from '../redux/action';

const DocsGPT = () => {

    const [textInput, setTextInput] = useState('');
    const [document, setDocument] = useState('');
    const [responseOptions, setResponseOptions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // const answer = useSelector(state => state.answer);
    const dispatch = useDispatch();
    const {completed, data} = useSelector(state => state.reducer); 

    const fetchData = () => {
        // Set loading to true
        // setLoading(true);
        dispatch(setData([...data, {type: 'user', text: textInput}]));
        dispatch(getAnswer(textInput, document));
        setTextInput('');
        // if (completed) {
        //     setLoading(false);
        // }
    };

    
    const handleChooseDocument = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:7091/api/combine')
            // Iterate through the response JSON and push only name variable to responseOptions whose docslink variable starts with indexes/local
            const responseOptions = response.data.map((item) => item.docLink.startsWith('indexes/local') ? item.name : null);
            setResponseOptions(responseOptions);
            setModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    }
    const handleOptionClick = (option) => {
        // Handle the selected option as per your requirement
        console.log('Selected Option:', option);
        setDocument(option);
        setModalVisible(false);
      };


    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>DocsGPT</Text> */}
            <Text style={styles.subtitle}>Chosen Document: {document}</Text>
            <Button title="Pick Document" onPress={handleChooseDocument} style={styles.subtitle}/>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
            <View style={styles.modalContainer}>

          <View style={styles.modalContent}>
            <FlatList
              data={responseOptions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleOptionClick(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
            </View>
            </Modal>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                    ({item}) => 
                    (
                        <View style={{flexDirection:'row', padding:10}}>
                            <Text style={{fontWeight:'bold', color: item.type === 'user' ? 'green' : 'red'}}>
                                {item.type === 'user' ? 'User' : 'Bot'}
                            </Text>
                            <Text style={
                            {backgroundColor: item.type === 'user' ? '#faaa' : '#afa',
                                flex: 1,
                                width: '100%',
                                padding: 10,
                                margin: 10,
                            }
                                }>
                                    {item.text}
                                </Text>
                        </View>
                    )
                }
                style={styles.body}
            />
        <TextInput
            style={styles.input}
            onChangeText={text => setTextInput(text)}
            value={textInput}
            placeholder='Type your question here'
        />
        <CustomButton
            title = "Send"
            color = "#0080ff"
            onPress = {fetchData}
        />
        { // Loading indicator
        loading ? (
            // If loading is true then show the following indicator
            <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading</Text>
            </View>
        ) : null // If loading is false then don't show anything
        }
        </View>
    );

    };

export default DocsGPT;

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: '#fffcc4',
            alignItems: 'center',            
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 10,
        },
        subtitle: {
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
        },
        body: {
            width: '100%',
            margin: 10,
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 20,
            width: '90%',
            padding: 10,
        },
        button: {
            alignItems: 'center',
            backgroundColor: '#DDDDDD',
            margin: 10,
            borderRadius: 20,
            flex: 1,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          modalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            maxHeight: '80%',
            width: '80%',
          },
          optionText: {
            fontSize: 16,
            marginBottom: 10,
          },
    });
