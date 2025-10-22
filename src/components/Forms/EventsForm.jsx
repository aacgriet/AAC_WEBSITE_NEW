// src/components/Forms/EventsForm.jsx - Updated to use database instead of localStorage
import React, { useState, useEffect } from 'react';
import BaseForm, { FormField, TextAreaField, SelectField } from './BaseForm';
import { MultiImageUpload } from './ImageUpload';
import { useDatabase } from '@/hooks/useDatabase';

const EVENT_STATUSES = [
  'upcoming',
  'ongoing',
  'completed',
  'cancelled'
];

const EventsForm = ({ eventId = null, onSuccess, onCancel }) => {
  const { data: eventsData, addItem, updateItem, getItemById } = useDatabase('events');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    id: '',
    event: '', // This matches your 'event' field name
    description: '',
    path: '', // URL path for the event
    date: '', // This is the display date (e.g., "JUNE 2024")
    img: '', // Main image URL
    images: [], // Array of all images for the event detail page
    detailedDescription: '', // The full content description with HTML
    location: 'GRIET Campus, Hyderabad',
    organizer: 'Advanced Academic Center',
    status: 'completed',
    cta: {
      text: '',
      link: ''
    }
  });

  useEffect(() => {
    if (eventId) {
      const existingEvent = getItemById(eventId);
      if (existingEvent) {
        setFormData({
          ...existingEvent,
          cta: existingEvent.cta || { text: '', link: '' }
        });
      }
    }
  }, [eventId, eventsData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate ID and path from event name
    if (name === 'event' && !eventId) {
      const id = value.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '')
        .replace(/-+/g, '')
        .trim();
      const path = `/Events/${id.charAt(0).toUpperCase() + id.slice(1)}`;
      
      setFormData(prev => ({
        ...prev,
        id: id,
        path: path
      }));
    }
  };

  const handleCtaChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      cta: {
        ...prev.cta,
        [field]: e.target.value
      }
    }));
  };

  const handleImagesChange = (images) => {
    setFormData(prev => {
      const updatedFormData = {
        ...prev,
        images
      };
      
      // Set the first image as the main image if not already set
      if (images.length > 0 && !prev.img) {
        updatedFormData.img = images[0];
      }
      
      return updatedFormData;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.event.trim()) {
      newErrors.event = 'Event name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Short description is required';
    }
    
    if (!formData.detailedDescription.trim()) {
      newErrors.detailedDescription = 'Detailed description is required';
    }
    
    if (!formData.date.trim()) {
      newErrors.date = 'Event date is required';
    }
    
    if (!formData.img.trim()) {
      newErrors.img = 'Main image is required';
    }
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one event image is required';
    }

    if (!eventId) {
      const idExists = eventsData.some(item => 
        item.id === formData.id && item.id !== eventId
      );
      if (idExists) {
        newErrors.id = 'Event ID already exists';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const eventItem = {
        ...formData,
        // Make sure we have the main image set
        img: formData.img || formData.images[0] || '',
        createdAt: eventId ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      let result;
      if (eventId) {
        result = await updateItem(eventId, eventItem);
      } else {
        result = await addItem(eventItem);
      }
      
      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      setErrors({ submit: 'Failed to save event: ' + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={eventId ? 'Edit Event' : 'Add Event'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={eventId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Event Name"
          name="event"
          value={formData.event}
          onChange={handleInputChange}
          placeholder="e.g., Opulence 2024, AAC Expo 2023"
          required
          error={errors.event}
        />
        
        <FormField
          label="Event ID (Auto-generated)"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          placeholder="Auto-generated from event name"
          required
          error={errors.id}
        />
      </div>

      <FormField
        label="URL Path (Auto-generated)"
        name="path"
        value={formData.path}
        onChange={handleInputChange}
        placeholder="/Events/EventName"
        required
        error={errors.path}
      />

      <TextAreaField
        label="Short Description (for cards)"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Brief description shown on event cards"
        rows={3}
        required
        error={errors.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Display Date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="e.g., JUNE 2024, DEC 2023"
          required
          error={errors.date}
        />

        <FormField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Event location"
          required
        />

        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          options={EVENT_STATUSES}
          required
        />
      </div>

      <FormField
        label="Organizer"
        name="organizer"
        value={formData.organizer}
        onChange={handleInputChange}
        placeholder="Event organizer"
        required
      />

      <FormField
        label="Main Image URL"
        name="img"
        type="url"
        value={formData.img}
        onChange={handleInputChange}
        placeholder="URL for the main event card image"
        required
        error={errors.img}
      />

      <MultiImageUpload
        label="Event Detail Images (Gallery)"
        values={formData.images}
        onChange={handleImagesChange}
        maxImages={10}
        required
        error={errors.images}
      />

      <TextAreaField
        label="Detailed Description (Full Event Content)"
        name="detailedDescription"
        value={formData.detailedDescription}
        onChange={handleInputChange}
        placeholder="Write the full event description that will appear on the event detail page. You can use HTML tags like &lt;br /&gt;&lt;br /&gt; for line breaks."
        rows={8}
        required
        error={errors.detailedDescription}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Call to Action (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="CTA Button Text"
            name="cta-text"
            value={formData.cta.text}
            onChange={handleCtaChange('text')}
            placeholder="e.g., Explore Projects, Register Now"
          />
          
          <FormField
            label="CTA Button Link"
            name="cta-link"
            value={formData.cta.link}
            onChange={handleCtaChange('link')}
            placeholder="e.g., /projects, /contact"
          />
        </div>
      </div>

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default EventsForm;