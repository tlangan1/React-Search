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

  // Also, the use of const on the primitive "state" values is reasonable since it signals that they can't be reassigned
  // manually; although it is odd in a way since they obviously change value via their "set" functions.

  useEffect(() => {
    requestPets();

    async function requestPets() {
      const url = `http://pets-v2.dev-apis.com/pets?animal=${animal}&state=${state}&breed=${breed}`;
      const res = await fetch(url);
      const json = await res.json();

      setPets(json.pets);
    }
  }, [state, animal, breed]);

  return (
    <div className="search-params">
      <form>
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
