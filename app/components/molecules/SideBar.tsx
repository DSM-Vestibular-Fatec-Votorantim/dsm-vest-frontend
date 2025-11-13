import React from 'react';

const SideBar: React.FC = () => {
  return (
    <aside id="default-sidebar" className="fixed top-24 left-0 z-10 w-64 h-[calc(100vh-4rem)] transition-transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200 shadow-sm" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <a href="#" className="flex items-center px-2 py-1.5 text-gray-900 rounded-lg hover:bg-gray-100 border border-gray-300 group">
              <span className="ms-3">Administradores</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-2 py-1.5 text-gray-900 rounded-lg hover:bg-gray-100 border border-gray-300 group">
              <span className="flex-1 ms-3 whitespace-nowrap">Editar Site</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;