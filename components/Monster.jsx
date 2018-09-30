import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export const monsterQuery = gql`
  query monster($descId: String!) {
    monster(descId: $descId){
      id
      rarity
      profession
      baseAtk
      maxAtk
      baseHp
      maxHp
      artist {
        nameJP
        nameEn
      }
      descId
      loc{
        name
        desc
      }
      bonds {
        target{
          descId
          loc{
            name
          }
        }
        monster{
          descId
          loc{
            name
          }
        }
      }
    }
  }
`;


function Monster({classes, descId}) {
  return (<Query query={monsterQuery} variables={{ descId }}>
    {({ loading, error, data:{monster} }) => {
       if(loading) {
         return 'loading';
       }
       if(error){
         return error.message;
       }
       return (<Paper className={classes.root} elevation={1}>
         <Typography variant="headline" component="h3">
           {monster.loc.name}
         </Typography>
         <Typography component="p">
           <span>Rarity:</span> <span>{monster.rarity}</span>
         </Typography>
         <Typography component="p">
           <span>Profession:</span> <span>{monster.profession}</span>
         </Typography>
         <Typography component="p">
           <span>Atk:</span> <span>{`${monster.baseAtk}/${monster.maxAtk}`}</span>
         </Typography>
         <Typography component="p">
           <span>Hp:</span> <span>{`${monster.baseHp}/${monster.maxHp}`}</span>
         </Typography>
         <Typography component="p">
           <span>Artist:</span> <span>{`${monster.artist.nameJP} (${monster.artist.nameEn})`}</span>
         </Typography>
         <Typography component="p">
           羁绊:
         </Typography>
         {
           monster.bonds.map(a=>{
             const m = a.target.descId===monster.descId?a.monster:a.target;
             return (
               <Link key={m.id} href={{ pathname: '/monster', query: { descId: m.descId } }}>
                 <Chip label={m.loc.name} />
               </Link>
             );
           })
         }
       </Paper>);
    }}
  </Query>)
}

Monster.propTypes = {
  classes: PropTypes.object.isRequired,
  descId: PropTypes.string.isRequired,
};

export default withStyles(styles)(Monster);
