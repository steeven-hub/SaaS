import React, { useEffect, useState } from 'react';

const ValidationHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Remplacer par votre logique d'appel API réelle
        fetch('/api/hackathon/history', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Assurez-vous d'avoir le token
            }
        })
        .then(res => res.json())
        .then(data => {
            setHistory(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="validation-history">
            <h3>Validations récentes</h3>
            <table>
                <thead>
                    <tr>
                        <th>Fichier</th>
                        <th>Date</th>
                        <th>Rapport</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map(record => (
                        <tr key={record.id}>
                            <td>{record.filename}</td>
                            <td>{new Date(record.created_at).toLocaleDateString()}</td>
                            <td>{record.report.tasks_completed.join(', ')}</td>
                            <td>
                                <a href={record.processed_file} download>
                                    Télécharger
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ValidationHistory;
