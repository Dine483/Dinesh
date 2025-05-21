import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AlbumContextAPI } from '../../context/AlbumContext'

const AlbumDetails = () => {
    let data=useLocation()
    let {state:{album},}=data ;
    // console.log(album);
    
    let {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}=useContext(AlbumContextAPI)
    //  console.log(data);


    let handleClick=(index)=>{
        setSongs(album.songs)
        setCurrentSongIndex(index)
        if (currentSongIndex === index) {
            setIsPlaying(!isPlaying)
        }else{
            setIsPlaying(true)
        }
    }

    const formatduration=(durationInSeconds)=>{
     let minutes=Math.floor((durationInSeconds/60))
     let seconds=Math.floor((durationInSeconds%60))
     return `${minutes}:${seconds.toString().padStart(2,'0')}`
    }
    
  return (
   <section className='p-6 w-full'>
    <article className='flex gap-8 '>
        <aside>
          <img src={album.albumposter} alt=""  className='h-[370px] rounded-md w-[310px]'/>
        </aside>
        <aside className='shrink-0'>
            <h2 className='text-3xl font-semibold'>{album.albumtitle}</h2>
            <ul className='mt-4 flex flex-col gap-3 text-lg'>
                <li className='flex'>
                    <span className='w-[160px]'>Title</span>
                    <span>{album.albumtitle}</span>
                </li>


                <li className='flex'>
                    <span className='w-[160px]'>Number of tracks</span>
                    <span>{album.songs.length}</span>
                </li>


                <li className='flex'>
                    <span className='w-[160px]'>Release Date</span>
                    <span>{album.albumreleasedate
                    }</span>
                </li>

                <li className='flex'>
                    <span className='w-[160px]'>Languages</span>
                    <span>{album.
albumlanguages}</span>
                </li>

                <li className='flex '>
                    <span className='w-[160px] shrink-0'>Description</span>
                    <span className='w-[500px]'>{album.albumdescription}</span>
                </li>
            </ul>
        </aside>
    </article>
    <main className={`p-2 mt-4 bg-slate-900 rounded-lg ${currentSongIndex !== null && "mb-[120px]"}`}>
       <h3 className='px-4 text-xl'>Songs List</h3>
       <table className='w-full  mt-4 text-left rounded-lg overflow-hidden'>
            <thead className='bg-slate-700 uppercase w-full'>
                <tr>
                    <th className='px-4 py-3'></th>
                    <th className='px-4 py-3'>Track</th>
                    <th className='px-4 py-3'>Song name</th>
                    <th className='px-4 py-3'>Singers</th>
                    <th className='px-4 py-3'>Director</th>
                    <th className='px-4 py-3'>Mood</th>
                    <th className='px-4 py-3'>Duration</th>
                </tr>
            </thead>
            <tbody className='w-full'>
                 {album.songs.map((song,index)=>{
                    return <tr className='border-y-2 border-slate-700 hover:border-slate-500 cursor-pointer  ' onClick={()=>handleClick(index)}>
                        <td className='py-2 text-center'>{index+1}</td>
                        <td className='py-2 text-center'>
                            <img src={song.songthumbnailurl} className='h-12 w-[70%] rounded-lg' alt="" />
                        </td>
                        <td>{song.songname}</td>
                        <td>{song.songsingers}</td>
                        <td>{song.songdirector}</td>
                        <td>{song.songmood}</td>
                        <td className='p-2 text-center'>{formatduration(song.songduration)}</td>
                    </tr>
                    
                 })}
            </tbody>
       </table>
    </main>
   </section>
  )
}

export default AlbumDetails