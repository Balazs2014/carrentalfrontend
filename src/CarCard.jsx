import { Component } from "react";

class CarCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: false,
            errors: ""
        }
    }
    rent = () => {
        const { car } = this.props;
        fetch(`http://127.0.0.1:8000/api/cars/${car.id}/rent`, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        }).then(async response => {
            if (response.status === 201) {
                this.setState({
                    success: true,
                    errors: ""
                });
            } else {
                const data = await response.json();
                this.setState({
                    errors: data.message,
                    success: false
                });
            }
        });
    }

    render() {
        const { success, errors } = this.state;
        const { car } = this.props;
        const errorAlert = <div className="alert alert-danger">{errors}</div>
        const successAlert = <div className="alert alert-success">Sikeres kölcsönzés!</div>
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 card">
                <div className="card-body">
                    <h2>{car.license_plate_number}</h2>
                    <p>Márka: {car.brand}</p>
                    <p>Modell: {car.model}</p>
                    <p>Napidíj: {car.daily_cost}</p>
                    <img src={`images/${car.brand}_${car.model}.png`} alt={`${car.brand} ${car.model}`} className="img-fluid" />
                    <button className="btn btn-primary mb-3" onClick={this.rent}>Kölcsönzés</button>
                    <p>{success ? successAlert : errors !== "" ? errorAlert : ""}</p>
                </div>
            </div>
        )
    }
}

export default CarCard