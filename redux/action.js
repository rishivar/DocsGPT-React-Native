import axios from 'axios';
export const GET_ANSWER = 'GET_ANSWER';
export const SET_DATA = 'SET_DATA';
export const SET_COMPLETED = 'SET_COMPLETED';

const API_URL = 'http://10.0.2.2:7091/api/';
// Access API key from environment variable
const apiKey = process.env.API_KEY;

export const getAnswer = (question, document) => {
    console.log(question, document)
    try {
        return async dispatch => {
        const response = await axios.post(API_URL + 'answer', {
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
                "question": question,
                "history": null,
                "api_key": apiKey,
                "embeddings_key": apiKey,
                "active_docs": 'local/'+document
            })
        dispatch({
                type: GET_ANSWER,
                payload: response.data.answer
            });     
        }
    } catch (error) {
        console.log('Error while fetching answer:', error);
    }
}

export const setData = (data) => dispatch => {
    dispatch({
        type: SET_DATA,
        payload: data
    })
}

export const setCompleted = (completed) => dispatch => {
    dispatch({
        type: SET_COMPLETED,
        payload: completed
    })
}
