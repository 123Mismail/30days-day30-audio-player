"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import Image from "next/image";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaFastBackward,
  FaFastForward,
} from "react-icons/fa";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";

//  defining types of audion
interface Track {
  title: string;
  artist: string;
  src: string;
}
const AudioPlayer = () => {
  const [currentTrack, setTrcack] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playing, setPlaying] = useState(true);
  const useRefAudio = useRef<HTMLAudioElement | null>(null);

  //   handel upload Track

  const handelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newTrack: Track[] = Array.from(files).map((file) => ({
        title: file.name,
        artist: "",
        src: URL.createObjectURL(file),
      }));
      setTrcack((prevTracks) => [...prevTracks, ...newTrack]);
    }
  };

  //  handel forwardBackwardBtns
  const handelNextTrack = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentTrack.length);
  };
  //   handel prevtrack

  const handelPrevTrack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentTrack.length + 1 : currentTrack.length - 1
    );
  };

  const handelPlayPause = () => {
    if (playing) {
      useRefAudio.current?.pause();
      setPlaying(false);
    } else {
      useRefAudio.current?.play();
      setPlaying(true);
    }
  };

  const loadingMetadata = () => {
    if (useRefAudio.current) {
      setDuration(Math.floor(useRefAudio.current.duration));
    }
  };
  const handleTimeUpdate = () => {
    if (useRefAudio.current) {
      setCurrentTime(useRefAudio.current.currentTime);
      setProgress(
        (useRefAudio.current.currentTime / useRefAudio.current.duration) * 100
      );
    }
  };

  // formate time

  const formatTime = (time: number) => {
    let minutes = Math.floor((time / 60) % 60);
    let seconds =Math.floor( time % 60);
    return `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
  };

  //  handel change tracks
  useEffect(() => {
    if (useRefAudio.current) {
      
      // useRefAudio.current.pause();
      useRefAudio.current.src = currentTrack[currentIndex]?.src || "";
      useRefAudio.current.load();
      // useRefAudio.current.currentTime=0;
      // setCurrentTime(0);
      // setProgress(0);
      if (playing) useRefAudio.current.play();
    }
  }, [currentIndex, playing, currentTrack]);

  //  UI return
  console.log(Math.floor(duration), "time duration");
  console.log(Math.floor(currentTime), "time current time");

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[400px] min-h-[500px] w-full ">
        <div className="flex justify-between p-1">
          <h1 className="text-3xl font-semibold">Audio Player</h1>
          <label className="flex items-center cursor-pointer">
            <BsUpload className="w-5 h-5 mr-2" />
            <span>Upload</span>
            <input
              type="file"
              accept="audio/*"
              multiple
              className="hidden"
              onChange={handelUpload}
            />
          </label>
        </div>
        <Card className="w-full mt-[6px] text-center">
          <CardHeader className="mb-6 ">
            <CardTitle className="text-lg font-normal mb-6">
              Album Cover
            </CardTitle>
            <div className="h-20 w-20  mx-auto ">
              <Image
                src={"/cover.jpeg"}
                alt="cover pic arijit singh"
                height={200}
                width={200}
                className="rounded-full h-20 w-20"
              ></Image>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid w-full items-center   ">
              <div className="flex flex-col text-base font-semibold">
                <h2>Audio Tittle</h2>
                <p className="opacity-60 text-[14px]">Person Name</p>
                <Progress
                  className="mt-4"
                  value={progress}
                  onChange={handleTimeUpdate}
                />
                <div className="flex justify-between ">
                  <span>{formatTime(currentTime)}</span>{" "}
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center text-center">
            <div className="flex justify-between text-xl space-x-3">
              <FaFastBackward className="cursor-pointer" onClick={handelPrevTrack} />{" "}
              <Button
                variant={"ghost"}
                className="text-xl"
                onClick={handelPlayPause}
              >
                {playing ? <FaPauseCircle /> : <FaPlayCircle />}
              </Button>
              <FaFastForward onClick={handelNextTrack} className="cursor-pointer" />
            </div>
            <audio
              ref={useRefAudio}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={loadingMetadata}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AudioPlayer;
