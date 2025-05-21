import { collection, doc, getDocs } from "firebase/firestore"
import { useEffect } from "react"
import { createContext, useState } from "react"
import { __DB } from "../backend/FirebaseConfig"
import Spinner from "../helpers/Spinner"

export const AlbumContextAPI = createContext()

let AlbumProvider = (props) => {
     let[isLoading,setIsLoading]=useState(false)
    let [albums, setAlbums] = useState([])


    const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

    useEffect(() => {
        let fetchAlbums = async () => {
            try {
                setIsLoading(true)
                let album_collection = collection(__DB, "album_collection")
                let albumSnapshot = await getDocs(album_collection)
                let albumList = albumSnapshot.docs.map(doc => doc.data())
                console.log(albumList);
                setAlbums(albumList)
                // setAlbums([...albumList,...albumList,...albumList])
            } catch (error) {
                console.log(error);

            }
            finally{
                setIsLoading(false)
                }
        }
        fetchAlbums()
    }, [])

    return (
        <AlbumContextAPI.Provider value={{ albums,isLoading,songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex }}>
            {props.children}
            {isLoading && <Spinner/>}
        </AlbumContextAPI.Provider>
        
    )


}
export default AlbumProvider