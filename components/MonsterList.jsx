import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Link from './Link';
import Chip from '@material-ui/core/Chip';
import LocContext from './LocContext';

const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

const colorMap = [
  null,
  [null,null,null,'#E1F5FE','#B3E5FC','#81D4FA','#4FC3F7','#29B6F6'],
  [null,null,null,'#FBE9E7','#FFCCBC','#FFAB91','#FF8A65','#FF7043'],
  [null,null,null,'#E8F5E9','#C8E6C9','#A5D6A7','#81C784','#66BB6A'],
];

export const allMonstersQuery = gql`
  query allMonsters($language: Language) {
    monsters {
      id
      descId
      rarity
      attr
      loc(language: $language){
        name
      }
    }
  }
`;

function MonsterList2 (props) {
  const { classes } = props;
  return (<div className={classNames(classes.layout, classes.cardGrid)}>
    {/* End hero unit */}
    <Grid container spacing={8}>
      <Query query={allMonstersQuery}>
        {({ loading, error, data: { monsters } }) =>
          monsters.slice(0, 10).map(monster => (
            <Grid item key={monster.id}>
              <Link href={{ pathname: '/monster', query: { descId: monster.descId } }}>
                <Card className={classes.card} style={{ width: 80 }}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="headline" component="h2">
                      {monster.loc.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
      </Query>
    </Grid>
  </div>
  );
}

function MonsterList (props) {
  const { classes } = props;
  return (<div className={classNames(classes.layout, classes.cardGrid)}>
    {/* End hero unit */}
    <Grid container spacing={8}>
      <LocContext.Consumer>{
        language=><Query query={allMonstersQuery} variables={{ language: (language||'zh_CN') }}>
          {({ loading, error, data: { monsters } }) => {
             if (loading) {
               return 'loading...';
             }
             return monsters.map(monster => (
               <Grid item key={monster.id}>
                 <Link href={{ pathname: '/monster', query: { descId: monster.descId } }}>
                   <Chip label={monster.loc.name} style={{backgroundColor:colorMap[monster.attr][monster.rarity]}} />
                 </Link>
               </Grid>
             ));}
          }
        </Query>
      }</LocContext.Consumer>
    </Grid>
  </div>
  );
}

export default withStyles(styles)(MonsterList);
