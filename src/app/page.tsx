'use client'

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '@/Server/firebase'
export default function Home() {

  function TestandoCadastro(){

    signInWithEmailAndPassword(auth, 'teste@gmail.com', 'teste123')
    .then(()=>{
      console.log("Logado com sucesso")
    }).catch((err)=>{

      console.log(err)
    })
  }
  return (
    <main className="">
      <h1>Muro reservado - Não pinxar</h1>

      <button onClick={TestandoCadastro}>Testar</button>
      
    </main>
  );
}
