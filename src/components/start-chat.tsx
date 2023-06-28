import React, {useState} from "react";
import {useAppDispatch} from "../hooks";
import {setFriends, setSenderId} from "../features/app";
import axios from "axios"
export default function StartChat(){
    const [username, setUsername] = useState<any>( "");
    const dispatch = useAppDispatch();
    const [error,setError] = useState<string>("");
    const handleSave = async() => {
        setError("")
        if(username){
            await axios.post("http://localhost:3005/api/friends", {username:username})
                .then(res => res.data)
                .then(res => {
                    if(res){
                        dispatch(setSenderId(res.user_id));
                        dispatch(setFriends(res.friends));
                    }
                }).catch(err => {
                    setError(err.response.data.error);
                })
        }
    }
    return (
        <div className="flex flex-col items-center justify-center flex-1 h-screen">
            <div className="bg-red-600 text-white p-4 w-[400px] text-center mb-2 rounded-md">{error}</div>
            <div className="flex items-center justify-center  flex-col gap-4  w-[400px] outline-0 border-[2px] border-[#eaf3ff] rounded-md p-4">
                <p className="font-semibold">Socket Bağlantı Bilgileri</p>
                <small className="text-center">Soket bağlantısında kullanılacak iletişim için kullanıcı id bilgini giriniz.</small>
                <input className="px-2 text-sm py-4 w-full h-12 border-[1px] focus:outline-0 rounded-md border-zinc-300" placeholder="Kullanıcı adı..." type="text" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
                <button onClick={handleSave} disabled={!username} className="border-[1px] w-full disabled:bg-indigo-400 hover:bg-indigo-900  bg-indigo-600 text-white px-4 py-2 rounded-md">Kaydet</button>
            </div>
        </div>
    )
}