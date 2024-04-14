import React from 'react';
import { Link } from 'react-router-dom';
import EventList from "../components/event/eventlist/EventList";
import Header from '../layout/Header';
import Footer from '../layout/Footer';


const Home = () => {
  return (
    <>
      <Header />
      <div>
        <div className="row col-start-1 col-end-9 pt-3 mt-8 mb-2">
          <EventList />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;