import { useState, useEffect } from 'react';
import { db, storage } from '@/Server/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface SectionsDados {
    achivment: string
    dificuldade: string
    moduleName: string
    qtdConcluidos: number
    qtdLessons: number
    sectionID: string
    xpParaFazer: number
    id: string
}

function AddModule() {
    const [moduleName, setModuleName] = useState('');
    const [achivment, setAchivment] = useState(0);
    const [qtdConcluidos, setQtdConcluidos] = useState(0);
    const [dificuldade, setDificuldade] = useState('');
    const [qtdLessons, setQtdLessons] = useState(0);
    const [xpParaFazer, setXpParaFazer] = useState(0);
    const [sectionID, setSectionID] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [sections, setSections] = useState<SectionsDados[]>([]);

    useEffect(() => {
        const fetchSections = async () => {
            const UserRef = collection(db, 'sections');
            const data = await getDocs(UserRef);
            const sectionsList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setSections(sectionsList);
        };
        fetchSections();
    }, []);

    const handleImageUpload = async () => {
        if (!imageFile) return null;

        setUploading(true);
        const storageRef = ref(storage, `modulos/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        return new Promise<string>((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Handle progress updates if needed
                },
                (error) => {
                    console.error("Upload error: ", error);
                    setUploading(false);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setImageURL(downloadURL);
                        setUploading(false);
                        resolve(downloadURL);
                    } catch (error) {
                        console.error("Error getting download URL: ", error);
                        setUploading(false);
                        reject(error);
                    }
                }
            );
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let imgURL = imageURL;

            if (imageFile && !imageURL) {
                imgURL = await handleImageUpload();
            }

            await addDoc(collection(db, "modulos"), {
                moduleName,
                achivment,
                qtdConcluidos,
                dificuldade,
                qtdLessons,
                xpParaFazer,
                sectionID,
                imageURL: imgURL
            });
            alert("Module added!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col'>
            <label>Nome do Modulo</label>
            <input type="text" placeholder="Module Name" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />

            <label>Quantos XP o aluno vai ganhar ao concluir esse módulo</label>
            <input type="number" placeholder="Achivment" value={achivment} onChange={(e) => setAchivment(Number(e.target.value))} required />

            <label>Quantidade de alunos que concluiram o modulo</label>
            <input type="number" placeholder="QTD Concluidos" value={qtdConcluidos} onChange={(e) => setQtdConcluidos(Number(e.target.value))} required />

            <label>Qual será o nível de dificuldade desse módulo</label>
            <input type="text" placeholder="Dificuldade" value={dificuldade} onChange={(e) => setDificuldade(e.target.value)} required />

            <label>Quantos Capitulos terá esse módulo</label>
            <input type="number" placeholder="QTD Lessons" value={qtdLessons} onChange={(e) => setQtdLessons(Number(e.target.value))} required />

            <label>Quantidade de XP para fazer</label>
            <input type="number" placeholder="XP Para Fazer" value={xpParaFazer} onChange={(e) => setXpParaFazer(Number(e.target.value))} required />

            <label>A qual section ele pertence</label>
            <select name="Sections" id="" className='w-full border border-solid border-black' onChange={(e) => setSectionID(e.target.value)} required>
                <option value="">Selecione uma section</option>
                {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                        {section.sectionName} | {section.id}
                    </option>
                ))}
            </select>

            <label>Imagem do Módulo</label>
            <input type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} required />

            {uploading && <p>Uploading...</p>}

            <button type="submit" className='w-60 bg-Primaria rounded-sm text-white'>Add Module</button>
        </form>
    );
}

export default AddModule;
