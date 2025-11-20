import React, { useState, useEffect } from 'react'
export const ScoreSheet = ({
    score,
    setScore,
    difficulty,
    setDifficulty,
    time,
    setTime,
    isPlaying,
    setIsPlaying,
    restartGame,
    points,
    setPoints,
    notification,
    shotsRemaining,
    highScore
}) => {

    // const resetGame = () => {
    //     console.log('reset cgame pressed -->')
    //     setScore(0)
    //     setTime(0)
    //     setIsPlaying(false)
    // }


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return (
        <div>
            {/* <Html> */}
            <div style={{ width: '100vw', height: '100vh', position: 'absolute' }}>

                {/* Notification */}
                {notification && (
                    <div style={{
                        position: 'absolute',
                        top: '20%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 100,
                        animation: 'bounce 0.5s ease-out',
                        pointerEvents: 'none'
                    }}>
                        <div style={{
                            background: notification.type === 'success'
                                ? 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)'
                                : 'linear-gradient(135deg, #ff0055 0%, #cc0044 100%)',
                            padding: '40px 80px',
                            borderRadius: '30px',
                            border: '4px solid white',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(255, 255, 255, 0.3)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: '72px',
                                fontWeight: '900',
                                color: 'white',
                                textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
                                letterSpacing: '4px',
                                fontFamily: 'Arial Black, sans-serif'
                            }}>
                                {notification.message}
                            </div>
                        </div>
                    </div>
                )}

                <style>{`
        @keyframes bounce {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
          }
          70% {
            transform: translate(-50%, -50%) scale(0.9) rotate(-3deg);
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
                {/* Game UI Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    padding: '20px',
                    pointerEvents: 'none'
                }}>
                    {/* Score and Timer */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {/* Score */}
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            padding: '20px 40px',
                            borderRadius: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}>
                            <div style={{
                                marginBottom: '5px',
                                padding: '5px',
                                borderRadius: '10px',
                            }}>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#ffffffff',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    marginBottom: '5px',
                                    fontWeight: '600'
                                }}>Goals</div>
                                <div style={{
                                    fontSize: '48px',
                                    fontWeight: '900',
                                    color: '#00ff88',
                                    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                                    fontFamily: 'monospace'
                                }}>{score}</div>
                            </div>
                            <div
                                style={{
                                    display: 'flex'
                                }}>
                                <div style={{
                                    fontSize: '10px',
                                    color: '#f3f0f0ff',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    marginBottom: '2px',
                                    fontWeight: '600',
                                    paddingRight: '10px'
                                }}>Points</div>
                                <div style={{
                                    fontSize: '10px',
                                    fontWeight: '900',
                                    color: '#00ff88',
                                    textShadow: '0 0 20px rgba(57, 58, 58, 0.5)',
                                    fontFamily: 'monospace'
                                }}>{points}</div>
                            </div>

                            { highScore > 0 && <div
                                style={{
                                    display: 'flex'
                                }}>
                                <div style={{
                                    fontSize: '8px',
                                    color: '#f3f0f0ff',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    marginBottom: '2px',
                                    fontWeight: '600',
                                    paddingRight: '10px'
                                }}>highest Score</div>
                                <div style={{
                                    fontSize: '8px',
                                    fontWeight: '900',
                                    color: '#00ff88',
                                    textShadow: '0 0 20px rgba(57, 58, 58, 0.5)',
                                    fontFamily: 'monospace'
                                }}>{highScore}</div>
                            </div>}


                        </div>

                        {/* Timer */}
                        <div style={{
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            padding: '20px 40px',
                            borderRadius: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}>
                            <div style={{
                                fontSize: '14px',
                                color: '#888',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '5px',
                                fontWeight: '600'
                            }}>Time</div>
                            <div style={{
                                fontSize: '48px',
                                fontWeight: '900',
                                color: '#00d4ff',
                                textShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
                                fontFamily: 'monospace'
                            }}>{formatTime(time)}</div>
                        </div>

                        {/* Shots Remaining */}

                    </div>
                </div>

                {/* Difficulty Control */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    pointerEvents: 'auto'
                }}>

                    <div style={{
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(10px)',
                        padding: '12px 20px',
                        borderRadius: '15px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>
                        <span style={{
                            fontSize: '11px',
                            color: '#888',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontWeight: '600'
                        }}>
                            difficulty
                        </span>

                        <span style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: difficulty === 1 ? '#00ff88' : difficulty === 2 ? '#ffaa00' : '#ff0055',
                            minWidth: '20px',
                            textAlign: 'center'
                        }}>
                            {difficulty}
                        </span>

                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={difficulty}
                            onChange={(e) => setDifficulty(Number(e.target.value))}
                            style={{
                                width: '120px',
                                height: '6px',
                                borderRadius: '3px',
                                background: `linear-gradient(to right, #00ff88 0%, #ffaa00 50%, #ff0055 100%)`,
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        />

                    </div>
                </div>



                {/* Restart Game */}
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    pointerEvents: 'auto'
                }}>
                    <div style={{
                        background: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(10px)',
                        padding: '25px 40px',
                        borderRadius: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        minWidth: '400px'
                    }}>
                        <button
                            onClick={restartGame}
                            style={{
                                marginTop: '20px',
                                width: '100%',
                                padding: '12px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '10px',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                transition: 'transform 0.2s',
                            }}
                        // onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        // onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Restart Game
                        </button>
                    </div>
                </div>


                <div style={{
                    position: 'absolute',
                    top: '120px',
                    right: '20px',
                    zIndex: 10,
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)',
                    padding: '20px',
                    borderRadius: '15px',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    maxWidth: '250px',
                    pointerEvents: 'none'
                }}>
                    <div>
                        <div style={{
                            fontSize: '14px',
                            color: '#888',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '5px',
                            fontWeight: '600'
                        }}>Shots Left</div>
                        <div style={{
                            fontSize: '48px',
                            fontWeight: '900',
                            color: shotsRemaining === 0 ? '#ff0055' : shotsRemaining === 1 ? '#ffaa00' : '#00d4ff',
                            textShadow: `0 0 20px ${shotsRemaining === 0 ? 'rgba(255, 0, 85, 0.5)' : shotsRemaining === 1 ? 'rgba(255, 170, 0, 0.5)' : 'rgba(0, 212, 255, 0.5)'}`,
                            fontFamily: 'monospace'
                        }}>{shotsRemaining}</div>
                    </div>
                    <div style={{
                        fontSize: '12px',
                        color: '#aaa',
                        lineHeight: '1.6'
                    }}>
                        <div style={{ color: '#00ff88', fontWeight: '700', marginBottom: '10px' }}>
                            HOW TO PLAY
                        </div>
                        <div>🖱️ Click & hold the ball</div>
                        <div>⚡ Longer hold = stronger kick</div>
                        <div>🥅 Score past the keeper!</div>
                        <div>You have only 3 attempts on goal!</div>
                    </div>
                </div>
            </div>
            {/* </Html> */}
        </div>
    )
}

