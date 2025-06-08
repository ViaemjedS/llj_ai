import { useRef, useEffect, useState } from 'react';

export default function Player({ song, isPlaying, onPlayPause }) {
  const audioRef = useRef(null);
  const [lyrics, setLyrics] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (song) {
      // 模拟获取歌词数据
      setLyrics([
        { time: 0, text: '稻香 - 周杰伦' },
        { time: 5, text: '对这个世界如果你有太多的抱怨' },
        { time: 10, text: '跌倒了就不敢继续往前走' },
        // 更多歌词...
      ]);
    }
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const currentTime = audio.currentTime;
      // 找到当前时间对应的歌词行
      let activeLine = 0;
      for (let i = 0; i < lyrics.length; i++) {
        if (lyrics[i].time <= currentTime) {
          activeLine = i;
        } else {
          break;
        }
      }
      setCurrentLine(activeLine);
      
      // 自动滚动到当前歌词
      const container = document.querySelector('.lyrics-container');
      const activeElement = container?.querySelector('.lyric-line.active');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [lyrics]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 添加防抖处理
    const handlePlay = () => {
      if (!isPlaying) onPlayPause(true);
    };
    const handlePause = () => {
      if (isPlaying) onPlayPause(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handlePause);
    };
  }, [isPlaying, onPlayPause]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;
  
    if (isPlaying) {
      console.log('Attempting to play:', song.src);
      audio.play().catch(e => console.error('播放失败:', e));
    } else {
      console.log('Pausing playback');
      audio.pause();
    }
  }, [isPlaying, song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
  
    const handleEnded = () => onPlayPause(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [onPlayPause]);

  useEffect(() => {
    if (song) {
      // 加载LRC格式歌词
      fetch(`/lyrics/${song.title}-${song.artist}.lrc`)
        .then(response => response.text())
        .then(text => {
          // 解析LRC格式
          const lines = text.split('\n');
          const parsedLyrics = [];
          
          lines.forEach(line => {
            // 匹配时间标签 [mm:ss.xx]
            const timeMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
            if (timeMatch) {
              const minutes = parseInt(timeMatch[1]);
              const seconds = parseInt(timeMatch[2]);
              const time = minutes * 60 + seconds;
              const text = line.replace(timeMatch[0], '').trim();
              
              if (text) {
                parsedLyrics.push({ time, text });
              }
            }
          });
          
          setLyrics(parsedLyrics);
        })
        .catch(error => {
          console.error('加载歌词失败:', error);
          setLyrics([{ time: 0, text: `${song.title} - ${song.artist}` }]);
        });
  }
}, [song]);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 只初始化一次音频上下文
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      
      const source = audioContextRef.current.createMediaElementSource(audio);
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#4fc3f7';
      ctx.beginPath();
      
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        x += sliceWidth;
      }
      
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    
    draw();
    
    return () => {
      // 不再在清理时关闭audioContext
    };
  }, []);

  return (
    <>
      <audio 
        ref={audioRef} 
        src={song?.src}
        controls={false}
      />
      <canvas ref={canvasRef} width="600" height="100" />
    </>
  );
}
