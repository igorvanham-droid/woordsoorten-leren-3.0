import React from 'react';

type FlowerProps = {
    style: React.CSSProperties;
    color: string;
};

const Flower: React.FC<FlowerProps> = ({ style, color }) => {
    const colors = {
        stem: '#4ade80', // green-400
        center: '#fde047', // yellow-300
    };

    return (
        <>
            <style>
                {`
                @keyframes grow {
                    from {
                        transform: scaleY(0);
                    }
                    to {
                        transform: scaleY(1);
                    }
                }
                .flower-container {
                    position: absolute;
                    bottom: -10px;
                    width: 80px;
                    height: 160px;
                    transform-origin: bottom;
                    animation: grow 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
                }
                `}
            </style>
            <div className="flower-container" style={style}>
                <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
                    {/* Stem */}
                    <path d="M 50 200 L 50 50" stroke={colors.stem} strokeWidth="5" />
                    
                    {/* Leaf 1 */}
                    <path d="M 50 140 C 30 130, 30 100, 50 90" fill={colors.stem} />

                    {/* Leaf 2 */}
                    <path d="M 50 120 C 70 110, 70 80, 50 70" fill={colors.stem} />
                    
                    {/* Petals */}
                    <g transform="translate(50, 50) scale(1.2)">
                        <circle cx="0" cy="-20" r="10" fill={color} transform="rotate(0)"/>
                        <circle cx="0" cy="-20" r="10" fill={color} transform="rotate(60)"/>
                        <circle cx="0" cy="-20" r="10" fill={color} transform="rotate(120)"/>
                        <circle cx="0" cy="-20" r="10" fill={color} transform="rotate(180)"/>
                        <circle cx="0" cy="-20" r="10" fill={color} transform="rotate(240)"/>
                        <circle cx="0" cy="-20" r="10" fill={color} transform="rotate(300)"/>
                    </g>
                    
                    {/* Center */}
                    <circle cx="50" cy="50" r="10" fill={colors.center} stroke="white" strokeWidth="1" />
                </svg>
            </div>
        </>
    );
};

export default Flower;