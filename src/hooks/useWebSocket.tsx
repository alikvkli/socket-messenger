import React, {useEffect, useRef, useState} from "react";
import io, {Socket} from "socket.io-client"

const useWebSocket = (url:string):Socket| null => {
    const [socket,setSocket] = useState<Socket | null>(null);
    const socketRef = useRef<Socket | null>(null);
    useEffect(() => {
        socketRef.current = io(url);
        setSocket(socketRef.current);

        return () => {
            socketRef.current?.disconnect();
        }
    },[url]);

    return socket;
}

export default useWebSocket;