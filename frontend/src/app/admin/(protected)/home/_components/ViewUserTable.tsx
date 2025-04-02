import { IUserType } from '@/types/users.types';
import React from 'react';
import { format } from "date-fns";
import ReactPaginate from 'react-paginate';

interface ViewUserTableProps {
    userData: IUserType[];
    dataCount: number;
    setPage:React.Dispatch<React.SetStateAction<number>>;
    currentPage:number;
}

export default function ViewUserTable({ userData, dataCount,currentPage,setPage }: ViewUserTableProps) {
    const handlePageClick = ({selected}:{selected:number}) => {
        setPage(selected+1);
    }
    return (
        <div>
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Name
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Email
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Active Status
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Joined On
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index} className="hover:bg-slate-50 border-b border-slate-200">
                            <td className="p-4 py-5">
                                <p className="block font-semibold text-sm text-slate-800">{user.firstName + user.lastName}</p>
                            </td>
                            <td className="p-4 py-5">
                                <p className="text-sm text-slate-500">{user.username}</p>
                            </td>
                            <td className="p-4 py-5">
                                <p className="text-sm text-slate-500">{user.isActive ? "ACTIVE" : "INACTIVE"}</p>
                            </td>
                            <td className="p-4 py-5">
                                <p className="text-sm text-slate-500">{format(new Date(user.createdAt), "dd-mm-yyyy")}</p>
                            </td>

                        </tr>
                    ))}


                </tbody>
            </table>

            <div className="flex justify-end items-center px-4 py-3">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(dataCount/20)}
                    // forcePage={currentPage-1}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    // Tailwind classes for the container
                    containerClassName="flex items-center justify-center gap-2 my-4"
                    // Page link class
                    pageClassName="px-3 py-2 rounded-md transition-colors"
                    // Active page class
                    activeClassName="bg-blue-500 text-white hover:bg-blue-600"
                    // Previous/Next button classes
                    previousClassName="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                    nextClassName="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                    // Disabled state
                    disabledClassName="opacity-50 cursor-not-allowed"
                    // Break (...) class
                    breakClassName="px-3 py-2"
                />
            </div>
        </div>
    )
}
