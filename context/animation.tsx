'use client';

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from 'react';

type AnimationContextType = {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
    undefined
);

export function AnimationProvider({ children }: { children: ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AnimationContext.Provider value={{ isModalOpen, setIsModalOpen }}>
            {children}
        </AnimationContext.Provider>
    );
}

export function useAnimationContext() {
    const context = useContext(AnimationContext);

    if (!context) {
        throw new Error(
            'useAnimation must be used within an AnimationProvider'
        );
    }

    return context;
}
