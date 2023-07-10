import { GET_ANSWER, SET_DATA, SET_COMPLETED } from "./action";

const initialState = {
    completed: false,
    data: [{type: 'bot', text: 'Hi, I am a chatbot. I can answer your questions about the documents you upload. Choose a document to get started.'}]
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ANSWER:
            return {
                ...state,
                data: [...state.data, {type: 'bot', text: action.payload}],
                completed: true
            }
        case SET_DATA:
            return {
                ...state,
                data: action.payload
            }
        case SET_COMPLETED:
            return {
                ...state,
                completed: action.payload
            }
        default:
            return state;
    }
}

export default reducer;