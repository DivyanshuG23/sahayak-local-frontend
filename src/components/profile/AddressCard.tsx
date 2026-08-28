"use client";

import React, { useState } from "react";
import {
  MapPin,
  HomeIcon,
  Building2,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Navigation,
  Phone,
  User
} from "@/components/icons/Icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SavedAddress } from "@/data/mockProfile";

interface SavedAddressesSectionProps {
  addresses: SavedAddress[];
  onAddAddress: (newAddr: Omit<SavedAddress, "id">) => void;
  onEditAddress: (id: string, updatedAddr: Partial<SavedAddress>) => void;
  onDeleteAddress: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export const SavedAddressesSection: React.FC<SavedAddressesSectionProps> = ({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefault,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddr, setEditingAddr] = useState<SavedAddress | null>(null);

  // Form fields
  const [type, setType] = useState<"home" | "work" | "other">("home");
  const [label, setLabel] = useState("");
  const [name, setName] = useState("Manoj Prajapati");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [addressLine, setAddressLine] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Indirapuram, Ghaziabad");
  const [state, setState] = useState("Uttar Pradesh");
  const [pincode, setPincode] = useState("201014");
  const [isDefault, setIsDefault] = useState(false);

  const openAddModal = () => {
    setEditingAddr(null);
    setType("home");
    setLabel("Home");
    setName("Manoj Prajapati");
    setPhone("+91 98765 43210");
    setAddressLine("");
    setLandmark("");
    setCity("Indirapuram, Ghaziabad");
    setState("Uttar Pradesh");
    setPincode("201014");
    setIsDefault(addresses.length === 0);
    setIsModalOpen(true);
  };

  const openEditModal = (addr: SavedAddress) => {
    setEditingAddr(addr);
    setType(addr.type);
    setLabel(addr.label);
    setName(addr.name);
    setPhone(addr.phone);
    setAddressLine(addr.addressLine);
    setLandmark(addr.landmark || "");
    setCity(addr.city);
    setState(addr.state);
    setPincode(addr.pincode);
    setIsDefault(addr.isDefault);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddr) {
      onEditAddress(editingAddr.id, {
        type,
        label: label || (type === "home" ? "Home" : type === "work" ? "Work" : "Other"),
        name,
        phone,
        addressLine,
        landmark,
        city,
        state,
        pincode,
        isDefault,
      });
    } else {
      onAddAddress({
        type,
        label: label || (type === "home" ? "Home" : type === "work" ? "Work" : "Other"),
        name,
        phone,
        addressLine,
        landmark,
        city,
        state,
        pincode,
        isDefault,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <MapPin size={20} className="text-blue-600" />
            <span>Saved Addresses</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage your service locations for fast one-click booking checkout.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs gap-2 shrink-0"
        >
          <Plus size={16} />
          <span>Add New Address</span>
        </Button>
      </div>

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`rounded-3xl p-5 border transition-all duration-200 relative flex flex-col justify-between space-y-4 ${
              addr.isDefault
                ? "bg-blue-50/40 border-blue-300 ring-2 ring-blue-500/20"
                : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
            }`}
          >
            {/* Top Bar: Icon + Label + Default Badge */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
                    addr.type === "home"
                      ? "bg-blue-100 text-blue-700"
                      : addr.type === "work"
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {addr.type === "home" ? (
                    <HomeIcon size={20} />
                  ) : addr.type === "work" ? (
                    <Building2 size={20} />
                  ) : (
                    <MapPin size={20} />
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <span>{addr.label}</span>
                    {addr.isDefault && (
                      <Badge variant="blue" className="text-[10px] py-0 px-2">
                        Default
                      </Badge>
                    )}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-semibold">{addr.name}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(addr)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Edit Address"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => onDeleteAddress(addr.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete Address"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Address Lines */}
            <div className="text-xs text-slate-600 leading-relaxed space-y-1 bg-white/80 p-3 rounded-2xl border border-slate-100">
              <p className="font-semibold text-slate-800">{addr.addressLine}</p>
              {addr.landmark && (
                <p className="text-slate-500">Landmark: {addr.landmark}</p>
              )}
              <p className="text-slate-700 font-medium">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <div className="pt-1 text-[11px] text-slate-400 flex items-center gap-1">
                <Phone size={12} />
                <span>Contact: {addr.phone}</span>
              </div>
            </div>

            {/* Set Default Button */}
            {!addr.isDefault && (
              <button
                onClick={() => onSetDefault(addr.id)}
                className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700 py-1.5 rounded-xl border border-blue-200/60 hover:bg-blue-50 transition-colors"
              >
                Set as Default Address
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add / Edit Address Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <MapPin size={18} className="text-blue-600" />
                <span>{editingAddr ? "Edit Saved Address" : "Add New Address"}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Address Type</label>
                <div className="flex items-center gap-2">
                  {[
                    { id: "home", label: "🏠 Home" },
                    { id: "work", label: "🏢 Work" },
                    { id: "other", label: "📍 Other" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id as any)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        type === t.id
                          ? "bg-blue-50 border-blue-600 text-blue-700 shadow-2xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address Line */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Address Line / Building</label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="e.g. Flat 402, Block B, ATS Advantage"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Landmark */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Landmark (Optional)</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Habitat Centre"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Pincode</label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Set Default checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label htmlFor="isDefault" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Set as default delivery & service address
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5"
                >
                  {editingAddr ? "Save Address Changes" : "Save New Address"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
