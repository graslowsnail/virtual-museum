"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sparkles, Download, Heart, Share2 } from "lucide-react"

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      const newImages = Array.from(
        { length: 6 },
        (_, i) => `/placeholder.svg?height=400&width=400&text=Generated+Image+${i + 1}`,
      )
      setImages(newImages)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-mono bg-gradient-to-r from-violet-300 to-violet-400 bg-clip-text text-transparent mb-2">
            AI Museum
          </h1>
          <p className="text-gray-600 font-mono">Discover beautiful art from any era!</p>
        </div>

        {/* Input Section */}
        <Card className="p-6 mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                className="pr-12 h-12 text-lg font-mono border-2 border-gray-200 focus:border-violet-300 rounded-xl"
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              />
              <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-300 w-5 h-5" />
            </div>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="h-12 px-8 font-mono bg-gradient-to-r from-violet-300 to-violet-400 hover:from-violet-400 hover:to-violet-500 rounded-xl font-semibold text-black"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </div>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </Card>

        {/* Loading State */}
        {isGenerating && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <div className="w-6 h-6 border-3 border-violet-300 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-700 font-medium font-mono">Finding amazing artwork...</span>
            </div>
          </div>
        )}

        {/* Image Grid */}
        {images.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-mono text-gray-800">Generated Images</h2>
              <div className="text-sm font-mono text-gray-500">
                {images.length} image{images.length !== 1 ? "s" : ""} generated
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-square">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 p-0"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 p-0"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 p-0"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Image info */}
                  <div className="p-4">
                    <p className="text-sm font-mono text-gray-600 line-clamp-2">{prompt || "Generated image"}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-mono text-gray-400">Image {index + 1}</span>
                      <span className="text-xs font-mono text-gray-400">1024x1024</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {images.length === 0 && !isGenerating && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-violet-200 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-violet-300" />
            </div>
            <h3 className="text-xl font-semibold font-mono text-gray-700 mb-2">Ready to discover something amazing?</h3>
            <p className="text-gray-500 font-mono max-w-md mx-auto">
              Enter a description above and watch as AI help you find amazing art!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
