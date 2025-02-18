import { useState } from "react"
import { sendToContentScript } from "@plasmohq/messaging"


function IndexPopup() {
  const [data, setData] = useState<string>("")

  const toggleLocalData = async (value: string) => {
    if (value.length <= 0) {
      alert("タグを入力してください")
      return
    }
    await sendToContentScript({
      name: "border-line",
      body: value
    }
  )
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
        () => toggleLocalData(data)
      }
      >送信</button>
      <p>data: {data}</p>
    </div>
  )
}

export default IndexPopup
