'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FrameComponent } from "./FrameComponent" // Adjusted path
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import React from 'react'

const GRID_SIZE = 12
// const CELL_SIZE = 60; // pixels per grid cell - this might not be needed if using fr units and percentages

export interface FrameConfig {
  id: number
  content: React.ReactNode // To hold the actual section content
  defaultPos: { x: number; y: number; w: number; h: number } // Grid units
  cornerAsset: string // URL for corner image
  edgeHorizontalAsset: string // URL for horizontal edge image
  edgeVerticalAsset: string // URL for vertical edge image
  // These might be configurable per frame or globally
  initialMediaSize?: number
  initialBorderThickness?: number
  initialBorderSize?: number
  // Autoplay behavior can be managed by the content itself or a simplified global prop
}

// Default assets for frames if not provided per frame
const defaultAssets = {
  corner: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_corner_update.png",
  edgeHorizontal: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_vert_update.png", // Assuming this is horizontal edge
  edgeVertical: "https://static.cdn-luma.com/files/bcf576df9c38b05f/1_hori_update.png",   // Assuming this is vertical edge
}

interface DynamicFrameLayoutProps {
  frameConfigs: FrameConfig[] // Expect an array of 9 frame configurations
  initialHoverSize?: number
  initialGapSize?: number
  showFrameVisualsInitially?: boolean
  autoplayModeInitially?: "all" | "hover"
}

export default function DynamicFrameLayout({ 
  frameConfigs,
  initialHoverSize = 6,
  initialGapSize = 4, // pixels
  showFrameVisualsInitially = true,
  autoplayModeInitially = "all",
}: DynamicFrameLayoutProps) {

  const [frames, setFrames] = useState(frameConfigs.map(fc => ({
    ...fc,
    video: "", // video prop is not used, content is king
    corner: fc.cornerAsset || defaultAssets.corner,
    edgeHorizontal: fc.edgeHorizontalAsset || defaultAssets.edgeHorizontal,
    edgeVertical: fc.edgeVerticalAsset || defaultAssets.edgeVertical,
    mediaSize: fc.initialMediaSize || 1,
    borderThickness: fc.initialBorderThickness || 0,
    borderSize: fc.initialBorderSize || 80,
    autoplayMode: autoplayModeInitially, // Apply global initial autoplay mode
    isHovered: false, 
  })))

  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)
  const [hoverSize, setHoverSize] = useState(initialHoverSize)
  const [gapSize, setGapSize] = useState(initialGapSize)
  const [showControls, setShowControls] = useState(false) // UI for dev controls, can be removed
  const [showFrameVisuals, setShowFrameVisuals] = useState(showFrameVisualsInitially)
  const [autoplayMode, setAutoplayMode] = useState<"all" | "hover">(autoplayModeInitially)

  // Ensure we have 9 frames for a 3x3 grid
  if (frames.length !== 9) {
    console.error("DynamicFrameLayout expects exactly 9 frameConfigs for a 3x3 grid.")
    // Render a fallback or null if the count is wrong
    // For now, let's try to pad or truncate, though this is not ideal for production
    const correctedFrames = Array(9).fill(null).map((_, i) => {
        return frames[i] || {
            id: i + 100, // Placeholder ID
            content: <div className="p-4 bg-red-900 text-white">Error: Missing frame config {i+1}</div>,
            defaultPos: { x: (i % 3) * 4, y: Math.floor(i / 3) * 4, w: 4, h: 4 },
            corner: defaultAssets.corner,
            edgeHorizontal: defaultAssets.edgeHorizontal,
            edgeVertical: defaultAssets.edgeVertical,
            mediaSize: 1, borderThickness: 0, borderSize: 80, autoplayMode: "all", isHovered: false, video: ""
        }
    })
    // This is a temporary fix; ideally, the parent component should always provide 9 configs.
    // setFrames(correctedFrames) // This would cause a re-render loop, handle outside or throw error.
    return <div className="text-red-500 font-bold text-2xl p-10">Error: DynamicFrameLayout requires 9 frame configurations. Received {frames.length}.</div>
  }

  const getRowSizes = () => {
    if (hovered === null) return `repeat(3, 1fr)`
    const { row } = hovered
    const nonHoveredSize = (GRID_SIZE - hoverSize) / 2
    if (nonHoveredSize < 0) return `repeat(3, 1fr)` // Fallback if hoverSize is too large
    return [0, 1, 2].map((r) => (r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return `repeat(3, 1fr)`
    const { col } = hovered
    const nonHoveredSize = (GRID_SIZE - hoverSize) / 2
    if (nonHoveredSize < 0) return `repeat(3, 1fr)` // Fallback
    return [0, 1, 2].map((c) => (c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`)).join(" ")
  }

  const getTransformOrigin = (frameDefaultPos: {x:number, y:number}) => {
    // Based on a 3x3 grid structure from defaultPos (0-2 for col, 0-2 for row index)
    const colIndex = Math.floor(frameDefaultPos.x / (GRID_SIZE/3))
    const rowIndex = Math.floor(frameDefaultPos.y / (GRID_SIZE/3))

    let vertical = "center"
    if (rowIndex === 0) vertical = "top"
    else if (rowIndex === 2) vertical = "bottom"

    let horizontal = "center"
    if (colIndex === 0) horizontal = "left"
    else if (colIndex === 2) horizontal = "right"
    
    return `${vertical} ${horizontal}`
  }

 const updateFrameVisualProperty = (id: number, property: 'mediaSize' | 'borderThickness' | 'borderSize', value: number) => {
    setFrames(prevFrames => prevFrames.map((frame) => 
      frame.id === id ? { ...frame, [property]: value } : frame
    ))
  }

  // Toggle for development controls (can be removed for production)
  const toggleDevControls = () => setShowControls(!showControls)

  return (
    <div className="relative w-full h-full bg-background text-foreground">
      {/* Simplified Controls - Can be removed or kept for user customization */}
      <div className="absolute top-2 right-12 z-20 flex items-center space-x-2 p-2 bg-black/30 rounded-md">
          <label htmlFor="frame-visuals-toggle" className="text-xs text-white/90">
            Borders:
          </label>
          <Switch id="frame-visuals-toggle" checked={showFrameVisuals} onCheckedChange={setShowFrameVisuals} className="h-4 w-8 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-500"/>
           <label htmlFor="autoplay-toggle-main" className="text-xs text-white/90 ml-2">
            Autoplay:
          </label>
           <Switch 
                id="autoplay-toggle-main"
                checked={autoplayMode === "all"}
                onCheckedChange={(checked) => setAutoplayMode(checked ? "all" : "hover")}
                className="h-4 w-8 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-500"
            />
      </div>
      {/* <Button onClick={toggleDevControls} className="absolute top-2 left-2 z-20">Dev Controls</Button> */} 

      <motion.div
        className="grid w-full h-full overflow-hidden"
        style={{
          gridTemplateRows: getRowSizes(),
          gridTemplateColumns: getColSizes(),
          gap: `${gapSize}px`,
          transition: "grid-template-rows 0.3s ease-in-out, grid-template-columns 0.3s ease-in-out",
        }}
      >
        {frames.map((frame, index) => {
          const rowIndex = Math.floor(index / 3)
          const colIndex = index % 3
          return (
            <motion.div
              key={frame.id}
              className="relative overflow-hidden rounded-lg shadow-lg" // Added some styling
              style={{
                // gridRowStart and gridColumnStart are implicitly handled by the order in the grid
                transformOrigin: getTransformOrigin(frame.defaultPos),
                width: "100%", 
                height: "100%",
                backgroundColor: "var(--muted)", // fallback bg
              }}
              onMouseEnter={() => {
                setHovered({ row: rowIndex, col: colIndex })
                setFrames(prevFrames => prevFrames.map(f => f.id === frame.id ? {...f, isHovered: true} : {...f, isHovered: false}))
              }}
              onMouseLeave={() => {
                setHovered(null)
                setFrames(prevFrames => prevFrames.map(f => ({...f, isHovered: false})))
              }}
              animate={hovered && hovered.row === rowIndex && hovered.col === colIndex ? { scale: 1.03, zIndex: 10, boxShadow: "0px 0px 20px 5px rgba(var(--primary-rgb), 0.3)" } : { scale: 1, zIndex: 1, boxShadow: "0px 0px 5px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <FrameComponent
                // video prop is not used, content is passed directly
                content={frame.content} 
                width="100%"
                height="100%"
                corner={frame.corner}
                edgeHorizontal={frame.edgeHorizontal}
                edgeVertical={frame.edgeVertical}
                mediaSize={frame.mediaSize}
                borderThickness={frame.borderThickness}
                borderSize={frame.borderSize}
                onMediaSizeChange={(value) => updateFrameVisualProperty(frame.id, "mediaSize", value)}
                onBorderThicknessChange={(value) => updateFrameVisualProperty(frame.id, "borderThickness", value)}
                onBorderSizeChange={(value) => updateFrameVisualProperty(frame.id, "borderSize", value)}
                showControls={showControls} 
                label={`Pane ${frame.id}`}
                showFrame={showFrameVisuals}
                autoplayMode={autoplayMode} 
                isHovered={frame.isHovered} 
              />
            </motion.div>
          )
        })}
      </motion.div>

      {/* Optional Detailed Controls Panel - for development or advanced user customization */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-background/90 p-3 space-y-3 overflow-y-auto max-h-[40%] z-30 border-t-2 border-primary shadow-2xl rounded-t-lg">
          <h3 className="text-md font-semibold text-center text-primary">Layout Customization</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="hover-size-slider" className="block text-xs font-medium">
                Hover Zoom (Grid Units): {hoverSize.toFixed(1)}
              </label>
              <Slider
                id="hover-size-slider"
                min={Math.max(2, GRID_SIZE/3 -1)} // Min size for a 3x3 grid cell, ensuring others are visible
                max={GRID_SIZE - 2 * 1.5} // Max size ensuring others are at least 1.5 units
                step={0.1}
                value={[hoverSize]}
                onValueChange={(value) => setHoverSize(value[0])}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="gap-size-slider" className="block text-xs font-medium">
                Gap Size (px): {gapSize}
              </label>
              <Slider
                id="gap-size-slider"
                min={0}
                max={20} // Reduced max gap for sensibility
                step={1}
                value={[gapSize]}
                onValueChange={(value) => setGapSize(value[0])}
              />
            </div>
          </div>
          {/* Add more global controls if needed */}
        </div>
      )}
    </div>
  )
}