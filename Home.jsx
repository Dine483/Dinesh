import React, { useContext } from 'react'
import NavbarContainer from '../components/navbar/NavbarContainer'
import { AlbumContextAPI } from '../context/AlbumContext'
import Sidebar from '../components/home/Sidebar'
import { Outlet } from 'react-router-dom'
import CustomAudioPlayer from 'react-pro-audio-player'

const Home = () => {
  let {albums}=useContext(AlbumContextAPI)
  console.log(albums);
  
let {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}=useContext(AlbumContextAPI)

  return (
   <>
    <div  className='flex bg-slate-800 min-h-[calc(100vh-70px)] gap-2'>
      <Sidebar/>
      <Outlet/>
    </div>

<div>
{songs.map((song, index) => (
  <div key={song.id} onClick={() => setCurrentSongIndex(index)}>
    {song.title}
  </div>
))}
</div>
{currentSongIndex !== null && (
<div className='fixed bottom-0 w-full'>
<CustomAudioPlayer
  songs={songs}
  isPlaying={isPlaying}
  currentSongIndex={currentSongIndex}
  onPlayPauseChange={setIsPlaying}
  onSongChange={setCurrentSongIndex}
  songUrlKey="songurl"
  songNameKey="songname"
  songThumbnailKey="songthumbnailurl" 
  songSingerKey="songsingers"
/>
</div>
)}
   </>
  )
}

export default Home