import { useState, useCallback, useEffect } from "react";
import "./App.css";

import img from "./logo.svg";

const commandMapData = [
  {
    name: "背景色",
    commandKey: "backColor",
    value: "#ccc",
  },
  {
    name: "字体色",
    commandKey: "foreColor",
    value: "red",
  },
  {
    name: "字体加粗",
    commandKey: "bold",
  },
  {
    name: "删除",
    commandKey: "delete",
  },
  {
    name: "撤销",
    commandKey: "undo",
  },
  {
    name: "恢复",
    commandKey: "redo",
  },
];

function App () {
  const [isEdit, setIsEdit] = useState(false);
  const [htmlIfo, setHtmlIfo] = useState(null);

  const onEdit = useCallback((e) => {
    const target = e.target;
    console.log("innerHTML", e);
    setHtmlIfo(target.innerHTML);
  }, []);

  const actionCommand = useCallback((e) => {
    console.log(e.target.dataset);
    const key = e.target.dataset.key;

    const index = commandMapData.findIndex((res) => res.commandKey === key);
    document.execCommand(key, false, commandMapData[index].value);
  }, []);

  const getSelection = useCallback(() => {
    const obj = window.getSelection()
    console.log(obj)
    if (obj.isCollapsed) return false
    return obj
  }, [])

  const actionCustomCommand = useCallback((e) => {
    console.log(e.target.dataset);
    const key = e.target.dataset.key;

    const index = commandMapData.findIndex((res) => res.commandKey === key);
    const data = getSelection()
    if (!data) return
    console.log(data.getRangeAt(0))
    switch(key) {
      case 'delete':
        data.deleteFromDocument()
    }
  }, [getSelection]);

  // 复制图片处理
  const listenPaste = useCallback(() => {
    window.addEventListener("paste", (e) => {
      console.log(e);
      var items = (event.clipboardData || window.clipboardData).items;
      var file = null;
      if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            file = items[i].getAsFile();
            break;
          }
        }
      }
      console.log(file);
    });
  }, []);

  useEffect(() => {
    listenPaste();
    return () => {
      window.removeEventListener("paste");
    };
  }, []);

  return (
    <div className="App">
      <div className="content">
        <div className="left">
          <h1>{!isEdit && "不"}可编辑区域</h1>
          <div>
            <label htmlFor="notEdit">
              <input
                id="notEdit"
                type="radio"
                name="isEdit"
                value={0}
                onChange={(e) => {
                  setIsEdit(e.target.value === 1);
                }}
              />
              不可编辑
            </label>
            <label htmlFor="edited">
              <input
                id="edited"
                type="radio"
                name="isEdit"
                value={1}
                onChange={(e) => {
                  setIsEdit(e.target.value == 1);
                }}
              />
              可编辑
            </label>
          </div>
          {isEdit && (
            <div>
              {commandMapData.map((res) => (
                <button
                  key={res.commandKey}
                  data-key={res.commandKey}
                  onClick={actionCommand}
                >
                  {res.name}
                </button>
              ))}
            </div>
          )}
          <div
            className="demoBox"
            contentEditable={isEdit}
            suppressContentEditableWarning
            onInput={onEdit}
          >
            <h2>我是标题</h2>
            <p>我是段落</p>
            <p>我是图片</p>
            <img width="200" src={img} />
          </div>
        </div>
        <div className="right">
          <h2>内容展示</h2>
          <div dangerouslySetInnerHTML={{ __html: htmlIfo }}></div>
        </div>
      </div>
      <div className="custom">
        <h1>自定义execCommand</h1>
        <div>
          {commandMapData.map((res) => (
            <button
              key={res.commandKey}
              data-key={res.commandKey}
              onClick={actionCustomCommand}
            >
              {res.name}
            </button>
          ))}
        </div>
        <div className="demoBox" contentEditable={true} suppressContentEditableWarning>
          <h2>测试自定义execCommand</h2>
          <p>字体颜色</p>
          <p>字体背景色</p>
          <p>加粗</p>
          <p>删除</p>
          <p>撤销</p>
          <p>恢复</p>
        </div>
      </div>
    </div>
  );
}

export default App;
