import React from 'react';

const Football: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-40">
            <style>
                {`
                @keyframes bounce-and-roll {
                    0% {
                        transform: translate(-10vw, 75vh) rotate(0deg);
                        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* ease-out */
                    }
                    12.5% {
                        transform: translate(5vw, 15vh) rotate(90deg);
                        animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53); /* ease-in */
                    }
                    25% {
                        transform: translate(20vw, 75vh) rotate(180deg);
                        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    }
                    37.5% {
                        transform: translate(35vw, 15vh) rotate(270deg);
                        animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
                    }
                    50% {
                        transform: translate(50vw, 75vh) rotate(360deg);
                        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    }
                    62.5% {
                        transform: translate(65vw, 15vh) rotate(450deg);
                        animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
                    }
                    75% {
                        transform: translate(80vw, 75vh) rotate(540deg);
                        animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    }
                    87.5% {
                        transform: translate(95vw, 15vh) rotate(630deg);
                        animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
                    }
                    100% {
                        transform: translate(110vw, 75vh) rotate(720deg);
                    }
                }

                .football {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    animation: bounce-and-roll 6s linear forwards;
                }
                `}
            </style>
            <div className="football">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="#fff" d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0 0 114.6 0 256s114.6 256 256 256z"/>
                    <path d="m268.4 499.7.3-111.2-101.2-64.4 39.3-108.3-111-.3L80.3 111.4 188.7 72l111.1 2.2 64.1 101-1.9 111.3 108.6 38.8-11.4 110.8-108.3-39.3-36.5 102.3z"/>
                </svg>
            </div>
        </div>
    );
};

export default Football;
