
import Head from 'next/head'
import Footer from '../components/Footer';
import redirect from '../Helpers/redirect';
import { getToken } from '../Helpers/restriction';
import { seatPage } from '../Helpers/restriction'
const Seat  = ({seat, status}) => {

    return (
    <div className="container">
    <Head>
      <title> Số ghế </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      { seat !== 401 && status !== 'out' && (<h1 className="title">
        Checked QR <a style={{color:"green", textDecoration:'none'}}>Thành Công</a>
      </h1>)}
      {status === 'out' && (<h1 className="title">
        Checked Out <a style={{color:"green", textDecoration:'none'}}>Thành Công</a>
      </h1>
      )}

      {seat !== 401 && status !== 'out' ? (
      <>
      <p className="description">
        Số ghế của bạn là
      </p>      
      <h1 className="title">
          {seat}
      </h1>
      </>
      ):(<>
        <p className="description">
          {status !== 'out' && 'Link QR Code của bạn không hợp lệ'}
        </p>      
        </>)
      }
     <Footer/>
    </main>
  </div>
    )
}

export async function getServerSideProps({query, ...ctx}) {
  const isLoggedIn = seatPage(ctx);
  const token = getToken(ctx);
  const request = {
    identity: query && query.code,
  }
  const seat = await fetch('http://localhost:8080/api/v1/attender', {
    method: 'POST',
    headers: {
            'Content-Type': 'application/json',
           'Authorization': `Bearer ${JSON.parse(token)}`,
    },
    body: JSON.stringify(request),
   })
   .then(r=>r.json());
   seat.statusCode && seat.statusCode === 401 && redirect(ctx, '/error') 
    return { props: { seat: seat.statusCode && seat.statusCode === 401 ? 401 : seat.seat, status: seat && seat.status } }
  }

export default Seat;