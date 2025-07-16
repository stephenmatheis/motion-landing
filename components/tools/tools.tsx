'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './tools.module.scss';
import * as motion from 'motion/react-client';
import classNames from 'classnames';

export function Tools() {
    const [selectedFont, setSelectedFont] = useState<string>('space-mono');
    const [selectedFontSize, setSelectedFontSize] = useState<number>(16);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const boundaryRef = useRef(null);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--font-primary',
            `var(--font-${selectedFont})`
        );
    }, [selectedFont]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            'font-size',
            `${selectedFontSize}px`
        );
    }, [selectedFontSize]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            {isMounted && (
                <motion.div className={styles.boundary} ref={boundaryRef}>
                    <motion.div
                        className={styles.tools}
                        drag
                        dragConstraints={boundaryRef}
                        initial={{ scale: 0.75, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    >
                        <div className={styles.heading}>
                            <motion.span
                                className={styles.light}
                                whileTap={{ scale: 0.8, rotate: 90 }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setOpen((prev) => !prev);
                                }}
                            >
                                {open ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.646 13.854a.5.5 0 0 0 .708 0L8 10.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708m0-11.708a.5.5 0 0 1 .708 0L8 5.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708m0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708"
                                        />
                                    </svg>
                                )}
                            </motion.span>
                            <span className={styles.name}>Tools</span>
                        </div>
                        <motion.div
                            animate={
                                !open
                                    ? {
                                          height: ['auto', '0px'],
                                          borderWidth: '0',
                                          transition: {
                                              type: 'bounce',
                                          },
                                      }
                                    : {
                                          height: ['0px', 'auto'],
                                          borderWidth: '1px',
                                          transition: {
                                              type: 'bounce',
                                          },
                                      }
                            }
                            className={styles.window}
                        >
                            <motion.div className={styles.controls}>
                                {/* Color */}
                                <div className={styles.control}>
                                    <div className={styles.label}>color</div>
                                    <div className={styles.input}>
                                        <ColorPicker />
                                    </div>
                                </div>
                                {/* Font */}
                                <div className={styles.control}>
                                    <div className={styles.label}>font</div>
                                    <div className={styles.input}>
                                        <div className={styles.fontpicker}>
                                            <ul>
                                                {[
                                                    // 'barlow',
                                                    // 'geist',
                                                    // 'montserrat',
                                                    // 'inter',
                                                    // 'ibm-plex-sans',
                                                    'space-mono',
                                                ].map((font, index) => (
                                                    <li
                                                        key={index}
                                                        className={classNames(
                                                            styles.font,
                                                            {
                                                                [styles.selected]:
                                                                    font ===
                                                                    selectedFont,
                                                            }
                                                        )}
                                                        onClick={() =>
                                                            setSelectedFont(
                                                                font
                                                            )
                                                        }
                                                    >
                                                        {font}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* Font Size */}
                                <div className={styles.control}>
                                    <div className={styles.label}>font</div>
                                    <div className={styles.input}>
                                        <div className={styles.fontpicker}>
                                            <ul>
                                                {[16, 20, 24, 28, 32, 40].map(
                                                    (fontSize, index) => (
                                                        <li
                                                            key={index}
                                                            className={classNames(
                                                                styles.font,
                                                                {
                                                                    [styles.selected]:
                                                                        fontSize ===
                                                                        selectedFontSize,
                                                                }
                                                            )}
                                                            onClick={() =>
                                                                setSelectedFontSize(
                                                                    fontSize
                                                                )
                                                            }
                                                        >
                                                            {fontSize}px
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}

function ColorPicker() {
    const colors = [
        { name: 'red', hex: '#ff3423' },
        { name: 'green', hex: '#3cb371' },
        { name: 'blue', hex: '#1e90ff' },
        { name: 'pink', hex: '#c71585' },
        { name: 'purple', hex: '#9370db' },
        { name: 'teal', hex: '#00ced1' },
        { name: 'orange', hex: '#ff6c00' },
        { name: 'brown', hex: '#a52a2a' },
        { name: 'custom', hex: '#b1b1b1' },
    ];
    // const percentages = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5];
    const percentages = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 97.5];
    const [palette, setPalette] = useState(
        colors.map(({ name, hex }) => ({
            name,
            hex,
            tints: percentages.map((variant) => ({
                percentage: variant,
                hex: mixWithWhite(hex, variant),
            })),
        }))
    );
    const [selectedColor, setSelectedColor] = useState('pink');
    const { tints } = palette.find((color) => color.name === selectedColor)!;
    const [color, setColor] = useState(tints[0].hex);
    const colorRef = useRef(null);

    function handlePicker(name: string) {
        setSelectedColor(name);
    }

    function handleColor(hexValue: string) {
        setColor(hexValue);
        setPalette((prev) => {
            return prev.map((color) => {
                if (color.name !== 'custom') return color;

                return {
                    name: 'custom',
                    hex: hexValue,
                    tints: percentages.map((variant) => ({
                        percentage: variant,
                        hex: mixWithWhite(hexValue, variant),
                    })),
                };
            });
        });
    }

    useEffect(() => {
        tints.forEach(({ hex }, index) => {
            if (index === 0) {
                document.documentElement.style.setProperty('--primary', hex);
            } else {
                document.documentElement.style.setProperty(
                    `--primary-${index + 1}`,
                    hex
                );
            }
        });

        setColor(tints[0].hex);
    }, [tints, selectedColor, color]);

    return (
        <div className={styles.colorpicker}>
            <div className={styles.left}>
                <ol className={styles.selectors}>
                    {colors.map(({ name, hex }, index) => (
                        <li
                            key={index}
                            className={styles.color}
                            onClick={() => handlePicker(name)}
                        >
                            <input
                                type="radio"
                                checked={name === selectedColor}
                                onChange={() => {}}
                            />
                            {name === 'custom' ? (
                                <label className={styles.text}>custom</label>
                            ) : (
                                <label style={{ color: hex }} />
                            )}
                        </li>
                    ))}
                </ol>
            </div>
            <div className={styles.right}>
                <div className={styles.name}>
                    <span>{selectedColor}</span>
                    {selectedColor === 'custom' && (
                        <input
                            type="color"
                            value={color}
                            ref={colorRef}
                            onChange={(e) => handleColor(e.target.value)}
                        />
                    )}
                </div>
                <ol className={styles.palette}>
                    {selectedColor === 'custom' ? (
                        <>
                            {percentages.map((percentage, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={styles.variant}
                                        style={{
                                            backgroundColor: mixWithWhite(
                                                color,
                                                percentage
                                            ),
                                        }}
                                    >
                                        <span>
                                            {mixWithWhite(color, percentage)}
                                        </span>
                                        <span>{percentage}%</span>
                                    </li>
                                );
                            })}
                        </>
                    ) : (
                        tints.map(({ percentage, hex }, index) => {
                            return (
                                <li
                                    key={index}
                                    className={styles.variant}
                                    style={{ backgroundColor: hex }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(hex);
                                    }}
                                >
                                    <span>{hex}</span>
                                    <span>{percentage}%</span>
                                </li>
                            );
                        })
                    )}
                </ol>
            </div>
        </div>
    );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.slice(1), 16);

    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toLowerCase()}`;
}

function mix(
    color: { r: number; g: number; b: number },
    white: { r: number; g: number; b: number },
    percentage: number
): { r: number; g: number; b: number } {
    return {
        r: Math.round(color.r + (white.r - color.r) * (percentage / 100)),
        g: Math.round(color.g + (white.g - color.g) * (percentage / 100)),
        b: Math.round(color.b + (white.b - color.b) * (percentage / 100)),
    };
}

function mixWithWhite(hex: string, percentage: number): string {
    const colorRgb = hexToRgb(hex);
    const whiteRgb = { r: 255, g: 255, b: 255 };

    return rgbToHex(mix(colorRgb, whiteRgb, percentage));
}
