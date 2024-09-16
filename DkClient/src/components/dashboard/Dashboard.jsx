import React from 'react'
import "./Dashboard.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <section className="dashboard text-gray-100 bg-gray-800 body-font py-10">
                <h1 className="sm:text-4xl lg:text-5xl font-medium title-font text-center mb-2">Dashboard</h1>

                <div className=" mx-5 text-center mt-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                        {/* SEARCH FILTER */}
                        <div className="py-3 px-5 bg-gray-500 dark:bg-gray-900">
                            <label for="table-search" className="sr-only">Search</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="table-search" className="block p-2 pl-10 text-md text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Filter By Hr Names" />
                            </div>
                        </div>
                        {/* TABLE */}
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-md tracking-wider text-gray-100 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-5">
                                        <div className="flex items-center">
                                            Sr#
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Hr Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Designation
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Company Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Paid Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Suheer
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        user@user.com
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        +92 283729302
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Sir Waleed
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Frontend Developer
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Social Swirl
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Gulbery Lhr
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        0000
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Suheer
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        user@user.com
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        +92 283729302
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Sir Waleed
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Frontend Developer
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Social Swirl
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        Gulbery Lhr
                                    </td>
                                    <td className="px-6 py-4 text-lg text-gray-950 ">
                                        0000
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Dashboard
