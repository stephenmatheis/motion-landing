'use client';

import styles from './page.module.scss';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Cube } from '@/components/cube';
import { Sphere } from '@/components/sphere';

const SHOW_CONTROLS = false;
const SHOW_ROTATE = true;

export default function RootPage() {
    // DEV:

    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const [rotationZ, setRotationZ] = useState(0);

    const [rotationTextX, setRotationTextX] = useState(0);
    const [rotationTextY, setRotationTextY] = useState(0);
    const [rotationTextZ, setRotationTextZ] = useState(0);

    const [isRotating, setIsRotating] = useState<boolean>(false);

    // DEV:

    return (
        <>
            <div className={styles.canvas}>
                <Canvas>
                    <ambientLight intensity={3} />
                    <Cube position={[0, 0, 0]} isRotating={isRotating} />
                    {/* <Cube position={[-3.5, 0, 0]} isRotating={isRotating} /> */}
                    {/* <Sphere position={[3.5, 0, 0]} isRotating={isRotating} /> */}
                    <OrbitControls />
                </Canvas>
            </div>

            {/* Controls */}
            <div style={{ display: SHOW_CONTROLS ? 'block' : 'none' }}>
                {/* Mesh Rotation */}
                <div
                    className={styles.controls}
                    style={{
                        position: 'fixed',
                        left: '1rem',
                        bottom: '1rem',
                        zIndex: 1000,
                        fontFamily: 'var(--font-monospace)',
                        fontSize: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                        }}
                    >
                        <label>Rotation X</label>
                        <input
                            type="range"
                            value={rotationX}
                            min={-Math.PI * 2}
                            max={Math.PI * 2 + 0.01}
                            step={Math.PI / 4}
                            onChange={(e) =>
                                setRotationX(parseFloat(e.target.value))
                            }
                        />
                        <span>{rotationX.toFixed(2)}</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                        }}
                    >
                        <label>Rotation Y</label>
                        <input
                            type="range"
                            value={rotationY}
                            min={-Math.PI * 2}
                            max={Math.PI * 2 + 0.01}
                            step={Math.PI / 4}
                            onChange={(e) =>
                                setRotationY(parseFloat(e.target.value))
                            }
                        />
                        <span>{rotationY.toFixed(2)}</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                        }}
                    >
                        <label>Rotation Z</label>
                        <input
                            type="range"
                            value={rotationZ}
                            min={-Math.PI * 2}
                            max={Math.PI * 2 + 0.01}
                            step={Math.PI / 4}
                            onChange={(e) =>
                                setRotationZ(parseFloat(e.target.value))
                            }
                        />
                        <span>{rotationZ.toFixed(2)}</span>
                    </div>

                    {/* Rotate */}
                    <div
                        style={{
                            position: 'fixed',
                            top: '1rem',
                            right: '1rem',
                            zIndex: 1000,
                            fontFamily: 'var(--font-monospace)',
                            fontSize: '20px',
                            cursor: 'pointer',
                            backgroundColor: 'var(--primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            color: 'white',
                        }}
                        onClick={() => setIsRotating((prev) => !prev)}
                    >
                        {isRotating ? 'Stop' : 'Start'} Rotation
                    </div>
                </div>

                {/* Text Rotation */}
                <div
                    className={styles.controls}
                    style={{
                        position: 'fixed',
                        right: '1rem',
                        bottom: '1rem',
                        zIndex: 1000,
                        fontFamily: 'var(--font-monospace)',
                        fontSize: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                        }}
                    >
                        <label>Text X</label>
                        <input
                            type="range"
                            value={rotationTextX}
                            min={-Math.PI * 2}
                            max={Math.PI * 2 + 0.01}
                            step={Math.PI / 4}
                            onChange={(e) =>
                                setRotationTextX(parseFloat(e.target.value))
                            }
                        />
                        <span style={{ minWidth: '5ch' }}>
                            {rotationTextX.toFixed(2)}
                        </span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                        }}
                    >
                        <label>Text Y</label>
                        <input
                            type="range"
                            value={rotationTextY}
                            min={-Math.PI * 2}
                            max={Math.PI * 2 + 0.01}
                            step={Math.PI / 4}
                            onChange={(e) =>
                                setRotationTextY(parseFloat(e.target.value))
                            }
                        />
                        <span>{rotationTextY.toFixed(2)}</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                        }}
                    >
                        <label>Text Z</label>
                        <input
                            type="range"
                            value={rotationTextZ}
                            min={-Math.PI * 2}
                            max={Math.PI * 2 + 0.01}
                            step={Math.PI / 4}
                            onChange={(e) =>
                                setRotationTextZ(parseFloat(e.target.value))
                            }
                        />
                        <span>{rotationTextZ.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Rotate */}
            <div
                style={{
                    display: SHOW_ROTATE ? 'block' : 'none',
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 1000,
                    fontFamily: 'var(--font-monospace)',
                    fontSize: '20px',
                    cursor: 'pointer',
                    backgroundColor: 'var(--primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    color: 'white',
                }}
                onClick={() => setIsRotating((prev) => !prev)}
            >
                {isRotating ? 'Stop' : 'Start'} Rotation
            </div>
        </>
    );
}
