export interface InitialStateProps{
    sender_id: number | null,
    conversation: Friend | undefined,
    roomId: string | undefined,
    messages:MessageProps[] | undefined
    friends: Friend[] | undefined
}

export  interface  Friend{
    id: number;
    user_id: number;
    friend_id: number;
    createdAt: string;
    updatedAt: string;
    friend: {
        id: number;
        name: string;
        surname: string;
        username: string;
        profileImage: string;
        online: boolean;
        last_seen: string;
    };
}

export interface MessageProps{
    id: number,
    message:string,
    receiver_id: number,
    sender_id: number,
    createdAt: string,
    updatedAt:string,
    receiver:UserProps,
    sender:UserProps
}

interface UserProps {
    profileImage: string
}