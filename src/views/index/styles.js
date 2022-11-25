
const breakpoints = (sm,md,lg,xs)=>{
  if(sm){
    return 'repeat(1,1fr)'
  }
  if(md){
    return 'repeat(2,1fr)'
  }
  if(lg){
    return 'repeat(3,1fr)'
  }
  if(xs){
    return 'repeat(4,1fr)'
  }

}
export const gamesContainer = (sm,md,lg,xs)=>{
return {
  display: 'grid',
  gridTemplateColumns: breakpoints(sm,md,lg,xs),
  color:'white',
  padding:'24px',
  gap:'24px'
}
}

const styles = {
  container: {},
  header:{
    display:'flex',
    justifyContent:'space-between',
    padding:'24px',
    gap:'32px',
    alignItems:'center'
  },
  preTitle:{
    color:'#FFF',
    fontWeight:'bold',
    marginLeft:'24px'
  },
  buttonContainer:{
    display:'flex',
    padding:'24px',
    justifyContent:'center',
    alignItems:'center'
  }

};

export default styles;
