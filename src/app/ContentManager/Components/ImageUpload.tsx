// src/components/ImageUpload.tsx
import { useState } from 'react';
import { db, storage } from '@/Server/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function ImageUpload() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleImageUpload = () => {
        if (!imageFile) return;

        setUploading(true);
        const storageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.error('Upload error: ', error);
                setUploading(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(db, 'images'), {
                        url: downloadURL,
                        name: imageFile.name,
                        uploadedAt: new Date(),
                    });
                    alert('Image uploaded and URL saved to Firestore!');
                    setUploading(false);
                    setProgress(0);
                } catch (error) {
                    console.error('Error getting download URL or saving to Firestore: ', error);
                    setUploading(false);
                }
            }
        );
    };

    return (
        <div>
            <input
                type="file"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
            <button type="button" onClick={handleImageUpload} disabled={!imageFile || uploading}>
                {uploading ? `Uploading... (${Math.round(progress)}%)` : 'Upload Image'}
            </button>
        </div>
    );
}

export default ImageUpload;
