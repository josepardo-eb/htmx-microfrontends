import type { ReactNode } from "react";


export const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 overflow-auto bg-black/80"
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Modal Title</h2>
          <p className="mb-4">Modal content goes here.</p>
          <button
            id="closeModal"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            hx-trigger="click"
            hx-target="#modal"
          >
            Close (//TODO)
          </button>
        </div>
      </div>
    </div>
  );
};
