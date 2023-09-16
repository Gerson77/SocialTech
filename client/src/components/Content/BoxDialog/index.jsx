import { Info } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function BoxDialog({
  cancelAcion, handleRemovePost, title, textEvent,
}) {
  return createPortal(
    <div className="w-full h-screen flex items-center justify-center fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] bg-gray-900 bg-opacity-80 backdrop-blur-sm">
      <div className="bg-gray-50 dark:text-gray-700 rounded-md flex items-center flex-col p-4 w-96 shadow-lg shadow-gray-700/70">
        <Info className="w-36 h-36 text-orange-300" />
        <h2 className="font-bold text-2xl">{title}</h2>
        <p className="font-medium text-gray-500">{textEvent}</p>
        <div className="flex items-center justify-center gap-2 p-2 text-white">
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 rounded-md p-2 font-bold shadow-lg shadow-gray-400/50"
            onClick={handleRemovePost}
          >
            Sim, tenho certeza
          </button>
          <button type="button" className="bg-red-500 hover:bg-red-600 rounded-md p-2 font-bold shadow-lg shadow-gray-400/50" onClick={cancelAcion}>Cancelar</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-dialog'),
  );
}
