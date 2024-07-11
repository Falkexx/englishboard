import Image from "next/image";
import { useState } from 'react';
import userImg from '@/Imagens/Perfil demo.jpg';
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/Server/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import { FirebaseUsersTypes } from '@/Utils/UserTypes';

function AchivmentDetails() {
    const [progress, setProgress] = useState(48); // Define a progressão aqui
    const { user } = useAuth();

    const fetchDBUserData = async (uid: string): Promise<FirebaseUsersTypes[]> => {
        const UserRef = collection(db, 'users');
        const q = query(UserRef, where("UID", "==", uid));
        const data = await getDocs(q);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as FirebaseUsersTypes[];
    };

    const { data: dadosUser = [], isLoading } = useQuery<FirebaseUsersTypes[]>(
        ['userData', user?.uid],
        () => fetchDBUserData(user!.uid),
        {
            enabled: !!user?.uid,
            staleTime: 40000,
            cacheTime: Infinity,
            refetchInterval: 40000,
        }
    );

    if (isLoading) {
        return 'Carregando';
    }

    return (
        <>
            {dadosUser.length > 0 ? dadosUser.map((e) => {

                return (

                    <main className="flex flex-row justify-between items-center border-b-2 border-[#D5D8DE] py-3">
                        <section className="flex items-center">
                            <div className="w-16 h-16 relative">
                                <img src={e.AvatarURL} alt='Perfil photo' className="rounded-full object-cover" />
                            </div>
                            <div className="ml-4">
                                <strong className="text-lg">{e.Apelido}</strong>
                                <p className="text-sm text-gray-600">{e.Medalha}</p>
                            </div>
                        </section>

                        <section>
                            <div>
                                <svg viewBox="0 0 36 36" className="w-10 h-10">
                                    <path
                                        className="text-gray-300"
                                        d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path
                                        className="text-blue-500"
                                        d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeDasharray={`${progress}, 100`}
                                    />
                                    <text x="18" y="20.35" className="text-blue-500 text-[10px]" textAnchor="middle">{`${progress}%`}</text>
                                </svg>
                            </div>
                        </section>
                    </main>
                )
            })



                : ''}
        </>
    );
}

export default AchivmentDetails;
