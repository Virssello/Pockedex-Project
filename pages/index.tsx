import { Box, Grid, List, ListItemButton } from "@mui/material";
import { ListSubheader, TextField } from "@material-ui/core";
import { Pokemon, Type } from "../interfaces/interfaces";
import { useEffect, useState } from "react";

import { CenterFocusStrong } from "@material-ui/icons";
import { Fetcher } from "swr";
import Head from "next/head";
import { LoadingButton } from "@mui/lab";
import { ModalBox } from "../components/components";
import type { NextPage } from "next";
import React from "react";
import axios from "axios";
import useSWRInfinite from "swr/infinite";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const Home: NextPage = () => {
  const fetcher: Fetcher<Pokemon, string> = async (url) =>
    await axios.get(url).then((res) => res.data.results);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${API_URL}?limit=20&offset=${index * 20}`,
    fetcher
  );

  const pokemons = data?.flat() || [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const [activePokemon, setActivePokemon] = useState<Pokemon | null>(null);
  const [filterName, setFilterName] = useState<string>("");

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.includes(filterName.toLowerCase())
  );

  const loadPokemonDetails = async (name: string) => {
    const pokemon: Pokemon = (await axios.get(`${API_URL}/${name}`)).data;

    setActivePokemon(pokemon);
  };

  console.log(pokemons);

  console.log(activePokemon);
  if (error) return <p>Loading failed...</p>;
  if (!data) return <h1>Loading...</h1>;

  return (
    <div className="BodyApp">
      <Head>
        <title>Pokemon World</title>
        <meta name="description" content="Pokemon list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome in Pokemon World</h1>
        <h2>List of pokemons</h2>
        <TextField
          id="outlined-search"
          label="Pokemon name"
          type="search"
          value={filterName}
          onChange={(event) => {
            setFilterName(event.target.value);
          }}
          helperText="What pokemon are you looking for?"
        />

        <List>
          <div>
            <ListSubheader color="primary">
              <h3>Press on name of the pokemon to see more details</h3>
            </ListSubheader>
            {filteredPokemons.map((pokemon) => (
              <div
                className="pokemonDetails"
                key={pokemon.id}
                onClick={() => {
                  loadPokemonDetails(pokemon.name);
                }}
              >
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    p: 2,
                    border: "1px dashed grey",
                    borderColor: "primary.main",
                  }}
                >
                  <ListItemButton>{pokemon.name}</ListItemButton>

                  {pokemon.name === activePokemon?.name && (
                    <div>
                      <div>
                        <img
                          src={activePokemon.sprites.front_default}
                          alt="Pokemon image"
                          width="200px"
                        />
                      </div>
                      <ul>
                        {activePokemon.types.map(({ type }) => (
                          <li key={type.name}>{type.name}</li>
                        ))}
                      </ul>
                      <br />
                      <div>
                        <ModalBox activePokemon={activePokemon} />
                      </div>
                    </div>
                  )}
                </Grid>
              </div>
            ))}
          </div>
        </List>
        < br/>
        <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
          <LoadingButton
            disabled={isLoadingMore}
            onClick={() => setSize(size + 1)}
            loadingPosition="start"
            loadingIndicator="Loading..."
            variant="contained"
            color="primary"
          >
            Load more
          </LoadingButton>
        </Grid>
      </main>
      <footer className="footer">
        Created by Sebastian Jurczak for Virtuslab HR team.
      </footer>
    </div>
  );
};

export default Home;
