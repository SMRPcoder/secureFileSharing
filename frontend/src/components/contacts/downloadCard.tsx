import { DeleteFileAction } from '@/actions/chat.actions';
import { Notify } from 'notiflix';
import React from 'react';

interface DownloadCardProps {
  fileName: string;
  downloadUrl: string;
  isTarget?: boolean;
  fileData?: {
    id: string;
    setChatRefresh: React.Dispatch<React.SetStateAction<string>>
  }
}
const DownloadCard = ({ fileName, downloadUrl, isTarget, fileData }:DownloadCardProps) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName || "downloaded-file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (isTarget && fileData) {
        const deletedResponse = await DeleteFileAction(fileData.id);
        if(deletedResponse.status){
          fileData.setChatRefresh(`${Date.now()}`);
          Notify.success(deletedResponse.message);
        }else{
          Notify.failure(deletedResponse.message);
        }
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div
        className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        {/* File Icon (you can replace this with an SVG or image if needed) */}
        <div className="text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>

        {/* File Info */}
        <div className="flex-1">
          <p className="text-gray-800 text-sm font-light">{fileName || 'Download File'}</p>
          <p className="text-sm text-gray-500">Click to download</p>
        </div>

        {/* Download Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // Prevent double triggering
            handleDownload();
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadCard;