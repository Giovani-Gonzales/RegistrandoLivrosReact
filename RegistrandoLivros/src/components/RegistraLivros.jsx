import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './RegistraLivrosStyle.css'

const RegistraLivros = () => {
    const [livro, setLivro] = useState('');
    const [autor, setAutor] = useState('');
    const [data, setData] = useState('');
    const [livros, setLivros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLivros = async () => {
        try {
            const response = await axios.get('http://localhost:3000/livros');
            setLivros(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLivros();
    }, []);

    const HandleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/livros', { livro, autor, data });
            if (response.status === 201) {
                alert('Cadastrado com sucesso');
                fetchLivros();
                setLivro('');
                setAutor('');
                setData('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const filteredLivros = livros.filter(livro =>
        livro.livro.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <form onSubmit={HandleRegister}>
                <label>Nome do livro</label>
                <input 
                    type='text' 
                    id='book' 
                    value={livro}
                    onChange={(e) => setLivro(e.target.value)} 
                    required
                />

                <label>Nome do Autor</label>
                <input 
                    type='text' 
                    id='autor' 
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)} 
                    required
                />

                <label>Data de lançamento</label>
                <input 
                    type='date' 
                    id='date' 
                    value={data}
                    onChange={(e) => setData(e.target.value)} 
                    required
                />

                <button type='submit'>Registrar livro</button>
            </form>

            <div className='BooksList'>
                <h2>LISTA DE LIVROS</h2>

                <label>Pesquisar livro</label>
                <input 
                    type='text' 
                    placeholder='Digite o nome do livro'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />

                <ul>
                    {filteredLivros.map((livro) => (
                        <li className='Livro' key={livro.id}>
                            {livro.livro} por {livro.autor} - {livro.data}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RegistraLivros;
