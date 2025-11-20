import React, { useEffect, useRef } from 'react'
import { useFrame, Canvas, useLoader } from '@react-three/fiber/native'
import { useGLTF, Environment, useTexture, OrbitControls } from '@react-three/drei/native'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader, RepeatWrapping } from 'three'

export const Post = ({ postRef, lineRef, topcrossbarRef, leftcrossbarRef, rightcrossbarRef }: { postRef?: any, lineRef?: any, topcrossbarRef: any, leftcrossbarRef:any, rightcrossbarRef:any }) => {

    const gltf = useLoader(GLTFLoader, '/goalpost.glb');

    //  useFrame(() => {
    //     shoeRef.current.rotation.y += 0.01

    // },[])
    const crossbarTexture = useLoader(TextureLoader, 'full-frame-shot-green-rug.jpg')
          crossbarTexture.wrapS = RepeatWrapping
          crossbarTexture.wrapT = RepeatWrapping
          crossbarTexture.repeat.set(3, 3)
    return (
        <group position={[-15, 0.5, 0]} >
            
            {/* Right post */}
            <group>
            <mesh position={[1.85, 0.2, 3.9]} scale={[2, 1, 1.5]} ref={leftcrossbarRef}>
                <cylinderGeometry args={[0.1, 0.1, 3.9]} />
                <meshStandardMaterial  map={crossbarTexture}/>
            </mesh>
            <mesh position={[2.5, 0.2, -3.5]} scale={[2, 1, 1.5]} ref={rightcrossbarRef}>
                <cylinderGeometry args={[0.1, 0.1, 3.9]} />
                <meshStandardMaterial  map={crossbarTexture}/>
            </mesh>
            {/* topbar */}
            <mesh position={[1.95, 2, 0.15]} rotation={[ Math.PI / 2, 0, 0.1]} scale={[2, 1, 1.5]} ref={topcrossbarRef}>
                <cylinderGeometry args={[0.1, 0.1, 7.45]} />
                <meshStandardMaterial map={crossbarTexture} />
            </mesh>
            </group>
            <primitive
                ref={postRef}
                object={gltf.scene}
                rotation={[0, -4.81, 0]}
                scale={[2, 2, 2]} />

            <mesh position={[1.5, -0.2, 0.1]} rotation={[0, Math.PI / 2, 0]} ref={lineRef}>
                <planeGeometry args={[7.2, 4]} />
                <meshStandardMaterial
                    color="#1a34a9ff"
                    transparent
                    opacity={0.05}
                />
            </mesh>

        </group>)
}
