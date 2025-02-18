// import React from 'react'
import { useStorage } from "@plasmohq/storage/hook"
import { useState } from "react"
import type { PlasmoCSConfig } from "plasmo"
// import { localKey } from "popup"
import { useEffect } from "react"
import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

export const localKey: string = "prev-html-tag"

const borderLine = () => {
  const [tagValue, setTagValue] = useState<string>("")
  const [localPrevTag, setLocalPrevTag] = useStorage<string>(localKey, "")

  useMessage<string, string>(async (req) => {
    setTagValue(req.body)
  })

  // 変更したら前のタグにかけたボーダーを元に戻したい

  const htmlTagBorder = (val: string, prevVal: string) => {

    if (val) {
      document.querySelectorAll(val).forEach((e: any) => {
        e.style.border = "1px solid black" 
      })
      console.log("val完了")
    }

    if (prevVal) {
      document.querySelectorAll(prevVal).forEach((e: any) => {
        e.style.boder = "1px solid pink"
      })
      console.log("prevVal完了")
    }

    setLocalPrevTag(val)
  }

  useEffect(() => {
    htmlTagBorder(tagValue, localPrevTag)
  }, [tagValue])

  return (
    <div>
      <h1>TEST</h1>
      <h1>{localPrevTag}</h1>
    </div>
  )
}

export default borderLine