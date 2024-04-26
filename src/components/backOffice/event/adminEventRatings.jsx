import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

const AdminEventRatings = () => {
  const [eventRatings, setEventRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(null);

  const fetchEventRatings = async () => {
    try {
      const response = await axios.get('https://backendexpressjsback.onrender.com/events/admin/ratings');
      setEventRatings(response.data);
    } catch (error) {
      setError('Error fetching event ratings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventRatings();
  }, []);

  useEffect(() => {
    setChartLoading(false);
  }, [eventRatings]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const EventRatingChart = ({ ratingDistribution }) => {
    return (
      <div className="chart-container">
        <Pie
          data={{
            labels: ['1', '2', '3', '4', '5'],
            datasets: [
              {
                data: ratingDistribution,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  };

  return (
    <>
      <style jsx>{`
        .event-ratings-table {
          background-color: #ffffff;
          color: #333333;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .event-ratings-table th {
          background-color: #4BC0C0;
          color: #ffffff;
        }

        .chart-container {
          width: 150px; /* Smaller width for the rating distribution column */
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            transform: scale(1.05);
          }
        }
      `}</style>
      <br />
      <Table striped bordered hover className="event-ratings-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Average Rating</th>
            <th>Total Ratings</th>
            <th>Rating Distribution</th>
          </tr>
        </thead>
        <tbody>
          {eventRatings.length > 0 ? (
            eventRatings.map(({ eventId, eventName, averageRating, totalRatings, ratingDistribution }) => (
              <tr key={eventId}>
                <td>{eventName}</td>
                <td>{averageRating}</td>
                <td>{totalRatings}</td>
                <td style={{ width: '150px' }}> {/* Smaller width for the rating distribution td */}
                  {chartLoading ? (
                    <Spinner animation="border" />
                  ) : chartError ? (
                    <Alert variant="danger">{chartError}</Alert>
                  ) : (
                    <EventRatingChart ratingDistribution={ratingDistribution} />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No ratings to display</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default AdminEventRatings;
