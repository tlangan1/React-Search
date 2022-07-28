// for state the parameters are: 1) a string, "state"; 2) a variable, state; and 3) a function, updateState
const FormInput = (props) => {
  return (
    <label htmlFor={props.inputName}>
      {props.inputName}
      <input
        id={props.inputName}
        value={props.inputValue}
        placeholder={props.inputName} /* This should be captialized */
        onChange={props.inputUpdateFunction}
      />
    </label>
  );
};

export default FormInput;
