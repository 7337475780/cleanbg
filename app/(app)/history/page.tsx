'use client';

import React, { useState } from 'react';
import { useHistory } from '@/store/history/context';
import { Download, Trash2, Search, Filter, Copy, Share2 } from 'lucide-react';
import { formatBytes } from '@/utils/format';

export default function HistoryPage() {
  const { items, isLoading, deleteItem } = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = items.filter(item => 
    item.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Processing History</h1>
          <p className="text-foreground/60">Manage and download your previously processed images.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
            />
          </div>
          <button className="p-2 border border-border rounded-xl bg-card hover:bg-foreground/5 transition-colors">
            <Filter className="w-4 h-4 text-foreground/70" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-card border border-border rounded-2xl h-64"></div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-semibold mb-2">No history found</h3>
          <p className="text-foreground/60">You haven't processed any images yet, or none match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col">
              <div className="aspect-[4/3] relative overflow-hidden bg-foreground/5">
                <img 
                  src={item.thumbnailUrl} 
                  alt={item.filename} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-background/80 backdrop-blur-md rounded-md hover:bg-background text-foreground transition-colors" title="Download">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="p-1.5 bg-destructive/80 backdrop-blur-md rounded-md hover:bg-destructive text-white transition-colors" 
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <p className="font-semibold text-sm truncate mb-1" title={item.filename}>{item.filename}</p>
                <div className="flex justify-between items-center text-xs text-foreground/50 mt-auto pt-2 border-t border-border/50">
                  <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                  <span>{formatBytes(item.size)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
