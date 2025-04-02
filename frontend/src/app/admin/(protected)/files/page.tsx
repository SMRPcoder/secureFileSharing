"use client";
import { ViewAllFilesAction } from '@/actions/admin.actions';
import { Notify } from 'notiflix';
import React, { useEffect, useState } from 'react'
import ViewFilesTable from './_components/ViewFilesTable';
import { IFileType } from '@/types/file.types';

export default function FilesPage() {
    const [fileData, setFileData] = useState<IFileType[]>([]);
    const [dataCount, setDataCount] = useState(0);
    const [page, setPage] = useState(1);
    useEffect(() => {
        async function getAllFiles() {
            const fileDataResponse = await ViewAllFilesAction(page);
            if (fileDataResponse.status) {
                setFileData(fileDataResponse.data);
                setDataCount(fileDataResponse.count);
            } else {
                Notify.failure(fileDataResponse.message);
            }
        }
        getAllFiles();
    }, [page])
    return (
        <div>
            <div className="max-w-[90%] h-full mt-10 mx-auto">
                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <ViewFilesTable fileData={fileData} dataCount={dataCount} currentPage={page} setPage={setPage} />
                </div>
            </div>
        </div>
    )
}
