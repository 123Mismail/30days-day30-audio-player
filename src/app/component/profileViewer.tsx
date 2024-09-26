"use client";
import { error } from "console";
import React, { useRef, useState } from "react";
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PiArrowSquareOut } from "react-icons/pi";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
   
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 import { Loader } from "lucide-react";
 import { RiUserFollowLine } from "react-icons/ri";
 import { IoLocateOutline } from "react-icons/io5";
 import { LuRecycle } from "react-icons/lu";
 import { IoIosStarOutline } from "react-icons/io";
 import { MdOutlineVisibility } from "react-icons/md";
 import { RxCross1 } from "react-icons/rx";
// types define

type UserProfile = {
    login: string;
    avatar_url: string;
    html_url: string;
    bio: string;
    followers: number;
    following: number;
    location: string;
  };
  
  type UserRepo = {
    id: number;
    name: string;
    full_name:string;
    html_url: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
  };


const ProfileViewer = () => {
  const [userNme ,setUserNme] =useState("");
  const [profile ,setProfile] =useState<UserProfile | null>(null)
  const [repository , setRepository] =useState<UserRepo | null>(null)
  const [loading, setLoading] =useState(false);
  const [isShowProile, setShowProfile] =useState(false)

  // fetching profile and repo data of githubProfiler

  const fetchDataFromGithub = async (): Promise<void> => {
    setLoading(true)
    try {
      const profileResponse = await fetch(
        `https://api.github.com/users/${userNme}`
      );
      const profileData = await profileResponse.json();
      setProfile(profileData);
    //   console.log(profileData, "profile data ");

      if (!profileResponse) {
        return console.error("not found user profile name");
      }

      // findig user repo details
      const repoResponse = await fetch(`https://api.github.com/users/${userNme}/repos`);
      const repoData = await repoResponse.json();
       setRepository(repoData)
    } catch (error) {
      console.error(error);
    } finally {
      setShowProfile(true)
      setLoading(false)
    }
    
  };
  
 
// handel onsubmit data 

const handelOnSubmit=(e:React.FormEvent<HTMLFormElement>):void=>{
    e.preventDefault();
    
    fetchDataFromGithub();
   
}
 
// console.log(profile,"trying to etching profile");
 
  return (
    <div className="flex justify-center h-screen  lg:items-center "> <Card className="min-w-[350px] max-w-[700px] text-left w-full mt-2">
    <CardHeader>
      <CardTitle className="text-center text-3xl font-semibold relative">Github Profile Viewer</CardTitle>
      <div className={`absolute top-20 right-[450px] ${isShowProile ? "block" : "hidden"}`}><RxCross1 className="text-xl hover:bg-gray-200"
      onClick={()=>setShowProfile(false)}
      /></div>
      <CardDescription className="text-center">Search github profile by username like Mismail.</CardDescription>
    </CardHeader>
    <CardContent>
      <form  onSubmit={handelOnSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex jsutiy-between items-center space-x-2 ">
         
            <div className={`w-full  `}>
            <Input id="name" placeholder="Name of your project" className={`w-full $`}
             onChange={(e)=>setUserNme(e.target.value)}
            
            />
            </div>
            <Button className="w-2/5">{loading ? <Loader className="text-2xl text-white"/> : "Search"}</Button>
          </div>
          
        </div>
      </form>
    </CardContent>
    <CardFooter className={`flex-col justify-start    ${isShowProile? "block" :"hidden"}  pb-10`}>
     {/* proile will be shown here */}
     <div className="card card-side bg-base-300 p-3 grid grid-cols-1 lg:grid-cols-3 justify-center items-center  ">
     <Avatar className="h-44 w-40 border-spacing-1">
      <AvatarImage src={profile?.avatar_url} alt={profile?.login} height={400} width={400} />
      <AvatarFallback>Profile</AvatarFallback>
    </Avatar>
  <div className="card-body col-span-2">
    <h2 className="card-title capitalize text-2xl mb-6 ml-4  "><strong className="flex justify-start"> {profile?.login} <a href={profile?.html_url} target="_blank"><PiArrowSquareOut className="ml-2"/></a></strong></h2>
    <p>{profile?.bio}</p>
    <div className=" flex justify-start text-left space-x-4 mt-2 ">
        <div className="flex"><RiUserFollowLine className="mr-1"/>{profile?.followers} Followers</div>
        <div className="flex"> <RiUserFollowLine className="mr-1"/>{profile?.following} Following</div>
        <div className="flex"><IoLocateOutline className="mr-1"/>{profile?.location} </div>
    </div>
  </div>
</div>
<div className="text-left"><h3 className="text-2xl text-left"><strong className="text-left">Repositories</strong></h3></div>
  
{/*  git repo */}
<div className="grid  grid-cols-1 lg:grid-cols-2 gap-y-4 lg:space-x-6 mt-3">
<Card className="w-[300px] ">
      <CardHeader>
        <CardTitle className="flex"> <LuRecycle className="mr-2 text-xl"/> {Array.isArray(repository) && repository.length > 0 && repository[0].name}</CardTitle>
        <CardDescription>{Array.isArray(repository) && repository.length > 0 && repository[0].description}</CardDescription>
      </CardHeader>
      <CardContent className=" ms-auto justify-between ">
        <div className="flex  items-center"><IoIosStarOutline className="mr-2"/> {Array.isArray(repository) && repository.length > 0 && repository[0].stargazers_count} <MdOutlineVisibility className="ml-2 mr-1"/> {Array.isArray(repository) && repository.length > 0 && repository[0].forks_count} </div>
        <div className="mt-2 hover:underline"> 
          <a href={ Array.isArray(repository) && repository.length > 0 && repository[0].html_url} target="_blank">View On Github</a>
        </div>
      </CardContent>
      
    </Card>
<Card className="w-[300px] ">
      <CardHeader>
        <CardTitle className="flex"> <LuRecycle className="mr-2 text-xl"/> {Array.isArray(repository) && repository.length > 0 && repository[1].name}</CardTitle>
        <CardDescription>{Array.isArray(repository) && repository.length > 0 && repository[1].description}</CardDescription>
      </CardHeader>
      <CardContent className=" ms-auto justify-between ">
        <div className="flex  items-center"><IoIosStarOutline className="mr-2"/> {Array.isArray(repository) && repository.length > 0 && repository[0].stargazers_count} <MdOutlineVisibility className="ml-2 mr-1"/> {Array.isArray(repository) && repository.length > 0 && repository[1].forks_count} </div>
        <div className="mt-2 hover:underline"> 
          <a href={ Array.isArray(repository) && repository.length > 0 && repository[1].html_url} target="_blank">View On Github</a>
        </div>
      </CardContent>
      
    </Card>
 
    </div>
    </CardFooter>
  </Card></div>
  );
};

export default ProfileViewer;
