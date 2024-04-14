import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Card, Row, Col, Tooltip, Input, DatePicker, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  updateSearchQuery,
  updateLocationQuery,
  updateDateRange,
  updateDisplayCount,
  updateFilteredEvents,
  updateEvents
} from '../../../store/eventSearchSlice';
import axios from 'axios';

const { Meta } = Card;
const { RangePicker } = DatePicker;

const EventList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchQuery = useSelector((state: any) => state.events.searchQuery);
  const locationQuery = useSelector((state: any) => state.events.locationQuery);
  const startDate = useSelector((state: any) => state.events.startDate);
  const endDate = useSelector((state: any) => state.events.endDate);
  const displayCount = useSelector((state: any) => state.events.displayCount);
  const events = useSelector((state: any) => state.events.events);
  const filteredEvents = useSelector((state: any) => state.events.filteredEvents);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8001/api/events/');
        dispatch(updateEvents(response.data));
  
        // Log the dispatched action
        console.log('updateEvents action dispatched:', updateEvents(response.data));
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
  
    fetchEventData();
  }, [dispatch]);
  

  useEffect(() => {
    dispatch(updateFilteredEvents({
      searchQuery,
      locationQuery,
      startDate,
      endDate,
      events
    }));
  }, [dispatch, searchQuery, locationQuery, startDate, endDate, events]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchQuery(e.target.value));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateLocationQuery(e.target.value));
  };

  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      dispatch(updateDateRange(dates));
    } else {
      dispatch(updateDateRange([undefined, undefined]));
    }
  };

  const handleCardClick = (id: string) => {
    navigate(`/event/${id}`);
  };

  const truncateDescription = (description: string, maxLength: number = 100): string => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + '...';
    }
  };

  const handleLoadMore = () => {
    console.log('Dispatching updateDisplayCount');
    dispatch(updateDisplayCount(8));
  };

  const handleClearFilters = () => {
    console.log('clicked');
    dispatch(updateSearchQuery(''));
    dispatch(updateLocationQuery(''));
    dispatch(updateDateRange([undefined, undefined]));

    if (searchQuery !== '' || locationQuery !== '' || (startDate && endDate)) {
      dispatch(updateFilteredEvents({
        searchQuery: '',
        locationQuery: '',
        startDate: undefined,
        endDate: undefined,
        events: events
      }));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: 20 }}>
        <Input
          placeholder="Search events"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            marginBottom: '10px',
            marginRight: '10px',
            maxWidth: '200px',
          }}
        />
        <Input
          placeholder="Filter by location"
          value={locationQuery}
          onChange={handleLocationChange}
          style={{
            width: '100%',
            marginBottom: '10px',
            marginRight: '10px',
            maxWidth: '200px',
          }}
        />
        <RangePicker
          value={[startDate, endDate]}
          onChange={handleDateChange}
          style={{ marginRight: 16 }}
        />
        <Button onClick={handleClearFilters}>Clear Filters</Button>
      </div>
      <Row gutter={[16, 16]}>
        {filteredEvents && filteredEvents.slice(0, displayCount).map((event: any) => (
          <Col key={event.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card
              style={{
                marginBottom: 20,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              actions={[
                <Tooltip title={`Location: ${event.location}`}>
                  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16">
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>} />
                </Tooltip>,
                <Tooltip title={`Date: ${event.date}`}>
                  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
                    <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
                  </svg>} />
                </Tooltip>,
                <Tooltip title={`Start Time: ${event.start_time}`}>
                  <Button icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
                    <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                  </svg>} />
                </Tooltip>,
              ]}
              onClick={() => handleCardClick(event.id)}
            >
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={event.title}
                description={truncateDescription(event.description)}
                style={{ flexGrow: 1 }} 
              />
            </Card>
          </Col>
        ))}
      </Row>

      {filteredEvents && filteredEvents.length > displayCount ? (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button onClick={handleLoadMore}>Load More</Button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginTop: 16 }}>No more events available.</div>
      )}
    </div>
  );
};

export default EventList;
