"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import Spinner from "../Components/Spiner";

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

        (loading ? <Spinner /> : user && user.email == 'andre.mani2015@gmail.com' ? (

            <div>
                <h1>Your are logged as a Content Manager</h1>


                <section>
                    <h2>Modulo: </h2>
                </section>
            </div>

        )
            :
            <h2>You don't have permission to access this page.</h2>)
    );
}