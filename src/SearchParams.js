import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import Pet from "./Pet";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [state, setState] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);

  // Here is an example of mutation of the "const"...not a good use of const since it is not a primitive, it is an array!
  //   pets[0] = {
  //     name: "Tom",
  //     animal: "Human",
  //     Breed: "Whatever",
  //     city: "Baltimore",
  //     state: "MD",
  //     id: 65462536,
  //   };

  useEffect(() => {
    requestPets();
  }, [state, animal, breed]); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const url = `http://pets-v2.dev-apis.com/pets?animal=${animal}&state=${state}&breed=${breed}`;
    const res = await fetch(url);
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="state">
          state
          <input
            id="state"
            value={state}
            placeholder="State"
            onChange={updateState}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={updateAnimal}
            onBlur={updateAnimal}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={updateBreed}
            onBlur={updateBreed}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          location={pet.city + ", " + pet.state}
          key={pet.id}
        />
      ))}
    </div>
  );

  function updateState(e) {
    setState(e.target.value);
  }

  function updateAnimal(e) {
    setAnimal(e.target.value);
    setBreed("");
  }

  function updateBreed(e) {
    setBreed(e.target.value);
  }
};

export default SearchParams;
