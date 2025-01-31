"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"

export default function UserAgentInfo() {
  const [userAgentData, setUserAgentData] = useState<string>("Not available")
  const [userAgent, setUserAgent] = useState<string>("Not available")
  const [platform, setPlatform] = useState<string>("Not available")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const uaData = window.navigator.userAgentData?.platform || "Not available"
      setUserAgentData(uaData)
      setUserAgent(window.navigator.userAgent)
      setPlatform(window.navigator.platform)
    }
  }, [])

  const copyToClipboard = () => {
    const textToCopy = `
window.navigator.userAgentData.platform:\n"${userAgentData}"\n
window.navigator.userAgent:\n"${userAgent}"\n
window.navigator.platform:\n"${platform}"
    `.trim()

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-top justify-between space-y-0 pb-2">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-2xl font-bold">
            User Agent Information
          </CardTitle>
          <CardDescription>
            Details about your browser and system
          </CardDescription>
        </div>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          size="sm"
          className="shrink-0"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              window.navigator.userAgentData.platform:
            </h2>
            <p className="text-gray-600">{userAgentData}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              window.navigator.userAgent:
            </h2>
            <p className="text-gray-600">{userAgent}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              window.navigator.platform:
            </h2>
            <p className="text-gray-600">{platform}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
