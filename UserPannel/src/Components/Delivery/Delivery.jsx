import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, Heart, Home, Trash2, PenLine, Plus, AlertCircle, Check } from 'lucide-react';
import './Delivery.css';

// --- Mock Data ---
const initialAddresses = [
    {
        id: 1,
        type: 'Home',
        isDefault: true,
        name: 'John Admin',
        addressLine1: '123, Green Park Avenue, Near City Center Mall',
        cityStateZip: 'Bangalore, Karnataka - 560001',
        phone: '+91 98765 43210',
    },
    {
        id: 2,
        type: 'Office',
        isDefault: false,
        typeTag: 'Work',
        name: 'John Admin',
        addressLine1: '456, Tech Park, Whitefield Main Road',
        cityStateZip: 'Bangalore, Karnataka - 560066',
        phone: '+91 98765 43211',
    },
    {
        id: 3,
        type: 'Parents Home',
        isDefault: false,
        typeTag: 'Home',
        name: 'John Admin',
        addressLine1: '789, 5th Cross, Koramangala 4th Block',
        cityStateZip: 'Bangalore, Karnataka - 560034',
        phone: '+91 98765 43212',
    },
    {
        id: 4,
        type: 'Gym',
        isDefault: false,
        typeTag: 'Other',
        name: 'John Admin',
        addressLine1: '12, Fitness Street, HSR Layout',
        cityStateZip: 'Bangalore, Karnataka - 560102',
        phone: '+91 98765 43213',
    },
];

// --- Helper to get icons ---
const getAddressIcon = (type) => {
    switch (type) {
        case 'Office': return <Briefcase size={20} className="delivery-icon-work" />;
        case 'Parents Home': return <Heart size={20} className="delivery-icon-home" />;
        case 'Gym': return <Home size={20} className="delivery-icon-other" />;
        case 'Home':
        default: return <MapPin size={20} className="delivery-icon-home" />;
    }
};

const Delivery = () => {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        addressType: 'Home',
        recipientName: 'John Admin',
        phoneNumber: '98765 43210',
        addressLine1: '',
        landmark: '',
        pincode: '',
        city: 'Bangalore',
        state: 'Karnataka',
        isDefault: false
    });

    useEffect(() => {
        if (editingAddress) {
            setFormData({
                addressType: editingAddress.type || 'Home',
                recipientName: editingAddress.name || '',
                phoneNumber: editingAddress.phone ? editingAddress.phone.replace('+91 ', '') : '',
                addressLine1: editingAddress.addressLine1 || '',
                landmark: editingAddress.landmark || '',
                pincode: editingAddress.cityStateZip ? editingAddress.cityStateZip.split(' - ')[1] : '',
                city: editingAddress.cityStateZip ? editingAddress.cityStateZip.split(', ')[0] : '',
                state: editingAddress.cityStateZip ? editingAddress.cityStateZip.split(', ')[1].split(' - ')[0] : 'Karnataka',
                isDefault: editingAddress.isDefault || false
            });
            setIsFormOpen(true);
        } else {
            setFormData({
                addressType: 'Home', 
                recipientName: 'John Admin', 
                phoneNumber: '98765 43210',
                addressLine1: '', 
                landmark: '', 
                pincode: '', 
                city: 'Bangalore', 
                state: 'Karnataka', 
                isDefault: false
            });
        }
    }, [editingAddress]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
        
        const formattedAddress = {
            id: editingAddress ? editingAddress.id : Date.now(),
            type: formData.addressType,
            isDefault: formData.isDefault,
            name: formData.recipientName,
            addressLine1: formData.addressLine1,
            cityStateZip: `${formData.city}, ${formData.state} - ${formData.pincode}`,
            phone: `+91 ${formData.phoneNumber}`,
            landmark: formData.landmark
        };

        let updatedAddresses = [...addresses];

        if (formData.isDefault) {
            updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
        }

        if (editingAddress) {
            updatedAddresses = updatedAddresses.map(addr => addr.id === editingAddress.id ? formattedAddress : addr);
        } else {
            updatedAddresses = [formattedAddress, ...updatedAddresses];
        }

        setAddresses(updatedAddresses);
        closeForm();
    };

    const handleDeleteAddress = (id) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingAddress(null);
    };

    const openAddForm = () => {
        setEditingAddress(null);
        setIsFormOpen(true);
    };

    return (
        <div className="delivery-container">
            <main className="delivery-main-content">
                <section className="delivery-addresses-section">
                    <div className="delivery-section-header">
                        <div>
                            <h2 className="delivery-section-title">Your Saved Addresses</h2>
                            <span className="delivery-address-count">{addresses.length} of 10 Addresses used</span>
                        </div>
                        <button onClick={openAddForm} className="delivery-add-btn-mobile">
                            <Plus size={18}/> Add New Address
                        </button>
                    </div>

                    <div className="delivery-addresses-list">
                        {addresses.map((addr) => (
                            <div key={addr.id} className={`delivery-card ${addr.isDefault ? 'delivery-card-default' : ''}`}>
                                <div className="delivery-card-content">
                                    <div className="delivery-card-icon-wrapper">
                                        {getAddressIcon(addr.type)}
                                    </div>
                                    <div className="delivery-card-details">
                                        <div className="delivery-card-header">
                                            <span className="delivery-card-title">{addr.type}</span>
                                            {addr.isDefault && (
                                                <span className="delivery-default-badge">
                                                    <Check size={14}/> Default Address
                                                </span>
                                            )}
                                            {addr.typeTag && <span className="delivery-type-tag">{addr.typeTag}</span>}
                                        </div>
                                        <p className="delivery-recipient-name">{addr.name}</p>
                                        <p className="delivery-address-line1">{addr.addressLine1}</p>
                                        <p className="delivery-city-state-zip">{addr.cityStateZip}</p>
                                        <p className="delivery-phone-number">{addr.phone}</p>
                                    </div>
                                </div>
                                <div className="delivery-card-actions">
                                    <button onClick={() => setEditingAddress(addr)} className="delivery-action-btn delivery-edit-btn" aria-label="Edit Address">
                                        <PenLine size={18} />
                                    </button>
                                    <button onClick={() => handleDeleteAddress(addr.id)} className="delivery-action-btn delivery-delete-btn" aria-label="Delete Address">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="delivery-info-footer">
                        <AlertCircle size={20} className="delivery-info-icon" />
                        <span>You can save a maximum of 10 delivery addresses for quick checkout.</span>
                    </div>
                </section>
            </main>

            {isFormOpen && (
                <div className="delivery-modal-overlay" onClick={closeForm}>
                    <div className="delivery-modal-content" onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSaveAddress} className="delivery-address-form">
                            <div className="delivery-form-header">
                                <h2 className="delivery-section-title">{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
                                <button type="button" onClick={closeForm} className="delivery-close-form-btn" aria-label="Close Form">✕</button>
                            </div>

                            <div className="delivery-form-grid">
                                <div className="delivery-form-group delivery-span-full">
                                    <label htmlFor="addressType">Address Type</label>
                                    <div className="delivery-input-with-icon">
                                        <Home size={18} className="delivery-field-icon" />
                                        <select id="addressType" name="addressType" value={formData.addressType} onChange={handleInputChange}>
                                            <option value="Home">Home</option>
                                            <option value="Office">Office</option>
                                            <option value="Parents Home">Parents Home</option>
                                            <option value="Gym">Gym</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="delivery-form-group delivery-span-full">
                                    <label htmlFor="recipientName">Recipient Name</label>
                                    <input id="recipientName" type="text" name="recipientName" value={formData.recipientName} onChange={handleInputChange} placeholder="Enter full name" required />
                                </div>

                                <div className="delivery-form-group delivery-span-full">
                                    <label htmlFor="phoneNumber">Mobile Number</label>
                                    <div className="delivery-phone-input">
                                        <div className="delivery-country-selector">
                                            <img src="https://flagicons.lipis.dev/flags/4x3/in.svg" alt="IN" />
                                            <span>+91</span>
                                        </div>
                                        <input id="phoneNumber" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="9876543210" required />
                                    </div>
                                </div>

                                <div className="delivery-form-group delivery-span-full">
                                    <label htmlFor="addressLine1">Street Address / Area</label>
                                    <textarea id="addressLine1" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} placeholder="House/Flat no., Street name, Area" rows={2} required />
                                </div>

                                <div className="delivery-form-group delivery-span-full">
                                    <label htmlFor="landmark">Landmark <span className="delivery-optional">(Optional)</span></label>
                                    <input id="landmark" type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} placeholder="e.g. Near City Center Mall" />
                                </div>

                                <div className="delivery-form-group">
                                    <label htmlFor="pincode">Pincode</label>
                                    <input id="pincode" type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="560001" required />
                                </div>

                                <div className="delivery-form-group">
                                    <label htmlFor="city">City</label>
                                    <input id="city" type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Bangalore" required />
                                </div>

                                <div className="delivery-form-group delivery-span-full">
                                    <label htmlFor="state">State</label>
                                    <select id="state" name="state" value={formData.state} onChange={handleInputChange} required>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Telangana">Telangana</option>
                                    </select>
                                </div>

                                <div className="delivery-form-group delivery-span-full delivery-checkbox-group">
                                    <input type="checkbox" name="isDefault" id="isDefault" checked={formData.isDefault} onChange={handleInputChange} />
                                    <label htmlFor="isDefault" className="delivery-checkbox-label">Make this my default delivery address</label>
                                </div>
                            </div>

                            <div className="delivery-form-actions">
                                <button type="button" onClick={closeForm} className="delivery-cancel-btn">Cancel</button>
                                <button type="submit" className="delivery-save-btn">{editingAddress ? 'Update Address' : 'Save Address'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Delivery;