'use client'
import { useState, useRef, useEffect } from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  options?: ComboboxOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  onSelect?: (option: ComboboxOption | null) => void;
}


export default function Combobox({ 
  options = [], 
  placeholder = "Select an option...",
  disabled = false,
  error = false,
  errorMessage = "",
  onSelect 
}:  ComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ComboboxOption | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const comboboxRef = useRef(null);
  const listboxRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event) {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    }

    const input = comboboxRef.current?.querySelector('input');
    input?.addEventListener('keydown', handleKeyDown);
    
    return () => input?.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredOptions, highlightedIndex]);

  const handleSelect = (option: ComboboxOption) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
    setHighlightedIndex(0);
    onSelect?.(option);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedOption(null);
    setHighlightedIndex(0);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const clearSelection = () => {
    setSelectedOption(null);
    setSearchTerm('');
    onSelect?.('');
  };

  return (
    <article ref={comboboxRef} className="relative">
      {/* Input Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full h-[50px] px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-transparent text-gray-500 ${
            error 
              ? 'border-red-500' 
              : disabled 
                ? 'border-gray-200 bg-gray-100 text-gray-500' 
                : 'border-gray-300'
          }`}
        />
        
        {/* Clear Button */}
        {searchTerm && !disabled && (
          <button
            type="button"
            onClick={clearSelection}
            className="absolute inset-y-0 right-8 flex items-center pr-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        
        {/* Dropdown Arrow */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <svg 
            className={`w-5 h-5 transition-transform ${
              disabled ? 'text-gray-400' : 'text-gray-600'
            } ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

      {/* Error Message */}
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}

      {/* Dropdown Options */}
      {isOpen && (
        <div 
          ref={listboxRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto top-12 p-1"
          role="listbox"
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No options found
            </div>
          ) : (
            filteredOptions.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={selectedOption?.value === option.value}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  index === highlightedIndex
                    ? '!bg-[#EDFFF2] text-gray-300'
                    : selectedOption?.value === option.value
                    ? '!bg-primary-100 text-blue-800'
                    : 'hover:bg-gray-50 text-gray-900 cursor-pointer'
                } ${index === 0 ? 'rounded-t-lg' : ''} ${
                  index === filteredOptions.length - 1 ? 'rounded-b-lg' : ''
                }`}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </article>
  );
}