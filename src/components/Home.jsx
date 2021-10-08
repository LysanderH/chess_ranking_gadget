import { useState, useEffect } from "react";

export default function Home() {
    const [playersTable, setPlayersTable] = useState(JSON.parse(localStorage.getItem('playersTable')) ?? []);
    const [rounds, setRounds] = useState(JSON.parse(localStorage.getItem('rounds')) ?? []);

    const addPlayer = (e) => {
        e.preventDefault();
        if (e.target.player.value === '') return;

        const copy = playersTable.concat({ name: e.target.player.value, games: {}, total: 0 });
        let newRounds = [];

        const totalRounds = copy.length % 2 === 0 ? copy.length : copy.length + 1;

        for (let i = 1; i < totalRounds; i++) {
            newRounds.push(i);
        }

        setRounds(newRounds);

        copy.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        setPlayersTable(copy);

        e.target.player.value = '';
        saveToLocalStorage(copy, newRounds);
    }

    const removePlayer = (e, index) => {
        e.preventDefault();
        // logic to delete a user from state
        const shure = window.confirm('Sind sie sicher');
        if (shure) {
            const copy = [...playersTable];
            copy.splice(index, 1);

            let newRounds = [];
            const totalRounds = copy.length % 2 === 0 ? copy.length : copy.length + 1;
            for (let i = 1; i < totalRounds; i++) {
                newRounds.push(i);
            }
            setRounds(newRounds);

            setPlayersTable(copy);
            saveToLocalStorage(copy, newRounds);
        }

    }

    const addLoss = (e, index, round) => {
        e.preventDefault();
        const copy = [...playersTable];
        copy[index].games[round] = 1;
        copy[index].total += 1;
        setPlayersTable(copy);
        saveToLocalStorage(copy, rounds);
    }

    const addDraw = (e, index, round) => {
        e.preventDefault();
        const copy = [...playersTable];
        copy[index].games[round] = 2;
        copy[index].total += 2;
        setPlayersTable(copy);
        saveToLocalStorage(copy, rounds);
    }

    const addWin = (e, index, round) => {
        e.preventDefault();
        const copy = [...playersTable];
        copy[index].games[round] = 3;
        copy[index].total += 3;
        setPlayersTable(copy);
        saveToLocalStorage(copy, rounds);
    }

    const removePoints = (e, index, round) => {
        e.preventDefault();
        const copy = [...playersTable];
        copy[index].total -= copy[index].games[round];
        delete copy[index].games[round];
        setPlayersTable(copy);
        saveToLocalStorage(copy, rounds);
    }

    const saveToLocalStorage = (playersTable, rounds) => {
        localStorage.setItem('playersTable', JSON.stringify(playersTable));
        localStorage.setItem('rounds', JSON.stringify(rounds));
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
                            <th>{player.name} <form action="" onClick={e => removePlayer(e, index)}><button className="delete">X</button></form></th>
                            {rounds.map((round, ind) => (
                                !((round) in player.games) ?
                                    <td key={ind}>
                                        <button onClick={e => addLoss(e, index, round)}>1</button>
                                        <button onClick={e => addDraw(e, index, round)}>2</button>
                                        <button onClick={e => addWin(e, index, round)}>3</button>
                                    </td>
                                    : <td key={ind} onClick={e => removePoints(e, index, round)}>
                                        {player.games[round]}
                                    </td>

                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={addPlayer} action="/" method="post">
                <label htmlFor="player">Spieler</label>
                <input type="text" name="player" placeholder="Spieler Name" />
                <button type="submit" className="add">+</button>
            </form>
        </div >
    )
}
