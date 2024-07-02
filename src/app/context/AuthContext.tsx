import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../Server/firebase";
import { GoogleUserTypes } from "@/Utils/UserTypes";
import { db } from '@/Server/firebase';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

// Definindo o tipo do contexto de autenticação
interface AuthContextType {
  user: GoogleUserTypes | null;
  googleSignIn: () => void;
  logOut: () => void;
}

// Criando um contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const UserRef = collection(db, 'users');

  // Função para cadastrar um novo usuário se não existir na coleção
  const CadastrarUsuario = async (currentUser: any) => {
    const userUid = currentUser.user.uid;

    // Verifica se o usuário já existe na coleção "users"
    const q = query(UserRef, where("UID", "==", userUid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Se o usuário não existe, cria um novo documento
      await addDoc(UserRef, {
        Apelido: currentUser.user.displayName,
        DataDeIngresso: new Date().toISOString(),
        TotalXP: 0,
        Medalha: "bronze",
        Conquistas: [],
        UID: userUid,
        Email: currentUser.user.email,
        Nome: currentUser.user.displayName,
        AvatarURL: 'https://i1.sndcdn.com/avatars-SHP5vwMoZAweWF8e-ByX8xw-t240x240.jpg' // Altere conforme necessário
      });

      console.log("Novo usuário cadastrado na coleção 'users'");
    } else {
      console.log("Usuário já existe na coleção 'users'");
    }
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((user) => {
        // Chamando a função para cadastrar o usuário ao fazer login
        CadastrarUsuario(user);
      })
      .catch(() => {
        console.log('Não foi possível realizar o login com o Google');
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Função para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
