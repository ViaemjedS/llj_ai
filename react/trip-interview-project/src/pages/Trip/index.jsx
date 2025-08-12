import {
    useEffect,
    useState
} from 'react'
import {
    Button,
    Input,
    Loading,
    Toast,
} from 'react-vant'
import {
    ChatO,
    UserO,
} from '@react-vant/icons'
import useTitle from '@/hooks/useTitle'
import {
    kimiChat
} from '@/llm'
import styles from './trip.module.css'
const Trip = () => {
    useTitle('旅游智能客服')
    const [text, setText] = useState("");
    const [isSending, setIsSending] = useState(false);
    // 数据驱动界面
    // 静态页面
    const [messages, setMessages] = useState([
        {
            id: 2,
            content: 'pagi',
            role: 'user',
        },
        {
            id: 1,
            content: 'selamat pagi',
            role: 'assistant'
        },
        {
            id: 4,
            content: 'pagi',
            role: 'user',
        },
        {
            id: 3,
            content: 'selamat pagi',
            role: 'assistant'
        },{
            id: 6,
            content: 'pagi',
            role: 'user',
        },
        {
            id: 5,
            content: 'selamat pagi',
            role: 'assistant'
        },
        {
            id: 8,
            content: 'pagi',
            role: 'user',
        },
        {
            id: 7,
            content: 'selamat pagi',
            role: 'assistant'
        },
        {
            id: 10,
            content: 'pagi',
            role: 'user',
        },
        {
            id: 9,
            content: 'selamat pagi',
            role: 'assistant'
        },
        {
            id: 12,
            content: 'pagi',
            role: 'user',
        },
        {
            id: 11,
            content: 'selamat pagi',
            role: 'assistant'
        },
        {
            id: 14,
            content: 'pagi',
            role: 'user',
        },
        {
            id: 13,
            content: 'selamat pagi',
            role: 'assistant'
        },
        {
            id: 16,
            content: 'pagi',
            role: 'user',
        },
        {
            id: 15,
            content: 'selamat pagi',
            role: 'assistant'
        },
        
        
        
    ]);
    const handleChat = async () => {
        if (text.trim() === "") {
            Toast.info({
                message: '内容不能为空'
            })
            return
        }
        setIsSending(true);
        setText("");
        setMessages((prev) => {
            return [
                ...prev,
                {
                    role: 'user',
                    content: text
                }
            ]
        })
        const newMessage = await kimiChat([{
                role:'user',
                content: text,
            }
        ]);
        // [
        //     ...messages,
        //     newMessage.data
        // ]
        setMessages((prev) => {
            return [
                ...prev,
                newMessage.data
            ]
        })
        setIsSending(false);
    } 
    // useEffect(() => {
    //     const fetchChat = async () => {
    //         const res = await kimiChat([
    //             {
    //                 role: 'user',
    //                 content: '上海旅游推荐'
    //             }
    //         ],);
    //         console.log(res);
    //     };
    //     fetchChat();
    // }, [])
    return (
        <div className="flex flex-col h-all">
            <div className={`flex-1 ${styles.chatArea}`}>
            {
                messages.map((msg, index) => (
                        <div 
                            key={index}
                            className={
                                msg.role === 'user'? 
                                styles.messageRight : styles.messageLeft
                            }
                        >
                            {
                                msg.role === 'system'?<ChatO />:<UserO/>
                            }
                            {msg.content}
                        </div> 
                ))
            }
            </div>
            <div className={`flex ${styles.inputArea}`}>
                <Input
                    value={text}
                    onChange={(e) => setText(e)}
                    placeholder="Please enter the message"
                    className={`flex-1 ${styles.input}`}                
                />
                <Button disabled={isSending} type="primary" onClick={handleChat}>发送</Button>
                {isSending && <div className="fixed-loading"><Loading type="ball"/></div>}
            </div>
        </div>
    )
}
export default Trip