import React from 'react';
import './EventsSection.css';

const EventsSection = ({ events }) => {
    // Find the nearest upcoming event
    const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));
    const featuredEvent = sortedEvents.find(event => new Date(event.date) > new Date());
    const otherEvents = sortedEvents.filter(event => new Date(event.date) > new Date()).slice(1);

    return (
        <div className="events-section">
            {featuredEvent && (
                <div className="featured-event-card">
                    <img src={featuredEvent.image} alt={featuredEvent.title} className="featured-event-image" />
                    <div className="featured-event-details">
                        <h2>{featuredEvent.title}</h2>
                        <p>{new Date(featuredEvent.date).toLocaleDateString()}</p>
                        <p>{featuredEvent.description}</p>
                    </div>
                </div>
            )}
            <div className="events-grid">
                {otherEvents.map(event => (
                    <div className="event-card" key={event.id}> 
                        <h3>{event.title}</h3>
                        <p>{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsSection;