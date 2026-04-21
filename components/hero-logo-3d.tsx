"use client"

import { motion } from "framer-motion"

export function HeroLogo3D() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(300px, 44vw, 560px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "min(380px, 78vw)",
          height: "min(380px, 78vw)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(222,80,21,0.5) 0%, rgba(222,80,21,0.15) 40%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "min(440px, 88vw)",
          height: "min(440px, 88vw)",
          borderRadius: "50%",
          border: "1px solid rgba(222,80,21,0.18)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
          width: "11px",
          height: "11px",
            borderRadius: "50%",
            backgroundColor: "#DE5015",
            boxShadow: "0 0 14px rgba(222,80,21,1), 0 0 28px rgba(222,80,21,0.5)",
          }}
        />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "min(340px, 70vw)",
          height: "min(340px, 70vw)",
          borderRadius: "50%",
          border: "1px solid rgba(222,80,21,0.10)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-4px",
            right: "25%",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "rgba(222,80,21,0.7)",
            boxShadow: "0 0 10px rgba(222,80,21,0.8)",
          }}
        />
      </motion.div>

      <motion.div
        animate={{
          rotateY: [0, 12, 0, -12, 0],
          y: [0, -8, 0, -8, 0],
        }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "relative",
          zIndex: 10,
          transformStyle: "preserve-3d",
          filter:
            "drop-shadow(0 0 20px rgba(222,80,21,0.6)) drop-shadow(0 0 40px rgba(222,80,21,0.3))",
        }}
      >
        <svg
          width="180"
          height="216"
          viewBox="0 0 121 173"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[120px] w-[100px] md:h-[216px] md:w-[180px]"
        >
          <path
            d="M74.1611 7.57715C78.6979 5.94651 82.1321 6.30721 85.0186 7.72168C88.13 9.24642 91.3109 12.3532 94.3896 17.4395C100.602 27.7032 105.116 43.8572 108.238 62.6094C114.439 99.8472 114.687 144.172 114.44 163.356C114.419 165.038 113.061 166.5 111.086 166.5H11.1396C8.97867 166.5 7.60168 164.737 7.85938 162.926C10.3443 145.462 16.3007 109.949 27.3193 76.8486C32.8319 60.2889 39.5245 44.6029 47.5176 32.1514C55.5697 19.608 64.4864 11.0545 74.1611 7.57715Z"
            stroke="#DE5015"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37 108.516C43.0435 117.45 82.2259 98.7551 92 107.297"
            stroke="#DE5015"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M37 122.516C43.0435 131.45 82.2259 112.755 92 121.297"
            stroke="#DE5015"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M37 137.516C43.0435 146.45 82.2259 127.755 92 136.297"
            stroke="#DE5015"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {[
        { top: "15%", left: "12%", size: 5, delay: 0, dur: 3 },
        { top: "25%", left: "82%", size: 4, delay: 0.5, dur: 4 },
        { top: "60%", left: "8%", size: 4, delay: 1, dur: 3.5 },
        { top: "70%", left: "88%", size: 5, delay: 0.3, dur: 4.5 },
        { top: "40%", left: "5%", size: 3, delay: 0.8, dur: 3 },
        { top: "45%", left: "92%", size: 3, delay: 1.2, dur: 5 },
        { top: "80%", left: "20%", size: 4, delay: 0.6, dur: 3.8 },
        { top: "10%", left: "70%", size: 4, delay: 1.5, dur: 4.2 },
      ].map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            backgroundColor: "#DE5015",
            boxShadow: `0 0 ${p.size * 3}px rgba(222,80,21,0.9)`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  )
}


