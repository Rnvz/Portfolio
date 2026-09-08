'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Loader() {
  const [loading, setLoading] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = ''
    }, 1500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  const name = 'YOHANES WENANTA'
  const letters = name.split('')

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[var(--bg-deep)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="flex overflow-hidden font-mono text-xs text-[var(--text-secondary)] tracking-widest mb-4">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={!reducedMotion ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
          <motion.div
            className="font-mono text-[var(--text-dim)] text-xs"
            initial={!reducedMotion ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            00 / 05
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
