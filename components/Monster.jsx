import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import LocContext from './LocContext';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

export const monsterQuery = gql`
  query monster($descId: String!, $language: Language) {
    monster(descId: $descId){
      id
      descId
      rarity
      profession
      baseAtk
      maxAtk
      baseHp
      maxHp
      skill {
        name(language: $language)
        desc(language: $language)
      }
      abilities {
        name(language: $language)
        desc(language: $language)
        unlockLevel
      }
      artist {
        nameJP
        nameEn
      }
      loc(language: $language){
        name
        desc
      }
      bonds {
        id
        desc(language: $language)
        target{
          descId
          loc(language: $language){
            name
          }
        }
        monster{
          descId
          loc(language: $language){
            name
          }
        }
      }
    }
  }
`;


function Monster({classes, descId}) {
  return (
    <LocContext.Consumer>{
      language=><Query query={monsterQuery} variables={{ descId, language }}>
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
               <span>Skill:</span> <span>{`${monster.skill.name}: ${monster.skill.desc}`}</span>
             </Typography>
             <Typography component="p">
               <span>Abilities:</span>
               <div>
                 {monster.abilities.map(a=>(
                   <div key={a.name}>
                     {`${a.name}[lv${a.unlockLevel}]: ${a.desc}`}
                   </div>
                 ))}
               </div>
             </Typography>

             <Typography component="p">
               Bonds:
             </Typography>
             {
               monster.bonds.map(a=>{
                 const m = a.monster.descId===monster.descId?a.target:a.monster;
                 return (
                   <Link key={a.id} href={{ pathname: '/monster', query: { descId: m.descId } }}>
                     <Chip label={`${m.loc.name}: ${a.desc}`} />
                   </Link>
                 );
               })
             }
           </Paper>);
        }}
      </Query>
    }</LocContext.Consumer>
           )
}

Monster.propTypes = {
  classes: PropTypes.object.isRequired,
  descId: PropTypes.string.isRequired,
};

export default withStyles(styles)(Monster);
