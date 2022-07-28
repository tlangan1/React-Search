const FormSelect = (parameters) => {
  return (
    <label htmlFor={parameters.inputName}>
      {parameters.inputName}
      <select
        id={parameters.inputName}
        value={parameters.inputValue}
        placeholder={parameters.inputName} /* This should be captialized */
        onChange={parameters.inputUpdateFunction}
      >
        <option />
        {parameters.choices.map((choice) => (
          <option key={choice} value={choice}>
            {choice}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FormSelect;
