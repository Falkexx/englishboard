import { useState, useEffect } from 'react';
import { db } from '@/Server/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";

function AddCapitulo() {

    const [capName, setCapName] = useState('');
    const [qtdLessons, setQtdLessons] = useState<number>(0);
    const [ModuloID, setModuloID] = useState('');
    const [modulos, setModulos] = useState([]);
    const [capDescription, setCapDescription] = useState('')

    useEffect(() => {
        const fetchSections = async () => {
            const UserRef = collection(db, 'modulos');
            const data = await getDocs(UserRef);
            const modulosList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setModulos(modulosList);
        };
        fetchSections();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "capitulos"), {
                capName,
                qtdLessons,
                ModuloID,
                capDescription,
            });
            alert("capitulo added!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col'>
            <label>Titulo do capitulo</label>
            <input type="text" placeholder="Capitulo Name" value={capName} onChange={(e) => setCapName(e.target.value)} required />

            <label>Capitulo description</label>
            <input type="text" placeholder="Description" value={capDescription} onChange={(e) => setCapDescription((e.target.value))} required />


            <label>Qtd lessons</label>
            <input type="text" placeholder="qtd Lições" value={qtdLessons} onChange={(e:any) => setQtdLessons(e.target.value)} required />

            <label>A qual modulo ele pertence</label>
            <select name="Sections" id="" className='w-full border border-solid border-black' onChange={(e) => setModuloID(e.target.value)} required>
                <option value="">Selecione uma section</option>
                {modulos.map((modulos) => (
                    <option key={modulos.id} value={modulos.id}>
                        {modulos.moduleName} | {modulos.id}
                    </option>
                ))}
            </select>

            <button type="submit" className='w-60 bg-Primaria rounded-sm text-white'>Add Module</button>
        </form>
    );
}

export default AddCapitulo