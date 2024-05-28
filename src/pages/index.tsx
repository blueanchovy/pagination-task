import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userData, setUserData] = useState();
  console.log(userData);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://give-me-users-forever.vercel.app/api/users/1/next"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    ></main>
  );
}
