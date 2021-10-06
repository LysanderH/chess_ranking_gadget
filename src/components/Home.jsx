import { useState, useEffect } from "react";

export default function Home() {
    const [playersTable, setPlayersTable] = useState([]);
    const [rounds, setRounds] = useState([]);
    const addPlayer = (e) => {
        e.preventDefault();

        const copy = playersTable.concat({ name: e.target.player.value, games: {} });
        let newRounds = [];

        for (let i = 1; i < copy.length; i++) {
            newRounds.push(i);
        }

        setRounds(newRounds);

        copy.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        setPlayersTable(copy);

        e.target.player.value = '';
    }

    const removePlayer = (e, index) => {
        e.preventDefault();
        // logic to delete a user from state
        const shure = window.confirm('Sind sie sicher');
        if (shure) {
            const copy = [...playersTable];
            copy.splice(index, 1);

            let newRounds = [];

            for (let i = 1; i < copy.length; i++) {
                newRounds.push(i);
            }

            setRounds(newRounds);

            setPlayersTable(copy);
        }

    }

    const addPoints = (e, index) => {
        // logic to add points to a user
    }

    const addLoss = (e, index, round) => {
        e.preventDefault();
        const copy = [...playersTable];
        copy[index].games[round] = 1;
        setPlayersTable(copy);
    }

    const addDraw = (e, index, round) => {
        e.preventDefault();
        const copy = [...playersTable];
        copy[index].games[round] = 2;
        setPlayersTable(copy);
    }

    const addWin = (e, index, round) => {
        e.preventDefault();
        const copy = [...playersTable];
        copy[index].games[round] = 3;
        setPlayersTable(copy);
    }


    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Spieler</th>
                        {rounds.map((round, index) => (
                            <th key={index}>{round}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {playersTable.map((player, index) => (
                        <tr key={index}>
                            <th>{player.name} <form action="" onClick={e => removePlayer(e, index)}><button>X</button></form></th>
                            {rounds.map((round, ind) => (
                                round !== playersTable.length ?
                                    !((round) in player.games) ?
                                        <td key={ind}>
                                            <button onClick={e => addLoss(e, index, round)}>1</button>
                                            <button onClick={e => addDraw(e, index, round)}>2</button>
                                            <button onClick={e => addWin(e, index, round)}>3</button>
                                        </td>
                                        : <td key={ind}>
                                            {player.games[round]}
                                        </td>
                                    : ''
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={addPlayer} action="/" method="post">
                <label htmlFor="player">Spieler</label>
                <input type="text" name="player" placeholder="Spieler Name" />
                <button type="submit">Hinzufügen</button>
            </form>
        </div >
    )
}
