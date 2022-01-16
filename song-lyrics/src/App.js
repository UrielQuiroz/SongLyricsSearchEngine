import { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";

import axios from 'axios';

function App() {

  const [ busquedaLetra, setBusquedaLetra ] = useState({});

  const [ letra, setLetra ] = useState('')
  const [ info, setInfo ] = useState({})

  useEffect(() => {

    if (Object.keys(busquedaLetra).length === 0) return;

    const consultaApiLetra = async () => {

        const { artista, cancion } = busquedaLetra;
        const urlLycrics = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
        const urlAudiobd = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artista}`;

        // const rpta = await fetch(urlAudiobd);
        // const result = await rpta.json();
        // console.log(result);

        const [ letra, info ] = await Promise.all([
            axios(urlLycrics),
            axios(urlAudiobd)
        ])

        setLetra(letra.data.lyrics);
        setInfo(info.data.artists[0]);
    }

    consultaApiLetra();

  }, [busquedaLetra])

  return (
    <Fragment>
      <Formulario 
          setBusquedaLetra={setBusquedaLetra} />
      
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">

          </div>

          <div className="col-md-6">
              <Cancion 
                    letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
