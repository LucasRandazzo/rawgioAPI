import { Box } from "@mui/material";
import { useRef, useState } from "react";
import styles from './styles'
import SearchIcon from '@mui/icons-material/Search';
export function SearchInput({search}){
  const ref = useRef(null);
  const [value, setValue]= useState('');
  return(
    <Box sx={styles.container}>
      <input value={value} onChange={(e)=> setValue(e.target.value)} ref={ref} onKeyDown={(e)=>{
              if(e.keyCode === 13) {
                e.preventDefault()
                search(e.target.value);
                ref.current.blur()
            }
      }} 
    style={styles.input} placeholder="Pesquisar jogos"/>
    <SearchIcon onClick={()=> {
      search(value);
      ref.current.blur()
    }} sx={styles.icon}/>
    </Box>
  )
}