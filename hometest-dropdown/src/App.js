import { useState } from 'react';
import './App.css';
import Dropdown from './Dropdown'

// https://reactjs.org/docs/portals.html

function App() {
  const [selected, setSelected] = useState("")
  return (
    <div className="App">
      
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th style={{ width: 400 }}>action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1</td>
              <td className="dropdown-1">
                <Dropdown selected={selected} setSelected={setSelected} zIndex={1} position={"right"}/>
              </td>
            </tr>
            <tr>
              <td>Row 2</td>
              <td className="dropdown-2">
                <Dropdown selected={selected} setSelected={setSelected} zIndex={2} position={"bottom"}/>
              </td>
            </tr>
          </tbody>
        </table>
      
    </div>
  );
}

export default App;
