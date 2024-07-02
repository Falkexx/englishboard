"use client";
import Navbar from "@/app/Components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/app/context/AuthContext";
import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({ children }:any) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Navbar />
            {children}
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
