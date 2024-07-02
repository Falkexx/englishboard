"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/Server/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useQuery } from "react-query";
import { FirebaseUsersTypes } from '@/Utils/UserTypes';
import UserDetail from "./Component/UserDetails";
import Spinner from "../Components/Spiner";

//BUSCANDO OS DADOS DO USUÁRIO NO BANCO DE DADOS
const fetchDBUserData = async (uid: string): Promise<FirebaseUsersTypes[]> => {
  const UserRef = collection(db, 'users');
  const q = query(UserRef, where("UID", "==", uid));
  const data = await getDocs(q);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as FirebaseUsersTypes[];
};

const Page: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  // Hook para buscar os dados do usuário no Firestore
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

  if (loading || isLoading) {
    return <Spinner />;
  }

  // Renderização condicional com base na autenticação
  if (!user) {
    return (
      <div className="p-4">
        <p>You must be logged in to view this page - protected route.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
        Welcome, {user.email} - you are logged in to the profile page - a protected route.

        {dadosUser.length > 0 ? (
          <UserDetail dadosUser={dadosUser} />
        ) : (
          'Carregando dados'
        )}
      </div>
    </div>
  );
};

export default Page;
