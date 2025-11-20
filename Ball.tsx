import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber/native'
import { useGLTF, Environment, useTexture, OrbitControls } from '@react-three/drei/native'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

export const Ball = ({
    ballRef,
    keeperRef,
    postRef,
    onGoal,
    lineRef,
    difficulty,
    topcrossbarRef,
    leftcrossbarRef,
    rightcrossbarRef }: {
        ballRef?: any,
        keeperRef?: any,
        postRef?: any,
        onGoal: any,
        difficulty: any,
        lineRef: any,
        topcrossbarRef: any,
        leftcrossbarRef: any,
        rightcrossbarRef: any
    }) => {

    const gltf = useLoader(GLTFLoader, '/low_poly_cartoon_football_ball_free.glb');

    // linear velocity in scene units per second
    const velocity = useRef(new THREE.Vector3(0, 0, 0))
    const radiusRef = useRef<number | null>(null)


    const mouseDownTime = useRef<number | null>(null)

    const handlePointerDown = (e: any) => {
        e.stopPropagation()
        mouseDownTime.current = Date.now()
    }

    const handlePointerUp = (e: any) => {
        e.stopPropagation()
        const mesh = ballRef.current
        if (!mesh || mouseDownTime.current === null) return

        // calculate hold duration in seconds
        const holdDuration = (Date.now() - mouseDownTime.current) / 1000
        mouseDownTime.current = null

        // e.point is the intersection point in world space
        const target = new THREE.Vector3().copy(e.point)
        // direction from target to mesh (opposite of target->mesh)
        const dir = new THREE.Vector3().subVectors(mesh.position, target).normalize()

        // power increases with hold duration
        const minSpeed = 15
        const maxSpeed = 50
        const maxHoldTime = 4 // max hold time in seconds for full power

        // calculate speed based on hold duration (clamped to max)
        const holdRatio = Math.min(holdDuration / maxHoldTime, 1)
        const speed = minSpeed + (maxSpeed - minSpeed) * holdRatio

        velocity.current.copy(dir.multiplyScalar(speed))
    }
    // update position each frame
    useFrame((state, delta) => {
        const mesh = ballRef.current
        if (!mesh) return

        // compute bounding radius once (in world scale) for collision checks
        if (radiusRef.current === null) {
            try {
                const box = new THREE.Box3().setFromObject(mesh)
                const sphere = box.getBoundingSphere(new THREE.Sphere())
                radiusRef.current = sphere.radius || 0.05
            } catch (err) {
                radiusRef.current = 0.05
            }
        }
        const radius = radiusRef.current || 0.05

        // apply gravity (downward acceleration)
        const gravity = -9.8 // m/s² (negative because it pulls down on y-axis)
        velocity.current.y += gravity * delta

        // integrate simple Euler
        mesh.position.addScaledVector(velocity.current, delta)

        // apply simple damping so it slows down over time; higher damping for the faster initial speed
        velocity.current.multiplyScalar(Math.max(0, 1 - 2.0 * delta))

        // simple collision with the pitch plane at y = 0
        const planeY = 0
        if (mesh.position.y - radius <= planeY) {
            // prevent penetration
            mesh.position.y = planeY + radius
            // bounce: invert y velocity with restitution
            const restitution = 0.6 // how bouncy the collision is (0..1)
            if (velocity.current.y < 0) {
                velocity.current.y = -velocity.current.y * restitution
            }
            // apply friction on horizontal movement upon contact
            const friction = 0.2
            velocity.current.x *= friction
            velocity.current.z *= friction
            // if vertical velocity is very small, stop vertical movement
            if (Math.abs(velocity.current.y) < 0.05) velocity.current.y = 0
        }

        // Keeper collision detection
        const keeper = keeperRef.current // You'll need to pass keeperRef as a prop
        if (keeper) {
            const keeperBox = new THREE.Box3().setFromObject(keeper)
            const ballSphere = new THREE.Sphere(mesh.position, radius)

            if (keeperBox.intersectsSphere(ballSphere)) {
                // Ball hit the keeper - bounce back
                const keeperCenter = new THREE.Vector3()
                keeperBox.getCenter(keeperCenter)

                // Calculate bounce direction (away from keeper)
                const bounceDir = new THREE.Vector3()
                    .subVectors(mesh.position, keeperCenter)
                    .normalize()

                // Apply bounce velocity
                const bounceSpeed = 3
                velocity.current.copy(bounceDir.multiplyScalar(bounceSpeed))

                // Move ball outside keeper to prevent sticking
                mesh.position.copy(keeperCenter).add(bounceDir.multiplyScalar(radius + 0.5))
            }
        }

        // Goal post collision detection

        const topcrossbar = topcrossbarRef?.current
        const leftcrossbar = leftcrossbarRef?.current
        const rightcrossbar = rightcrossbarRef?.current

        const crossbars = [
            { ref: topcrossbar, name: 'top' },
            { ref: leftcrossbar, name: 'left' },
            { ref: rightcrossbar, name: 'right' }
        ]

        for (const crossbar of crossbars) {
            if (crossbar.ref) {
                const crossbarBox = new THREE.Box3().setFromObject(crossbar.ref)
                const ballSphere = new THREE.Sphere(mesh.position, radius)

                if (crossbarBox.intersectsSphere(ballSphere)) {
                    // Ball hit the crossbar - bounce back
                    const crossbarCenter = new THREE.Vector3()
                    crossbarBox.getCenter(crossbarCenter)

                    // Calculate bounce direction (away from crossbar)
                    const bounceDir = new THREE.Vector3()
                        .subVectors(mesh.position, crossbarCenter)
                        .normalize()

                    // Preserve some of the original velocity for realistic bounce
                    const currentSpeed = velocity.current.length()
                    const bounceSpeed = Math.max(currentSpeed * 0.7, 2) // At least 3 units/sec

                    velocity.current.copy(bounceDir.multiplyScalar(bounceSpeed))

                    // Move ball outside crossbar to prevent sticking
                    mesh.position.copy(crossbarCenter).add(bounceDir.multiplyScalar(radius + 0.2))

                    // Break after first collision to avoid multiple bounces per frame
                    break
                }
            }
        }

        const post = postRef.current // Pass postRef as a prop



        const line = lineRef.current

        if (line || post) {
            const ballPos = mesh.position
            const ballRadius = radius

            const goalLine = new THREE.Box3().setFromObject(line)
            const ballSphere = new THREE.Sphere(mesh.position, radius)

            if (goalLine.intersectsSphere(ballSphere)) {
                // Ball hit the plane, goal scored
                // const goalLineCenter = new THREE.Vector3()
                // goalLine.getCenter(goalLineCenter)
                velocity.current.multiplyScalar(0.3)
                    onGoal()
                    // Reset ball position after goal
                    setTimeout(() => {
                        mesh.position.set(0, 0.5, 0)
                        velocity.current.set(0, 0, 0)
                    }, 1000)
                console.log('Goalllllllll')
            }

        }



    })

    return (
        <primitive
            ref={ballRef}
            object={gltf.scene}
            position={[0, 0, 0]}
            //   rotation={[Math.PI / 3, Math.PI / 1.4, Math.PI / 6]}
            scale={[0.005, 0.005, 0.005]}
            //   onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        />
    )
}
