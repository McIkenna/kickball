import React from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'
import * as THREE from 'three'
import { Asset } from 'expo-asset'

export const Pitch = () => {

    const grassTexture = useLoader(TextureLoader, 'full-frame-shot-green-rug.jpg')
      grassTexture.wrapS = RepeatWrapping
      grassTexture.wrapT = RepeatWrapping
      grassTexture.repeat.set(3, 3)

    return (
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[5, 1, 1]} receiveShadow>
            <planeGeometry args={[10, 20]} />
            <meshStandardMaterial map={grassTexture} />
        </mesh>
    )
}
