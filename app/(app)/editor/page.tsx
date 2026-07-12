'use client';

import React from 'react';
import ProductionEditor from '@/features/editor/ProductionEditor';

export default function EditorPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto w-full pt-8 pb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">AI Background Eraser</h1>
        <p className="text-foreground/60 max-w-xl mx-auto">
          Upload any image and our advanced AI model will perfectly extract the subject in seconds. High resolution output guaranteed.
        </p>
      </div>
      
      <div className="w-full">
         <ProductionEditor />
      </div>
    </div>
  );
}
