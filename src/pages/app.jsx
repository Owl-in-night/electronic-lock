import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ingreso, setIngreso] = useState(null);
  const [egreso, setEgreso] = useState(null);
  // Raspberry Pi
  const [channel, setChannel] = useState(false);
  const [luces, setLuces] = useState(false);


  const releService = async () => {
    setLoading(true);
    setError(null);
    try {
      // Send and response data
      //const response = await axios.get('http://<IP_RASPBERRY>:5000/lab/<service>/<id>');
      const response = await axios.get('http://192.168.222.143:5000/lab/luzA/1');
      //Inicialmente 
      setChannel(response.data.channel);
      //TimeStap
      const now = new Date();
      if (!ingreso || egreso) {
        setIngreso(now);
        setEgreso(null);
      } else {
        setEgreso(now);
      }
    } catch (error) {
      console.error('Error del servicio:', error);
      setError('Hubo un problema al inicio al servicio Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const lucesService = async () => {
    setLoading(true);
    setError(null);
    try {
      // Send and response data
      //const response = await axios.get('http://<IP_RASPBERRY>:5000/lab/<service>/<id>');
      const response = await axios.get('http://192.168.222.143:5000/lab/luzA/1');
      //Inicialmente 
      setLuces(response.data.channel);
      //TimeStap
      const now = new Date();
      if (!ingreso || egreso) {
        setIngreso(now);
        setEgreso(null);
      } else {
        setEgreso(now);
      }
    } catch (error) {
      console.error('Error del servicio:', error);
      setError('Hubo un problema al inicio al servicio Por favor, inténtalo de nuevo más tarde.');
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
        <h1 className="absolute h-[54px] top-14 left-[249px] [font-family:'Inter',Helvetica] font-bold text-[#434343] text-4xl tracking-[-0.36px] leading-[54px] whitespace-nowrap">Electronic Lock!</h1>
        <button onClick={releService} disabled={loading}>
          {loading ? 'Abriendo...' : 'Abrir lab'}
        </button>
        <br></br>
        <br></br>
        <button className='' onClick={lucesService} disabled={loading}>
          {loading ? 'Encendiendo...' : 'Encender'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <p className="left-[229px] text-[#080707f2] absolute h-12 top-[167px] [font-family:'Inter',Helvetica] font-semibold text-[32px] tracking-[-0.32px] leading-[48px] whitespace-nowrap">Time &amp; date Income</p>
          <p className="left-[348px] absolute h-[54px] top-[222px] [font-family:'Inter',Helvetica] font-semibold text-[#080808] text-1xl tracking-[-0.36px] leading-[54px] whitespace-nowrap">{formatDateTime(ingreso)}</p>
          <p className="left-[1167px] text-[#080808] absolute h-12 top-[167px] [font-family:'Inter',Helvetica] font-semibold text-[32px] tracking-[-0.32px] leading-[48px] whitespace-nowrap">Time &amp; date Egress</p>
          <p className="left-[1279px] absolute h-[54px] top-[222px] [font-family:'Inter',Helvetica] font-semibold text-[#080808] text-1xl tracking-[-0.36px] leading-[54px] whitespace-nowrap">{formatDateTime(egreso)}</p>
        </div>
      </div>
    </>
  );
}

export default Home;
