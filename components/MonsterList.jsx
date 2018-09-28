import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const allMonstersQuery = gql`
  query allMonsters {
    monsters {
      id
      loc{
        name
      }
    }
  }
`;

export default function MonsterList () {
  return (
    <Query query={allMonstersQuery}>
      {({ loading, error, data: { monsters }, fetchMore }) => {
        if (error) return <div>{error.message}</div>;
        if (loading) return <div>Loading</div>;

        return (
          <section>
            <ul>
              {monsters.map(({ id, loc: { name } }) => (
                <li key={id}>
                  {id} - {name}
                </li>
              ))}
            </ul>
          </section>
        );
      }}
    </Query>
  );
}
