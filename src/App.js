import React, { Component } from "react";
import "./App.css";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "1174bc226b776e6fb34e2e4a87d6ea5e";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  };
  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    var country = e.target.elements.country.value;
    if (country) {
      country = "," + e.target.elements.country.value;
    }
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();

    if (city) {
      if (data.cod === "404") {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "Invalid city name."
        });
      } else {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ""
        });
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter city name."
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="row">
            <div className="col-xs-5 title-container">
              <Titles />
            </div>
            <div className="col-xs-7 form-container">
              <Form getWeather={this.getWeather} />
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
