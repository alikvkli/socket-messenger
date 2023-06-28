import {LuEdit} from "react-icons/lu";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {setConversation, setFriends, setMessage, setPreviousMessage, setRoomId} from "../features/app";
import {capitalizeFirstLetter, generateRoomId} from "../utils/index";
export default function Conversations(){
    const dispatch = useAppDispatch();
    const {sender_id,friends} = useAppSelector(state => state.app);
    const navigate = useNavigate();


    const handleConversation = async (id: number) => {
        const findItem = friends?.find(item => item.id === id);
        if(findItem){
            dispatch(setConversation(id));
            dispatch(setPreviousMessage(undefined))
            dispatch(setRoomId(generateRoomId(sender_id,findItem.friend_id)))
            navigate(`/${id}`)
        }
    }

    return(
        <div className="border-r-[1px] h-screen border-gray-300 w-[380px] shrink-0 max-sm:hidden">
            <div className="border-b-[1px] h-[60px]  p-4 border-gray-300 flex items-center justify-between">
                <Link to="/" className="font-semibold">
                    Sohbetler
                </Link>
                <div>
                    <button className="rounded-full bg-zinc-200 p-2 hover:bg-zinc-300">
                        <LuEdit color="black" />
                    </button>

                </div>
            </div>
            <div className="flex flex-col ">
                {friends?.map((item,key) => (
                    <button  onClick={() => handleConversation(item.id)} className="flex p-4 gap-2 hover:bg-zinc-200 rounded-sm" key={key}>
                        <div>
                            <img className="w-[56px] h-[56px] object-cover rounded-full" src={item.friend.profileImage} alt={item.friend.username}/>
                        </div>
                        <div className="flex flex-col items-start justify-around">
                            <p className="font-medium text-md font- text-[#050505]">{capitalizeFirstLetter(item.friend.name)} {capitalizeFirstLetter(item.friend.surname)}</p>
                            <p className="font-light text-sm">Müsait</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}