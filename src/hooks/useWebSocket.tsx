import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client"

const useWebSocket = (url: string): [Socket | null, () => void] => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(url);
    setSocket(socketRef.current);

    return () => {
      socketRef.current?.disconnect();
    };
  }, [url]);

  const reloadSocket = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io(url);
    setSocket(socketRef.current);
  };

  return [socket, reloadSocket];
};

export default useWebSocket;
