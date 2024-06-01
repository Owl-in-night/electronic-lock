import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ingreso, setIngreso] = useState(null);
  const [egreso, setEgreso] = useState(null);
  // Raspberry Pi
  const [channel, setChannel] = useState(false);
  const [lucesA, setLucesA] = useState(false);
  const [lucesB, setLucesB] = useState(false);

  const handleMeasure = async () => {
    setLoading(true);
    setError(null);
    try {
      //Send and response data
      const response = await axios.get('http://<IP-RASPPBERRY-PI>:5000/lab/<service>/<id>');
      //Inicialmente 
      setChannel(response.data.channel);
      setLucesA(response.data.led_pinA);
      setLucesB(response.data.led_pinB);
      //TimeStap
      const now = new Date();
      if (!ingreso || egreso) {
        setIngreso(now);
        setEgreso(null);
      } else {
        setEgreso(now);
      }
    } catch (error) {
      console.error('Error simulando la apertura:', error);
      setError('Hubo un problema al simular la apertura. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Función para formatear la fecha y hora como lo hace Firebase
  const formatDateTime = (dateTime) => {
    if (!dateTime) return '---';
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    };
    return dateTime.toLocaleString('en-US', options);
  };

  return (
    <>
      <div>
        <h1>¡Bienvenido!</h1>
        <button onClick={handleMeasure} disabled={loading}>
          {loading ? 'Abriendo...' : 'Abrir lab'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <p>Ingreso: {formatDateTime(ingreso)}</p>
          <p>Egreso: {formatDateTime(egreso)}</p>
        </div>
      </div>
    </>
  );
}

export default Home;
