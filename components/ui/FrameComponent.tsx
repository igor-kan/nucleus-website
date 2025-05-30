'use client'
import { Slider } from "@/components/ui/slider"
import React, { useEffect, useRef } from "react" // Ensured React is imported

interface FrameComponentProps {
  content: React.ReactNode; // Changed from video to content
  width: number | string;
  height: number | string;
  className?: string;
  corner: string;
  edgeHorizontal: string;
  edgeVertical: string;
  mediaSize: number; // Scale factor for the content
  borderThickness: number; // Pixel value for the border padding
  borderSize: number; // Percentage of the frame the border+content area takes up
  onMediaSizeChange: (value: number) => void;
  onBorderThicknessChange: (value: number) => void;
  onBorderSizeChange: (value: number) => void;
  showControls: boolean;
  label: string;
  showFrame: boolean;
  autoplayMode: "all" | "hover"; // This might be less relevant if content is not video
  isHovered: boolean;
}

export function FrameComponent({
  content,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness,
  borderSize,
  onMediaSizeChange,
  onBorderThicknessChange,
  onBorderSizeChange,
  showControls,
  label,
  showFrame,
  autoplayMode, // Keep for now, might be used by specific content types
  isHovered,
}: FrameComponentProps) {
  // videoRef might not be universally applicable if content is not a video.
  // For generic content, interactions like play/pause might need to be handled by the content itself
  // or through a more abstract interaction prop.

  // If specific autoplay logic is needed for video content passed as ReactNode,
  // that video component itself should handle its play/pause based on isHovered or other props.

  return (
    <div
      className={`relative ${className} w-full h-full`}
      // width and height are now applied by the parent grid cell via 100%
      style={{
        transition: "transform 0.3s ease-in-out", // Only transform will be animated here
      }}
    >
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        {/* Content Container with Border and Scaling */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.2s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0px",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            // Centering the bordered area
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0%",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0%",
          }}
        >
          <div
            className="w-full h-full overflow-hidden flex items-center justify-center" // Added flex centering for content
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.2s ease-in-out",
              backgroundColor: "rgba(var(--card-rgb), 0.05)", // Example subtle background
              borderRadius: "inherit", // Inherit border radius from parent if any
            }}
          >
            {content} {/* Render the passed ReactNode content here */}
          </div>
        </div>

        {/* Frame Visual Elements (Higher z-index) */}
        {showFrame && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
            {/* Corners - Adjusted for better scaling and positioning */}
            <div
              className="absolute top-0 left-0 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, width: '64px', height: '64px' }} // Fixed size for assets
            />
            <div
              className="absolute top-0 right-0 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)", width: '64px', height: '64px' }}
            />
            <div
              className="absolute bottom-0 left-0 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)", width: '64px', height: '64px' }}
            />
            <div
              className="absolute bottom-0 right-0 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)", width: '64px', height: '64px' }}
            />

            {/* Edges - Adapted for better responsiveness */}
            <div
              className="absolute top-0 h-[64px]"
              style={{
                left: '64px', right: '64px', // Span between corners
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 100%", // Stretch to fill height of edge area
                backgroundRepeat: "repeat-x",
              }}
            />
            <div
              className="absolute bottom-0 h-[64px]"
              style={{
                left: '64px', right: '64px',
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 100%",
                backgroundRepeat: "repeat-x",
                transform: "scaleY(-1)", // Flip for bottom edge
              }}
            />
            <div
              className="absolute left-0 w-[64px]"
              style={{
                top: '64px', bottom: '64px', // Span between corners
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "100% auto", // Stretch to fill width of edge area
                backgroundRepeat: "repeat-y",
              }}
            />
            <div
              className="absolute right-0 w-[64px]"
              style={{
                top: '64px', bottom: '64px',
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "100% auto",
                backgroundRepeat: "repeat-y",
                transform: "scaleX(-1)", // Flip for right edge
              }}
            />
          </div>
        )}
      </div>

      {/* Controls - Kept for customization, can be removed for production */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/60 backdrop-blur-sm z-10 rounded-b-md text-xs">
          <div className="text-white/90 font-semibold mb-1 truncate px-1">{label}</div>
          <div className="space-y-1">
            <div>
              <label htmlFor={`media-size-${label}`} className="block text-xs font-medium text-white/80">
                Content Scale: {mediaSize.toFixed(2)}
              </label>
              <Slider
                id={`media-size-${label}`}
                min={0.1}
                max={2}
                step={0.01}
                value={[mediaSize]}
                onValueChange={(value) => onMediaSizeChange(value[0])}
                className="h-3"
              />
            </div>
            <div>
              <label htmlFor={`border-thickness-${label}`} className="block text-xs font-medium text-white/80">
                Border Padding: {borderThickness}px
              </label>
              <Slider
                id={`border-thickness-${label}`}
                min={0}
                max={16} // Reduced max for sensibility
                step={1}
                value={[borderThickness]}
                onValueChange={(value) => onBorderThicknessChange(value[0])}
                className="h-3"
              />
            </div>
            <div>
              <label htmlFor={`border-size-${label}`} className="block text-xs font-medium text-white/80">
                Content Area: {borderSize}%
              </label>
              <Slider
                id={`border-size-${label}`}
                min={60} // Ensure some border is visible
                max={100}
                step={1}
                value={[borderSize]}
                onValueChange={(value) => onBorderSizeChange(value[0])}
                className="h-3"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 