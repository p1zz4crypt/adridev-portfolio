import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ProjectsSection from '@/sections/ProjectsSection';

export default function PortfolioLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: 'PROJECT ONE',
      category: 'GRAPHIC DESIGN',
      year: '2023'
    },
    {
      id: 2,
      title: 'MOTION SERIES',
      category: 'ANIMATION',
      year: '2023'
    },
    {
      id: 3,
      title: 'EDITORIAL DESIGN',
      category: 'PRINT',
      year: '2023'
    },
    {
      id: 4,
      title: 'CAMPAIGN WORK',
      category: 'BRANDING',
      year: '2023'
    },
    {
      id: 5,
      title: 'PORTRAIT SERIES',
      category: 'PHOTOGRAPHY',
      year: '2023'
    },
    {
      id: 6,
      title: 'EXPERIENTIAL',
      category: 'DESIGN',
      year: '2023'
    }
  ];

  return (
    <div className="bg-[#F3EFEA] text-black min-h-screen " >
      {/* Desktop Layout */}
      <div className=" w-full   lg:min-h-screen " >
        {/* Left Side - Fixed Sidebar */}
        <div className="lg:flex lg:fixed  lg:left-0 lg:top-0 lg:h-screen lg:w-[48vw] bg-stone-50  " style={{ borderRight: "6px solid black " }}>
          <div className="w-full h-full px-16 pt-20 pb-16 flex flex-col justify-around ">
            {/* Top */}
            <div>
              <h1 className="font-black uppercase tracking-tight leading-[0.9] text-[120px]">
                Adriana<br />
                rosas<br />
              </h1>

              {/* Red bar */}
              <div className="mt-14 h-3 w-36 bg-red-600" />

              {/* Small label */}
              <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-black/80">
                Front-end Developer | Diseño UX/UI & AI Workflows | Tecnología Blockchain
              </p>
            </div>

            {/* Bottom block */}
            <div>
              <div className="w-[340px] h-[200px] bg-teal-600" />
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Content */}
        <div className=" min-h-screen overflow-y-auto bg-stone-50" >
          <div className="p-12 space-y-0">
            <div className="g:w-[48vw]">

              <div>

              </div>
            </div>
            {/* 
            {projects.map((project, index) => (
              <div key={project.id} className="border-b border-black "  >
                <div className="h-80 bg-gradient-to-br from-gray-300 to-gray-500 mb-6" />
                <div className="pb-12 space-y-2">
                  <p className="text-xs tracking-wide font-light text-gray-600">{project.category}</p>
                  <h3 className="text-2xl font-black tracking-tight">{project.title}</h3>
                  <p className="text-xs tracking-wide font-light text-gray-600">{project.year}</p>
                </div>
              </div>
            ))} */}

            {/* Services Section */}
            <div className="pt-12 border-t border-black">
              <div className="grid grid-cols-4 gap-8 py-12">
                <div className="space-y-3">
                  <h4 className="text-xs font-black tracking-wide">BRAND</h4>
                  <p className="text-xs font-light text-gray-600 leading-relaxed">
                    Complete identity systems, logo design, brand guidelines
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-black tracking-wide">DIGITAL</h4>
                  <p className="text-xs font-light text-gray-600 leading-relaxed">
                    Web design, UI/UX, digital campaigns, interactive media
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-black tracking-wide">PRINT</h4>
                  <p className="text-xs font-light text-gray-600 leading-relaxed">
                    Editorial design, packaging, promotional materials, collateral
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-xs font-black tracking-wide">MOTION</h4>
                  <p className="text-xs font-light text-gray-600 leading-relaxed">
                    Animation, video design, motion graphics, presentations
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="py-12 border-t border-black space-y-8">
              <h2 className="text-3xl font-black tracking-tight">
                LET'S WORK TOGETHER
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="YOUR NAME"
                  className="w-full px-4 py-3 bg-transparent border border-black text-sm placeholder-gray-600 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="YOUR EMAIL"
                  className="w-full px-4 py-3 bg-transparent border border-black text-sm placeholder-gray-600 focus:outline-none"
                />
              </div>

              <button className="px-6 py-3 bg-black text-white text-xs font-black tracking-wide hover:bg-gray-800 transition-colors">
                SEND
              </button>
            </div>

            <div className="h-20" />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="sticky top-0 bg-stone-50 border-b border-black p-6 flex justify-between items-center z-50">
          <h1 className="text-2xl font-black">JULIA LOYD MOHR</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="bg-stone-50 border-b border-black p-6 space-y-4">
            <a href="#" className="block text-sm font-light hover:opacity-50">
              ABOUT
            </a>
            <a href="#" className="block text-sm font-light hover:opacity-50">
              SELECTED WORK
            </a>
            <a href="#" className="block text-sm font-light hover:opacity-50">
              CONTACT
            </a>
          </div>
        )}

        {/* Mobile Content */}
        <div className="p-6 space-y-0">
          <div className="mb-8">
            <h1 className="text-4xl font-black leading-tight mb-6">
              JULIA<br />
              LOYD<br />
              MOHR
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-teal-600" />
              <span className="text-xs tracking-wide font-light">DESIGNER • ART DIRECTOR</span>
            </div>
            <p className="text-xs text-gray-600 font-light">AVAILABLE • MAY 2023</p>
          </div>

          {/* Mobile Projects */}
          {projects.map((project) => (
            <div key={project.id} className="border-b border-black pb-8 mb-8">
              <div className="h-56 bg-gradient-to-br from-gray-300 to-gray-500 mb-4" />
              <p className="text-xs tracking-wide font-light text-gray-600 mb-2">{project.category}</p>
              <h3 className="text-xl font-black tracking-tight mb-2">{project.title}</h3>
              <p className="text-xs tracking-wide font-light text-gray-600">{project.year}</p>
            </div>
          ))}

          {/* Mobile Services */}
          <div className="py-8 border-t border-black space-y-8 mb-8">
            <div className="space-y-2">
              <h4 className="text-xs font-black tracking-wide">BRAND</h4>
              <p className="text-xs font-light text-gray-600">Complete identity systems</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-black tracking-wide">DIGITAL</h4>
              <p className="text-xs font-light text-gray-600">Web design and UI/UX</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-black tracking-wide">PRINT</h4>
              <p className="text-xs font-light text-gray-600">Editorial and packaging</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-black tracking-wide">MOTION</h4>
              <p className="text-xs font-light text-gray-600">Animation and video</p>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="py-8 border-t border-black space-y-6">
            <h2 className="text-2xl font-black tracking-tight">
              LET'S WORK<br />TOGETHER
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="YOUR NAME"
                className="w-full px-4 py-3 bg-transparent border border-black text-sm placeholder-gray-600 focus:outline-none"
              />
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full px-4 py-3 bg-transparent border border-black text-sm placeholder-gray-600 focus:outline-none"
              />
            </div>

            <button className="w-full px-6 py-3 bg-black text-white text-xs font-black tracking-wide hover:bg-gray-800 transition-colors">
              SEND
            </button>
          </div>

          <div className="h-10" />
        </div>
      </div>
    </div>
  );
}