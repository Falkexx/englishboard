// Aprender.tsx
'use client';

import { useState } from 'react';
import Select_1_of_3 from './components/selectOneOfThree';
import Select_1_image from './components/selectOneImg';

const modulo = [
    {
        type: 'Select_1_of_3',
        question: 'The Man',
        answerTitle: [
            "Mulher", "Menino", "O", "Bola", "Homem"
        ],
        correctAnswer: ["O", "Homem"]
    },
    {
        type: 'Select_1_of_3',
        question: 'The Woman',
        answerTitle: [
            "Mulher", "Menino", "A", "Direita", "Homem"
        ],
        correctAnswer: ["A", "Mulher"]
    },
    {
        type: 'Select_1_image',
        question: 'The Woman',
        answerTitle: [
            "Mulher", "Menino", "A", "Direita", "Homem"
        ],
        correctAnswer: ["A", "Mulher"]
    }
];

function Aprender() {
    const [currentLesson, setCurrentLesson] = useState(0);
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);

    const handleComplete = () => {
        setCompletedLessons([...completedLessons, currentLesson]);
    };

    const handleNext = () => {
        if (currentLesson < modulo.length - 1) {
            setCurrentLesson(currentLesson + 1);
        }
    };

    function PlayAudio(){

        var audio = new Audio('https://firebasestorage.googleapis.com/v0/b/englishboard-c566e.appspot.com/o/images%2FvoicefyLP68J.mp3?alt=media&token=8603947f-7b90-4237-a498-0fb77ed1f90c')

        return audio.play();
    }

    return (
        <div>
            Tela de lições
            <audio controls>
                <source src='https://firebasestorage.googleapis.com/v0/b/englishboard-c566e.appspot.com/o/images%2FvoicefyLP68J.mp3?alt=media&token=8603947f-7b90-4237-a498-0fb77ed1f90c' type='audio/mp3'/>
            </audio>

            <button onClick={()=>{PlayAudio()}}>Play futebol</button>
            {modulo.map((lesson, index) => (
                index === currentLesson && lesson.type === 'Select_1_of_3' && (
                    <Select_1_of_3
                        key={index}
                        lesson={lesson}
                        onComplete={handleComplete}
                    />
                )
            ))}
            {modulo.map((lesson, index) => (
                index === currentLesson && lesson.type === 'Select_1_image' && (
                    <Select_1_image
                        key={index}
                        lesson={lesson}
                        onComplete={handleComplete}
                    />
                )
            ))}
            {currentLesson < modulo.length - 1 && (
                <button onClick={handleNext}>Avançar</button>
            )}
        </div>
    );
}

export default Aprender;
