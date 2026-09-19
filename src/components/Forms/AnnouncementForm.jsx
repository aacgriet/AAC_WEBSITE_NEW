import React, { useState, useEffect } from 'react';
import BaseForm, { FormField } from './BaseForm';
import { useDatabase } from '@/hooks/useDatabase';

const AnnouncementForm = ({ announcementId = null, onSuccess, onCancel }) => {
  const { data, addItem, updateItem } = useDatabase('announcements');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    message: '',
    highlight: '',
    link: '',
    isActive: false,
  });

  // Populate form when editing — waits for data to load from DB
  useEffect(() => {
    if (announcementId && data && data.length > 0) {
      const existing = data.find(
        (item) => item.id === announcementId || item._id === announcementId
      );
      if (existing) {
        setFormData({
          message: existing.message || '',
          highlight: existing.highlight || '',
          link: existing.link || '',
          isActive: Boolean(existing.isActive),
        });
      }
    }
  }, [announcementId, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, isActive: !prev.isActive }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        message: formData.message,
        highlight: formData.highlight,
        link: formData.link,
        isActive: Boolean(formData.isActive),
      };

      let result;
      if (announcementId) {
        result = await updateItem(announcementId, payload);
      } else {
        result = await addItem(payload);
      }

      if (result) {
        onSuccess?.(result);
      }
    } catch (error) {
      console.error('Error saving announcement:', error);
      setErrors({ submit: 'Failed to save announcement: ' + error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      title={announcementId ? 'Edit Announcement' : 'Add Announcement'}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      submitText={announcementId ? 'Update' : 'Create'}
      isSubmitting={isSubmitting}
    >
      <FormField
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="e.g., Results are out for"
        required
        error={errors.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Highlight Text (shown in gradient)"
          name="highlight"
          value={formData.highlight}
          onChange={handleInputChange}
          placeholder="e.g., Gprime 2026"
        />

        <FormField
          label="Link URL (optional CTA button)"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          placeholder="e.g., /gprime2026-results"
        />
      </div>

      {/* Toggle switch */}
      <div className="flex items-center justify-between bg-[#0e1421] p-4 rounded-lg border border-gray-600 mt-2">
        <div>
          <p className="text-white font-medium">Active on Home Page</p>
          <p className="text-gray-400 text-sm mt-0.5">
            {formData.isActive
              ? 'This announcement is live on the home page banner.'
              : 'This announcement is hidden from the home page.'}
          </p>
        </div>

        {/* The Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0e1421] ${
            formData.isActive ? 'bg-emerald-500' : 'bg-gray-600'
          }`}
          role="switch"
          aria-checked={formData.isActive}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
              formData.isActive ? 'translate-x-7' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {errors.submit && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg mt-4">
          {errors.submit}
        </div>
      )}
    </BaseForm>
  );
};

export default AnnouncementForm;
