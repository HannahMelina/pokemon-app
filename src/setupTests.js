// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pkmName, setPkmName] = useState("");
  const [pkmChosen, setPkmChosen] = useState(false);
  const [ability, setAbility] = useState("");
  const [hiddenAbility, setHiddenAbility] = useState("");

  const [pkmInfo, setPkmInfo] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPkm = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pkmName}`.toLowerCase())
      .then((response) => {
        setPkmInfo({
          name: pkmName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          type: response.data.types,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialAttack: response.data.stats[3].base_stat,
          specialDefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          weight: response.data.weight,
          move: response.data.moves,

          ability: response.data.abilities.filter(
            (ability) => !ability.is_hidden
          ),
          hiddenability: response.data.abilities.filter(
            (ability) => ability.is_hidden
          ),
        });
        setPkmChosen(true);
      });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      searchPkm();
    }
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokemon Stats</h1>
        <input
          type="text"
          onChange={(event) => {
            setPkmName(event.target.value);
          }}
          onKeyDown={(event) => handleKeyDown(event)}
        ></input>
        <button onClick={searchPkm} onKeyDown={(event) => handleKeyDown(event)}>
          search Pokemon...
        </button>
      </div>
      <div className="DisplaySection">
        {!pkmChosen ? (
          <h1>Choose your Pokemon!</h1>
        ) : (
          <>
            <h1>
              {pkmInfo.name.toUpperCase().slice(0, 1).toUpperCase() +
                pkmInfo.name.slice(1, pkmInfo.name.length)}
            </h1>
            <img src={pkmInfo.img} />
            <div>
              <h5>
                type:
                {pkmInfo.type.map((type, index) => {
                  if (index === pkmInfo.type.length - 1) {
                    return type.type.name;
                  }
                  return type.type.name + ", ";
                })}
              </h5>
              <h5>
                ability:{" "}
                {pkmInfo.ability.map((ability, index) => {
                  if (index === pkmInfo.ability.length - 1) {
                    return ability.ability.name;
                  }
                  return ability.ability.name + ", ";
                })}
              </h5>
              <h5>
                hidden ability:{" "}
                {pkmInfo.hiddenability.map((ability, index) => {
                  if (index === pkmInfo.hiddenability.length - 1) {
                    return ability.ability.name;
                  }
                  return ability.ability.name + ", ";
                })}
              </h5>
              <h5>weight: {pkmInfo.weight}</h5>
            </div>
            <h2>Values with maximum EV and nature</h2>
            <h3>HP: {pkmInfo.hp}</h3>
            <h3>attack: {pkmInfo.attack}</h3>
            <h3>defense: {pkmInfo.defense}</h3>
            <h3>special attack: {pkmInfo.specialAttack}</h3>
            <h3>special defense: {pkmInfo.specialDefense}</h3>
            <h3>initiative: {pkmInfo.speed}</h3>

            <h2 className="move">
              Moves:{" "}
              {pkmInfo.move.map((move, index) => {
                if (index === pkmInfo.move.length - 1) {
                }

                return <li>{move.move.name}</li>;
              })}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
