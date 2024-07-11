'use client'

import Image from 'next/image'
import GoogleBtnLogin from './Components/GoogleBtnLogin'
import { useAuth } from "@/app/context/AuthContext";
import Navbar from './Components/Navbar';
import Logo from '@/Imagens/Logo.svg'
import { useState, useEffect } from 'react';
import { db, storage } from '@/Server/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AchivmentDetails from './Components/achivmentDetails';
import Sections from './Components/Sections';
export default function Home() {
  const { user, googleSignIn, logOut } = useAuth();





  if (user) {

    return (

      <>
        <Navbar />
        <main className='w-[90%] m-auto'>
          <AchivmentDetails />
          <Sections />
        </main>
      </>

    )

  }

  else {

    return (
      <>
        <main className="w-full h-screen flex justify-center items-center">
          <GoogleBtnLogin />
        </main>

      </>
    )

  }

}