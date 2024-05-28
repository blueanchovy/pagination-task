import Image from "next/image";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import UserCard from "../../components/UserCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userData, setUserData] = useState<{ [key: string]: any }[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const pageButtonsToShow = 10;
  const [pageButtonsRange, setPageButtonsRange] = useState<{
    start: number;
    end: number;
  }>({
    start: 1,
    end: pageButtonsToShow,
  });
  const [currentItems, setCurrentItems] = useState<{ [key: string]: any }[]>(
    []
  );
  // console.log(userData);

  const fetchUsers = useCallback(
    async (
      currentPage: number,
      setUserData: React.Dispatch<
        React.SetStateAction<{ [key: string]: any }[]>
      >
    ) => {
      try {
        const response = await fetch(
          `https://give-me-users-forever.vercel.app/api/users/${currentPage}/next`
        );

        if (!response.ok) {
          throw new Error("Bad Network response");
        }

        const data = await response.json();
        // console.log(data);

        setUserData((prevData) => [...prevData, ...data.users]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    },
    []
  );

  useEffect(() => {
    currentPage >= numberOfPages && fetchUsers(currentPage, setUserData);
  }, [currentPage, fetchUsers, numberOfPages]);

  useEffect(() => {
    if (numberOfPages <= pageButtonsToShow) {
      setPageButtonsRange({
        start: 1,
        end: numberOfPages,
      });
    } else {
      const maxStartIndex = numberOfPages - pageButtonsToShow + 1;
      const minStartIndex = 1;
      const start = Math.max(
        Math.min(
          currentPage - Math.floor(pageButtonsToShow / 2),
          maxStartIndex
        ),
        minStartIndex
      );
      const end = start + pageButtonsToShow - 1;
      setPageButtonsRange({
        start,
        end: end > numberOfPages ? numberOfPages : end,
      });
    }
  }, [currentPage, numberOfPages]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(userData?.length / itemsPerPage));
  }, [userData]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;
    console.log(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(userData?.slice(indexOfFirstItem, indexOfLastItem));
    console.log(userData?.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, userData]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start p-12 ${inter.className}`}
    >
      <div className="flex flex-col justify-between items-center">
        {" "}
        <h2 className="text-4xl text-bold">User Details</h2>
        <div className="flex flex-wrap justify-around w-full mt-6 mb-6">
          {currentItems.map((userDetails, index) => {
            return <UserCard data={userDetails} key={index} />;
          })}
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed text-black"
              : "bg-blue-500 hover:bg-blue-700 text-black"
          }`}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {Array.from(
            { length: pageButtonsRange.end - pageButtonsRange.start + 1 },
            (_, i) => (
              <button
                key={i + pageButtonsRange.start}
                onClick={() => setCurrentPage(i + pageButtonsRange.start)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + pageButtonsRange.start
                    ? "bg-blue-500 text-black"
                    : "bg-blue-300 hover:bg-blue-400 text-black"
                }`}
              >
                {i + pageButtonsRange.start}
              </button>
            )
          )}
        </div>
        <button
          disabled={currentPage === numberOfPages}
          onClick={handleNextPage}
          className={`px-4 py-2 rounded ${
            currentPage === numberOfPages
              ? "bg-gray-300 cursor-not-allowed text-black"
              : "bg-blue-500 hover:bg-blue-700 text-black"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
}
