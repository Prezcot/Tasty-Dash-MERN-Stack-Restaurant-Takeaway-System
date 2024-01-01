import react from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const nav=useNavigate();
    return(
        <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100vw"}}>
            <nav class="py-3 navbar navbar-expand-lg fixed-top auto-hiding-navbar">
                <div class="container">
                    <a class="navbar-brand">
                        <img src="/images/logo.jpg" class="logo" height="50px" /> Tasty Dash
                    </a>
                    <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul style={{cursor:"pointer"}} class="navbar-nav ms-auto">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href={nav("/home")}>Home</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link">About Us</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link">Contact</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <section id="hero">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <h1>Taste<br />Redefined</h1>
                            <p>
                            Tasty Dash is a multi-cultural restaurant sponsored by the ICC bringing in a wide range of meals that you can choose from by the finest 3-star michelin awarded chefs in Sri Lanka.
                            </p>
                            <button type="button" class="btn btn-dark btn-lg ordernow" onClick={()=>nav("/signin")}>
                            Order Now
                            </button>
                        </div>
                        <div class="col img-col">
                            <img src="" alt="" class="img-fluid" />
                        </div>
                    </div>
                    <div class="row"></div>
                </div>
            </section>
            <div class="foot">
                <div style={{marginLeft:"15vw",marginRight:"15vw",display:"flex",flexDirection:"row",justifyContent:"space-between",color:"white"}}>
                    <div>
                        <h4>Opening Hours</h4>
                        <p>
                        Monday - Friday<br />
                        9:00 AM - 11:00 PM
                        </p>
                    </div>
                    <div>
                        <h4>Address</h4>
                        <p>
                        123, Galle Road,<br />
                        Colombo 03
                        </p>
                    </div>
                    <div>
                        <h4>Phone</h4>
                        <p>
                        +94 11 123 4567<br />
                        +94 11 123 4567
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;