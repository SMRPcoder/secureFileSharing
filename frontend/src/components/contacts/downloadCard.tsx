import { DeleteFileAction } from '@/actions/chat.actions';
import { ChatFileType, ContactsType } from '@/types/contacts.types';
import { Notify } from 'notiflix';
import React from 'react';

interface DownloadCardProps {
  fileName: string;
  downloadUrl: string;
  isTarget?: boolean;
  fileData?: {
    id: string;
    setChatRefresh: React.Dispatch<React.SetStateAction<string>>
  },
  chatFile: ChatFileType,
  selectedContact: ContactsType
}
const DownloadCard = ({ fileName, downloadUrl, isTarget, fileData, selectedContact, chatFile }: DownloadCardProps) => {

  // Convert Base64 back to ArrayBuffer
  function base64ToArrayBuffer(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Derive AES key from password
  async function getPasswordKey(password: string) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: new Uint8Array(16), // Must use the same salt as encryption
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["decrypt"]
    );
  }

  // Decrypt the private key
  async function decryptPrivateKey(encryptedKeyBase64: string, ivBase64: string, password: string) {
    const encryptedKey = base64ToArrayBuffer(encryptedKeyBase64);
    const iv = base64ToArrayBuffer(ivBase64);
    const passwordKey = await getPasswordKey(password);

    const decryptedKeyBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      passwordKey,
      encryptedKey
    );
    return window.crypto.subtle.importKey(
      "pkcs8",
      decryptedKeyBuffer,
      { name: "ECDH", namedCurve: "P-256" },
      true,
      ["deriveKey"]
    );
  }

  async function deriveAESKey(privateKey: CryptoKey, senderPublicKeyBase64: string) {
    const senderPublicKeyBuffer = base64ToArrayBuffer(senderPublicKeyBase64);
    
    const senderPublicKey = await window.crypto.subtle.importKey(
        "spki",
        senderPublicKeyBuffer,
        { name: "ECDH", namedCurve: "P-256" },
        true,
        []
    );

    return window.crypto.subtle.deriveKey(
        { name: "ECDH", public: senderPublicKey },
        privateKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["decrypt"]
    );
}

async function decryptFile(encryptedFile: Blob, aesKey: CryptoKey) {
  const fileBuffer = await encryptedFile.arrayBuffer();
  const iv = fileBuffer.slice(0, 12); // First 12 bytes are IV
  const encryptedData = fileBuffer.slice(12); // Rest is the encrypted data

  const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      aesKey,
      encryptedData
  );

  return new Blob([decryptedBuffer], { type: encryptedFile.type });
}

async function handleFileDecryption(encryptedFile: Blob, encryptedPrivateKey: string, iv: string, senderPublicKey: string, password: string) {
  try {
      // 1️⃣ Decrypt the private key using the password
      const recipientPrivateKey = await decryptPrivateKey(encryptedPrivateKey, iv, password);
      // 2️⃣ Derive AES key using the recipient’s private key and sender's public key
      const aesKey = await deriveAESKey(recipientPrivateKey, senderPublicKey);
      // 3️⃣ Decrypt the file using the derived AES key
      const decryptedBlob = await decryptFile(encryptedFile, aesKey);

     return decryptedBlob;
  } catch (error) {
      console.error("Decryption failed:", error);
  }
}


  const handleDownload = async () => {
    try {
      const response = await fetch(downloadUrl);
      const encryptedblob = await response.blob();
      const decryptedBlob=await handleFileDecryption(
        encryptedblob,
        chatFile.privateKey,
        chatFile.privateKeyIv,
        chatFile.publicKey,
        isTarget?selectedContact.userId:selectedContact.contactPersonId);
      // Create a link element and trigger download
      if(decryptedBlob){
        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([decryptedBlob], { type: chatFile.fileType }));
        link.download = fileName || "downloaded-file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (isTarget && fileData) {
          const deletedResponse = await DeleteFileAction(fileData.id);
          if (deletedResponse.status) {
            fileData.setChatRefresh(`${Date.now()}`);
            Notify.success(deletedResponse.message);
          } else {
            Notify.failure(deletedResponse.message);
          }
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