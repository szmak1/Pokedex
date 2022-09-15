import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "axios";
import './App.css';
import Header from './components/Header';
import { TYPE_COLORS } from './components/colors';

function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonName, setPokemonName] = useState([]);
  const [typeColor, setTypeColor] = useState("");

  const getPokemonCard = async () => {
    const pokeArr = [];
    try {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const pokemonRes = await axios.get(pokemonUrl);
      setTypeColor(typeColor)
      pokeArr.push(pokemonRes.data);
      setPokemonData(pokeArr);
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then( ({ data: { results } }) => {
        const newPokemonData = [];
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
          };
        });
        setPokemonName(newPokemonData);
      });
  }, []);
 
  const handleSearchChange = (e, newValue) => {
    if (typeof newValue === 'string') {
      setPokemon(newValue.toLowerCase());
    } else if (newValue && newValue.inputValue) {
      setPokemon(newValue.inputValue.toLowerCase());
    } else {
      setPokemon(e.target.value.toLowerCase());
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getPokemonCard();
  }
  return (
    <div className="App">
      <Header />
      <div>
        <Autocomplete
          freeSolo
          disableClearable
          options={pokemonName.map((option) => option.name)}
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              className='bg-gray-80 border border-gray-300 text-md   block w-full pl-10 p-2.5  dark:bg-gray-100 '
              required={true}
              label="Search Pokemon"
              margin="normal"
              variant="filled"
              onChange={handleSearchChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    handleSearch(event);
                }
              }}
              InputProps={{ ...params.InputProps, type: 'search' }}
              style={{maxWidth: 464}}
            />
            


            
          )}
      
        />
        <div className='flex justify-center m-auto' style={{maxWidth: "464px", backgroundColor: "#ed5564"}}>
        <button className="p-4 text-lg uppercase block w-full pl-10 p-2.5 rounded-bl-md" onClick={handleSearch} style={{backgroundColor: "#ed5564"}}>Search</button>
        </div>
      </div>
      
      {pokemonData.map((data) => {
        const imageUrl = data.sprites;
        const themeColor = data.types[0].type.name;
        const pokeName = data.name.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')

        return (
          <div key={data.id} className="container mx-auto">
            <div className="flex flex-wrap justify-center">
              <div className="w-full p-6 flex flex-col">
       
            <div
            className="bg-black/[.3] p-12 rounded-lg self-center"
              style={{
                maxWidth: "464px",
                border: `2px solid #${TYPE_COLORS[themeColor]}`,   
              }}>
              <div className="text-gray-100 ">
                <h3 className="text-3xl">
                  {pokeName}
                </h3>
              </div>
              <div className="poke">
           
                <div className="basic-data">
                  <div className="flex flex-center center justify-center mt-4 mb-4">
                      <img width="148px" className="pokemon-image flex center" src={imageUrl.other.dream_world.front_default} alt={pokeName} />
                  </div>

                  <div className="text-gray-100 text-lg flex ">
                  <div className="w-1/2">
                      <div className="">
                            <h5 className="text-left absolute right-4 top-4">ID: #{data.id}</h5>
                            <div className="flex justify-start gap-4 ">
                                <div>Height: </div>
                                <div>{Math.round(data.height) / 10} m</div>
                            </div>
                            <div className="flex justify-start gap-4 ">
                                <div>Weight: </div>
                                <div >{Math.round(data.weight) / 10} kg</div>
                            </div>
                            <div className="gap-8 text-left mt-2">Abilities: </div>
                        <div className="uppercase flex justify-start text-left flex-col text-sm ">
                          {data.abilities.map(abilities => (
                                <span key={abilities.id}>{abilities.ability.name}&nbsp;</span>
                          ))}
                        </div>
                        <div className="text-left mt-4 ">
                <h5 className="text-bold gap-8 mb-2">Type:</h5>
                  <div className="flex justify-even gap-4">
                  {data.types.map(type => (
                    
                    <span
                      key={type.name}
                      className="flex flex-row gap-2"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type.type.name]}`,
                        textTransform: 'uppercase',
                        borderRadius: 5,
                        padding: 5,
                      }}
                    >{type.type.name}</span>
                  ))}
                </div>
                    </div>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="status">
                          <div className="flex justify-even"><p className="pr-2">HP: </p> <p className="text-right">{data.stats[0].base_stat} </p></div>
                          <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[0].base_stat}%`,
                                  border: `2px solid #${TYPE_COLORS[themeColor]}`,
                                  maxWidth: "100%",
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                              </div>
                          </div>
                        </div>
                        <div className="status  mt-2">
                          <div className="flex justify-even"><p className="pr-2">Attack: </p> <p className="text-right">{data.stats[1].base_stat} </p></div>
                          <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                // max width is 150px progress bar
                                style={{
                                  width: `${data.stats[1].base_stat}%`,
                                  border: `2px solid #${TYPE_COLORS[themeColor]}`,
                                  maxWidth: "100%",
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                              </div>
                          </div>
                        </div>
                        <div className="status mt-2">
                        <div className="flex justify-even"><p className="pr-2">Defense: </p> <p className="text-right">{data.stats[2].base_stat} </p></div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[2].base_stat}%`,
                                  border: `2px solid #${TYPE_COLORS[themeColor]}`,
                                  maxWidth: "100%",
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                              </div>
                          </div>
                        </div>

                        <div className="status mt-2">
                        <div className="flex justify-even"><p className="pr-2">Special attack: </p> <p className="text-right">{data.stats[3].base_stat} </p></div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[3].base_stat}%`,
                                  border: `2px solid #${TYPE_COLORS[themeColor]}`,
                                  maxWidth: "100%",
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                              </div>
                          </div>
                        </div>
                        <div className="status mt-2">
                        <div className="flex justify-even"><p className="pr-2">Special defense: </p> <p className="text-right">{data.stats[4].base_stat} </p></div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[4].base_stat}%`,
                                  border: `2px solid #${TYPE_COLORS[themeColor]}`,
                                  maxWidth: "100%",
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                              </div>
                          </div>
                        </div>
                        <div className="status mt-2">
                        <div className="flex justify-even"><p className="pr-2">Speed: </p> <p className="text-right">{data.stats[5].base_stat} </p></div>
                          <div  className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                  width: `${data.stats[5].base_stat}%`,
                                  border: `2px solid #${TYPE_COLORS[themeColor]}`,
                                  maxWidth: "100%",
                                }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              > 
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    

        );
      })}
    </div>
  );
}

export default App;