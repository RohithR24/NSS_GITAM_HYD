// import React, { useState } from "react";
// import { uploadImageToFirebase } from "@/services/uploadService"; // Adjust the import path according to your file structure

// const ImageUploadComponent: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState<boolean>(false);
//   const [downloadURL, setDownloadURL] = useState<string>("");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first");
//       return;
//     }
//     setUploading(true);
//     try {
//       const teamId = "team123"; // Replace with the actual team ID
//       const memberId = "member123"; // Replace with the actual member ID
//       const response = await uploadImageToFirebase(file, teamId, memberId);
//       setDownloadURL(response.downloadURL);
//       alert("File uploaded successfully!");
//     } catch (error) {
//       alert("Failed to upload file");
//       console.error("Error uploading file:", error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload an Image</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={uploading}>
//         {uploading ? "Uploading..." : "Upload"}
//       </button>
//       {downloadURL && (
//         <div>
//           <p>File uploaded successfully. Access it <a href={downloadURL} target="_blank" rel="noopener noreferrer">here</a>.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploadComponent;
