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
    restartGame
}) => {

    const resetGame = () => {
        console.log('reset cgame pressed -->')
        setScore(0)
        setTime(0)
        setIsPlaying(false)
    }


    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return (
        <div>
        {/* <Html> */}
        <div style={{ width: '100vw', height: '100vh', position: 'absolute' }}>
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
                            fontSize: '14px',
                            color: '#888',
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
           
           {/* Reset Game
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
                        onClick={resetGame}
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
                        Reset Game
                    </button>
                </div>
            </div> */}

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
                </div>
            </div>
        </div>
        {/* </Html> */}
        </div>
    )
}

