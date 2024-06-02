"use client";
import React from 'react'
import App from '@/components/App'
import './index.css'

import store from '@/redux/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <div className="home">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
}
