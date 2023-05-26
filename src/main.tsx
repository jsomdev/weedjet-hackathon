import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrandVariants, FluentProvider, Theme, createDarkTheme, createLightTheme } from '@fluentui/react-components'

const weedjetBrandVariants: BrandVariants = { 
  10: "#030403",
  20: "#161A16",
  30: "#232C22",
  40: "#2C382C",
  50: "#364535",
  60: "#3F533F",
  70: "#4A6149",
  80: "#546F54",
  90: "#5E7E5E",
  100: "#698D69",
  110: "#749C74",
  120: "#7FAC7F",
  130: "#8ABB8A",
  140: "#96CB96",
  150: "#A5DBA5",
  160: "#C1E6C0"
  };
  
   const lightTheme: Theme = {
     ...createLightTheme(weedjetBrandVariants), 
  };
  
   const darkTheme: Theme = {
     ...createDarkTheme(weedjetBrandVariants), 
  };
   
  
   darkTheme.colorBrandForeground1 = weedjetBrandVariants[110];
   darkTheme.colorBrandForeground2 = weedjetBrandVariants[120];


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={lightTheme}>
       <App />
    </FluentProvider>
  </React.StrictMode>,
)
