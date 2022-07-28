import Pet from "./Pet";

const ListPets = (ps) => {
  return (
    <div>
      {ps.pets.map((pet) => (
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
};

export default ListPets;
