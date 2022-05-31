import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <RecoilRoot>
    <DndProvider backend={HTML5Backend}>
      <Router>
        <App/>
      </Router>
      </DndProvider>
  </RecoilRoot>,
);




