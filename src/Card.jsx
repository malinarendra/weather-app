import React, { useEffect, useState } from "react";

function Card() {
    const [data, setData] = useState(null);
    const [loc, setLoc] = useState("mumbai");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
            fetchWeatherData()
    },[])

    const fetchWeatherData = async () => {
        if (loc.trim() === "") {
            return; // Do not proceed if location is empty
        }

        try {
            setIsLoading(true);
            let api_key = process.env.API_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${api_key}&units=metric`;
            const res = await fetch(url);

            if (res.status === 200) {
                const data = await res.json();
                console.log(data.weather[0].icon);
                setData(data);
            } else {
                setData(null);
            }
        } catch (error) {
            setData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const changeLoc = (event) => {
        setLoc(event.target.value);
    };

    function getWeatherImage(code) {
        switch (code) {
            case '01d':
                return 'images/sunny.png'
            case '02d':
                return 'images/cloudy.png'
            case '03d':
                return 'images/cloudy.png'
            case '04d':
                return 'images/cloudy.png'
            case '09d':
                return 'images/rainy.png'
            case '10d':
                return 'images/rainy.png'
            case '11d':
                return 'images/thunderstorm.png'
            case '13d':
                return 'images/snowy.png'
            case '50d':
                return 'images/foggy.png'
            default:
                return 'images/unknown.png'
        }
    }

    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#4B515D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4">
                            <div className="card" style={{ color: "#4B515D", borderRadius: "35px" }}>
                                <div className="card-body p-4">
                                    <div>
                                        <form className="d-flex justify-content-around align-items-center" onSubmit={(e) => {
                                            e.preventDefault();
                                            fetchWeatherData();
                                        }}>
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Enter your location"
                                                aria-label="Search"
                                                name="location"
                                                value={loc}
                                                onChange={changeLoc}
                                            />
                                            <button style={{marginLeft:"10px"}} className="btn btn-outline-success" type="submit">Search</button>
                                        </form>
                                    </div>

                                    {isLoading ? (
                                        <h1 className="mt-4">Loading...</h1>
                                    ) : data ? (
                                        <>
                                            <div className="d-flex flex-column text-center mt-5 mb-4">
                                                <h3 className="d-flex justify-content-center align-items-center">Weather for {loc}</h3>
                                                <h6 className="display-4 mb-0 font-weight-bold" style={{ color: "#1C2331" }}>
                                                    {data.main.temp}°C
                                                </h6>
                                                <span className="small" style={{ color: "#868B94" }}>
                                                    {data.weather[0].description}
                                                </span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                                                    <div><i className="fas fa-wind fa-fw" style={{ color: "#868B94" }}></i> <span className="ms-1">{data.wind.speed}km/h
                                                    </span></div>

                                                    <div><i className="fas fa-tint fa-fw" style={{ color: "#868B94" }}></i> <span className="ms-1"> {data.main.humidity}% </span>
                                                    </div>

                                                    <div><i className="fas fa-sun fa-fw" style={{ color: "#868B94" }}></i> <span className="ms-1">{data.main.pressure}h </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <img src={getWeatherImage(data.weather[0].icon)} alt="no data" width="100px" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <h1 className="mt-4">No weather found!</h1>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Card;
