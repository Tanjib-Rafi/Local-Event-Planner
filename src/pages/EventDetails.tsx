import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Col, Row, Calendar, Button } from 'antd';
import dayjs from 'dayjs';
import EventMap from '../components/map/Map';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any | null>(null);
  const [nearestEvents, setNearestEvents] = useState<any[]>([]);
  const [satelliteView, setSatelliteView] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://0.0.0.0:8001/api/events/${id}/`);
        setEvent(response.data);
  
        //Fetch nearest events
        const nearestEventsResponse = await axios.get(`http://0.0.0.0:8001/api/nearest-events/${id}/?longitude=${response.data.longitude}&latitude=${response.data.latitude}`);

        setNearestEvents(nearestEventsResponse.data);
        console.log(nearestEventsResponse.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
  
    fetchEventDetails();
  }, [id]);
  

  if (!event) {
    return <div>Loading...</div>;
  }

  const startDate = dayjs(event.date + ' ' + event.start_time, 'YYYY-MM-DD HH:mm');
  const endDate = dayjs(event.date + ' ' + event.end_time, 'YYYY-MM-DD HH:mm');

  const truncateDescription = (description: string, maxLength: number = 100): string => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + '...';
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={16}>
            <Card title="Event Details" style={{ backgroundColor: '#f0f2f5' }}>
              <p style={{ fontWeight: 'bold' }}>Title: {event.title}</p>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <Card title="Calendar" style={{ backgroundColor: '#f0f2f5', marginBottom: '16px' }}>
              <Calendar fullscreen={false} value={startDate} />
              <p style={{ fontWeight: 'bold' }}>Start Time: {startDate.format('h:mm A')}</p>
              <p style={{ fontWeight: 'bold' }}>End Time: {endDate.format('h:mm A')}</p>
            </Card>
            <Card title="Map" style={{ backgroundColor: '#f0f2f5' }}>
              <EventMap latitude={event.latitude} longitude={event.longitude} satelliteView={satelliteView} /> 
              <div style={{ marginTop: '16px' }}>
                <Button onClick={() => setSatelliteView(false)}>Normal View</Button>
                <Button onClick={() => setSatelliteView(true)}>Satellite View</Button>
              </div>
            </Card>
          </Col>
        </Row>
        {nearestEvents.length > 0 && (
  <div style={{ marginTop: '40px', textAlign: 'center' }}>
    <h2 style={{ fontSize: '24px', marginTop: '20px' }}>More Events Nearby</h2>
    <Row gutter={[16, 16]}>
      {nearestEvents.map(nearestEvent => (
        <Col key={nearestEvent.id} xs={24} sm={24} md={8}>
          <Card title="Nearest Event" style={{ backgroundColor: '#f0f2f5', marginBottom: '20px', height: '300px' }}>
            <div style={{ maxHeight: '240px', overflow: 'hidden' }}>
              <p style={{ fontWeight: 'bold' }}>Title: {nearestEvent.title}</p>
              <p>Date: {nearestEvent.date}</p>
              <p>Location: {nearestEvent.location}</p>
              <p>Description: {truncateDescription(nearestEvent.description)}</p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
)}



      </div>
    </>
  );
};

export default EventDetails;
