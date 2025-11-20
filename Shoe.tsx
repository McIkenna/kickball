import React, {useEffect, useRef} from 'react'
import { useFrame, Canvas, useLoader } from '@react-three/fiber/native'
import { useGLTF, Environment, useTexture, OrbitControls } from '@react-three/drei/native'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
export const Shoe = () => {

const shoeRef = useRef<any>(null)
  const gltf = useLoader(GLTFLoader, '/Nike Shoe V2.glb');

  //  useFrame(() => {
  //     shoeRef.current.rotation.y += 0.01

  // },[])
  return (
  <primitive 
  ref={shoeRef}
  object={gltf.scene} 
  position={[0, 0.5, 0]} 
  rotation={[Math.PI / 3, Math.PI / 1.4, Math.PI/6]}
  scale={[4, 4, 4]} />)
  
}
