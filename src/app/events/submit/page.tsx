import React from 'react';
import EventForm from '@/components/community/event-form';

const SubmitEventPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Submit Event</h1>
      <EventForm />
    </div>
  );
};

export default SubmitEventPage;
