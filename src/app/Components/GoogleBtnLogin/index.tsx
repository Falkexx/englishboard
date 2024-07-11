'use client'
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "../Navbar";



function index() {

    const { user, googleSignIn} = useAuth();

    async function HandleSigIn() {

        try {
            await googleSignIn()

        } catch (error) {
            console.log(error);
        }
    }

    if (user) {

        return (

            <>
                <h1>Esta logado</h1>
            </>
        )
    } else {

        return (

            <>

                <button onClick={() => { HandleSigIn() }} className="flex flex-col justify-center items-center">Fazer login <i><FaGoogle /></i></button>

            </>

        )

    }


}

export default index;