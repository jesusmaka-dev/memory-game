import React, {useEffect} from 'react';

export default function ModalInstructions({show}) {
  const [showModal, setShowModal] = React.useState(show);
  const [showResponsiveText, setResponsiveText] = React.useState('');

  useEffect(() => {
    let isMobile = window.matchMedia(
      'only screen and (max-width: 600px)',
    ).matches;
    if (isMobile) {
      setResponsiveText(
        'Para una mejor experiencia utilice un navegador web de escritorio.',
      );
    } else {
      setResponsiveText('');
    }
  }, []);

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Instrucciones</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  {showResponsiveText !== '' && (
                    <div className="p-5 border-0 rounded-lg relative flex flex-col w-full bg-sky-200 outline-none">
                      <p className=" my-4 text-slate-500 text-lg leading-relaxed text-justify">
                        {showResponsiveText}
                      </p>
                    </div>
                  )}

                  <p className="my-4 text-slate-500 text-lg leading-relaxed text-justify">
                    El jugador selecciona dos cartas boca abajo y las voltea.
                    Debes recordar dónde están las imágenes para poder hacer
                    coincidencias. Si las dos cartas tienen imágenes idénticas,
                    se le sumara 1 punto. Si las dos cartas no coinciden, el
                    jugador tendra 1 punto negativo. El juego continúa hasta que
                    todas las cartas hayan sido emparejadas.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-sky-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
