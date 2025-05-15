import React, { useEffect, useRef, useState } from "react";

type Props = {};

function CustomUseEffectExample1({}: Props) {
  const [counter, setCounter] = useState<number>(0);
  const [xCounter, seXCounter] = useState<number>(0);
  const butonRef = useRef<HTMLButtonElement>(null);





  useEffect(() => {
    seXCounter((prev) => prev + 1);

    if(butonRef.current) {
         butonRef.current.style.color = 'red';
         butonRef.current.remove()
    }
  }, [counter]);

  return (
    <div>
      normal - {counter} <br />
      useEffect - {xCounter}
      <button
        ref={butonRef}
        id="btn"
        onClick={() => {
          // setCounter(counter + 1)
          setCounter((prev) => prev + 1);
        }}
      >
        Arttır
      </button>
    </div>
  );
}

export default CustomUseEffectExample1;
