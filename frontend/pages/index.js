import Head from 'next/head'
import Footer from '../components/Footer'
const Home = () => (
  <div className="container">
    <Head>
      <title> QR Check</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
    <img style={{width: '30%', marginBottom: '30px'}} src='/logo_inlysu_DH-V.png' alt="Logo" />
      <h1 className="title2">
        Chào mừng tới <a style={{textDecoration:'none'}}>Đại hội Sinh Viên Trường Đại Học Công Nghệ Thông Tin </a>
      </h1>

      <p className="description">
        Vui lòng đưa mã QR cho CTV quét QR
      </p>      
      {/* <footer style={{height:"10%"}}>
      <a
        href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img style={{width: '20%'}} src="https://webdevstudios.org/wp-content/uploads/2019/01/webdevicon-XoaPhong_SatLe.png" alt="ZEIT Logo" />
      </a>
    </footer> */}
    </main>
     <Footer/>
  </div>
)

export default Home
