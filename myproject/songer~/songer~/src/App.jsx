import { useState } from 'react';
import './App.css';
import SongList from './song/SongList';
import Player from './player/Player';

function App() {
  const [songs] = useState([
    { 
      id: 1, 
      title: '稻香', 
      artist: '周杰伦', 
      src: '/稻香-周杰伦.mp3' 
    }
  ]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectSong = (song) => {
    console.log('Selected song:', song); // 确保这里能打印出正确的歌曲信息
    if (currentSong && currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    console.log('Current song updated:', currentSong);
    console.log('Is playing:', isPlaying);
  }, [currentSong, isPlaying]);

  return (
    <div className="music-app">
      <SongList 
        songs={songs} 
        onSelect={handleSelectSong}
      />
      <Player 
        song={currentSong}
        isPlaying={isPlaying}
        onPlayPause={setIsPlaying}
      />
    </div>
  );
}

export default App;
