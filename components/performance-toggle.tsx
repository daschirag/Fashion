"use client"

import { usePerformance } from "@/contexts/performance-context"

export default function PerformanceToggle() {
  const { isLowPowerMode, setLowPowerMode, useReducedMotion } = usePerformance()

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 border border-[#00ff41]/30 p-2 text-xs font-mono">
      <div className="flex flex-col gap-2">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isLowPowerMode}
            onChange={(e) => setLowPowerMode(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-8 h-4 relative rounded-full transition-colors ${
              isLowPowerMode ? "bg-[#00ff41]/30" : "bg-gray-700"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full transition-transform ${
                isLowPowerMode ? "translate-x-4 bg-[#00ff41]" : "bg-gray-400"
              }`}
            />
          </div>
          <span className="ml-2 text-[#00ff41]">LOW_POWER_MODE</span>
        </label>

        {useReducedMotion && (
          <div className="flex items-center text-[#00ff41]/70">
            <span className="inline-block w-3 h-3 bg-[#00ff41]/30 rounded-full mr-2"></span>
            REDUCED_MOTION_ACTIVE
          </div>
        )}
      </div>
    </div>
  )
}
