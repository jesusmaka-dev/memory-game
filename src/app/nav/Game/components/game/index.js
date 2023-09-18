'use client';
import {useEffect, useState} from 'react';
import Modal from '@/app/utils/components/Modal';

export default function GameComponent() {
  const [showModal, setShowModal] = useState(false);
  const [dataCardArray, setDataCardArray] = useState([]);
  const [dataCardArrayOriginal, setDataCardArrayOriginal] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [failures, setFailures] = useState(0);
  const [succeeds, setSucceeds] = useState(0);

  const url =
    'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=3';

  const fetchInfo = () => {
    return fetch(url)
      .then(res => res.json())
      .then(images => images);
  };

  useEffect(() => {
    fetchInfo()
      .then(r => handleImageForCards(r))
      .catch(err =>
        console.log('error en la peticion de informacion :::::', err),
      );
  }, []);

  useEffect(() => {
    if (dataCardArray.length > 0) {
      if (dataCardArray.length / 2 === succeeds) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [succeeds]);

  const handleImageForCards = images => {
    const dataImages = images.entries;

    const arrayToUse = [];

    dataImages.forEach((dta, index) => {
      arrayToUse.push({
        id: index++,
        image: dta.fields.image.url,
        selected: false,
      });
    });

    // we duplicate the array
    const mergedArray = [...arrayToUse, ...arrayToUse];

    setDataCardArrayOriginal(mergedArray);

    // Fisher Yates Modern method for shuffle data in array
    for (let i = mergedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mergedArray[i], mergedArray[j]] = [mergedArray[j], mergedArray[i]];
    }

    setDataCardArray(mergedArray);
  };

  const handleOnClickCard = (dataCard, index) => {
    if (!selectedCard.includes(index)) {
      if (!dataCard.selected) {
        const data = [...dataCardArray];
        selectedCard.push(index);

        if (selectedCard.length === 2) {
          if (data[selectedCard[0]].id === data[selectedCard[1]].id) {
            data[index].selected = true;

            setSucceeds(succeeds + 1);

            setSelectedCard([]);
          } else {
            setTimeout(() => {
              setSelectedCard([]);

              setFailures(failures + 1);

              data[index].selected = false;
            }, 750);
          }
        } else {
          setSelectedCard([...selectedCard]);
        }

        setDataCardArray(data);
      }
    }
  };

  const handleShowOrHideCard = (dta, index) => {
    if (
      selectedCard[0] === index ||
      selectedCard[1] === index ||
      dta.selected
    ) {
      return '[transform:rotateY(180deg)]';
    } else {
      return '';
    }
  };

  const handleOnCloseModal = e => {
    const data = [...dataCardArrayOriginal];

    // Fisher Yates Modern method for shuffle data in array
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }

    data.forEach(dta => {
      dta.selected = false;
    });

    setFailures(0);
    setSucceeds(0);

    setSelectedCard([]);

    setDataCardArray(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-10 bg-gradient-to-r from-sky-500 to-indigo-500">
      <Modal show={showModal} onClose={e => handleOnCloseModal(e)} />
      <div className="flex gap-20 justify-center mb-10 bg-cyan-300 p-10 rounded-md">
        <p>Errores : {failures}</p>
        <p>Aciertos : {succeeds}</p>
      </div>
      <div className="container mx-auto bg-gray-100 border-slate-700 p-20 rounded-md shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex flex-wrap gap-20 justify-center">
          {dataCardArray.map((dta, index) => {
            return (
              <div
                key={index}
                onClick={() => handleOnClickCard(dta, index)}
                className={`relative box-content h-40 w-24 p-4 transition-all duration-500 cursor-pointer [transform-style:preserve-3d] ${handleShowOrHideCard(
                  dta,
                  index,
                )}`}>
                <div className="absolute inset-0">
                  <img
                    className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                    src="https://img.freepik.com/free-vector/question-mark-sign-brush-stroke-trash-style-typography-vector_53876-140880.jpg?w=1380&t=st=1694996486~exp=1694997086~hmac=5e40dc594c0e3c3c689a2623ee5d599e70a34b9844a6a9c18df07e087c5a8eb6"
                    alt=""
                  />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="absolute inset-0">
                    <img
                      className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                      src={dta.image}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
