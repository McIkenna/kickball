import React, { Suspense, useRef, useState, useEffect } from 'react'
import { useFrame, Canvas, useLoader, useThree } from '@react-three/fiber/native'
import { useGLTF, Environment, useTexture, OrbitControls, Text } from '@react-three/drei/native'
import * as THREE from 'three'
import { Pitch } from './Pitch'
import { Shoe } from './Shoe'
import { Ball } from './Ball'
import { Post } from './Post'
import { Keeper } from './Keeper'
import { ScoreSheet } from './ScoreSheet'
import { CenterPatch } from './CenterPatch'
// Camera follow component

export default function Football() {
    const ballRef = useRef<any>(null)
    const postRef = useRef<any>(null)
    const keeperRef = useRef<any>(null)
    const lineRef = useRef<any>(null)
    const wallRef = useRef<any>(null)
    const brickBackRef = useRef<any>(null)
    const brickLeftRef = useRef<any>(null)
    const brickRightRef = useRef<any>(null)
    const leftcrossbarRef = useRef<any>(null)
    const topcrossbarRef = useRef<any>(null)
    const rightcrossbarRef = useRef<any>(null)
    const [isGoal, setIsGoal] = useState(false)
    const [score, setScore] = useState(0)
    const [points, setPoints] = useState(0)
    const [notification, setNotification] = useState(null)
    const [difficulty, setDifficulty] = useState(1)
    const [time, setTime] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [shotsRemaining, setShotsRemaining] = useState(3)
    const [highScore, setHighScore] = useState(0);
    // const [restart, setRestart] = useState(false)

    useEffect(() => {
        const saved = Number(localStorage.getItem("highScore")) || 0;
        setHighScore(saved);
    }, []);


    // const updateHighScore = () => {

    // };

    const previous = Number(localStorage.getItem("highScore")) || 0;

    if (points > previous) {
        localStorage.setItem("highScore", points);
        setHighScore(points);
    }



    const handleGoal = () => {
        setScore(s => s + 1)
        switch(difficulty){
            case 2: {
                const newPoint = points + 100*1.2
                console.log('new Point -->', newPoint)
                setPoints(newPoint)
                break;
            }
            case 3:{ 
                setPoints(s => s + (100*1.3))
            break;
        }
            case 4: {
                setPoints(s => s + (100*1.4))
                break;
            }
            case 5: {
                setPoints(s => s + (100*1.5))
                break;
            }
            default:
                setPoints(s => s + 100)
                break;
        }
        
        // updateHighScore()
        if (!isPlaying) setIsPlaying(true)

    }

    const restartGame = () => {
        if (ballRef.current) {
            ballRef.current.position.set(0, 0.5, 0)
            setShotsRemaining(3)
        }
    }

    const showNotification = (message: any, type: any) => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 2000)
    }
    useEffect(() => {
        let interval: any;
        interval = setInterval(() => {
            setTime(t => t + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

  




    return (

        <>
            <ScoreSheet
                score={score}
                setScore={setScore}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                time={time}
                setTime={setTime}
                restartGame={restartGame}
                points={points}
                setPoints={setPoints}
                notification={notification}
                shotsRemaining={shotsRemaining}
                highScore={highScore}

            />
            <Canvas camera={{ position: [3, 2, 0], fov: 100 }}>
                {/* <axesHelper args={[2]}  /> */}
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={1.0}
                    rotateSpeed={0.4}
                    minDistance={1}
                    maxDistance={20}
                    maxPolarAngle={Math.PI / 2}
                    mouseButtons={{
                        LEFT: THREE.MOUSE.ROTATE,
                        MIDDLE: THREE.MOUSE.DOLLY,
                        RIGHT: THREE.MOUSE.PAN
                    }}
                    // Touch mappings
                    touches={{
                        ONE: THREE.TOUCH.ROTATE,
                        TWO: THREE.TOUCH.DOLLY_PAN
                    }}
                    // Keyboard controls
                    keys={{
                        LEFT: 'ArrowLeft',
                        UP: 'ArrowUp',
                        RIGHT: 'ArrowRight',
                        BOTTOM: 'ArrowDown'
                    }}
                    keyPanSpeed={10}
                />
                <color attach="background" args={[0xe2f4df]} />
                <ambientLight intensity={0.5} />
                <directionalLight intensity={1.5} position={[5, 10, 5]} />
                <directionalLight intensity={0.8} position={[-6, 2, 2]} />
                <directionalLight intensity={0.8} position={[6, 2, 2]} />
                <Suspense fallback={null}>
                    <Environment preset="park" />


                    <Post
                        postRef={postRef}
                        lineRef={lineRef}
                        topcrossbarRef={topcrossbarRef}
                        leftcrossbarRef={leftcrossbarRef}
                        rightcrossbarRef={rightcrossbarRef}
                        wallRef={wallRef}
                        brickBackRef={brickBackRef}
                        brickLeftRef={brickLeftRef}
                        brickRightRef={brickRightRef}
                    />
                    <Ball
                        ballRef={ballRef}
                        keeperRef={keeperRef}
                        postRef={postRef}
                        lineRef={lineRef}
                        wallRef={wallRef}
                        brickBackRef={brickBackRef}
                        brickLeftRef={brickLeftRef}
                        brickRightRef={brickRightRef}
                        onGoal={handleGoal}
                        points={points}
                        setPoints={setPoints}
                        isGoal={isGoal}
                        setIsGoal={setIsGoal}
                        difficulty={difficulty}
                        topcrossbarRef={topcrossbarRef}
                        leftcrossbarRef={leftcrossbarRef}
                        rightcrossbarRef={rightcrossbarRef}
                        showNotification={showNotification}
                        shotsRemaining={shotsRemaining}
                        setShotRemaining={setShotsRemaining}
                        restartGame={restartGame}
                    />
                    <Keeper
                        keeperRef={keeperRef}
                        difficulty={difficulty} />
                    <CenterPatch />
                    <Pitch />

                </Suspense>
            </Canvas>
        </>



    )
}