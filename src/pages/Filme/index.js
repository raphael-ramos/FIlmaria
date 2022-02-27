import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../services/api';

import './filme-info.css'

export default function Filme(){

    const [filme,setFilme] = useState([])
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(()=>{
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            // console.log(response.data);
            setFilme(response.data);
            setLoading(false);
        }

        loadFilme();
    },[id])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando filme</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>Página detalhes - {filme.nome}</h1>
        </div>
    )
}