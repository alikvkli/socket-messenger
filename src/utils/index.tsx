import {ReactNode} from "react";
import {RiRadioButtonLine} from "react-icons/ri"
export const capitalizeFirstLetter = (text: string):string => {
    return  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export  const generateRoomId = (senderId:number | null,reciverId:number): string => {
    const sortedUserIds = [senderId, reciverId].sort();
    const roomId = sortedUserIds.join("-");
    return roomId;
}

export const handleEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>, callback: () => void) => {
    if (event.key === "Enter") {
        event.preventDefault();
        callback();
    }
};

export const checkOnline = (state:string) : any => {
    if(state === "online"){
        return <RiRadioButtonLine color="green"/>
    }else{
        return <RiRadioButtonLine size={14} color="red"/>
    }
}

export const formatRelativeTime = (date: Date): string =>  {
    const now = new Date();
    const diffInMilliseconds = Math.abs(now.getTime() - date.getTime());

    const seconds = Math.floor(diffInMilliseconds / 1000) % 60;
    const minutes = Math.floor(diffInMilliseconds / (1000 * 60)) % 60;
    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) % 30;
    const months = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)) % 12;
    const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30 * 12));

    const timeParts = [];
    if (years > 0) {
        timeParts.push(`${years} yıl`);
    }
    if (months > 0) {
        timeParts.push(`${months} ay`);
    }
    if (days > 0) {
        timeParts.push(`${days} gün`);
    }
    if (hours > 0) {
        timeParts.push(`${hours} saat`);
    }
    if (minutes > 0) {
        timeParts.push(`${minutes} dk`);
    }
    if (seconds > 0) {
        timeParts.push(`${seconds} saniye`);
    }

    return timeParts.join(' ');
}
