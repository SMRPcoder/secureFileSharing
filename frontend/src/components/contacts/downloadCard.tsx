import { downloadFileAction } from '@/actions/chat.actions';
import React, { useEffect } from 'react';

const DownloadCard = ({ fileName, downloadUrl }:{fileName:string; downloadUrl:string;}) => {
  const handleDownload = () => {
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.setAttribute("download", fileName || "file-" + Date.now());
    link.setAttribute("target", "_blank"); // Optional: Open in a new tab
    link.href=downloadUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-sm mx-auto">
      <div
        className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleDownload}
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
          <p className="text-gray-800 font-medium">{fileName || 'Download File'}</p>
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