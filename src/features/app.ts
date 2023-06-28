import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {InitialStateProps, MessageProps} from "./types";


const initialState:InitialStateProps = {
    sender_id: null,
    conversation:undefined,
    roomId: undefined,
    messages: undefined,
    friends:undefined
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSenderId: (state, action: PayloadAction<number>) => {
            state.sender_id = action.payload
        },
        setConversation: (state,action:PayloadAction<number>) => {
            const allConversation = state.friends;
            if(allConversation){
                state.conversation = allConversation.find(item => item.id === action.payload)
            }
        },
        setRoomId: (state,action:PayloadAction<string>) => {
            state.roomId = action.payload;
        },
        setPreviousMessage: (state, action:PayloadAction<InitialStateProps['messages']>) => {
            state.messages = action.payload
        },
        setMessage: (state, action:PayloadAction<MessageProps>) => {
            const tempMessage = state.messages;
            if(tempMessage){
                state.messages = [...tempMessage, action.payload]
            }
        },
        setFriends: (state,action:PayloadAction<InitialStateProps['friends']>) => {
            state.friends = action.payload;
        }
    }
});

export const {
    setSenderId,
    setConversation,
    setRoomId,
    setPreviousMessage,
    setMessage,
    setFriends
} = appSlice.actions;
export default appSlice.reducer;
