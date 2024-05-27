// import '../App.css'
// import { useState } from 'react';

// function Home() {
// // Define un estado para el botón
// const [isButtonActive, setIsButtonActive] = useState(false);


// // Función para cambiar el estado del botón
// const toggleButtonState = () => {
//   setIsButtonActive(!isButtonActive);
// };

//   return (
//     <>
//      <div>
//       {/* Botón que cambia su estado al hacer clic */}
//       <button className='' onClick={toggleButtonState}>
//         {isButtonActive ? 'Abrir' : 'Cerrar'}
//       </button>
//     </div>
//     </>
//   )
// }

// export default Home
import { useState, useEffect } from 'react';

function Home() {
  const [activations, setActivations] = useState([]);

  const activateRelay = async () => {
    const response = await fetch('/activate', { method: 'POST' });
    const result = await response.json();
    if (result.status === 'success') {
      fetchActivations();
    }
  };

  const fetchActivations = async () => {
    const response = await fetch('/activations');
    const result = await response.json();
    setActivations(result);
  };

  useEffect(() => {
    fetchActivations();
  }, []);

  return (
    <div>
      <h1>Control de Relé</h1>
      <button onClick={activateRelay}>Activar Relé</button>
      <h2>Historial de Activaciones</h2>
      <ul>
        {activations.map((activation, index) => (
          <li key={index}>{new Date(activation.timestamp).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
