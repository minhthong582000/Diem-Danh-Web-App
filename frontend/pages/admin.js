import AdminComponent from '../components/AdminComponent';
import { getToken } from '../Helpers/restriction';
import { secretPage } from '../Helpers/restriction';

const fetchSeats = async (token)=> {

  const seats = await fetch('http://localhost:8080/api/v1/attender',{
    method:'GET',
    credentials: 'include',
       headers:{
           'Authorization': `Bearer ${JSON.parse(token)}`,
          }
   })
   .then(r=>r.json())
   .catch(e=>console.log(e))
   return seats;
}
const Admin = ({data}) => (
    <AdminComponent data={data}/>
)


export async function getServerSideProps({query, ...ctx}) {
    const isLoggedIn = secretPage(ctx);
    const token = getToken(ctx);
    const data = await fetchSeats(token);
    return { props: { query, token, data } }
  }

export default Admin;