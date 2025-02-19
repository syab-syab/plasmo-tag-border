import { useState } from "react"
import { sendToContentScript } from "@plasmohq/messaging"


function IndexPopup() {
  const [data, setData] = useState<string>("")
  const [colorName, setColorName] = useState<string>("black")

  const toggleLocalData = async (tagVal: string, colorVal: string) => {
    if (tagVal.length <= 0) {
      alert("タグを入力してください")
      return
    }
    await sendToContentScript({
      name: "border-line",
      body: {
        tagName: tagVal,
        colorName: colorVal
      }
    }
  )
    setData("")
  }

  const colorArray: string[] = [
    "black", "gray", "silver", "white", "blue", "pink", "green", "lime", "aqua", "yellow", "red"
  ]

  return (
    <div
      style={{
        padding: 16
      }}>
      <h3>HTML-TAG-BORDER</h3>
      <label htmlFor="tag">タグ指定</label>
      <input onChange={(e) => setData(e.target.value)} value={data} id="tag" name="tag" />
      <hr />
      <label htmlFor="color">色指定</label>
      <br />
      <select onChange={(e) => setColorName(e.target.value)} value={colorName} id="color" name="color">
        {
          colorArray.map((c) => {
            return (
              <option value={c}>{c}</option>
            )
          })
        }
      </select>
      <hr />
      <button onClick={
        () => toggleLocalData(data, colorName)
      }
      >送信</button>
    </div>
  )
}

export default IndexPopup
