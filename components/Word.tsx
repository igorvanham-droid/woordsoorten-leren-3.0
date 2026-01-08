import React from 'react';
import { WordData, WordType } from '../types';
import { WORD_TYPE_CONFIG } from '../constants';

type WordProps = {
    wordData: WordData;
    userSelection?: WordType;
    onClick: () => void;
    result: 'correct' | 'incorrect' | 'unanswered';
    disabled: boolean;
    hintAbbreviation?: string;
};

const Word: React.FC<WordProps> = ({ wordData, userSelection, onClick, result, disabled, hintAbbreviation }) => {
    
    const baseClasses = ['p-2', 'rounded-lg', 'transition-all', 'duration-200', 'border-2', 'min-w-[5rem]', 'text-center'];
    const wordClasses = ['font-semibold', 'text-lg'];
    let typeAbbreviation = null;

    if (disabled) {
        baseClasses.push('cursor-not-allowed');
    } else {
        baseClasses.push('cursor-pointer');
    }

    if (userSelection) {
        const config = WORD_TYPE_CONFIG[userSelection];
        baseClasses.push(config.bgColor);
        
        if (result === 'correct') {
            baseClasses.push('border-green-500');
        } else if (result === 'incorrect') {
            baseClasses.push('border-red-500');
        } else {
            baseClasses.push(config.borderColor);
        }

        wordClasses.push(config.color);
        typeAbbreviation = config.abbreviation;
    } else {
        baseClasses.push('bg-gray-100', 'border-gray-300');
        if(!disabled) {
            baseClasses.push('hover:bg-gray-200');
        }
    }
    
    return (
        <div className="flex flex-col items-center min-h-[6rem]">
            <div className={baseClasses.join(' ')} onClick={!disabled ? onClick : undefined}>
                <span className={wordClasses.join(' ')}>{wordData.word}</span>
                {typeAbbreviation && (
                    <div className="text-xs font-bold mt-1 opacity-90">
                        {typeAbbreviation}
                    </div>
                )}
            </div>
            {hintAbbreviation && (
                 <div className="mt-1 text-sm font-bold text-gray-700">
                    Juist: <span className="text-blue-600">{hintAbbreviation}</span>
                </div>
            )}
        </div>
    );
};

export default Word;