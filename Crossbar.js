export const Crossbar = ({ postRef }) => {
  return (
    <group ref={postRef} position={[-15, 0.5, 0]}>
      {/* Left post */}
      <mesh position={[0, 2, -2]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Right post */}
      <mesh position={[0, 2, 2]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, 4, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Net visual */}
      <mesh position={[-0.5, 2, 0]}>
        <boxGeometry args={[1, 4, 4]} />
        <meshStandardMaterial color="#cccccc" transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  )
}