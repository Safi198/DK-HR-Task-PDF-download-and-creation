import React from 'react'
import "./SignupRequests.css";

const SignupRequests = () => {
    return (
        <>
            <section className="dashboard text-gray-100 bg-gray-800 body-font py-10">
                <h1 className="sm:text-4xl lg:text-5xl font-medium title-font text-center mb-4">Sign Up Requests</h1>

                <div className=" mx-5 text-center mt-5">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                        {/* TABLE */}
                        <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-1 text-xl text-gray-950 ">
                                        1
                                    </td>
                                    <td className="px-6 py-1 text-xl text-gray-950 ">
                                        Suheer
                                    </td>
                                    <td className="px-6 py-1 text-xl text-gray-950 ">
                                        user@user.com
                                    </td>
                                    <td className="px-6 py-1 text-xl text-gray-950 ">
                                        +92 283729302
                                    </td>
                                    <td className="px-6 py-1 text-lg text-gray-950 ">
                                        <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-1">Approve</button>

                                        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 my-1">Reject</button>
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

export default SignupRequests
