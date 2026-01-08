
import React, { useMemo } from 'react';

const Confetti: React.FC = () => {
    const confettiPieces = useMemo(() => {
        const pieces = [];
        const colors = ['#fde047', '#86efac', '#fca5a5', '#93c5fd', '#c4b5fd'];
        for (let i = 0; i < 150; i++) {
            pieces.push({
                id: i,
                style: {
                    left: `${Math.random() * 100}vw`,
                    top: `${Math.random() * -50}vh`,
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `fall ${Math.random() * 2 + 3}s ${Math.random() * 2}s linear forwards`,
                },
            });
        }
        return pieces;
    }, []);

    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-50">
            <style>
                {`
                @keyframes fall {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(120vh) rotate(720deg); opacity: 0; }
                }
                `}
            </style>
            {confettiPieces.map(piece => (
                <div key={piece.id} className="absolute" style={piece.style}></div>
            ))}
        </div>
    );
};

export default Confetti;
