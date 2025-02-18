import { useState } from "react"
// import { useStorage } from "@plasmohq/storage/hook"
import { sendToContentScript } from "@plasmohq/messaging"

// export const localKey: string = "html-tag"

function IndexPopup() {
  const [data, setData] = useState<string>("")
  // const [localData, setLocalData] = useStorage<string>(localKey, "h1")
  // 直前で指定したタグ
  // 放置していると選択した全ての要素にボーダーが付与される
  const [prevData, setPrevData] = useState<string>("")

  const toggleLocalData = async (value: string, prevValue: string) => {
    if (value.length <= 0) {
      alert("タグを入力してください")
      return
    }
    await sendToContentScript({
      name: "border-line",
      body: value
    }
  )
    // setLocalData(value)
    setPrevData(prevValue)
    setData("")
  }

  return (
    <div
      style={{
        padding: 16
      }}>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <hr />
      <button onClick={
        () => toggleLocalData(data, prevData)
      }
      >送信</button>
      {/* <p>{localData}</p> */}
      <p>data: {data}</p>
      <p>prevData: {prevData}</p>
    </div>
  )
}

export default IndexPopup
