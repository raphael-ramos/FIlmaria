import { useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../services/api';

import './filme-info.css'

export default function Filme(){

    const [filme,setFilme] = useState([])
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const navigate = useNavigate()

    useEffect(()=>{
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            //verifica se existe item com o id informado na url, caso não exista na api é redirecionado  para a home
            if(response.data.length === 0){
                navigate('/');
                return;
            }
            // console.log(response.data);
            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();
        return()=>{
            console.log("componente desmontado")
        }
    },[id, navigate])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando filme...</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome}/>
            <h3>Sinopse</h3>
            <p>{filme.sinopse}</p>
            <div className='botoes'>
                <button onClick={()=>{}}>Salvar</button>
                <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
                    Trailer
                </a>
            </div>
        </div>
    )
}