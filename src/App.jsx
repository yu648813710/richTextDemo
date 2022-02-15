import { useState, useCallback } from 'react'
import './App.css'

import img from './logo.svg';

const commandMapData = [
  {
    name: '背景色',
    commandKey: 'backColor',
    value: '#ccc'
  },{
    name: '字体色',
    commandKey: 'foreColor',
    value: 'red'
  },
  {
    name: '字体加粗',
    commandKey: 'bold',
  },{
    name: '删除',
    commandKey: 'delete'
  },{
    name: '撤销',
    commandKey: 'undo'
  },{
    name: '恢复',
    commandKey: 'redo'
  },
];


function App() {
  const [ isEdit, setIsEdit ] = useState(false);

  const onEdit = useCallback((e) => {
    const target = e.target;
    console.log("innerHTML", target.innerHTML)
    console.log("innerText", target.innerText)
  }, [])

  const actionCommand = useCallback((e) => {
    console.log(e.target.dataset)
    const key = e.target.dataset.key;

    const index = commandMapData.findIndex(res => res.commandKey === key);
    document.execCommand(key, false, commandMapData[index].value);
  }, [])

  return (
    <div className="App">
      <h1>{!isEdit && '不'}可编辑区域</h1>
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
      {
        isEdit && (
          <div>
            {
              commandMapData.map(res => (<button key={res.commandKey} data-key={res.commandKey} onClick={actionCommand}>{res.name}</button>))
            }
          </div>
        )
      }
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
      <h2>一些问题</h2>
      <input type="text" />
    </div>
  )
}

export default App
