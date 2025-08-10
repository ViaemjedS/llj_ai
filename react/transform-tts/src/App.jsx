import { useEffect, useRef, useState } from 'react'
import Progress from './components/Progress';
import AudioPlayer from './components/AudioPlayer';
import {
  SPEAKERS,
  DEFAULT_SPEAKER
} from './contains'
function App() {
  // 界面状态
  // llm ready 大模型准备好了不？
  const [ready, setReady] = useState(null);
  // 按钮点击，防止多次点击
  const [disabled, setDisabled] = useState(false);
  // 进度条数组
  const [progressItems, setProgressItems] = useState([]);

  // 表单文本
  const [text, setText] = useState('I love Hugging Face!');
  // 音色 
  const [selectedSpeaker,setSelectedSpeaker] = useState(DEFAULT_SPEAKER);

  const [output,setOutput] = useState(null);

  const worker = useRef(null);
  useEffect(() => {
    // 引入 transformer
    // http://localhost:5173/worker.js
    worker.current = new Worker(new URL('./worker.js',import.meta.url), {
      // 不用这个会报错，因为老的浏览器的关系
      type: 'module'
    })
    worker.current.postMessage({
      text: '哇哇哇哇'
    })
    const onMessageReceived = () => {

    }
    worker.current.onmessage = onMessageReceived;

    return () => worker.current.removeEventListener('message',
      onMessageReceived
    )
  },[])

  return (
    <>
      <div className="flex">
        {/* <Progress text="model" percentage={12}/>
        <Progress text="model2" percentage={32}/>
        <Progress text="model3" percentage={100}/> */}
         <AudioPlayer
          audioUrl="https://cdn.freesound.org/previews/819/819183_12880153-lq.mp3"
          mimeType="audio/mpeg"
        /> 
      </div>
    </>
  )
}

export default App
