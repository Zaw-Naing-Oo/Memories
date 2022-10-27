import { makeStyles } from '@material-ui/core/styles'

const useStyle =  makeStyles((theme) => ({
      container : {
        [theme.breakpoints.down('sm')] : {
          flexDirection: 'column-reverse'
        }      
      }
     
}));

export default useStyle;