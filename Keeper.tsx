import React, { useEffect, useRef } from 'react'
import { useFrame, Canvas, useLoader } from '@react-three/fiber/native'
import { useGLTF, Environment, useTexture, OrbitControls } from '@react-three/drei/native'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export const Keeper = ({ keeperRef, difficulty }: { keeperRef?: any, difficulty: any }) => {


    const gltf = useLoader(GLTFLoader, '/Keeper.glb');
    const keeperDirection = useRef(1)
    useFrame((state, delta) => {
        const keeper = keeperRef.current
        if (!keeper) return

        // Side-to-side animation
        const baseSpeed = 2
        const speed = baseSpeed * (1 + difficulty * 0.5) // units per second
        const range = 3 // how far to move from center (total width = range * 2)

        keeper.position.z += speed * delta * keeperDirection.current

        // Reverse direction at boundaries
        if (keeper.position.z > range) {
            keeper.position.z = range
            keeperDirection.current = -1
        } else if (keeper.position.z < -range) {
            keeper.position.z = -range
            keeperDirection.current = 1
        }
    })

    //  useFrame(() => {
    //     shoeRef.current.rotation.y += 0.01

    // },[])
    return (
        <primitive
            ref={keeperRef}
            object={gltf.scene}
            position={[-11, 0.2, 0.2]}
            rotation={[Math.PI / 2, Math.PI / 1, Math.PI / -1.8]}
            scale={[1, 1, 1]} />)

}