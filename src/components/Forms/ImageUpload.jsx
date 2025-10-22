// src/components/Forms/ImageUpload.jsx
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ImageUpload = ({ 
  label = 'Image', 
  value = '', 
  onChange, 
  required = false,
  error,
  className = '',
  accept = 'image/*',
  multiple = false
}) => {
  const [preview, setPreview] = useState(value);
  const [isUrl, setIsUrl] = useState(true);
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setPreview(dataUrl);
        onChange(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUrlInput(url);
    setPreview(url);
    onChange(url);
  };

  const handleTabSwitch = (useUrl) => {
    setIsUrl(useUrl);
    if (!useUrl) {
      setUrlInput('');
      setPreview('');
      onChange('');
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    setUrlInput('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      
      <div className="border border-gray-600 rounded-lg overflow-hidden bg-[#0e1421]">
        <div className="flex border-b border-gray-600">
          <button
            type="button"
            onClick={() => handleTabSwitch(true)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              isUrl 
                ? 'bg-blue-900 text-blue-300 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Image URL
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch(false)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              !isUrl 
                ? 'bg-blue-900 text-blue-300 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Upload File
          </button>
        </div>
        
        <div className="p-4">
          {isUrl ? (
            <input
              type="url"
              value={urlInput}
              onChange={handleUrlChange}
              placeholder="Enter image URL (https://...)"
              className="w-full px-4 py-2 bg-[#1a2535] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          ) : (
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-[#1a2535] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-300 hover:file:bg-blue-800"
              />
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
              </p>
            </div>
          )}
        </div>
      </div>

      {preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#0e1421] border border-gray-600 rounded-lg p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Preview:</span>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-800">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              onError={() => {
                setPreview('');
                setUrlInput('');
              }}
            />
          </div>
        </motion.div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

// src/components/Forms/MultiImageUpload.jsx
export const MultiImageUpload = ({ 
  label = 'Images', 
  values = [], 
  onChange, 
  required = false,
  error,
  className = '',
  maxImages = 5
}) => {
  const handleAddImage = (imageUrl) => {
    if (values.length < maxImages) {
      onChange([...values, imageUrl]);
    }
  };

  const handleRemoveImage = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const handleUpdateImage = (index, newUrl) => {
    const newValues = [...values];
    newValues[index] = newUrl;
    onChange(newValues);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <span className="text-xs text-gray-400">
          {values.length}/{maxImages} images
        </span>
      </div>

      <div className="space-y-4">
        {values.map((value, index) => (
          <div key={index} className="border border-gray-600 rounded-lg p-4 bg-[#0e1421]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">Image {index + 1}</span>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>
            <ImageUpload
              value={value}
              onChange={(newUrl) => handleUpdateImage(index, newUrl)}
              label=""
            />
          </div>
        ))}

        {values.length < maxImages && (
          <button
            type="button"
            onClick={() => handleAddImage('')}
            className="w-full py-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:text-gray-300 hover:border-gray-500 transition-colors"
          >
            + Add Image ({values.length}/{maxImages})
          </button>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUpload;