import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import Logo from '../../Imagens/Logo.svg';
import MobileIcon from '@/Imagens/MobileIcon.svg';
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, googleSignIn, logOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="h-20 w-full border-b-2 flex items-center justify-between p-2 bg-Primaria">
        <ul className="flex">
          <li className="p-2 cursor-pointer">
            <Link href='/'>
              <Image src={Logo} alt="Logo" />
            </Link>
          </li>
        </ul>

        {loading ? null : !user ? null : (
          <div>
            <button onClick={toggleDrawer}>
              <i>
                <Image src={MobileIcon} alt="Menu" />
              </i>
            </button>
          </div>
        )}



      </nav>

      {drawerOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50 z-50 flex"
        >
          <motion.div
            className="bg-white h-full w-64 p-4 flex flex-col justify-start items-start gap-4"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button className="text-black" onClick={handleSignOut}>
              Sair
            </button>

            {user && user.email == 'andre.mani2015@gmail.com' ? <Link href='/ContentManager' className="text-black">
              Tela de administrador
            </Link> : ''}

          </motion.div>
          <div className="flex-1" onClick={toggleDrawer}></div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
