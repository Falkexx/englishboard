'use client'
import { useState, useEffect } from 'react';
import { db, storage } from '@/Server/firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function AddLesson() {
    const [type, setType] = useState('');
    const [question, setQuestion] = useState('');
    const [answerTitle, setAnswerTitle] = useState<string[]>(['', '']);
    const [correctAnswer, setCorrectAnswer] = useState<string[]>(['', '']);
    const [moduleName, setModuleName] = useState('');
    const [lessonDificult, setLessonDificult] = useState('');
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [audio, setAudio] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [capituloslist, setCapituloslist] = useState([])
    const [capID, setCapID] = useState('')

    const handleImageUpload = () => {
        if (!imageFile) return;
        const storageRef = ref(storage, `lessons/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => { },
            (error) => console.error(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "lessons"), {
                type,
                question,
                answerTitle,
                correctAnswer,
                lessonDificult,
                imgUrl,
                audio,
                capID
            });
            alert("Lesson added!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    useEffect(() => {
        const fetchSections = async () => {
            const UserRef = collection(db, 'capitulos');
            const data = await getDocs(UserRef);
            const Capitulos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setCapituloslist(Capitulos);
        };
        fetchSections();
    }, []);




    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="">Selecione o tipo da question</option>
                <option value="select_1_of_3">Select 1 of 3</option>
                <option value="select_1_image">Select 1 Image</option>
            </select>

            <h1>Selecione o capitulo responsável</h1>
            <select onChange={(e)=>{setCapID(e.target.value)}}>
                <option>Selecione o capitulo name</option>
                {capituloslist.map((cap)=>{

                    return(

                        <option value={cap.id}>{cap.capName} | {cap.id}</option>
                    )
                })}
            </select>
            <input type="text" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} required className='border-black border-b-2' />
            <input type="text" placeholder="Answer Title 1" value={answerTitle[0]} onChange={(e) => setAnswerTitle([e.target.value, answerTitle[1]])} required className='border-black border-b-2' />
            <input type="text" placeholder="Answer Title 2" value={answerTitle[1]} onChange={(e) => setAnswerTitle([answerTitle[0], e.target.value])} required className='border-black border-b-2' />
            <input type="text" placeholder="Correct Answer 1" value={correctAnswer[0]} onChange={(e) => setCorrectAnswer([e.target.value, correctAnswer[1]])} required className='border-black border-b-2' />
            <input type="text" placeholder="Correct Answer 2" value={correctAnswer[1]} onChange={(e) => setCorrectAnswer([correctAnswer[0], e.target.value])} required className='border-black border-b-2' />
            <input type="text" placeholder="Module Name" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required className='border-black border-b-2' />
            <input type="text" placeholder="Lesson Dificult" value={lessonDificult} onChange={(e) => setLessonDificult(e.target.value)} required className='border-black border-b-2' />
            <input type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} />
            <button type="button" onClick={handleImageUpload}>Upload Image</button>
            <button type="submit">Add Lesson</button>
        </form>
    );
}

export default AddLesson;
