import { useState, useEffect } from "react";
import useBreedList from "./useBreedList";
import ListPets from "./ListPets";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

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
        <FormInput
          inputName="state"
          inputValue={state}
          inputUpdateFunction={updateState}
        />
        <FormSelect
          inputName="animal"
          inputValue={animal}
          inputUpdateFunction={updateAnimal}
          choices={ANIMALS}
        />
        <FormSelect
          inputName="breed"
          inputValue={breed}
          inputUpdateFunction={updateBreed}
          choices={breeds}
        />
        <button>Submit</button>
      </form>
      <ListPets pets={pets} />
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
