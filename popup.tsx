import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"

export const localKey: string = "html-tag"

function IndexPopup() {
  const [data, setData] = useState<string>("")
  const [localData, setLocalData] = useStorage<string>(localKey, "h1")

  const toggleLocalData = (value: string) => {
    if (value.length <= 0) {
      alert("タグを入力してください")
    } else {
      setLocalData(value)
    }
  }


  return (
    <div
      style={{
        padding: 16
      }}>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <hr />
      <button onClick={() => toggleLocalData(data)}>送信</button>
      <p>{localData}</p>
      <p>data: {data}</p>
    </div>
  )
}

export default IndexPopup
