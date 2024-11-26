/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const SearchComponent = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const debounced = useCallback(
    debounce((text) => {
      onSearch(text)
    }, 800),
    [onSearch]
  );

  useEffect(() => {
    if (value) {
      debounced(value);
      }}, [value])

  //   const timer = setTimeout(() => {
  //     onSearch(value)
  //   }, 1000)

  //   return () => clearTimeout(timer)
  // }, [value]);

  const handleInputSearch = (e) => {
    const inputValue = e.target.value
    setValue(inputValue);
  };

  return (
    <div className="searchComponent">
      <FontAwesomeIcon className={"searchIcon"} icon={faMagnifyingGlass} />
      <input
=======
import { useCallback, useEffect, useState } from "react"
import { debounce } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


export const SearchComponent = ({ onSearch }) => {
    const [ value, setValue ] = useState('')

    const debounceValue = useCallback(debounce((text) => {
        onSearch(text)
    }, 2000), [onSearch])

    useEffect(() => {
        if(value) {
            debounceValue(value)
        }
       
    }, [value])


    const handleInputSearch = (e) => {
        setValue(e.target.value)
    }

    return <div className="searchComponent">
        <FontAwesomeIcon className={'searchIcon'} icon={faMagnifyingGlass} />
        <input 
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
        type="text"
        value={value}
        onChange={handleInputSearch}
        placeholder="Search product"
<<<<<<< HEAD
      />
    </div>
  );
};
=======
        />
    </div>
}
>>>>>>> 46ae12a624a837fa231610799c234841d37efa47
