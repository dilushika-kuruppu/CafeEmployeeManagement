import React,{useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routes from './shared/routes';
import { Spin } from 'antd';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from './shared/interfaces/commonInterfaces';

function App() {
  
  const isSpin = useSelector((state: ApplicationState) => state.common.isSpin);

  return (
    <div className="App">
        <Spin size='large' spinning={isSpin}>
          <Router>
            <Routes>
              {
                routes.map((route, i) => (
                  <Route
                    key={i}
                    path={route.path}
                   
                  />
                ))
              }
          {/* <Route path='*' element={<Navigate to={'/not-found'}></Navigate>}></Route> */}
            </Routes>
           
          </Router>
        </Spin>
    </div>
  );
}

export default App;
