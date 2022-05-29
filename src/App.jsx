import { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import CarCard from "./CarCard";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            newCar: {
                license_plate_number: "",
                brand: "",
                model: "",
                daily_cost: ""
            },
            errors: ""
        }
    }

    componentDidMount() {
        this.listCars();
    }

    listCars = () => {
        fetch("http://127.0.0.1:8000/api/cars").then(async response => {
            if (response.status === 200) {
                const data = await response.json();
                this.setState({
                    cars: data.data
                });
            }
        });
    }

    license_plate_numberInput = (event) => {
        const newValue = event.target.value;
        const { newCar } = this.state;
        this.setState({
            newCar: {
                license_plate_number: newValue,
                brand: newCar.brand,
                model: newCar.model,
                daily_cost: newCar.daily_cost
            }
        });
    }

    brandInput = (event) => {
        const newValue = event.target.value;
        const { newCar } = this.state;
        this.setState({
            newCar: {
                license_plate_number: newCar.license_plate_number,
                brand: newValue,
                model: newCar.model,
                daily_cost: newCar.daily_cost
            }
        });
    }

    modelInput = (event) => {
        const newValue = event.target.value;
        const { newCar } = this.state;
        this.setState({
            newCar: {
                license_plate_number: newCar.license_plate_number,
                brand: newCar.brand,
                model: newValue,
                daily_cost: newCar.daily_cost
            }
        });
    }

    daily_costInput = (event) => {
        const newValue = event.target.value;
        const { newCar } = this.state;
        this.setState({
            newCar: {
                license_plate_number: newCar.license_plate_number,
                brand: newCar.brand,
                model: newCar.model,
                daily_cost: newValue
            }
        });
    }

    createCar = () => {
        const {newCar} = this.state;
        fetch("http://127.0.0.1:8000/api/cars", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newCar)
        }).then(async response => {
            if (response.status === 201) {
                this.setState({
                    newCar: {
                        license_plate_number: "",
                        brand: "",
                        model: "",
                        daily_cost: ""
                    },
                    errors: ""
                });
                this.listCars();
            } else {
                const data = await response.json();
                this.setState({
                    errors: data.message
                });
            }
        });
    }

    render() {
        const { cars, newCar, errors } = this.state;
        const cardList = [];
        cars.forEach(car => {
            cardList.push(<CarCard car={car} />)
        });
        const errorAlert = <div className="alert alert-danger">{errors}</div>
        return (
            <div className="container">
                <header>
                    <nav className="navbar navbar-expand">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#auto_form" className="nav-link">Új autó felvétele</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://petrik.hu" className="nav-link">Petrik honlap</a>
                            </li>
                        </ul>
                    </nav>
                    <h1>Petrik autókölcsönző</h1>
                </header>
                <main>
                    <section className="row">
                        {cardList}
                    </section>
                    <section id="auto_form">
                        <h2 className="mt-5 mb-2">Új autó felvétele</h2>
                        {errors !== "" ? errorAlert : ""}
                        <div>
                            <label htmlFor="license_plate_number">Rendszám</label>
                            <input type="text" className="form-control" htmlFor="license_plate_number" id="license_plate_number" placeholder="Rendszám"
                                value={newCar.license_plate_number} onInput={this.license_plate_numberInput} />
                        </div>
                        <div>
                            <label htmlFor="brand">Márka</label>
                            <input type="text" className="form-control" htmlFor="brand" id="brand" placeholder="Márka"
                                value={newCar.brand} onInput={this.brandInput} />
                        </div>
                        <div>
                            <label htmlFor="model">Modell</label>
                            <input type="text" className="form-control" htmlFor="model" id="model" placeholder="Modell"
                                value={newCar.model} onInput={this.modelInput} />
                        </div>
                        <div>
                            <label htmlFor="daily_cost">Napidíj</label>
                            <input type="number" className="form-control" htmlFor="daily_cost" id="daily_cost" placeholder="Napidíj"
                                value={newCar.daily_cost} onInput={this.daily_costInput} />
                        </div>
                        <button className="btn btn-primary mt-3 mb-5" onClick={this.createCar}>Új autó</button>
                    </section>
                </main>
                <footer>
                    Készítette: Takács Balázs Levente
                </footer>
            </div>
        )
    }
}

export default App