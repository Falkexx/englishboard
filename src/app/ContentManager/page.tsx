"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Spinner from "../Components/Spiner";
import AddModule from "./Components/AddModule";
import AddSection from "./Components/AddSection";
import AddLesson from "./Components/AddLesson";
import ImageUpload from "./Components/ImageUpload";
import Navbar from "../Components/Navbar";
import AddCapitulo from "./Components/AddCapitulo";

type Props = {

}
export default function ContentManager({ }: Props) {

    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
    }, [user]);

    return (

        (loading ? <Spinner /> : user && user.email == 'andre.mani2015@gmail.com' || user?.email == 'joaovictormdc99@gmail.com' ? (

            <div>

                <Navbar />

                <section className="w-full flex flex-row flex-wrap ">


                    <div className="w-2/4">
                        <h1>Tela de criação de sections</h1>
                        <AddSection />
                    </div>

                    <div className="w-2/4">
                        <h1>Crie o modulo</h1>
                        <AddModule />
                    </div>


                    <div className="w-2/4">
                        <h1>Crie o capitulo</h1>
                        <AddCapitulo/>
                    </div>

                    <div className="w-2/4">
                        <h1>Crie uma lição</h1>
                        <AddLesson />
                    </div>

                </section>
            </div>

        )
            :
            <h2>You don't have permission to access this page.</h2>)
    );
}