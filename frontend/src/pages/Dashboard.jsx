import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.example.com/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            {error ? <div className="error">Error: {error}</div> : null}
            <ul>
                {data && data.map(item => (
                    <li key={item.id} className="data-item">
                        Data: {item.value} - Date: {formatDate(item.date)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;