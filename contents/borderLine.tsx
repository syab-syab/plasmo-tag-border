import { useStorage } from "@plasmohq/storage/hook"
import { useState } from "react"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"
import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

export type RequestBody = {
  tagName: string,
  colorName: string
}

export const localKey: string = "prev-html-tag"

const borderLine = () => {
  const [tagValue, setTagValue] = useState<string>("")
  const [localPrevTag, setLocalPrevTag] = useStorage<string>(localKey, "")
  const [borderColor, setBorderColor] = useState<string>("black")

  useMessage<RequestBody, string>(async (req) => {
    setTagValue(req.body.tagName)
    setBorderColor(req.body.colorName)
  })

  // 変更したら前のタグにかけたボーダーを元に戻したい

  const htmlTagBorder = (val: string, prevVal: string, colorVal: string) => {

    if (val) {
      document.querySelectorAll(val).forEach((e: any) => {
        e.style.border = `1px solid ${colorVal}`
      })
      console.log("val完了")
    }

    if (prevVal) {
      document.querySelectorAll(prevVal).forEach((e: any) => {
        e.style.border = "none"
      })
      console.log("prevVal完了")
    }

    setLocalPrevTag(val)
  }

  useEffect(() => {
    htmlTagBorder(tagValue, localPrevTag, borderColor)
  }, [tagValue])

  return (
    <></>
  )
}

export default borderLine