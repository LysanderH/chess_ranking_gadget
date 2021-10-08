import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPDF from '@react-pdf/renderer';
import Print from "./Print";

export default function Ranking() {
    const [playersTable, setPlayersTable] = useState(JSON.parse(localStorage.getItem('playersTable')) ?? []);
    const [rounds, setRounds] = useState(JSON.parse(localStorage.getItem('rounds')) ?? []);
    const [ranking, setRanking] = useState([]);

    useEffect(() => {
        const preRanking = [...playersTable.sort(function (a, b) {
            if (a.total === b.total) return a.name.localeCompare(b.name);
            return b.total - a.total;
        })];

        // const newRanking = [];
        // const currentRank = [];

        // preRanking.forEach((player, index) => {
        //     preRanking[index - 1] += player;
        // });

        setRanking(preRanking);
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
                    {ranking.map((player, index) => (
                        <tr>
                            <td></td>
                            <td>{player.name}</td>
                            <td>{player.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
