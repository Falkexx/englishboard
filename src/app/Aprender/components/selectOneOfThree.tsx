'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lesson {
    question: string;
    answerTitle: string[];
    correctAnswer: string[];
}

interface Select_1_of_3Props {
    lesson: Lesson;
    onComplete: () => void;
}

function Select_1_of_3({ lesson, onComplete }: Select_1_of_3Props) {
    const [resposta, setResposta] = useState<string[]>([]);
    const [isRight, setIsRight] = useState(false);
    const [opcoes, setOpcoes] = useState<string[]>([]);

    function RegistrarResposta(title: string) {
        setResposta([...resposta, title]);
        setOpcoes(opcoes.filter(opcao => opcao !== title));
    }

    function RemoverResposta(title: string) {
        setResposta(resposta.filter(res => res !== title));
        setOpcoes([...opcoes, title]);
    }

    function arraysEqual(arr1: string[], arr2: string[]) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        return arr1.every((value, index) => value === arr2[index]);
    }

    useEffect(() => {
        if (arraysEqual(resposta, lesson.correctAnswer)) {
            setIsRight(true);
            onComplete();
        } else {
            setIsRight(false);
        }
    }, [resposta]);

    useEffect(() => {
        setOpcoes([...lesson.answerTitle]);
    }, [lesson]);

    return (
        <div>
            <h1>{lesson.question}</h1>

            {!isRight ? (
                <div className="w-full bg-slate-200 h-6 flex flex-row">
                    <AnimatePresence>
                        {resposta.map((e, index) => (
                            <motion.h1
                                key={index}
                                className="cursor-pointer"
                                onClick={() => RemoverResposta(e)}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                {e}
                            </motion.h1>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="w-full bg-green-950 h-6 flex flex-row">
                    <AnimatePresence>
                        {resposta.map((e, index) => (
                            <motion.h1
                                key={index}
                                className="cursor-pointer"
                                onClick={() => RemoverResposta(e)}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                {e}
                            </motion.h1>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <div className="w-full flex flex-row gap-2">
                <AnimatePresence>
                    {opcoes.map((e, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <button className="bg-slate-300 border border-solid p-3" onClick={() => { RegistrarResposta(e) }}>{e}</button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Select_1_of_3;
