import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../layout/Header';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { addEvent } from '../../../store/eventAddSlice';
import { Button, DatePicker, TimePicker, Form, Input, notification } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SearchOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import moment from 'moment';
const { TextArea } = Input;

interface FormValues {
    title: string;
    date: Date;
    time: [moment.Moment, moment.Moment];
    description: string;
    location: string;
    latitude?: number;
    longitude?: number;
}


const EventForm = () => {
    const [form] = Form.useForm();
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const apiKey = process.env.REACT_APP_LOCATIONIQ_API_KEY;

    useEffect(() => {
        if (searchQuery.length > 0) {
            searchLocation();
        }
    }, [searchQuery]);

    const searchLocation = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${searchQuery}&limit=5&format=json`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching location:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLocationSelect = (result: any) => {
        const selectedLocation = {
            lat: parseFloat(result.lat),
            long: parseFloat(result.lon),
            location: result.display_name
        };
        setSearchQuery(result.display_name);
        form.setFieldsValue({ location: result.display_name });
    };



    const onFinish = async (values: FormValues) => {
        try {
            let latitude, longitude;
            if (searchResults.length > 0) {
                latitude = parseFloat(searchResults[0].lat);
                longitude = parseFloat(searchResults[0].lon);
            } else {
                latitude = undefined;
                longitude = undefined;
            }
    
            const { title, description, date, time, location } = values;
    
            //Convert moment objects to Date objects
            const startTime = time[0].toDate();
            const endTime = time[1].toDate();
    
            //Convert date to Luxon DateTime object
            const luxonDate = DateTime.fromISO(date.toISOString());
    
            console.log('Luxon Date:', luxonDate.toString());
    
            //Convert to local timezone
            const localDate = luxonDate.setZone('local');
    
            console.log('Local Date:', localDate.toString());

            const formattedDate = localDate.toFormat('yyyy-MM-dd');
    
            console.log('Formatted Date:', formattedDate);
    
            const eventData = {
                title,
                description,
                date: formattedDate,
                start_time: moment(startTime).format('HH:mm'),
                end_time: moment(endTime).format('HH:mm'),
                location,
                latitude: latitude,
                longitude: longitude,
            };
    
            console.log('Event data:', eventData);
    
            const response = await axios.post('http://0.0.0.0:8001/api/events/', eventData);
            console.log('Event added successfully:', response.data);
            notification.open({
                message: 'Event Created',
                description: 'Successfully created event!',
                placement: 'topRight',
              });
            dispatch(addEvent(response.data));
            setSearchQuery('');
            setSearchResults([]);
            form.resetFields();
        } catch (error) {
            console.error('Failed to add event:', error);
        }
    };
    
    
    // const onFinish = (values: FormValues) => {
    //     const event: FormValues = {
    //         ...values,
    //         location: selectedLocation
    //     };
    //     console.log(Event);
    //     dispatch(addEvent(event));
    //     form.resetFields();
    // };

    const disabledDate = (current: any) => {
        return current && current < DateTime.local().startOf('day');
    };

    const disabledTime = (current: Dayjs, range?: 'start' | 'end'): { disabledHours: () => number[]; disabledMinutes: () => number[] } => {
        if (!selectedDate) return { disabledHours: () => [], disabledMinutes: () => [] };

        const now = dayjs();
        const isToday = selectedDate.isSame(now, 'day');

        if (isToday && range === 'start') {
            return {
                disabledHours: () => Array.from({ length: now.hour() }, (_, i) => i),
                disabledMinutes: () => Array.from({ length: now.minute() + 1 }, (_, i) => i),
            };
        }
        return { disabledHours: () => [], disabledMinutes: () => [] };
    };

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    return (
        <>
       <Header/>
       <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px', color: 'blue' }}>Create Event</p>

        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600, margin: '0 auto', marginTop: '50px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '8px' }}
            onFinish={onFinish}
            
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please input the title of the event!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input the description of the event!' }]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select the date of the event!' }]}
            >
                <DatePicker format="YYYY-MM-DD" disabledDate={disabledDate} onChange={handleDateChange} />
            </Form.Item>

            <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: 'Please select the time of the event!' }]}
            >
                <TimePicker.RangePicker
                    format="h:mm a"
                    use12Hours
                    disabled={selectedDate === null}
                    disabledTime={disabledTime}
                />
            </Form.Item>



            <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Please select the location of the event!' }]}
            >
                <div>
                    <Input
                        placeholder="Search for location"
                        prefix={<SearchOutlined />}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />

                    {loading && <p>Loading...</p>}
                    <ul>
                        {searchResults && Array.isArray(searchResults) && searchResults.length > 0 && (
                            <ul>
                                {searchResults && Array.isArray(searchResults) && searchResults.length > 0 && (
                                    <ul>
                                        {searchResults.slice(0, 5).map((result: any, index: number) => (
                                            <div key={index} onClick={() => handleLocationSelect(result)}>
                                                <button type="button">{result.display_name}</button>
                                            </div>
                                        ))}
                                    </ul>
                                )}
                            </ul>
                        )}
                    </ul>
                </div>
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

        </Form>

    </>
    );
};

export default EventForm;
