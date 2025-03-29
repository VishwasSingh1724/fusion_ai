'use client';

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Music2, Loader2, Clock, Shuffle, RepeatIcon
} from 'lucide-react';

interface MusicAsset {
  _id: string;
  title: string;
  url: string;
  createdAt: string;
}

const MusicsPage = () => {
  const { user } = useUser();
  const [musics, setMusics] = useState<MusicAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState<MusicAsset | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.post('/api/user-data', {
          email: user?.primaryEmailAddress?.emailAddress,
        });
        // Reverse the array before setting it to state
        const data = [...response.data.musics].reverse();
        setMusics(data);
      } catch (error) {
        console.error('Error fetching music assets:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.primaryEmailAddress?.emailAddress) {
      fetchAssets();
    }
  }, [user?.primaryEmailAddress?.emailAddress]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = (track: MusicAsset) => {
    if (currentTrack?._id === track._id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    const newTime = percent * duration;
    
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = musics.findIndex(m => m._id === currentTrack._id);
    const nextIndex = (currentIndex + 1) % musics.length;
    setCurrentTrack(musics[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = musics.findIndex(m => m._id === currentTrack._id);
    const prevIndex = currentIndex === 0 ? musics.length - 1 : currentIndex - 1;
    setCurrentTrack(musics[prevIndex]);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white"> {/* Light background */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    );
  }

  if (musics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Music2 className="w-16 h-16 text-gray-400" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">No tracks found</h2>
        <p className="mt-2 text-gray-500">Upload some music to get started</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 pb-32">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Your Music</h1>
        
        <div className="space-y-2">
          {musics.map((track) => (
            <motion.div
              key={track._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg hover:bg-gray-100 transition-colors ${
                currentTrack?._id === track._id ? 'bg-blue-50' : 'bg-white'
              } border border-gray-200`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handlePlay(track)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
                >
                  {currentTrack?._id === track._id && isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800">{track.title}</h3>
                  <p className="text-sm text-gray-500">
                    Added {new Date(track.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {duration ? formatTime(duration) : '--:--'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fixed Player Bar */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => {
              if (isRepeating) {
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.play();
                }
              } else {
                handleNextTrack();
              }
            }}
          />
          
          <div className="max-w-screen-lg mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="w-1/4">
                <h4 className="font-semibold truncate text-gray-800">{currentTrack.title}</h4>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`hover:text-blue-600 ${isShuffled ? 'text-blue-500' : 'text-gray-400'}`}
                >
                  <Shuffle className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handlePrevTrack}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                
                <button
                  onClick={handleNextTrack}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsRepeating(!isRepeating)}
                  className={`hover:text-blue-600 ${isRepeating ? 'text-blue-500' : 'text-gray-400'}`}
                >
                  <RepeatIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="w-1/4 flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setVolume(value);
                    setIsMuted(value === 0);
                    if (audioRef.current) {
                      audioRef.current.volume = value;
                    }
                  }}
                  className="w-24"
                />
              </div>
            </div>
            
            <div 
              ref={progressRef}
              onClick={handleProgressClick}
              className="h-1 bg-gray-200 rounded-full cursor-pointer"
            >
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicsPage;