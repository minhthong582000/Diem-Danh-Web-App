import styles from './AdminComponent.module.css';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Footer from './Footer';
import { useState } from 'react';

const handleLogout = () => {
    Cookies.remove('token');
    Router.reload();
}
const absent = '/absent.svg';
const checked = '/checked.svg';
const out = '/out.svg';


const Seats = ({seatsToRender}) => {
    const mock1 = [
    {
        seatValue: 1,
        seatText: 'A'
    },
    {
        seatValue: 2,
        seatText: 'B'
    },
    {
        seatValue: 3,
        seatText: 'C'
    },
    {
        seatValue: 4,
        seatText: 'D'
    },
    {
        seatValue: 5,
        seatText: 'E'
    },
    {
        seatValue: 6,
        seatText: 'F'
    },
    {
        seatValue: 7,
        seatText: 'G'
    },
    {
        seatValue: 8,
        seatText: 'H'
    },
    {
        seatValue: 9,
        seatText: 'I'
    },
    {
        seatValue: 10,
        seatText: 'J'
    },
    {
        seatValue: 11,
        seatText: 'K'
    },
    {
        seatValue: 12,
        seatText: 'L'
    },
    {
        seatValue: 13,
        seatText: 'M'
    },
]
    const mock2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
   
    return mock1.map(x=> {
        return (<div className={styles.row}>
            <div style={{width: '23px', heigth:'22px', marginRight:'30px', marginTop:'10px', color:'grey',padding:"1%"}}>
            <span>{x.seatText}</span>
            </div>
            {seatsToRender && seatsToRender.length > 0 && seatsToRender.map(i=>{
                if(i.seat!==null&&i.seat.slice(0,1)===x.seatText){
                if(i.status==='in') {
                    return (
                    <div 
                    key={i.seat}
                    style={{marginRight:'10px'}}
                    className={`${styles.seat}`}>
                        <span title={i.name}>
                            <img src={checked}/>
                        </span>
                    </div>
                    )
                }
                if(i.status==='out'){
                    return (
                    <div 
                    key={i.seat}
                    style={{marginRight:'10px'}}
                    className={`${styles.seat}`}>
                        <span title={i.name}>
                            <img src={out}/>
                        </span>
                    </div>
                    )
                }
                return (
                    <div 
                    key={i.seat}
                    className={styles.seat} style={{marginRight:'10px'}}>
                        <span title={i.name}>
                            <img src={absent}/>
                        </span>
                    </div>
                    )
                }
            }).reverse()}
        {/* {mock2.map(i=> {
            if(i === 3 || i === 9){
                return (
                <div 
                onClick={(value)=>{testValue(value)}}
                key={(i+1)*(x.seatValue + 1)} 
                value={(i+1)*(x.seatValue + 1)} 
                className={`${styles.seat} ${styles.occupied}`}>
                </div>
                )
            }
            if( i === 6 || i === 11) {
                return (
                <div 
                onClick={(value)=>{testValue(value)}}
                key={(i+1)*(x.seatValue + 1)} 
                value={(i+1)*(x.seatValue + 1)} 
                className={`${styles.seat} ${styles.selected}`}>
                </div>
                )
            }
            return (
                <div 
                onClick={(value)=>{testValue(value)}}
                key={(i+1)*(x.seatValue + 1)} 
                value={(i+1)*(x.seatValue + 1)} 
                className={styles.seat} style={{background: 'white'}}>
                </div>
                )
    })
    } */}
        </div>)
    })
}
const Order = () =>{
    const mock2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    return mock2.map(i=>{
        return (
            <div 
            className={styles.seat} style={{ color:'grey'}}>
                {i}
            </div>
            )
    }).reverse()
}
const AdminComponent = ({data}) => {
    let greenCount = 0;
    let redCount = 0;
    let greyCount = 0;
    data.map(i=> {if(i.status==='in') greenCount++})
    data.map(i=> {if(i.status==='out') redCount++})
    return(
        <div className={styles.adminWrapper}>
        <div style={{alignItems:"center",marginTop:"2%",display:"flex",marginRight:"3%",justifyContent:"center"}}>
        <img style={{width: '6%', marginBottom: '30px', height:'50%',marginLeft:"3%"}} src='/logo-uit.png' alt="Logo" />
        <img style={{width: '5%', marginBottom: '30px', height:'50%',marginLeft:"1.4%"}} src='/Logo_hoi.png' alt="Logo" />
        <img style={{width: '5%', marginBottom: '30px', height:'50%',marginLeft:"1.7%"}} src='/logo_inlysu_DH-V.png' alt="Logo" />
        </div>
        <h1 style={{textDecoration:"underline" ,color:"#EA0823",marginBlockEnd:"0em",marginBlockStart:"0em",fontSize:"3em"}}>Đại hội V</h1>
        <h2 style={{textDecorationColor:"#EA0823" ,color:"#37B1E0"}}>Sinh viên trường Đại học Công nghệ Thông tin</h2>
        <div style={{backgroundColor:"#2E8DCA",width:"41%",alignItems:"center",display:"flex",marginBottom:"3%"}}>
        <h3 style={{textDecorationColor:"#EA0823" ,color:"#FFFFFF",margin:"2% 16%"}}>Tài năng - Sáng tạo - Phát triển - Hội nhập</h3>
        </div>
    <div className={styles.container}>
      <div className={styles.screen}></div>
      <Seats seatsToRender={data} />
      <div className={styles.row}>
        <div style={{width: '27%', heigth:'25%'}}>
       </div>
     <Order/>
     </div>
    </div>
    <div>
    <ul className={styles.showcase}>
     
     <li>
       <div className={styles.seat} style={{background: 'grey'}}></div>
       <small style={{color: 'grey', fontSize:'1.1em'}} >Vắng mặt</small>
     </li>
     <li>
       <div className={`${styles.seat} ${styles.selected}`}></div>
       <small style= {{color: '#3dff3d', fontSize:'1.1em'}} >Đã checked in</small>
     </li>
     <li>
       <div className={`${styles.seat} ${styles.occupied}`}></div>
       <small style={{color: 'red', fontSize:'1.1em'}} >Đã checked out</small>
     </li>
     <li>
       <button onClick={handleLogout}>
           Log Out
       </button>
     </li>
   </ul>
    </div>
    <div style={{marginTop:'10px'}}>
        
    <p style={{marginTop:'5px', color:'black', fontSize:'1.5rem'}} className="text">
    Số đại biểu có mặt: <span style={{color:"#28d828"}}>{greenCount}</span>
    </p>
    <p style={{marginTop:'5px', color:'black', fontSize:'1.5rem'}} className="text">
    Số đại biểu ra ngoài: <span style={{color:"red"}}>{redCount}</span>
    </p>
    <p style={{marginTop:'5px', color:'black', fontSize:'1.5rem'}} className="text">
    Số đại biểu vắng mặt: <span style={{color:"grey"}}>{138-greenCount-redCount}</span>
    </p>
    </div>
    <Footer/>
    </div>
    )
}
export default AdminComponent;