import { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario"; 

import axios from 'axios';

function App() {

  const [ busquedaLetra, setBusquedaLetra ] = useState({});

  const [ letra, setLetra ] = useState('')

  useEffect(() => {

    if (Object.keys(busquedaLetra).length === 0) return;

    const consultaApiLetra = async () => {

        const { artista, cancion } = busquedaLetra;
        const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

        const result = await axios(url);

        setLetra(result.data.lyrics);
    }

    consultaApiLetra();

  }, [busquedaLetra])

  return (
    <Fragment>
      <Formulario 
          setBusquedaLetra={setBusquedaLetra} />
    </Fragment>
  );
}

export default App;
