export default function SongList({ songs, onSelect }) {
    return (
      <div className="song-list">
        <h2>歌曲列表</h2>
        <ul>
          {songs.map(song => (
            <li 
              key={song.id} 
              onClick={() => {
                console.log('Clicking song:', song); // 确保点击时能打印出歌曲信息
                onSelect(song);
              }}
            >
              {song.title} - {song.artist}
            </li>
          ))}
        </ul>
      </div>
    );
}