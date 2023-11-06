import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Admin = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useRouter();

  const logout = async () => {

    try {
      await axios.get('/api/uses/logout');
      console.log("Logout successfully");
      navigate.push('/login')
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/uses/admin");
      //console.log(res.data);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when data is available or an error occurs
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className='text-center text-4xl font-bold text-rose-600 my-3'>Welcome Admin</h1>
      {loading ? (
        <p className='text-center text-4xl font-bold text-rose-600 my-8'>Loading...</p>
      ) : data ? (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-2 lg:-mx-2">
            <div className="inline-block min-w-full py-2  sm:px-6 lg:px-2">
              <div className="overflow-hidden">
                <div className="ml-4"> {/* Add margin here */}
                  <table className="min-w-full text-left text-sm font-light table-auto">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-5 py-2">#</th>
                        <th scope="col" className="px-5 py-2">FullName</th>
                        <th scope="col" className="px-5 py-2">UserName</th>
                        <th scope="col" className="px-5 py-2">NickName</th>
                        <th scope="col" className="px-5 py-2">Gender</th>
                        <th scope="col" className="px-5 py-2">Email</th>
                        <th scope="col" className="px-5 py-2">Address</th>
                        <th scope="col" className="px-5 py-2">Nationality</th>
                        <th scope="col" className="px-5 py-2">Zipcode</th>
                        <th scope="col" className="px-5 py-2">Occupation</th>
                        <th scope="col" className="px-5 py-2">About</th>
                      </tr>
                    </thead>
                    {data.map((i, index) => {
                      return (
                        <tbody key={index}>
                          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-5 py-2 font-medium">{index}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.fullname}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.username}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.nickname}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.gender}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.email}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.address}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.nationality}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.zipcode}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.occupation}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.about}</td>
                            <td><button className='whitespace-nowrap px-5 py-2'>Delete</button></td>
                          </tr>
                        </tbody>
                      )
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}


      {/* <button onClick={handleLogout} className="btn btn-dark">Logout</button> */}
      <button
        type="submit"
        onClick={logout}
        className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
    </div>

  )
}

export default Admin