import Conversations from "../components/conversations";
import StartChat from "../components/start-chat";
import Layout from "../layout";
import {useAppSelector} from "../hooks";
import {BiMessageRoundedDetail} from  "react-icons/bi"
const  Home = () => {
    const {sender_id,friends} = useAppSelector(state => state.app)
    return (
        <Layout>
            {friends && <Conversations/>}
            {!sender_id && <StartChat/>}
            {sender_id && (
                <div className="flex flex-col items-center justify-center flex-1 gap-2">
                    <BiMessageRoundedDetail  size={48}/>
                    <h5 className="font-semibold text-lg">Mesaj seç</h5>
                    <small>Mevcut sohbetlerin arasından seçim yap, yeni bir sohbet başlat veya sörfe devam et.</small>
                </div>
            )}
        </Layout>
    )
}

export default Home;