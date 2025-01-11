import React from 'react'
import Router from './router/Router'
import { Provider } from 'react-redux'
import  store,{persistor} from "./store/Configure"
import {PersistGate} from "redux-persist/integration/react"
import  { Toaster } from "react-hot-toast";
const App:React.FC=() =>{
  return (
    <div>
       <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
         <Toaster  position="top-right"  />
            <Router/>
        </PersistGate>
       </Provider>
    </div>
  
  )
}

export default App
