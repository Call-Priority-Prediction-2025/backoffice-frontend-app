"use client"

import React, { useState, useRef, useEffect } from 'react';
import { X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { ModelPredictsInAutoChoose } from '@/app/lib/types';

export default function MultiselectDropdown({ option, onChange }: { option: ModelPredictsInAutoChoose[], onChange: (value: ModelPredictsInAutoChoose[]) => void }) {
    const [selectedOptions, setSelectedOptions] = useState<ModelPredictsInAutoChoose[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
    const filteredOptions = option.filter(item => !selectedOptions.some(selected => selected.file_model_name === item.file_model_name));

    const handleSelectOption = (option: ModelPredictsInAutoChoose) => {
        const newSelectedOptions = [...selectedOptions, option];
        setSelectedOptions(newSelectedOptions);

        onChange(newSelectedOptions);
    };

    const handleRemoveOption = (value: string) => {
        const newSelectedOptions = selectedOptions.filter(option => option.file_model_name !== value);
        setSelectedOptions(newSelectedOptions);

        onChange(newSelectedOptions);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='relative w-full' ref={dropdownRef}>
            <div className='border border-gray-300 rounded-md p-2 flex flex-wrap gap-2 min-h-10 cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                {
                    selectedOptions.length > 0 ?
                        (<>
                            {selectedOptions.map(option => (
                                <div key={option.id}
                                    onClick={(e) => { e.stopPropagation() }}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1 text-sm">
                                    {option.file_model_name}
                                    <X
                                        size={14}
                                        className="cursor-pointer hover:text-blue-600"
                                        onClick={() => handleRemoveOption(option.file_model_name)}
                                    />
                                </div>
                            ))}
                        </>)
                        :
                        (
                            <div className="text-gray-400">choose option</div>
                        )
                }
                <div className='ml-auto'>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>

            {isOpen && (
                <div className='mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-scroll'>
                    {
                        filteredOptions.length > 0 ?
                            (
                                <div className='py-1'>
                                    {
                                        filteredOptions.map((option) => (
                                            <div
                                                key={option.id}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                                onClick={() => handleSelectOption(option)}
                                            >
                                                <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center">
                                                    {selectedOptions.some(selected => selected.file_model_name === option.file_model_name) && (
                                                        <Check size={14} className="text-blue-500" />
                                                    )}
                                                </div>
                                                {option.file_model_name}
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            :
                            <div className="text-gray-400">No data</div>
                    }
                </div>
            )
            }
        </div >
    )
}