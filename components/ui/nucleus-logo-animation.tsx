"use client"

import React from "react"
import { useRef, useEffect, useState } from "react"

interface NucleusLogoAnimationProps {
  logoType: 'full' | 'n';
  size?: number; // Optional size prop
}

export default function NucleusLogoAnimation({ logoType, size }: NucleusLogoAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  let particles: {
    x: number
    y: number
    baseX: number
    baseY: number
    size: number
    color: string
    scatteredColor: string
    life: number
  }[] = [] // Removed isAWS as it's not used
  let textImageData: ImageData | null = null
  let animationFrameId: number

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      // Adjust canvas size based on prop or window size
      const baseSize = size || (logoType === 'full' ? window.innerWidth : 200); // Default size for 'n'
      canvas.width = baseSize;
      canvas.height = logoType === 'full' ? window.innerHeight : baseSize; // 'n' logo is square
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.fillStyle = "white"
      ctx.save()
      
      // Determine logo height based on prop or default
      const defaultLogoHeight = isMobile ? 60 : 120;
      const logoHeight = size ? (size / (logoType === 'full' ? 1.5 : 3)) : defaultLogoHeight; // Adjusted for 'n'
      const logoWidth = logoHeight * (logoType === 'full' ? 3.2 : 1);


      // Adjust overall logo centering based on logoType
      if (logoType === 'full') {
        ctx.translate(canvas.width / 2 - logoWidth / 2, canvas.height / 2 - logoHeight / 2 - logoHeight * 0.8)
      } else { // 'n' logo specific centering
        ctx.translate(canvas.width / 2 - logoWidth / 2, canvas.height / 2 - logoHeight / 2);
      }


      if (logoType === 'full') {
        // ===== FULL "NUCLEUS" TEXT WITH CIRCLE =====
        ctx.save()
        const textX = logoHeight * 0.7
        const textY = logoHeight * 0.9
        const fontSize = logoHeight * 0.5
        ctx.fillStyle = "white"
        ctx.font = `900 ${fontSize}px Arial Black, Arial, sans-serif`
        ctx.textAlign = "left"
        ctx.textBaseline = "alphabetic"
        ctx.fillText("nucleus", textX, textY)
        const nCenterX = textX + fontSize * 0.3
        const nCenterY = textY - fontSize * 0.27
        const circleRadius = fontSize * 0.6
        const circleStrokeWidth = fontSize * 0.05
        ctx.strokeStyle = "white"
        ctx.lineWidth = circleStrokeWidth
        const smallGapAngle = Math.PI * 1.25
        const smallGapHalfWidth = Math.PI * 0.08
        const smallGapStart = smallGapAngle - smallGapHalfWidth
        const smallGapEnd = smallGapAngle + smallGapHalfWidth
        const largeGapAngle = Math.PI * 0
        const largeGapHalfWidth = Math.PI * 0.24
        const largeGapStart = largeGapAngle - largeGapHalfWidth
        const largeGapEnd = largeGapAngle + largeGapHalfWidth
        ctx.beginPath()
        ctx.arc(nCenterX, nCenterY, circleRadius, largeGapEnd, smallGapStart)
        ctx.moveTo(nCenterX + Math.cos(smallGapEnd) * circleRadius, nCenterY + Math.sin(smallGapEnd) * circleRadius)
        ctx.arc(nCenterX, nCenterY, circleRadius, smallGapEnd, largeGapStart + Math.PI * 2)
        ctx.stroke()
        const dotRadius = fontSize * 0.08
        const dotX = nCenterX + Math.cos(smallGapAngle) * circleRadius
        const dotY = nCenterY + Math.sin(smallGapAngle) * circleRadius
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      } else if (logoType === 'n') {
        // ===== JUST "N" WITH CIRCLE =====
        ctx.save()
        // For 'n' type, we draw it directly without additional translation from a previous logo
        // const nTextX = canvas.width / 2 - logoWidth / 2 + logoHeight * 0.5; // Centering for standalone 'n'
        const nTextX = logoHeight * 0.2; // Adjusted for centering in its own canvas
        const nTextY = logoHeight * 0.9 
        const nFontSize = logoHeight * 0.5 
        ctx.fillStyle = "white"
        ctx.font = `900 ${nFontSize}px Arial Black, Arial, sans-serif`
        ctx.textAlign = "left" 
        ctx.textBaseline = "alphabetic"
        ctx.fillText("n", nTextX, nTextY)
        const nOnlyCenterX = nTextX + nFontSize * 0.3
        const nOnlyCenterY = nTextY - nFontSize * 0.27
        const nOnlyCircleRadius = nFontSize * 0.6
        const nOnlyCircleStrokeWidth = nFontSize * 0.05
        ctx.strokeStyle = "white"
        ctx.lineWidth = nOnlyCircleStrokeWidth
        const nOnlyGapCenterAngle = Math.PI * 1.25
        const nOnlyGapHalfWidth = Math.PI * 0.15
        const nOnlyGapStartAngle = nOnlyGapCenterAngle - nOnlyGapHalfWidth
        const nOnlyGapEndAngle = nOnlyGapCenterAngle + nOnlyGapHalfWidth
        ctx.beginPath()
        ctx.arc(nOnlyCenterX, nOnlyCenterY, nOnlyCircleRadius, nOnlyGapEndAngle, nOnlyGapStartAngle + Math.PI * 2)
        ctx.stroke()
        const nOnlyDotRadius = nFontSize * 0.08
        const nOnlyDotX = nOnlyCenterX + Math.cos(nOnlyGapCenterAngle) * nOnlyCircleRadius
        const nOnlyDotY = nOnlyCenterY + Math.sin(nOnlyGapCenterAngle) * nOnlyCircleRadius
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(nOnlyDotX, nOnlyDotY, nOnlyDotRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      
      ctx.restore() // This corresponds to the initial ctx.save() at the beginning of createTextImage

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return 1
    }

    function createParticle() { // Removed scale: number as it is not used
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data
      // const particleGap = 2 // This was defined but not used

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1 + 0.5,
            color: "white",
            scatteredColor: "#00DCFF", 
            life: Math.random() * 100 + 50,
          }
        }
      }
      return null
    }

    function createInitialParticles() { // Removed scale: number
      if (!canvas) return; // Guard clause for null canvas
      const baseParticleCount = logoType === 'full' ? 7000 : 2000; // Fewer particles for 'n'
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / ( (logoType === 'full' ? 1920 : canvas.width) * (logoType === 'full' ? 1080 : canvas.height) )))
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle()
        if (particle) particles.push(particle)
      }
    }

    function animate() { // Removed scale: number
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black" // Assuming a black background is desired for the component
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = logoType === 'full' ? 240 : 100; // Smaller interaction radius for 'n'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < maxDistance && (isTouchingRef.current || !("ontouchstart" in window))) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * (logoType === 'full' ? 60 : 30)
          const moveY = Math.sin(angle) * force * (logoType === 'full' ? 60 : 30)
          p.x = p.baseX - moveX
          p.y = p.baseY - moveY
          ctx.fillStyle = p.scatteredColor
        } else {
          p.x += (p.baseX - p.x) * 0.1
          p.y += (p.baseY - p.y) * 0.1
          ctx.fillStyle = p.color // Use base color when not interacting
        }

        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle()
          if (newParticle) {
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      const baseParticleCount = logoType === 'full' ? 7000 : 2000;
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / ( (logoType === 'full' ? 1920 : canvas.width) * (logoType === 'full' ? 1080 : canvas.height) ))
      )
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle()
        if (newParticle) particles.push(newParticle)
      }

      animationFrameId = requestAnimationFrame(() => animate())
    }

    createTextImage() // Removed scale, it's not used
    createInitialParticles()
    animate()

    const handleResize = () => {
      updateCanvasSize()
      createTextImage() // Re-create image on resize
      particles = [] // Reset particles
      createInitialParticles()
    }

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      handleMove(e.clientX - rect.left, e.clientY - rect.top);
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        const rect = canvas.getBoundingClientRect();
        handleMove(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top)
      }
    }
    
    const handleTouchStart = () => {
      isTouchingRef.current = true
    }

    const handleTouchEnd = () => {
      isTouchingRef.current = false
      // Reset mouse position if not a touch device and mouse leaves canvas
      if (!('ontouchstart' in window)) {
        const rect = canvas.getBoundingClientRect();
        if (mousePositionRef.current.x < 0 || mousePositionRef.current.x > rect.width || mousePositionRef.current.y < 0 || mousePositionRef.current.y > rect.height) {
           mousePositionRef.current = { x: canvas.width / 2, y: canvas.height / 2 }; // Or some other default
        }
      } else {
         mousePositionRef.current = { x: canvas.width / 2, y: canvas.height / 2 }; // Or some other default for touch
      }
    }

    const handleMouseLeave = () => {
      if (!('ontouchstart' in window)) {
         mousePositionRef.current = { x: canvas.width / 2, y: canvas.height / 2 }; // Center on leave
      }
    }

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true }) // passive true for touchstart
    canvas.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchend", handleTouchEnd)
      if (animationFrameId) { // Ensure animationFrameId is defined before cancelling
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [logoType, size, isMobile]) // Add dependencies for useEffect

  return (
    <div className={`relative flex flex-col items-center justify-center ${logoType === 'full' ? 'w-full h-dvh' : ''} bg-black`}>
      <canvas
        ref={canvasRef}
        className={`${logoType === 'full' ? 'w-full h-full' : ''} absolute top-0 left-0 touch-none`}
        aria-label={`Interactive particle effect with ${logoType === 'full' ? 'nucleus logo' : 'n logo'}`}
        style={logoType === 'n' ? { width: `${size || 100}px`, height: `${size || 100}px`, position: 'relative' } : {}}
      />
      {/* Text removed as it's part of the old component structure */}
    </div>
  )
} 