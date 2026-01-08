import React from 'react';
import { WordType } from '../types';

type LegendItemProps = {
    type: WordType;
    config: { 
        color: string; 
        bgColor: string; 
        borderColor: string; 
        abbreviation: string; 
    };
    onClick: () => void;
    disabled: boolean;
    isSelected: boolean;
};

const LegendItem: React.FC<LegendItemProps> = ({ type, config, onClick, disabled, isSelected }) => {
    const { color, bgColor, borderColor, abbreviation } = config;
    
    const classes = [
        'flex', 'items-center', 'gap-2', 'px-3', 'py-2', 'rounded-lg', 'border-2', 'font-semibold', 'transition-all',
        color, bgColor, borderColor
    ];

    if (disabled) {
        classes.push('opacity-50', 'cursor-not-allowed');
    } else {
        classes.push('cursor-pointer', 'hover:scale-105');
    }
    
    if (isSelected) {
        classes.push('ring-4', 'ring-blue-400', 'ring-offset-2');
    }


    return (
        <button onClick={onClick} disabled={disabled} className={classes.join(' ')}>
            <span className="font-bold">{abbreviation}</span>
            <span>{type}</span>
        </button>
    );
};

export default LegendItem;