import './style.css';
import { useState } from 'react';

const PictureCard = (props) => {
    const {
        word,
        audio,
        uploadImg
    } = props;
    const [imgPreview,setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png');

    const uploadImgData = (e) => {
        const file = (e.target).files?.[0];
        if (!file) { return; }
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const data = reader.result;
                setImgPreview(data);
                uploadImg(data);
                resolve(data);
            }
            reader.onerror = (error) => { reject(error); };
        })
    }
    
    const playAudio = () => {
        const voice = new Audio(audio);
        voice.play();
    }

    return (
        <div className='card'>
            <input 
            type="file"
                id='selectImage'
                accept='.jpg,.png,.jpeg,.gif'
                onChange={uploadImgData}
            />
            <label 
                className="upload"
                htmlFor="selectImage">
                    <img src={imgPreview} alt="preview"/>
            </label>
            {/* template -> JSX -》 {数据绑定} -> 响应式 -》单词业务 */}
            <div className="word">{word}</div>
            {audio && (
                <div className="playAudio" onClick={playAudio}>
                    <img width="20px" src="https://res.bearbobo.com/resource/upload/Omq2HFs8/playA-3iob5qyckpa.png" alt="logo" />
                </div>
             )}
        </div>
    )
}

export default PictureCard;