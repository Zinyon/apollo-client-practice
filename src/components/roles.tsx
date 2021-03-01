import {useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import './components.css';

const GET_ROLES = gql`
  query GetRoles{
    roles{
      id
    }
  }
`;

const GET_ROLE = gql`
  query GetRole($id: ID!){
    role(id: $id){
      id
      requirement
      members{
        id
        last_name
        serve_years
      }
      equipments{
        id
      }
      softwares{
        id
      }
    }
  }
`;


enum Role{
  Developer ='developer',
  Desinger =  'designer',
  Planner = 'planner'
}

interface RoleIcon{
  developer: string;
  designer: string;
  planner: string;
}

interface Member{
  id: string;
  last_name: string;
  serve_years: number;
}

interface Equipment{
  id: string;
}

interface Software{
  id: string;
}

function Roles() {
  
  function AsideItems() {
    
    const roleIcons : RoleIcon = {
      developer: '💻',
      designer: '🎨',
      planner: '📝'
    };

    const {loading, error, data} = useQuery(GET_ROLES);

    if(loading) return <p className="loading">Loading...</p>;
    if(error) return <p className="error">Error</p>;

    return (
      <ul>
        {data.roles.map(({id}: {id: Role}) => {
          return (
            <li key={id} className={'roleItem ' +  (contentId === 'id' ? 'on' : '')}
            onClick={() => {setContentId(id)}}>
              <span>{contentId === id ? '🔲' : '⬛'}</span>
              {roleIcons[id]} {id}
            </li>
          )
        })}
      </ul>
    );
  }

  function MainContents () {
    const { loading, error, data } = useQuery(GET_ROLE, {
      variables: {id: contentId}
    })
    if (loading) return <p className="loading">Loading...</p>
    if (error) return <p className="error">Error :(</p>
    if (contentId === '') return (<div className="roleWrapper">Select Role</div>)
    return (
      <div className="roleWrapper">
        <h2>{data.role.id}</h2>
        <div className="requirement"><span>{data.role.requirement}</span> required</div>
        <h3>Members</h3>
        <ul>
          {data.role.members.map((member : Member) => {
            return (<li>{member.last_name}</li>)
          })}
        </ul>
        <h3>Equipments</h3>
        <ul>
          {data.role.equipments.map((equipment : Equipment) => {
            return (<li>{equipment.id}</li>)
          })}
        </ul>
        <h3>Softwares</h3>
          {data.role.softwares.map((software : Software) => {
            return (<li>{software.id}</li>)
          })}
        <ul>
        </ul>
      </div>
    );
  }

  const [contentId, setContentId] = useState('');

  return (
    <div id="roles" className="component">
      <aside>
        {AsideItems()}
      </aside>
      <section className="contents">
        {MainContents()}
      </section>
    </div>
  )
}

export default Roles;