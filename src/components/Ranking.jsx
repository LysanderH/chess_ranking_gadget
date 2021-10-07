import { useEffect, useState } from "react";

export default function Ranking() {
    const [playersTable, setPlayersTable] = useState(JSON.parse(localStorage.getItem('playersTable')) ?? []);
    const [rounds, setRounds] = useState(JSON.parse(localStorage.getItem('rounds')) ?? []);
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        const newRanking = [...playersTable.sort(function (a, b) {
            if (a.total === b.total) return a.name.localeCompare(b.name);
            return b.total - a.total;
        })];

        setRanking(newRanking);
        console.log(newRanking);
        // playersTable.map(player => {
        //     newRanking
        // });
    }, [])


    return (
        <div>
            <h2>Endstand</h2>
            <table>
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Spieler</th>
                        <th>Punkte</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map(player => (
                        <tr>
                            <td>{player.rank}</td>
                            <td>{player.name}</td>
                            <td>{player.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
