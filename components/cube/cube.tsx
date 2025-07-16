'use client';

import { useMemo, useRef } from 'react';

import * as THREE from 'three';
import { useFrame, Vector3, Euler } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';

type CubeProps = {
    position: [number, number, number];
    isRotating?: boolean;
};

export function Cube({ isRotating = true, ...props }: CubeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const textRefs = useRef<(THREE.Group | null)[]>([]);
    const targetRotation = [
        new THREE.Euler(Math.PI / 2, Math.PI / -4, Math.PI / 4), // moving to face 1
        new THREE.Euler(Math.PI / 2, Math.PI / -4, Math.PI * 0.75), // moving to face 2
        new THREE.Euler(Math.PI, 0, Math.PI), // moving to face 3
        new THREE.Euler(Math.PI / 2, Math.PI / 4, Math.PI * 1.25), // moving to face 4
        new THREE.Euler(Math.PI / 2, Math.PI / 4, Math.PI * 1.75), // moving to face 5
        new THREE.Euler(0, 0, Math.PI * 2), // moving to face 0
    ];
    const geometry = useMemo(() => {
        const shape = new THREE.Shape();
        const eps = 0.00001;
        const radius = 0.3 - eps;
        const size = 3;

        shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
        shape.absarc(eps, size - radius * 2, eps, Math.PI, Math.PI / 2, true);
        shape.absarc(
            size - radius * 2,
            size - radius * 2,
            eps,
            Math.PI / 2,
            0,
            true
        );
        shape.absarc(size - radius * 2, eps, eps, 0, -Math.PI / 2, true);

        const extrudeSettings = {
            depth: size - radius * 2,
            bevelEnabled: true,
            bevelSegments: 10,
            steps: 1,
            bevelSize: radius,
            bevelThickness: 0.3,
            curveSegments: 10,
        };

        const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geo.computeVertexNormals();
        geo.center();

        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationFromEuler(
            new THREE.Euler(Math.PI / 2, Math.PI / 4, 0)
        );

        geo.applyMatrix4(rotationMatrix);

        return geo;
    }, []);

    const ROTATION_DURATION = 1.5;
    const PAUSE_DURATION = 3.0;
    const HOLD_DURATION = 5.0;
    const TOTAL_CYCLE_DURATION = ROTATION_DURATION + PAUSE_DURATION;
    const SPEED = 0.05;
    const SCALE = 1;

    let startTime = 0;
    let lastCycleIndex = -1;

    // Rotate
    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        if (!textRefs.current.length) return;
        if (!isRotating) return;

        meshRef.current.scale.x = THREE.MathUtils.lerp(
            meshRef.current.scale.x,
            1,
            SPEED * 2
        );
        meshRef.current.scale.y = THREE.MathUtils.lerp(
            meshRef.current.scale.y,
            1,
            SPEED * 2
        );
        meshRef.current.scale.z = THREE.MathUtils.lerp(
            meshRef.current.scale.z,
            1,
            SPEED * 2
        );

        let elapsedTime = clock.getElapsedTime();

        if (!startTime) {
            startTime = elapsedTime;
        }

        elapsedTime = elapsedTime - startTime;

        if (meshRef.current.scale.x < 0.99) {
            console.log('grow text...');

            textRefs.current[0]?.scale.set(
                THREE.MathUtils.lerp(
                    textRefs.current[0].scale.x,
                    SCALE,
                    SPEED * 2
                ),
                THREE.MathUtils.lerp(
                    textRefs.current[0].scale.y,
                    SCALE,
                    SPEED * 2
                ),
                THREE.MathUtils.lerp(
                    textRefs.current[0].scale.z,
                    SCALE,
                    SPEED * 2
                )
            );

            return;
        }

        if (elapsedTime < HOLD_DURATION) return;

        elapsedTime = elapsedTime - HOLD_DURATION;

        const cycleIndex = Math.floor(elapsedTime / TOTAL_CYCLE_DURATION);
        const currentFace = cycleIndex % 6;
        const timeInCycle = elapsedTime % TOTAL_CYCLE_DURATION;
        const isRotatingInCycle = timeInCycle < ROTATION_DURATION;

        if (isRotatingInCycle) {
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                targetRotation[currentFace].x,
                SPEED
            );
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                targetRotation[currentFace].y,
                SPEED
            );
            meshRef.current.rotation.z = THREE.MathUtils.lerp(
                meshRef.current.rotation.z,
                targetRotation[currentFace].z,
                SPEED
            );

            // Grow text
            const growIndex = (currentFace + 1) % 6;

            textRefs.current[growIndex]?.scale.set(
                THREE.MathUtils.lerp(
                    textRefs.current[growIndex]?.scale.x,
                    SCALE,
                    SPEED
                ),
                THREE.MathUtils.lerp(
                    textRefs.current[growIndex]?.scale.y,
                    SCALE,
                    SPEED
                ),
                THREE.MathUtils.lerp(
                    textRefs.current[growIndex]?.scale.z,
                    SCALE,
                    SPEED
                )
            );

            // Shrink text
            const shrinkIndex = currentFace;

            textRefs.current[shrinkIndex]?.scale.set(
                THREE.MathUtils.lerp(
                    textRefs.current[shrinkIndex]?.scale.x,
                    0,
                    SPEED
                ),
                THREE.MathUtils.lerp(
                    textRefs.current[shrinkIndex]?.scale.y,
                    0,
                    SPEED
                ),
                THREE.MathUtils.lerp(
                    textRefs.current[shrinkIndex]?.scale.z,
                    0,
                    SPEED
                )
            );
        }

        if (
            currentFace === 0 &&
            cycleIndex > 0 &&
            cycleIndex !== lastCycleIndex
        ) {
            meshRef.current.setRotationFromEuler(new THREE.Euler(0, 0, 0));

            console.log('✅ Resetting position to [0, 0, 0]');

            lastCycleIndex = cycleIndex;
        }

        console.log(
            `Face: ${currentFace} | ${
                isRotatingInCycle ? 'Rotating' : 'Paused'
            }`
        );
    });

    const textProps = {
        font: '/fonts/space_mono.json',
        size: 0.3,
        height: 0.07,
        curveSegments: 5,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 5,
    };

    return (
        <>
            <pointLight position={[0, 0, 5]} intensity={100} color="#ffffff" />
            <mesh {...props} ref={meshRef} rotation={[0, 0, 0]} scale={0}>
                <primitive attach="geometry" object={geometry} />
                <meshStandardMaterial color="#ffffff" flatShading={true} />
                {[
                    {
                        position: [0, 0, 1.75],
                        text: 'Innovating\nYour Way',
                        color: '',
                        rotation: [0, 0, 0],
                    },
                    {
                        position: [1.25, 1.25, 0],
                        text: 'Full Stack\nDevelopment',
                        color: '',
                        rotation: [Math.PI / -2, Math.PI / 4, Math.PI / 4],
                    },
                    {
                        position: [1.25, -1.25, 0],
                        text: 'Cloud\nEngineering',
                        color: '',
                        rotation: [
                            Math.PI * -1.5,
                            Math.PI / 4,
                            Math.PI * -0.75,
                        ],
                    },
                    {
                        position: [0, 0, -1.75],
                        text: 'Digital\nTransformation',
                        color: '',
                        rotation: [0, Math.PI, 0],
                    },

                    {
                        position: [-1.25, -1.25, 0],
                        text: 'Data\nModeling',
                        color: '',
                        rotation: [Math.PI / 2, Math.PI / -4, Math.PI * 0.75],
                    },
                    {
                        position: [-1.25, 1.25, 0],
                        text: 'UI/UX\nDesign',
                        color: '',
                        rotation: [Math.PI / -2, Math.PI / -4, Math.PI / -4],
                    },
                ].map(({ position, text, color, rotation }, index) => (
                    <group
                        key={index}
                        ref={(el) => (textRefs.current[index] = el)}
                        scale={0}
                    >
                        <Center position={position as Vector3}>
                            <Text3D {...textProps} rotation={rotation as Euler}>
                                {text}
                                <meshStandardMaterial
                                    // color={color || '#ae0e00'}
                                    color={color || '#7b0a00'}
                                />
                            </Text3D>
                        </Center>
                    </group>
                ))}
            </mesh>
        </>
    );
}
