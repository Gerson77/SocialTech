import { Info } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function BoxDialog({
  cancelAcion, handleRemovePost, title, textEvent, buttonEvent,
}) {
  return createPortal(
    <div className="w-full h-screen  fixed top-0 left-0 flex items-center justify-center">
      <div
        aria-hidden
        className="bg-gray-950 w-full h-screen fixed z-10 bg-opacity-80 backdrop-blur-sm"
        onClick={cancelAcion}
      />
      <div className="bg-gray-50 z-20 dark:bg-gray-900 dark:text-gray-700 rounded-md flex items-center flex-col p-4 w-96 shadow-lg shadow-gray-700/70">
        <Info className="w-36 h-36 text-orange-300" />
        <h2 className="font-bold text-2xl dark:text-gray-200">{title}</h2>
        <p className="font-medium text-gray-500 dark:text-gray-400">{textEvent}</p>
        <div className="flex items-center justify-center gap-2 p-2 text-white">
          {!buttonEvent ? (
            <>
              <button
                type="button"
                className="bg-green-500 hover:bg-green-600 rounded-md p-2 font-bold shadow-lg shadow-gray-400/50"
                onClick={handleRemovePost}
              >
                Sim, tenho certeza
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 rounded-md p-2 font-bold shadow-lg shadow-gray-400/50"
                onClick={cancelAcion}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              type="button"
              className="bg-sky-600 rounded-md p-2 mt-2 font-bold"
              onClick={cancelAcion}
            >
              Tentar novamente
            </button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-dialog'),
  );
}
