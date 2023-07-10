import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import CustomButton from './CustomButton';
import 'react-native-gesture-handler';


const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');

    const apiUrl = 'http://10.0.2.2:7091/api/upload'
  
    const selectFile = async () => {
      try {
        const res = await DocumentPicker.getDocumentAsync({
          type: 'application/pdf', // Set the desired file types here
        });

        console.log(res);
  
        if (res.type === 'success') {
          setSelectedFile(res);
        }
      } catch (err) {
        console.log('Error occurred while picking the file:', err);
      }
    };
  
    const uploadFile = async () => {

        setLoading(true);

      if (!selectedFile) {
        Alert.alert('Please select a file');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: 'application/pdf', // Set the file MIME type
        name: selectedFile.name,
      });
      formData.append('user', 'local');
      formData.append('name', selectedFile.name);

      console.log(formData);
  
      try {
        const response = await axios.post(
          apiUrl, 
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const taskID = response.data.task_id;
        // console.log('Upload response:', response);
        console.log('Upload response:', taskID);



        const interval = setInterval(async () => {
            try {
              const statusResponse = await axios.get(
                `http://10.0.2.2:7091/api/task_status?task_id=${taskID}`
              );
    
              setUploadStatus(statusResponse.data.status);
    
              if (statusResponse.data.status === 'SUCCESS') {
                clearInterval(interval);
                setLoading(false);
              }
            } catch (error) {
              console.log('Error while checking task status:', error);
              clearInterval(interval);
              setLoading(false);
            }
          }, 2000);


      } catch (error) {
        // Handle the error
        console.log('Upload error:', error);
      }


    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Selected File: {selectedFile ? selectedFile.name : 'None'}</Text>
        <CustomButton color = "#0080ff" title="Select File" onPress={selectFile}/>
        <CustomButton color = "#0080ff" title="Upload" onPress={uploadFile} />
        {loading ? (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Upload Status: {uploadStatus}</Text>
        </View>
      ) : null}

      </View>
    );
  };
  

const styles = StyleSheet.create({
    container: {
            flex: 1,
            backgroundColor: '#fffcc4',
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 20,
        }
    });

export default Upload;