import React from 'react'

export default function HomePage() {
  return (
    <>
      <div className="font-sans bg-gray-100 px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <div className="text-left">
            <h2 className="text-gray-800 text-3xl font-bold mb-6">Discover the Future of File Sharing.</h2>
            <p className="mb-4 text-sm text-gray-500">This project proposes the development of a Secure File Sharing System that integrates advanced encryption techniques to safeguard files during transmission and storage. </p>
            <p className="mb-4 text-sm text-gray-500">The proposed system utilizes Elliptic Curve Cryptography (ECC), a modern cryptographic approach known for its strong security and efficient performance, especially on resource-constrained devices like smartphones and IoT devices. </p>
            <p className="text-sm text-gray-500">End-to-end encryption (E2EE) ensures that files are encrypted before they are uploaded and can only be decrypted by the authorized recipient, preventing any unauthorized access during the transfer process. Overall, this Secure File Sharing System is designed to offer a highly secure, efficient, 
              and compliant solution for sharing files in a modern digital environment, addressing the increasing need for privacy and data protection. It ensures that users can securely share, collaborate, and manage sensitive data without the fear of unauthorized access or exposure.</p>
            
            <p className="text-sm text-gray-500">The proposed secure file-sharing system will utilize Elliptic Curve Cryptography (ECC) to enhance the security and efficiency of the file-sharing process. ECC is a public-key cryptosystem that offers strong encryption with relatively  smaller key sizes compared to other algorithms like RSA, making it an excellent choice for environments where performance and bandwidth are critical.
              The proposed system aims to overcome drawbacks of the existing system: </p>
              <p className="text-sm text-gray-500">The proposed secure file-sharing system aims to overcome the shortcomings of existing platforms by implementing a more secure and efficient approach to file sharing. The proposed system incorporates the following key features:
              Strong Security with Smaller Key Sizes: ECC provides strong encryption and security at a much smaller key size compared to other cryptographic algorithms, reducing the computational burden and improving performance, especially on devices with limited resources.</p>
              <p className="text-sm text-gray-500">
              Efficiency: Due to the smaller key size and high security level, ECC can provide faster encryption and decryption times, making the system more efficient for both file sharing and secure communication.</p>
              <p className="text-sm text-gray-500">
              Scalability: ECC’s ability to provide secure encryption with relatively smaller key sizes means it’s well-suited for scaling to large numbers of users, making it ideal for enterprise or high-volume applications.</p>
              <p className="text-sm text-gray-500">
              Compatibility with Modern Devices: The ECC algorithm is well-supported by modern cryptographic libraries and hardware devices, ensuring that the system is compatible with a wide range of platforms, including mobile devices, IoT devices, and more.</p>
          </div>
          <div>
            <img src="https://readymadeui.com/management-img.webp" alt="Placeholder Image" className="rounded-lg object-contain w-full h-full" />
          </div>
        </div>
      </div>
    </>
  )
}
