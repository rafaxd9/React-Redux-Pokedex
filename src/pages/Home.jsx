import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Skeletons } from "../components/Skeletons";
import { useSelector, useDispatch } from "react-redux";
import PaginationControlled from "../components/Pagination"


export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
      for (var i = 1; i < 49; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
  };
  

  const getPokemonsByPage = (pag) => {
    const pEnd = pag * 49;
    const page = pEnd - 48;

    var endpoints = [];
    if(pag != 21) {
      for (var i = page; i < pEnd; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
    } else {
      for (var i = page; i < 1026; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
  };

  const { searchType } = useSelector(rootReducer => rootReducer.userReducer);

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    
    for (var i in pokemons) {
      if (!searchType) {
        if (pokemons[i].data.name.includes(name)) {
          filteredPokemons.push(pokemons[i]);
        }
      } else {
        if (pokemons[i].data.types[0].type.name.includes(name)) {
          filteredPokemons.push(pokemons[i]);
        }
      }
    }

    setPokemons(filteredPokemons);
  };

  const pokemonPage = (pag) => {

    getPokemonsByPage(pag);
  }

  

  const pokemonPickHandler = (pokemonData) => {
    //setPokemonData(pokemonData);
    dispatch({
      type: 'id',
      payload: pokemonData
    })
    navigate("/profile");
  };



  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                  <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                </Box>
              </Grid>
            ))
          )}
          
        </Grid>
        <PaginationControlled pokemonPage={pokemonPage}/>
      </Container>

    </div>
  );
};
