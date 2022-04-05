import "./Leaderboard.scss";
import { Component } from "react";
import axios from "axios";

export default class Leaderboard extends Component {
  state = {
    leaderboard: [],
  };

  componentDidMount() {
    axios
      .get("/leaderboard")
      .then((response) => {
        console.log(response.data);
        this.setState({
          leaderboard: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <section className="leaderboard">
          <h1 className="leaderboard__title">Leaderboard</h1>
          <div className="leaderboard__table">

            <div className="leaderboard__table-username">
              <h3 className="leaderboard__table-username-title">Username</h3>
              <ul className="leaderboard__table-username-values">
                {this.state.leaderboard.map((value) => {
                    return (
                        <>
                            <li className="leaderboard__table-username-values-item">
                                <p>{value.username}</p>
                            </li>
                        </>
                    )
                })}
              </ul>
              
            </div>

            <div className="leaderboard__table-attempts">
                <h3 className="leaderboard__table-attempts-title">Attempts Left</h3>
                <ul className="leaderboard__table-attempts-values">
                    {this.state.leaderboard.map((value) => {
                        return (
                            <>
                                <li className="leaderboard__table-attempts-values-item">
                                    <p>{value.attemptsLeft}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>

            </div>

            <div className="leaderboard__table-word">
                <h3 className="leaderboard__table-word-title">Word Guessed</h3>
                <ul className="leaderboard__table-word-values">
                    {this.state.leaderboard.map((value) => {
                        return (
                            <>
                                <li className="leaderboard__table-word-values-item">
                                    <p>{value.correctWord}</p>
                                </li>
                            </>
                        )
                    })}
                </ul>

            </div>
            
          </div>
        </section>
      </>
    );
  }
}
