import { useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {toast} from 'react-toastify';

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

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        //se tiver algum filme salvo com este mesmo id, ignorar
        const hasFilme = filmesSalvos.some((filmeSalvo)=>filmeSalvo.id === filme.id)

        if (hasFilme){
            //alert('Filme já adicionado anteriormente!');
            toast.warning('Você já possui esse filme em sua lista!')
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes',JSON.stringify(filmesSalvos));
        //alert('Filme adicionado!')
        toast.success("Filme adicionado a sua lista!")
    }

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
                <button onClick={salvaFilme}>Salvar</button>
                <a target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
                    Trailer
                </a>
            </div>
        </div>
    )
}