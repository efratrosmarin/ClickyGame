//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import simpsons from "./simpsons.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    simpsons,
    clickedsimpsons: [],
    score: 0
  };

//when you click on a card ... the simpsons is taken out of the array
  imageClick = event => {
    const currentsimpsons = event.target.alt;
    const simpsonsAlreadyClicked =
      this.state.clickedsimpsons.indexOf(currentsimpsons) > -1;

//if you click on a simpsons that has already been selected, the game is reset and cards reordered
    if (simpsonsAlreadyClicked) {
      this.setState({
        simpsons: this.state.simpsons.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedsimpsons: [],
        score: 0
      });
        alert("Doh! Try again...");

//if you click on an available simpsons, your score is increased and cards reordered
    } else {
      this.setState(
        {
          simpsons: this.state.simpsons.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedsimpsons: this.state.clickedsimpsons.concat(
            currentsimpsons
          ),
          score: this.state.score + 1
        },
//if you get all 12 simpsons corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              simpsons: this.state.simpsons.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedsimpsons: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.simpsons.map(simpsons => (
            <FriendCard
              imageClick={this.imageClick}
              id={simpsons.id}
              key={simpsons.id}
              image={simpsons.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;