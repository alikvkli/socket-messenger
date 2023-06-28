import useWebSocket from "../hooks/useWebSocket";
import React, {useEffect, useState} from "react";
import {AiFillInfoCircle} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../hooks";
import {capitalizeFirstLetter, checkOnline, formatRelativeTime, handleEnterPressed} from "../utils/index";
import {IoSend} from "react-icons/io5"
import {MessageProps} from "../features/types";
import {setMessage, setPreviousMessage} from "../features/app";
import { Dialog } from '@headlessui/react'
import {IoMdClose} from "react-icons/io"

export default function Message(){
    const dispatch = useAppDispatch();
    const socket = useWebSocket("http://localhost:3005");
    const {conversation,roomId,sender_id,messages} = useAppSelector(state => state.app);
    const [text,setText] = useState<string>("");
    const [onlineUser, setOnlineUser] = useState<any>("idle");
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(socket){
            socket.on("connect", () => {
                console.log("socket sunucuya bağlandı.")
                socket.emit("joinRoom", {roomId, userId:sender_id});
            });

            socket.on("previousMessages", (messages:MessageProps[]) => {
                console.log(messages)
                dispatch(setPreviousMessage(messages))
            })

            socket.on("receiveMessage", (message) => {
                dispatch(setMessage(message));
                console.log("Yeni mesaj alındı:", message);
            });

            socket.on("userOnline", (userId) => {
                if(userId?.filter((item:any) => item.id !==  sender_id)?.length === 1){
                    setOnlineUser("online")
                }else{
                    setOnlineUser("offline")
                }
            });

            socket.on("userOffline", (userId) => {
                if(userId !== sender_id){
                    setOnlineUser("offline")
                }
            });
        }
    }, [socket,roomId,conversation]);






    const handleSend = () => {
        if(text.length === 0){
            return;
        }
        const messageData = {
            message: text,
            senderId: String(sender_id),
            receiverId: String(conversation?.friend_id),
            roomId: roomId,
        };
        setText("");
        socket?.emit("sendMessage", messageData);
    }

    return(
        <>
            <div className="w-full h-screen flex flex-col">
                <div className="flex items-center h-[60px] justify-between border-b-[1px] border-gray-300 shadow-sm p-4">
                    <div className="flex items-center justify-around gap-2">
                        <img className="w-[32px] h-[32px] rounded-full" src={conversation?.friend.profileImage} alt={conversation?.friend.username}/>
                        <div className="flex flex-col justify-around">
                            <div className="flex items-center gap-1">
                                <p>{conversation?.friend.name && capitalizeFirstLetter(conversation?.friend.name)} {conversation?.friend.surname && capitalizeFirstLetter(conversation?.friend.surname)}</p>
                                {onlineUser !== 'idle' && checkOnline(onlineUser)}
                            </div>
                            <div>
                                {onlineUser === "online" && <small className="text-green-700">Aktif</small>}
                                {onlineUser !== "online" && <small>{conversation?.friend.last_seen && formatRelativeTime(new Date(conversation?.friend.last_seen))}</small>}
                            </div>

                        </div>
                    </div>
                    <div>
                        <button onClick={() => setIsOpen(true)} className="rounded-full p-2  hover:bg-zinc-200">
                            <AiFillInfoCircle color="#1877f2" size={28} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col p-4 gap-2 flex-1 h-[calc(100%-_-60px)] overflow-y-auto">
                    {messages?.map(item => {
                        if(item.sender_id === Number(sender_id)){
                            return (
                                <div className={`flex flex-row-reverse items-center  gap-4`} key={item.id}>
                                    <div className="shrink-0"><img className="w-[32px] h-[32px] rounded-full" src={item.sender_id === Number(sender_id) ? item.sender.profileImage: item.receiver.profileImage} alt={item.message}/></div>
                                    <div className="bg-[#0084ff] text-white px-4 py-2 rounded-md md:max-w-2xl"><p className="text-md">{item.message}</p></div>
                                </div>
                            )
                        }else{
                            return (
                                <div className={`flex items-center justify-items-start gap-4`} key={item.id}>
                                    <div><img className="w-[32px] h-[32px] rounded-full" src={item.sender.profileImage} alt={item.message}/></div>
                                    <div className="bg-[#e4e6ea] px-4 py-2 rounded-md md:max-w-2xl"><p className="text-md">{item.message}</p></div>
                                </div>
                            )
                        }
                    })}
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 p-4">
                    <input onKeyDown={(e) => handleEnterPressed(e,handleSend)} value={text} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} type="text" placeholder="Aa" className="w-full bg-[#e8eaed] h-[36px] rounded-full p-4 text-sm   focus:outline-0" />
                    <button disabled={text.length === 0} onClick={handleSend} className="hover:bg-zinc-300 p-2 disabled:cursor-not-allowed hover:rounded-full">
                        <IoSend color="#1877f2" size={28}/>
                    </button>
                </div>
            </div>
            <Dialog className="absolute max-md:w-full max-md:bottom-0 max-md:translate-y-0 h-1/2 transform -translate-x-[50%] translate-y-[-50%] top-1/2  left-1/2 bg-white border-2 border-zinc-100 rounded-lg shadow-lg p-4" open={isOpen} onClose={() => setIsOpen(false)}>
                <Dialog.Panel>
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold">Sohbet Hakkında</Dialog.Title>
                        <button>
                            <IoMdClose size={24}/>
                        </button>
                    </div>
                    <Dialog.Description>
                        <div className="flex flex-col gap-2">
                            <p>Toplam mesaj sayısı : {messages?.length}</p>
                            <p>Son Görülme : {conversation?.friend.last_seen && formatRelativeTime(new Date(conversation.friend.last_seen))}</p>
                        </div>
                    </Dialog.Description>
                </Dialog.Panel>
            </Dialog>

        </>

    )
}