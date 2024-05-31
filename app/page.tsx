"use client";
import React from 'react'
import App from '@/components/App'
import './index.css'

import store from '@/redux/store';
import { Provider } from 'react-redux';
import FolderTreePanel from '@/components/FolderTree/FolderTreePanel';
import { DndContext } from '@dnd-kit/core';

export default function Home() {
  const handleDragEnd = ({ over }: { over: any }) => {
    console.log(over);
  }
  return (
    <div className="home">
      <Provider store={store}>
        <DndContext onDragEnd={handleDragEnd}>
          <App />
        </DndContext>
      </Provider>
    </div>
  );
}
