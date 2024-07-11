"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FotoModulo from '@/Imagens/70e0835f1480473cd74c2f372a830910.jpg';
import { db } from "@/Server/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";
import Spinner from "@/app/Components/spinner.gif";

// Function to fetch data from Firestore
const fetchModulosData = async (): Promise<any[]> => {
    const ModulosRef = collection(db, 'modulos');
    const data = await getDocs(ModulosRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any[];
};

const Sections: React.FC = () => {
    const { data: modulosData = [], isLoading } = useQuery<any[]>(
        'modulosData',
        fetchModulosData,
        {
            staleTime: 40000,
            cacheTime: Infinity,
            refetchInterval: 40000,
        }
    );

    if (isLoading) {
        return 'Carregando dados';
    }

    return (
        <>
            {modulosData.length > 0 ? modulosData.map((e) => {

                return (

                    <section className="flex flex-row gap-2 my-4">
                        <div className="w-[40%]">
                            <img
                                className="w-[100%] h-[104px] rounded-xl object-cover"
                                src={e.imgURL}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <strong className="text-sm">{e.moduleName}</strong>
                            <p className="text-xs text-[#A1A4B3]">{e.dificuldade}</p>
                            <div>
                                <p>Progression bar</p>
                            </div>
                        </div>
                    </section>
                )
            }) : null}
        </>
    );
};

export default Sections;
