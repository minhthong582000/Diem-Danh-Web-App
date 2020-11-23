import Head from 'next/head'
import Footer from '../components/Footer'
const Error = () =>(
    <div className="container">
    <Head>
      <title> Error </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Check In <a style={{color:"red", textDecoration:'none'}}>Thất bại</a>
      </h1>

      <p className="description">
        Vui lòng kiểm tra lại mã QR
      </p>      
    </main>
      <Footer/>
  </div>
)
export default Error;