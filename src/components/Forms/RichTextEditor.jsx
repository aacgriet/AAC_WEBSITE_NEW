// src/components/Forms/RichTextEditor.jsx - Fixed to handle onChange properly
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const RichTextEditor = ({ 
  label = 'Content', 
  name,
  value = '', 
  onChange, 
  required = false,
  error,
  className = '',
  placeholder = 'Enter content...'
}) => {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef(null);

  // Handle change event properly
  const handleInputChange = (e) => {
    if (onChange) {
      // Create proper event object if onChange expects it
      if (name) {
        onChange({ target: { name, value: e.target.value } });
      } else {
        onChange(e);
      }
    }
  };

  const insertMarkdown = (before, after = '') => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    // Trigger onChange with proper event structure
    const syntheticEvent = {
      target: {
        name: name,
        value: newText
      }
    };
    
    if (onChange) {
      onChange(syntheticEvent);
    }
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatButtons = [
    { label: 'Bold', action: () => insertMarkdown('**', '**'), icon: 'B' },
    { label: 'Italic', action: () => insertMarkdown('*', '*'), icon: 'I' },
    { label: 'Code', action: () => insertMarkdown('`', '`'), icon: '</>' },
    { label: 'Link', action: () => insertMarkdown('[', '](url)'), icon: '🔗' },
    { label: 'List', action: () => insertMarkdown('\n- '), icon: '•' },
    { label: 'Heading', action: () => insertMarkdown('\n## '), icon: 'H' },
    { label: 'Quote', action: () => insertMarkdown('\n> '), icon: '"' },
    { label: 'Code Block', action: () => insertMarkdown('\n```\n', '\n```\n'), icon: '{}' }
  ];

  const renderPreview = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 rounded">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
      .replace(/^#{1,6}\s+(.*$)/gm, (match, text) => {
        const level = match.indexOf(' ');
        return `<h${level} class="text-${4-level}xl font-bold mb-2">${text}</h${level}>`;
      })
      .replace(/^- (.*)$/gm, '<li class="ml-4">• $1</li>')
      .replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic">$1</blockquote>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded overflow-x-auto"><code>$1</code></pre>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              !isPreview 
                ? 'bg-blue-900 text-blue-300' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              isPreview 
                ? 'bg-blue-900 text-blue-300' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div className="border border-gray-600 rounded-lg overflow-hidden bg-[#0e1421]">
        {!isPreview && (
          <div className="flex flex-wrap gap-1 p-2 border-b border-gray-600 bg-[#1a2535]">
            {formatButtons.map((button, index) => (
              <button
                key={index}
                type="button"
                onClick={button.action}
                title={button.label}
                className="px-2 py-1 text-xs bg-[#0e1421] text-gray-300 rounded hover:bg-gray-700 transition-colors border border-gray-600"
              >
                {button.icon}
              </button>
            ))}
          </div>
        )}

        {isPreview ? (
          <div 
            className="p-4 min-h-[200px] prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={handleInputChange}
            placeholder={`${placeholder}\n\nSupported formatting:\n**bold** *italic* \`code\` [link](url)\n- lists\n## headings\n> quotes\n\`\`\`code blocks\`\`\``}
            required={required}
            rows={12}
            className="w-full p-4 bg-transparent text-white resize-vertical focus:outline-none border-none"
          />
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-400">
        <span>Supports Markdown formatting</span>
        <span>{value.length} characters</span>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default RichTextEditor;