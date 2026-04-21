"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { SharwiLogoIcon } from "./sharwi-logo"

export function HeroLogo3D() {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.85])
  const rotateY = useTransform(scrollY, [0, 800], [0, 25])

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768)
    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const outerSize = isMobile ? 300 : 480
  const orbitOne = isMobile ? 250 : 380
  const orbitTwo = isMobile ? 210 : 320
  const orbitThree = isMobile ? 280 : 440
  const baseSize = isMobile ? 158 : 220
  const logoSize = isMobile ? 72 : 96

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
        scale,
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1200,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: outerSize,
          height: outerSize,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(222,80,21,0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: orbitOne,
          height: orbitOne,
          borderRadius: "50%",
          border: "1px solid rgba(222,80,21,0.15)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#DE5015",
            boxShadow: "0 0 12px rgba(222,80,21,0.8)",
          }}
        />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: orbitTwo,
          height: orbitTwo,
          borderRadius: "50%",
          border: "1px solid rgba(222,80,21,0.10)",
          transform: "rotateX(70deg)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-3px",
            right: "30%",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "rgba(222,80,21,0.6)",
            boxShadow: "0 0 8px rgba(222,80,21,0.6)",
          }}
        />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: orbitThree,
          height: orbitThree,
          borderRadius: "50%",
          border: "0.5px solid rgba(255,252,242,0.05)",
        }}
      />

      <motion.div
        animate={{
          boxShadow: [
            "0 0 40px rgba(222,80,21,0.3), 0 0 80px rgba(222,80,21,0.1)",
            "0 0 60px rgba(222,80,21,0.5), 0 0 120px rgba(222,80,21,0.2)",
            "0 0 40px rgba(222,80,21,0.3), 0 0 80px rgba(222,80,21,0.1)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          rotateY,
          position: "relative",
          width: baseSize,
          height: baseSize,
          borderRadius: "50%",
          backgroundColor: "rgba(222,80,21,0.08)",
          border: "1.5px solid rgba(222,80,21,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          animate={{
            rotateY: [0, 8, 0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <SharwiLogoIcon size={logoSize} color="#FFFFFF" />
        </motion.div>
      </motion.div>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          style={{
            position: "absolute",
            width: i % 2 === 0 ? "4px" : "3px",
            height: i % 2 === 0 ? "4px" : "3px",
            borderRadius: "50%",
            backgroundColor: "#DE5015",
            top: `${20 + i * 12}%`,
            left: i < 3 ? `${10 + i * 8}%` : `${70 + (i - 3) * 8}%`,
            boxShadow: "0 0 6px rgba(222,80,21,0.8)",
          }}
        />
      ))}
    </motion.div>
  )
}
