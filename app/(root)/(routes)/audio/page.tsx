'use client';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { FileAudio, SendHorizonal, Play, Pause, RotateCcw } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const Audio = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [music, setMusic] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const userInfo = useUser()


  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current!.duration);
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, [music]);

const saveMusic = async() =>{
  try {  
    const response = await axios.post('/api/save-music', {
       url:music,
       title: prompt,
       email: userInfo?.user?.primaryEmailAddress?.emailAddress, // Replace with the correct user ID dynamically
     });
 
     if (response.status === 200) {
       toast.success('Music saved successfully!');
     } else {
       toast.error('Failed to save image.');
     }
   } catch (error) {
     console.error('Error saving image:', error);
     toast.error('Failed to save image.');
   }
}



  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const setAudio = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors
  
    try {
      const response = await fetch('/api/audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, email: userInfo?.user?.primaryEmailAddress?.emailAddress }),
      });
  
      const data = await response.json(); // Parse the response data
  
      // Check for Insufficient credits error in the response data
      if (data.error === "Insufficient credits.") {
        toast.error("You do not have enough credits to generate music.");
        
        setLoading(false); // Stop loading
        return; // Exit the function
      }
  
      // Handle other errors from the response
      if (data.error) {
        toast.error(data.error || "Failed to generate music.");
        setLoading(false); // Stop loading
        return;
      }
  
      // Ensure proper parsing of the response and handle success
      if (data && data.music && Array.isArray(data.music) && data.music[0].file_url) {
        setMusic(data.music[0].file_url);
        setLoading(false) // Access the music URL correctly
        toast.success("Music generated successfully!");
      } else {
        toast.error("Failed to retrieve music URL.");
      }
    } catch (err) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData && errorData.error === "Insufficient credits.") {
          toast.error("You do not have enough credits to generate music.");
        } else {
          toast.error("Failed to generate images. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
  
      setLoading(false);}
  };
  
  

  const cancelGeneration = () => {
    setLoading(false);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-16 pl-4 md:pl-64 md:ml-4">
      <Header
        title="Music Generation"
        description="Generates Music by leveraging the power of AI"
        bgColor="sky"
        iconColor="sky"
        icon={FileAudio}
      />
      <div className="flex items-center bg-slate-50 lg:w-[60%] w-[90%] rounded-lg shadow-lg flex-wrap pb-4 pt-4 md:p-0 gap-6 justify-between">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter music prompt"
            className="p-3 lg:p-4 m-3 bg-slate-100 rounded-md outline-none flex-grow"
        />
        <button
         disabled={loading}
          onClick={setAudio}
          className="mr-4 bg-sky-500 text-white text-lg p-2 rounded-md font-bold lg:p-3 shadow-md flex item-center gap-2 content-center m-2"
        >
        {loading ? "Generating..." : "Generate"}
          <SendHorizonal />
        </button>
      </div>

      {loading && (
        <div>
          <Loader />
        </div>
      )}

      { music !== undefined &&(
       <div>
         <div className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-md ">
          <audio ref={audioRef} src={music || ''} />
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={togglePlayPause}
              className="bg-sky-500 hover:bg-sky-600 text-white rounded-full p-3 transition-colors duration-200"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetAudio}
              className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-colors duration-200"
            >
              <RotateCcw size={20} />
            </button>
          </div>
          <div className="mb-2">
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div>
        <button  onClick={saveMusic} className='bg-sky-500 px-4 py-2 rounded mt-4'>
          Save
        </button>
      </div>
       </div>
      )}
      
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default Audio;
