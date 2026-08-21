"use client";

import React from "react";
import { Building2, Phone, Mail, MapPin, ShieldCheck, Heart } from "../icons/Icons";

interface FooterProps {
  onOpenProviderModal: () => void;
  onOpenAuthModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProviderModal, onOpenAuthModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Intro (Takes 2 spans on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                <Building2 size={22} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Sahayak<span className="text-blue-500">-Local</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting people with trusted local services & neighborhood micro-businesses. Designed with quality verification, transparent pricing, and instant booking.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Verified Providers</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin size={16} className="text-blue-400" />
                <span>Hyperlocal Matching</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-blue-400 transition-colors">
                  Businesses
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-blue-400 transition-colors">
                  About Sahayak-Local
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: For Providers */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              For Providers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenProviderModal}
                  className="hover:text-emerald-400 transition-colors text-left cursor-pointer font-semibold text-emerald-400/90"
                >
                  Join as Provider
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAuthModal}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Provider Login
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenProviderModal}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Provider Dashboard
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Partner Pricing & Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
              Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#support" className="hover:text-blue-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-blue-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © 2026 Sahayak-Local. All rights reserved. B.Tech Final Year Project Showcase.
          </p>

          <div className="flex items-center gap-2 text-slate-500">
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span>for Local Community Discovery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
