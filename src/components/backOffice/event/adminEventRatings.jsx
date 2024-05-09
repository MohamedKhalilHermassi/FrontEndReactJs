import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spinner, Alert, Container,Row,Col } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';

const AdminEventRatings = () => {
  const [eventRatings, setEventRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(null);

  const fetchEventRatings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/events/admin/ratings');
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
        .chart-container {
          width: 150px;
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
      <Container>
        <Row>
          {eventRatings.length > 0 ? (
            eventRatings.map(({ eventId, eventName, averageRating, totalRatings, ratingDistribution }) => (
              <Col md={4} key={eventId}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>{eventName}</Card.Title>
                    <Card.Text>Average Rating: {averageRating}</Card.Text>
                    <Card.Text>Total Ratings: {totalRatings}</Card.Text>
                    <div style={{ width: '150px' }}>
                      {chartLoading ? (
                        <Spinner animation="border" />
                      ) : chartError ? (
                        <Alert variant="danger">{chartError}</Alert>
  
                      ) : (
                        <EventRatingChart ratingDistribution={ratingDistribution} />
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="info">No ratings to display</Alert>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
export default AdminEventRatings;
