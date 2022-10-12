import { makeStyles } from '@material-ui/core/styles'

const useStyle =  makeStyles((theme) => ({
       appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
        [theme.breakpoints.down('sm')]: {
          fontSize: '2.75rem',
        }
      },
      image: {
        marginLeft: '15px',
        [theme.breakpoints.down('sm')]: {
          height: '45px',
        }
      },
      container : {
        [theme.breakpoints.down('sm')] : {
          flexDirection: 'column-reverse'
        }      
      }
     
}));

export default useStyle;