import { useState, useEffect } from "react";

export default function Home() {
    const [playersTable, setPlayersTable] = useState([]);
    const addPlayer = (e) => {
        e.preventDefault();
        const copy = playersTable.concat(e.target.player.value);

        setPlayersTable(copy);

        e.target.player.value = '';
        console.log(playersTable);
    }

    const removePlayer = (e, player) => {
        // logic to delete a user from state
    }

    const addPoints = (e, player) => {
        // logic to add points to a user
    }

    const addLoss = (e, player) => { }

    const addDraw = (e, player) => { }

    const addWin = (e, player) => { }


    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Spieler</th>
                        {playersTable.map((player, index) => (
                            index !== playersTable.length ? <th key={index}>{index}</th> : ''
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {playersTable.map((player, index) => (
                        <tr key={index}>
                            <th>{player} <form action="" onClick={e => removePlayer(e, player)}><button>X</button></form></th>

                            <td>
                                <button onClick={e => addLoss(e, player)}>1</button>
                                <button onClick={e => addDraw(e, player)}>2</button>
                                <button onClick={e => addWin(e, player)}>3</button>
                            </td>
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
