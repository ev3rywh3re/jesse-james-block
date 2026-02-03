// src/components/RollingBoxAnimation.js

"use client"

import { motion, AnimatePresence } from "framer-motion"
// importing Logo SVG as a React component
import { ReactComponent as PlanckLogo } from './logo-planck-full-2024.svg';

/**
 * A component that displays a box rolling animation when active.
 * @param {object} props
 * @param {boolean} props.isAnimating - Controls whether the animation should be visible and running.
 */
export default function RollingBoxAnimation({ isAnimating }) {
    // Animation variants define the different states of the animation.
    // Framer Motion will automatically transition between these states.
    const boxVariants = {
        // The 'initial' state: where the box starts before the animation.
        // It's positioned off-screen to the left and has no rotation.
        initial: {
            x: -50, // Start 50px to the left (outside the container)
            rotate: 0,
            opacity: 0,
        },
        // The 'animate' state: the target state for the animation.
        // The box moves across the container and completes a full rotation.
        animate: {
            x: 200, // Move 200px to the right
            rotate: 360,
            opacity: 1,
        },
        // The 'exit' state: how the box disappears when the component is removed.
        // It will simply fade out.
        exit: {
            opacity: 0,
        },
    }

    return (
        // AnimatePresence is a key component from Framer Motion.
        // It enables animations for components that are added to or removed from the React tree.
        // When `isAnimating` becomes false, the child component will animate to its 'exit' state before being removed.
        <AnimatePresence>
            {isAnimating && (
                <motion.svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    // The 'variants' prop connects our defined states.
                    variants={boxVariants}
                    // Tells the component which state to start in.
                    initial="initial"
                    // Tells the component which state to animate to.
                    animate="animate"
                    // Tells the component which state to animate to before unmounting.
                    exit="exit"
                    // Defines the physics and duration of the transition.
                    transition={{
                        duration: 1.5, // The roll will take 1.5 seconds
                        ease: "easeInOut", // A smooth start and end to the movement
                    }}
                >
                    {/* This is the green square that will be animated */}
                    <rect width="50" height="50" fill="#8df0cc" />
                    <PlanckLogo style={{ width: '3.4rem', height: 'auto', marginBottom: '1rem' }} />
                </motion.svg>
            )}
        </AnimatePresence>
    )
}
