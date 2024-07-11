import { useState } from 'react';
import { db, storage } from '@/Server/firebase';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddSection() {
    const [sectionDescription, setSectionDescription] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [qtdModule, setQtdModule] = useState(0);
    const [achivment, setAchivment] = useState(0);
    const [xpParaFazer, setXpParaFazer] = useState(0);
    const [dificuldade, setDificuldade] = useState('');
    const [secImg, setSecImg] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = () => {
        if (!imageFile) return;

        setUploading(true);
        const storageRef = ref(storage, `sections/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Handle progress updates if needed
            },
            (error) => {
                console.error("Upload error: ", error);
                setUploading(false);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("File available at: ", downloadURL);
                    setSecImg(downloadURL);
                    setUploading(false);
                } catch (error) {
                    console.error("Error getting download URL: ", error);
                    setUploading(false);
                }
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "sections"), {
                sectionName,
                qtdModule,
                achivment,
                xpParaFazer,
                dificuldade,
                secImg
            });
            alert("Section added!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <label className='w-1/4 flex flex-col gap-4'>
                <p>                Nome da Section:
                </p>

                <input type="text" value={sectionName} onChange={(e) => setSectionName(e.target.value)} required className=' border-black border-b-2' />
            </label>


            <label className='w-1/4 flex flex-col gap-4'>
                <p>
                    Quantidade de módulos:

                </p>
                <input type="number" placeholder="QTD Module" value={qtdModule} onChange={(e) => setQtdModule(Number(e.target.value))} required className=' border-black border-b-2' />
            </label>


            <label className='w-1/4 flex flex-col gap-4'>
                <p>
                    Recompensa:

                </p>
                <input type="number" placeholder="Achivment" value={achivment} onChange={(e) => setAchivment(Number(e.target.value))} required className=' border-black border-b-2' />
            </label>


            <label className='w-1/4 flex flex-col gap-4'>
                <p>
                    XP para fazer:

                </p>
                <input type="number" placeholder="XP Para Fazer" value={xpParaFazer} onChange={(e) => setXpParaFazer(Number(e.target.value))} required className=' border-black border-b-2' />

            </label>


            <label className='w-1/4 flex flex-col gap-4'>
                <p>
                    Dificuldade:
                </p>
                <input type="text" placeholder="Dificuldade" value={dificuldade} onChange={(e) => setDificuldade(e.target.value)} required className=' border-black border-b-2' />
            </label>


            <button type="submit"  className='w-60 bg-Primaria rounded-sm text-white'>Add Section</button>
        </form>
    );
}

export default AddSection;
