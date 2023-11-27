import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Pagination, Select, MenuItem } from '@mui/material';

const Admin = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [idsToDelete, setIdsToDelete] = useState({
    locationInfo: [],
    otherInfo: [],
    personalInfo: [],
  
  });

  const navigate = useRouter();

  const logout = async () => {

    try {
      await axios.get('/api/uses/logout');
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
      if (Array.isArray(res.data.data)) {
        setData(res.data.data);
      }
      if (res.data.idsToDelete) {
        setIdsToDelete(res.data.idsToDelete);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when data is available or an error occurs
    }
  }

  // pagination
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = currentPage * itemsPerPage;

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };


  // search 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  const filterData = data ? data.filter((item) => item.fullname && item.fullname.toLowerCase().includes(searchQuery.toLowerCase())) : [];
  const visibledata = filterData.slice(startIdx, endIdx);

  // Delete record
  const handleDelete = async (id, fullname, index) => {
    if (window.confirm(`Are you sure you want to delete this data ${fullname}`)) {
      try {
        const response = await axios.delete(`/api/delete?id=${id}&locationInfo=${idsToDelete.locationInfo[index]}&otherInfo=${idsToDelete.otherInfo[index]}&personalInfo=${idsToDelete.personalInfo[index]}`);
        console.log(response.data);
        if (response.status === 200) { 
          alert('User deleted successfully');
          getUserDetails();
        } else {
          alert('Error deleting user');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting user');
      }
    }
  }



  // Update
  const handleUpdate = async (id, index) => {
    navigate.push(`/editpage/${id}&locationInfo=${idsToDelete.locationInfo[index]}&otherInfo=${idsToDelete.otherInfo[index]}&personalInfo=${idsToDelete.personalInfo[index]}`);
  }


  return (
    <div className="container mx-auto">
      <h1 className='text-center text-4xl font-bold text-rose-600 my-3'>Welcome Admin</h1>
      <div className="mb-3">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch justify-end">
          <input
            type="search"
            className=" w-50 relative m-0 block rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-dark-200 dark:focus:border-primarycd "
            placeholder="Search by fullname"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-describedby="button-addon2" />
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
            id="basic-addon2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="dark"
              className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
      {loading ? (
        <p className='text-center text-4xl font-bold text-rose-600 my-8'>Loading...</p>
      ) : visibledata.length > 0 ? (
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
                    {visibledata.map((i, index) => {
                      return (
                        <tbody key={index}>
                          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td className="whitespace-nowrap px-5 py-2 font-medium">{index}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.fullname || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.username || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.nickname || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.gender || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.email || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.address || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.nationality || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.zipcode || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.occupation || '-'}</td>
                            <td className="whitespace-nowrap px-5 py-2">{i.about || '-'}</td>
                            <td><button type="button" onClick={() => handleUpdate(i._id, index)} className='px-2.5 py-2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800'>Update</button></td>
                            <td><button type="button" onClick={() => handleDelete(i._id, i.fullname, index)} className='px-2.5 py-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'>Delete</button></td>
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

      <div className="flex justify-between items-center py-3">
        <Select
          labelId="rows-per-page-label"
          id="rows-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>

        <Pagination
          className="my-0"
          color="primary"
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </div>
      <button
        type="submit"
        onClick={logout}
        className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-6 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Logout
      </button>
    </div >


  )
}

export default Admin