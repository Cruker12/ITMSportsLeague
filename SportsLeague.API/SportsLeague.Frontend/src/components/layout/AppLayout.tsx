import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ToastContainer from '../ui/Toast';
import { ToastContext } from '../../contexts/ToastContext';
import { useToast } from '../../hooks/useToast';

function ToastProvider({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onRemove={toast.remove} />
    </ToastContext.Provider>
  );
}

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="app-layout">
        <div className="mobile-header">
          <button className="btn btn-sm" onClick={() => setSidebarOpen(true)}>☰</button>
          <span style={{ fontWeight: 600 }}>ITM Sports</span>
        </div>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </ToastProvider>
  );
}
