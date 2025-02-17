// import React from 'react'
import { useStorage } from "@plasmohq/storage/hook"
import type { PlasmoCSConfig } from "plasmo"
import { localKey } from "popup"
import { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
}

const borderLine = () => {

  const [tagValue] = useStorage(localKey)

  // 変更したら前のタグにかけたボーダーを元に戻したい
  // リセットボタン付ければいいか

  const htmlTagBorder = (val: string) => {
    const selectHtmlTags = document.querySelectorAll(val)

    selectHtmlTags.forEach((e: any) => {
      // console.log(e)
      e.style.border = "1px solid black" 
    })

  }

  useEffect(() => {
    htmlTagBorder(tagValue)
  }, [tagValue])

  return (
    <div>
    </div>
  )
}

export default borderLine