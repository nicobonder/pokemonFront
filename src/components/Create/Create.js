import React, { useEffect, useState } from "react";
import s from "./Create.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

//FUNCION VALIDADORA
function validate(input){  //va a recibir el estado input con los cambios detectados por los handlers
    let errors = {};  //objeto que guarda todos los errores y le agrego props con los nombres iguales a los del input
    if(!input.name){  //si imput no tiene una prop name                             
        errors.name = 'a name is required';//al obj errors le agrego una prop name q tiene un mensaje como valor
    }else if(!/^[A-z]+$/.test(input.name)){  //regex solo acepta letras
        errors.name = 'only letters allowed'
  }else if(!input.img){
      errors.img = 'insert an url';
  }else if(!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(input.img)){ 
      errors.img = 'only URL directions allowed'
  }else if(input.hp < 1 || input.hp > 200){ //en los numericos reviso que esten entre esos valores
      errors.hp = 'must be a value between 1 and 200'
  }else if(!/^[0-9]+$/.test(input.hp)){ 
      errors.hp = 'only numbers allowed' //y que solo acepte numeros
  }else if(input.attack < 1 || input.attack > 200){
      errors.attack = 'must be a value between 1 and 200'
  }else if(!/^[0-9]+$/.test(input.attack)){ 
      errors.attack = 'only numbers allowed'
  }else if(input.defense < 1 || input.defense > 200){
      errors.defense = 'must be a value between 1 and 200'
  }else if(!/^[0-9]+$/.test(input.defense)){ 
      errors.defense = 'only numbers allowed'
  }else if(input.speed < 1 || input.speed > 200){
      errors.speed = 'must be a value between 1 and 200'
  }else if(!/^[0-9]+$/.test(input.speed)){ 
      errors.speed = 'only numbers allowed'
  }else if(input.height < 1 || input.height > 200){
      errors.height = 'must be a value between 1 and 200'
  }else if(!/^[0-9]+$/.test(input.height)){ 
      errors.height = 'only numbers allowed'
  }else if(input.weight < 1 || input.weight > 200){
      errors.weight = 'must be a value between 1 and 200'
  }else if(!/^[0-9]+$/.test(input.weight)){ 
      errors.weight = 'only numbers allowed'
  }else if(input.types.length < 1){ //tiene que haber al menos un type
      errors.types = 'select at least 1 type'
  }
      return errors;  //se retorna el obj errors con la prop y el string correspondiente. ej: let errors ={name: 'a name is required'}
}

export default function Create() {
  const pokemons = useSelector((state)=> state.allPokemons);
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({e:''}); 
  const [input, setInput] = useState({
    name: "",
    attack: 0,
    defense: 0,
    speed: 0,
    hp: 0,
    height: 0,
    weight: 0,
    img: "",
    types: [],
    createdInDB: true
  });

  //para crear este error, primero necesitaba una func que busque el name. Asi no se puede crear un poke con un name = a uno existente
  const findPoke = pokemons.find((poke) => poke.name.toLowerCase() === input.name.toLowerCase())
  if(findPoke){
    errors.name = 'That Pokemon already exist'
  }
 
  //Ordeno los types p/ que aparezcan ordenados en las opciones
  const sortTypes = types.sort((x, y) => x.name.localeCompare(y.name));
  console.log('sortTypes', sortTypes)

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    }))
  };

  function handleSelect(e) { //para los types necesito una func aparte
    //recibe el type que se seleccionó en el selector
    if (!input.types.includes(e.target.value)) {
      //evita que se repitan los tipos
      setInput({
        ...input,
        types: [...input.types, e.target.value], //al array de la prop types le añade el nuevo tipo que se seleccionó
      });
    }
    setErrors(validate({
      ...input,
            types: [...input.types, e.target.value]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.createPokemon(input));
    console.log("form submited");
    setInput({//resetea el estado del input
      name: "",
      attack: 0,
      defense: 0,
      speed: 0,
      hp: 0,
      height: 0,
      weight: 0,
      img: "",
      types: [],
      createdInDB: true
    });
    history.push("/pokemons"); //despues redirige para ver todos los poke
  };

  function handleDelete(el) { //la X activa un evento para borrar el type
    setInput({
      ...input,
      types: input.types.filter((t) => t !== el), //se filtra el array de la prop type, dejando pasar solo aquellos tipos que no coinciden con el clickeado
    });
  }

  useEffect(() => {
    dispatch(actions.getTypes()); //al montarse el comp me trae todos los tipos
  }, [dispatch]);

  return (
    <div className={s.formSection}>
      <h2>Create your own Pokemon</h2>
      <div className={s.form}>
        <form action="POST" onSubmit={(e) => handleSubmit(e)}>
          <div className={s.inputs}>
            <div className={s.input}>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />
               {errors.name && <p className={s.error}>{errors.name}</p>} {/*si el estado errors tiene la prop name, renderizo un parrafo con el string de esta prop */}
            </div>
            <div className={s.input}>
              <label htmlFor="attack">Attack: </label>
              <input
                type="number"
                min={0}
                id="attack"
                name="attack"
                value={input.attack}
                onChange={(e) => handleChange(e)}
              />
              {errors.attack && <p className={s.error}>{errors.attack}</p>}
            </div>
            <div className={s.input}>
              <label htmlFor="defense">Defense: </label>
              <input
                type="number"
                min={0}
                id="defense"
                name="defense"
                value={input.defense}
                onChange={(e) => handleChange(e)}
              />
               {errors.defense && <p className={s.error}>{errors.defense}</p>}
            </div>
            <div className={s.input}>
              <label htmlFor="speed">Speed: </label>
              <input
                type="number"
                min={0}
                id="speed"
                name="speed"
                value={input.speed}
                onChange={(e) => handleChange(e)}
              />
                {errors.speed && <p className={s.error}>{errors.speed}</p>}
            </div>
            <div className={s.input}>
              <label htmlFor="hp">Hp: </label>
              <input
                type="number"
                min={0}
                id="hp"
                name="hp"
                value={input.hp}
                onChange={(e) => handleChange(e)}
              />
                {errors.hp && <p className={s.error}>{errors.hp}</p>}
            </div>
            <div className={s.input}>
              <label htmlFor="height">Height: </label>
              <input
                type="number"
                min={0}
                id="height"
                name="height"
                value={input.height}
                onChange={(e) => handleChange(e)}
              />
                {errors.height && <p className={s.error}>{errors.height}</p>}
            </div>
            <div className={s.input}>
              <label htmlFor="weight">Weight: </label>
              <input
                type="number"
                min={0}
                id="weight"
                name="weight"
                value={input.weight}
                onChange={(e) => handleChange(e)}
              />
                {errors.weight && <p className={s.error}>{errors.weight}</p>}
            </div>
            <div className={s.input}>
              <label htmlFor="img">Image(url): </label>
              <input
                type="text"
                id="img"
                name="img"
                value={input.img}
                onChange={(e) => handleChange(e)}
              />
                {errors.img && <p className={s.error}>{errors.img}</p>}
            </div>

            <div className={s.typeForm}>
              {input.types.length < 2 ? ( //si hay menos de 2 types elegidos
                <select value="default" onChange={(e) => handleSelect(e)}>
                  {/*Cuando se selecciona una opcion se ejecuta handleSelect con esa seleccion*/}
                  <option value="default" disabled hidden>
                    Pokemon type
                  </option>
                  {types.map((type) => ( //mapeo todos los types
                  <option value={type.name} key={type.name}>{type.name[0].toUpperCase() + type.name.slice(1)}</option>
                 ))}
                </select>
              ) : ( //si ya eligio 2, no se muestran las opciones
                <p className={s.error}>cannot have more than 2 types</p>
              )}
            </div>
            {errors.types && <p className={s.error}>{errors.types}</p>}
            <div className={s.input}>
              {input.types.map((el, index) => ( //Recorro el array de la prop type del input. O sea, los elegidos
                  <div className={s.typeContent} key={index}>
                    <p className={s.showType}>{el}</p> {/*y los muestro junto con un boton X*/}
                    <button
                      className={s.deleteType}
                      type="button"
                      onClick={() => handleDelete(el)}
                    >
                      x {/*cuando clickeo en X se ejecuta handleDelete*/}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
          <div className={s.divBtn}>
          {Object.keys(errors).length || !input.types.length ? 
              <button className={s.notSubmit} type='submit' disabled>please complete the form</button> : 
              <button className={s.formBtn} type='submit'>CREATE</button> } 
          </div>
        </form>
      </div>
    </div>
  );
}