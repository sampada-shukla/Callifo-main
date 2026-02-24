import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  UserPlus, Settings, Shield, Mail, Lock, BarChart3, PhoneCall,
  ArrowRight, CheckCircle, FileText, CheckCircle2,
  ArrowUp, ArrowDown, Eye, Sparkles, ZoomIn, Info
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

import logoImage from './assets/Callifologo.png';
import admin1 from "./assets/admin1.png";
import login_email from "./assets/login_email.png";
import login_otp from "./assets/login_otp.png";
import reset from "./assets/reset.png";
import callifo_dashboard from "./assets/callifo_dashboard.png";
import settings from "./assets/settings.png";
import app_info from "./assets/app_info.png";
import registered_sim from "./assets/registered_sim.png";
import dialer from "./assets/dialer.png";

import { TutorialVideo } from './TutorialVideo';
import { NewFooter } from './NewFooter';

type TutorialStep = {
  number: number;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<any>;
  iconColor: string;
  image: string;
  details: string[];
  warning?: { title: string; points: string[] };
};

const tutorialSections = [
  {
    sectionId: 1,
    sectionTitle: '1. Admin Registration & Authentication',
    sectionDescription: 'Initial system onboarding where the Admin registers, activates the license, and securely sets up credentials',
    steps: [
      { number: 1, title: 'Employee Registration', description: 'Allows the user to create a new employee account by entering company details, email, password as well as sim card selection.', icon: UserPlus, iconColor: '#5B6AD0', image: admin1, details: ['Enter company information', 'Provide email and password', 'Select SIM card configuration', 'Complete account setup'] },
      { number: 2, title: 'Employee Login (Email & Password)', description: 'Enables employees to securely sign in using their registered email and password.', icon: Mail, iconColor: '#4A7FD4', image: login_email, details: ['Enter registered email', 'Provide secure password', 'Access dashboard instantly', 'Stay signed in option'] },
      { number: 3, title: 'Employee Login (Email & OTP)', description: "Provides an alternative login method using a one-time password sent to the employee's email.", icon: Shield, iconColor: '#3A9E6F', image: login_otp, details: ['Enter registered email', 'Receive OTP via email', 'Verify one-time code', 'Secure authentication'] },
      { number: 4, title: 'Password Reset via OTP', description: 'Allows employees to securely reset their password using email-based OTP verification.', icon: Lock, iconColor: '#7B5EA7', image: reset, details: ['Request password reset', 'Receive verification OTP', 'Enter new password', 'Confirm and save'] },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: '2. Dashboard Overview',
    sectionDescription: 'Monitor real-time call activity, system health, and performance from a centralized dashboard',
    steps: [
      { number: 5, title: 'User Dashboard', description: 'Displays a summarized view of total calls, incoming calls, outgoing calls, and missed calls.', icon: BarChart3, iconColor: '#C95C5C', image: callifo_dashboard, details: ['Total calls overview', 'Incoming calls tracking', 'Outgoing calls monitoring', 'Missed calls summary', 'Real-time analytics'] },
    ],
  },
  {
    sectionId: 3,
    sectionTitle: '3. Callifo Mobile Application',
    sectionDescription: 'Access and manage Callifo mobile features including SIM configuration, dialing, and application information',
    steps: [
      { number: 6, title: 'Settings Screen', description: 'Provides access to SIM configuration, app management options, update checks, and quick actions such as downloading the latest APK or signing out.', icon: Settings, iconColor: '#2E8FAD', image: settings, details: ['SIM configuration access', 'App management options', 'Update availability checks', 'Download latest APK', 'Quick sign-out option'] },
      { number: 7, title: 'App Information Panel', description: 'Displays detailed application metadata including app name, version, build number, package name, and update status.', icon: FileText, iconColor: '#D4714A', image: app_info, details: ['App name and version', 'Build number details', 'Package information', 'Update status tracking', 'System metadata'] },
      { number: 8, title: 'Registered SIM Details', description: 'Shows the registered office SIM details including slot information, carrier data, and call history, ensuring correct SIM usage.', icon: CheckCircle2, iconColor: '#A855A0', image: registered_sim, details: ['SIM slot information', 'Carrier data display', 'Call history tracking', 'Registration verification', 'Usage monitoring'] },
      { number: 9, title: 'Dialer Screen', description: 'Allows users to manually enter phone numbers and place outgoing calls using the registered office SIM, with recent call indicators.', icon: PhoneCall, iconColor: '#2A9D8F', image: dialer, details: ['Manual number entry', 'Outgoing call placement', 'Office SIM routing', 'Recent call indicators', 'Quick dial options'] },
    ],
  },
];

// ─── FloatingNavButtons ───────────────────────────────────────────────────────
const FloatingNavButtons = ({ onScrollToTop, onScrollToBottom, showTop, showBottom }: {
  onScrollToTop: () => void; onScrollToBottom: () => void; showTop: boolean; showBottom: boolean;
}) => (
  <div style={{ position: 'fixed', right: '2rem', bottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 1000 }}>
    <AnimatePresence>
      {showTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          onClick={onScrollToTop}
          style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,rgb(59,130,246),rgb(29,78,216))', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(59,130,246,0.4), 0 0 0 4px rgba(59,130,246,0.1)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 2s infinite' }} />
          <ArrowUp color="white" size={28} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
    <AnimatePresence>
      {showBottom && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          onClick={onScrollToBottom}
          style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,rgb(6,182,212),rgb(13,148,136))', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(6,182,212,0.4), 0 0 0 4px rgba(6,182,212,0.1)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)', animation: 'shimmer 2s infinite' }} />
          <ArrowDown color="white" size={28} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  </div>
);

// ─── ZoomModal ────────────────────────────────────────────────────────────────
const ZoomModal = ({ show, onClose, step, isMobile }: {
  show: boolean; onClose: () => void; step: TutorialStep | null; isMobile: boolean;
}) => {
  if (!show || !step) return null;
  return ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            style={{ background: 'rgba(0,0,0,0.88)', borderRadius: 20, padding: '1.75rem 2rem', width: '90%', maxWidth: 700, minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'default', boxShadow: `0 40px 100px rgba(0,0,0,0.7),0 0 0 2px ${step.iconColor}50`, gap: '1.25rem' }}>
            <button onClick={onClose}
              style={{ position: 'absolute', top: 16, right: 18, width: 38, height: 38, borderRadius: '50%', background: 'transparent', border: '2px solid white', color: 'white', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'black'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'white'; }}>
              ✕
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px 6px 6px', borderRadius: 999, background: `${step.iconColor}15`, boxShadow: `0 0 0 1px ${step.iconColor}40` }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: step.iconColor, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700, boxShadow: `0 4px 12px ${step.iconColor}55` }}>{step.number}</div>
              <span style={{ color: '#fff', fontSize: 14, fontWeight: 600, letterSpacing: 0.3 }}>{step.title}</span>
            </div>
            <img src={step.image} alt={step.title} style={{ maxWidth: '100%', maxHeight: '80vh', minHeight: 400, width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 10, display: 'block', margin: '0 auto' }} />
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>{isMobile ? 'Tap outside to close' : 'Click outside or press Esc to close'}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ─── ScrollingStoryStep ───────────────────────────────────────────────────────
const ScrollingStoryStep = ({ step, isMobile, isTablet, stepIndex, totalSteps }: {
  step: TutorialStep; isMobile: boolean; isTablet: boolean; stepIndex: number; totalSteps: number;
}) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const zoomingRef = useRef(false);

  const [showPopup, setShowPopup] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({ target: stepRef, offset: ['start end', 'end start'] });

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0.3 });
    if (stepRef.current) obs.observe(stepRef.current);
    return () => { if (stepRef.current) obs.unobserve(stepRef.current); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || e.intersectionRatio < 0.3) setShowPopup(false);
    }, { threshold: [0.3, 0.5, 0.7] });
    if (stepRef.current) obs.observe(stepRef.current);
    return () => { if (stepRef.current) obs.unobserve(stepRef.current); };
  }, []);

  useEffect(() => {
    if (!showPopup) return;
    const handler = (e: MouseEvent) => {
      if (imageRef.current && popRef.current &&
        !imageRef.current.contains(e.target as Node) &&
        !popRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showPopup]);

  useEffect(() => {
    if (!isMobile) return;
    const scrollThreshold = 50;
    let lastScrollY = window.scrollY;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (showPopup && imageRef.current && popRef.current &&
        !imageRef.current.contains(event.target as Node) &&
        !popRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };
    const handleScroll = () => {
      if (showPopup && Math.abs(window.scrollY - lastScrollY) > scrollThreshold) setShowPopup(false);
    };
    if (showPopup) {
      lastScrollY = window.scrollY;
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [showPopup, isMobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowZoom(false); };
    if (showZoom) { document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'; }
    else document.body.style.overflow = '';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [showZoom]);

  const imageOnLeft = step.number % 2 === 1;
  const imageX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], imageOnLeft ? [-80, 0, 0, -80] : [80, 0, 0, 80]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92]);
  const textX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], imageOnLeft ? [80, 0, 0, 80] : [-80, 0, 0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 1, 1, 0]);

  const Icon = step.icon;

  return (
    <div
      ref={stepRef}
      style={{ minHeight: isMobile ? '85vh' : '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '2rem 1rem' : '3rem 2rem', position: 'relative', width: '100%' }}
    >
      {/* bg glow */}
      <motion.div
        animate={isInView ? { background: [`radial-gradient(circle at ${imageOnLeft ? '20%' : '80%'} 50%,${step.iconColor}08,transparent 60%)`, `radial-gradient(circle at ${imageOnLeft ? '30%' : '70%'} 60%,${step.iconColor}12,transparent 70%)`, `radial-gradient(circle at ${imageOnLeft ? '20%' : '80%'} 50%,${step.iconColor}08,transparent 60%)`] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      {/* progress line */}
      <div style={{ position: 'absolute', left: isMobile ? '1rem' : '3rem', top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,transparent,rgba(203,213,225,0.3),transparent)', zIndex: 0 }}>
        <motion.div initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : { scaleY: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', background: `linear-gradient(to bottom,${step.iconColor},${step.iconColor}80)`, transformOrigin: 'top' }} />
      </div>

      {/* grid */}
      <div style={{ maxWidth: 1300, width: '100%', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '4rem', alignItems: 'center', position: 'relative', zIndex: 1, margin: '0 auto', padding: '0 1rem' }}>

        {/* ══ IMAGE SIDE ══ */}
        <motion.div
          style={{ x: isMobile ? 0 : imageX, scale: imageScale, opacity: imageOpacity, order: isMobile ? 1 : imageOnLeft ? 1 : 2, position: 'relative', background: `linear-gradient(135deg,${step.iconColor}05,${step.iconColor}02)`, borderRadius: 32, padding: isMobile ? '2rem 1.5rem' : '3rem 2rem' }}
        >
           {[...Array(3)].map((_, i) => (
  <motion.div
    key={i}
    animate={{ y: [0, -10, 0], x: [0, Math.sin(i) * 8, 0], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
    style={{
      position: 'absolute', width: '8px', height: '8px', borderRadius: '50%',
      background: step.iconColor,
      top: `${30 + (i * 15) % 40}%`, left: `${20 + (i * 20) % 60}%`,
      filter: 'blur(1px)', zIndex: 0,
      boxShadow: `0 0 6px ${step.iconColor}60`,
    }}
  />
))}
          {/* Rotating gradient ring */}
          <motion.div
            animate={isInView ? { rotate: [0, 360], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '120px', height: '120px', borderRadius: '50%',
              background: `radial-gradient(circle, ${step.iconColor}15, transparent 70%)`,
              filter: 'blur(30px)', zIndex: -1,
            }}
          />

          <motion.div
            animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%', height: '90%', borderRadius: '30px',
              background: `radial-gradient(circle, ${step.iconColor}15, transparent 70%)`,
              filter: 'blur(40px)', zIndex: -1,
            }}
          />

          {/* Hover container */}
          <motion.div
            whileHover={{ scale: 1.02, rotate: imageOnLeft ? -2 : 2 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => !isMobile && setShowPopup(true)}
            onMouseLeave={(e) => {
              if (isMobile || zoomingRef.current) return;
              const nextTarget = e.relatedTarget as Node | null;
              if (popRef.current && nextTarget && popRef.current.contains(nextTarget)) return;
              setShowPopup(false);
            }}
            style={{ position: 'relative', minHeight: isMobile ? 400 : 550, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ position: 'absolute', inset: -15, borderRadius: 28, background: `linear-gradient(135deg,${step.iconColor}08,${step.iconColor}05)`, zIndex: -1 }} />

            <motion.img
              ref={imageRef}
              src={step.image}
              alt={step.title}
              whileHover={{ scale: 1.03, rotateY: 5, rotateX: 5 }}
              onClick={() => { if (isMobile) setShowPopup(p => !p); }}
              style={{ width: '100%', maxWidth: isMobile ? 420 : isTablet ? 500 : 550, height: 'auto', margin: '0 auto', display: 'block', filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.18))', borderRadius: 20, cursor: isMobile ? 'pointer' : 'default', border: `3px solid ${step.iconColor}40`, transformStyle: 'preserve-3d', objectFit: 'contain' }}
            />

            {/* Hover overlay */}
            <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg,${step.iconColor}20,${step.iconColor}10)`, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', backdropFilter: 'blur(2px)' }}>
              <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Eye color="white" size={48} strokeWidth={2.5} style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
              </motion.div>
            </motion.div>

            {/* 4 Corner accents */}
           <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            style={{
              position: 'absolute', top: -12, left: -12,
              width: '50px', height: '50px',
              borderTop: `4px solid ${step.iconColor}`,
              borderLeft: `4px solid ${step.iconColor}`,
              borderTopLeftRadius: '12px',
            }}
            />

            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              style={{
                position: 'absolute', bottom: -12, right: -12,
                width: '50px', height: '50px',
                borderBottom: `4px solid ${step.iconColor}`,
                borderRight: `4px solid ${step.iconColor}`,
                borderBottomRightRadius: '12px',
              }}
              />

            {/* DESKTOP POPUP */}
            {!isMobile && !showZoom && (
              <AnimatePresence>
                {showPopup && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
                    style={{
                      position: 'absolute',
                      left: imageOnLeft ? '-60px' : 'auto',
                      right: imageOnLeft ? 'auto' : '-60px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '320px',
                      maxWidth: '320px',
                      background: 'linear-gradient(135deg, rgb(15, 23, 42), rgb(30, 41, 59))',
                      borderRadius: '1.5rem',
                      padding: '1.75rem',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)',
                      color: 'white',
                      zIndex: 1000,
                      pointerEvents: 'auto',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${step.iconColor}30`,
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Sparkles */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ position: 'absolute', top: '10px', right: '50px' }}
                    >
                      <Sparkles color={step.iconColor} size={22} strokeWidth={2} />
                    </motion.div>

                    {/* Zoom button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        zoomingRef.current = true;
                        setShowZoom(true);
                        setTimeout(() => { zoomingRef.current = false; }, 300);
                      }}
                      style={{
                        position: 'absolute', top: '8px', right: '10px',
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: step.iconColor,
                        border: '2px solid rgba(255,255,255,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'zoom-in', zIndex: 30,
                      }}
                    >
                      <ZoomIn size={13} color="white" strokeWidth={2.5} />
                    </button>

                    {/* Desktop indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: [-3, 0, -3] }}
                      exit={{ opacity: 0 }}
                      transition={{
                        opacity: { duration: 0.4, delay: 0.3 },
                        y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
                      }}
                      style={{
                        position: 'absolute', top: '-52px', right: '-37px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        gap: '2px', cursor: 'default', pointerEvents: 'none',
                        whiteSpace: 'nowrap', zIndex: 1001,
                      }}
                    >
                      <span style={{ position: 'relative', display: 'inline-block' }}>
                        <span style={{ fontSize: '13px', fontWeight: 955, color: step.iconColor, fontFamily: '"Inter", sans-serif' }}>
                          Click for zoom view
                        </span>
                        <span style={{
                          position: 'absolute', left: 0, bottom: '-3px',
                          width: '100%', height: '3.5px',
                          background: `linear-gradient(to right, ${step.iconColor}, transparent)`,
                          borderRadius: '2px', display: 'block',
                        }} />
                      </span>
                      <motion.div
                        animate={{ y: [0, 3, 0], scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <svg width="22" viewBox="0 0 24 24" fill="none" stroke={step.iconColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <polyline points="6 13 12 19 18 13" />
                        </svg>
                      </motion.div>
                    </motion.div>

                    {/* Step number badge */}
                    <motion.div style={{
                      position: 'absolute', top: '-26px', left: '-26px',
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: step.iconColor,
                      boxShadow: `0 0 0 4px ${step.iconColor}50, 0 8px 16px rgba(0,0,0,0.25)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px', fontWeight: 700, color: 'white', zIndex: 20,
                    }}>
                      {step.number}
                    </motion.div>

                    {/* Icon box */}
                    <div ref={popRef} style={{
                      width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
                      background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}dd)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1rem', boxShadow: `0 4px 12px ${step.iconColor}30`,
                    }}>
                      <Icon color="white" size={24} strokeWidth={2.5} />
                    </div>

                    <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.6rem', fontFamily: '"Poppins", sans-serif', lineHeight: 1.3 }}>
                      {step.title}
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, fontFamily: '"Inter", sans-serif' }}>
                      {step.description}
                    </p>

                    {step.warning && (
                      <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', marginBottom: '0.5rem', fontFamily: '"Inter", sans-serif' }}>
                          ⚠️ {step.warning.title}
                        </div>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: 0, listStyle: 'none' }}>
                          {step.warning.points.map((point, i) => (
                            <li key={i} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.25rem', fontFamily: '"Inter", sans-serif', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                              <span style={{ marginTop: '2px' }}>•</span><span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <ZoomModal show={showZoom} onClose={() => setShowZoom(false)} step={step} isMobile={isMobile} />
          </motion.div>

          {/* MOBILE POPUP */}
          {isMobile && (
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  ref={popRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, type: 'spring', stiffness: 300, damping: 28 }}
                  style={{
                    marginTop: '1.25rem',
                    background: 'linear-gradient(135deg, rgb(15, 23, 42), rgb(30, 41, 59))',
                    borderRadius: '1.5rem', padding: '1.5rem',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
                    color: 'white', border: `1px solid ${step.iconColor}40`,
                    position: 'relative',
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', top: '12px', right: '10px' }}
                  >
                    <Sparkles color={step.iconColor} size={20} />
                  </motion.div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      zoomingRef.current = true;
                      setShowZoom(true);
                      setTimeout(() => { zoomingRef.current = false; }, 300);
                    }}
                    style={{
                      position: 'absolute', top: '8px', right: '80px',
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: step.iconColor,
                      border: '2px solid rgba(255,255,255,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'zoom-in', zIndex: 30,
                    }}
                  >
                    <ZoomIn size={13} color="white" strokeWidth={2.5} />
                  </button>

                  <motion.div style={{
                    position: 'absolute', top: '-26px', left: '-26px',
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: step.iconColor,
                    boxShadow: `0 0 0 6px ${step.iconColor}99, 0 12px 25px rgba(0,0,0,0.35)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', fontWeight: 700, color: 'white', zIndex: 20,
                  }}>
                    {step.number}
                  </motion.div>

                  <div style={{
                    width: '3rem', height: '3rem', borderRadius: '1rem',
                    background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}dd)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1rem', boxShadow: `0 8px 20px ${step.iconColor}40`,
                  }}>
                    <Icon color="white" size={20} strokeWidth={2.5} />
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', fontFamily: '"Poppins", sans-serif', lineHeight: 1.3 }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, fontFamily: '"Inter", sans-serif' }}>
                    {step.description}
                  </p>

                  {step.warning && (
                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.95)', marginBottom: '0.5rem' }}>
                        ⚠️ {step.warning.title}
                      </div>
                      <ul style={{ marginTop: '0.5rem', paddingLeft: 0, listStyle: 'none' }}>
                        {step.warning.points.map((point, i) => (
                          <li key={i} style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                            <span style={{ marginTop: '2px' }}>•</span><span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Mobile pill */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute', top: '44px', right: '6px',
                      display: 'flex', alignItems: 'center', gap: '4px',
                      background: `${step.iconColor}20`,
                      border: `1.5px solid ${step.iconColor}60`,
                      borderRadius: '999px', padding: '5px 12px 5px 8px',
                      backdropFilter: 'blur(8px)',
                      boxShadow: `0 4px 12px ${step.iconColor}30`,
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={step.iconColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="6 11 12 5 18 11" />
                    </svg>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif', whiteSpace: 'nowrap' }}>
                      Tap to zoom
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
        {/* ══ END IMAGE SIDE ══ */}

        {/* ══ TEXT SIDE ══ */}
         <motion.div
  style={{
    x: isMobile ? 0 : textX,
    opacity: showZoom ? 0 : textOpacity,
    order: isMobile ? 2 : imageOnLeft ? 2 : 1,
    position: 'relative',
    marginLeft: !isMobile && imageOnLeft ? '2rem' : '0',
    marginRight: !isMobile && !imageOnLeft ? '2rem' : '0',
    pointerEvents: showZoom ? 'none' : 'auto',
    transition: 'opacity 0.3s ease',
  }}
>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(248,250,252,0.55))',
              padding: isMobile ? '1.3rem' : '1.6rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.35)',
              boxShadow:'inset 0 1px 0 rgba(255,255,255,0.15), 0 4px 10px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.03)',
              backdropFilter: 'blur(14px) saturate(120%)',
              WebkitBackdropFilter: 'blur(14px) saturate(120%)',
              position: 'relative',
              width: '100%',
              maxWidth: isMobile ? '100%' : '400px',
            }}
          >
            {/* Animated corner decoration — reduced opacity */}
            <motion.div
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute', top: '-50px', right: '-50px',
                width: '150px', height: '150px',
                background: `conic-gradient(from 0deg, ${step.iconColor}08, transparent, ${step.iconColor}08)`,
                borderRadius: '50%', filter: 'blur(40px)',
              }}
            />

            {/* Header row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginBottom: '1.25rem', position: 'relative', zIndex: 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 360 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{
                    width: isMobile ? '56px' : '64px',
                    height: isMobile ? '56px' : '64px',
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}dd)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    // Reduced glow: was 40 and 20 opacity
                    boxShadow: `0 8px 16px ${step.iconColor}25`,
                    position: 'relative', overflow: 'visible',
                  }}
                >
                  <Icon
                    color="white"
                    size={isMobile ? 28 : 32}
                    strokeWidth={2.5}
                    style={{ position: 'relative', zIndex: 3, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: 'absolute', inset: -4, borderRadius: '16px',
                      border: `2px solid ${step.iconColor}`, zIndex: 1,
                    }}
                  />
                </motion.div>

                <div>
                  <div style={{
                    fontSize: isMobile ? '0.75rem' : '0.8rem', fontWeight: 700,
                    color: step.iconColor, textTransform: 'uppercase',
                    letterSpacing: '0.1em', marginBottom: '0.25rem',
                  }}>
                    Step {step.number} of {totalSteps}
                  </div>
                  <div style={{
                    width: '60px', height: '3px',
                    background: `linear-gradient(to right, ${step.iconColor}, transparent)`,
                    borderRadius: '2px',
                  }} />
                </div>
              </div>

             {/* Step number badge — reduced glow */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: isMobile ? '52px' : '64px',
                  height: isMobile ? '52px' : '64px',
                  borderRadius: '16px',
                  background: step.iconColor,
                  border: '2px solid white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: isMobile ? '22px' : '28px',
                  fontWeight: 800, color: 'white',
                  boxShadow: `0 0 0 5px ${step.iconColor}90, 0 8px 16px rgba(0,0,0,0.25)`,
                }}
              >
                {step.number}
              </motion.div>
            </div>


            {/* Title */}
            <h4 style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: isMobile ? '18px' : isTablet ? '22px' : '26px',
              fontWeight: 700, color: 'rgb(20, 47, 83)',
              lineHeight: 1.3, marginBottom: '0.8rem',
              position: 'relative', zIndex: 1,
            }}>
              {step.title}
            </h4>

            {/* Details */}
            {step.details && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative', zIndex: 1 }}>
                {step.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 * i, duration: 0.4 }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                      padding: '0.6rem 0.85rem',
                      background: `linear-gradient(90deg, ${step.iconColor}08, transparent)`,
                      borderRadius: '12px',
                      borderLeft: `4px solid ${step.iconColor}`,
                      boxShadow: `0 2px 8px ${step.iconColor}10`,
                    }}
                  >
                    <CheckCircle size={18} color={step.iconColor} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{
                      fontSize: isMobile ? '12px' : '13px',
                      color: 'rgb(100, 116, 139)', lineHeight: 1.5,
                      fontFamily: '"Inter", sans-serif',
                    }}>
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Progress bar */}
         <motion.div
  initial={{ width: 0 }}
  animate={isInView ? { width: '116px' } : { width: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  style={{
    height: '4px',
    background: `linear-gradient(to right, ${step.iconColor}, ${step.iconColor}30)`,  
    marginTop: '0.5rem',
    borderRadius: '10px',
    position: 'relative',
    zIndex: 10,
  }}
/>
          </motion.div>
        </motion.div>

      </div>
    </div>   
  );
};

// ─── TutorialPage ─────────────────────────────────────────────────────────────
export default function TutorialPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    const style = document.createElement('style');
    style.innerHTML = `@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}*{box-sizing:border-box}html,body{overflow-x:hidden;width:100%;margin:0;padding:0}body{overflow-y:auto}`;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    const fn = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024); };
    fn(); window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    const fn = () => {
      const s = window.pageYOffset || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight;
      const c = document.documentElement.clientHeight;
      setShowTopButton(s > 300); setShowBottomButton(s < h - c - 300);
    };
    window.addEventListener('scroll', fn); return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  const totalSteps = tutorialSections.reduce((acc, s) => acc + s.steps.length, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#e0f7fa 0%,#ffffff 40%,#ffffff 100%)', position: 'relative', fontFamily: '"Inter",sans-serif', width: '100%' }}>
      {!isMobile && <FloatingNavButtons onScrollToTop={scrollToTop} onScrollToBottom={scrollToBottom} showTop={showTopButton} showBottom={showBottomButton} />}

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(224,247,250,0.3) 0%,rgba(255,255,255,0) 50%)', opacity: 0.6 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>

        {/* Hero */}
        <section style={{ padding: isMobile ? '2rem 1rem' : isTablet ? '2.5rem 1.5rem' : '3rem 1.5rem', minHeight: isMobile ? 'auto' : 500, display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg,#ecfeff 0%,#ffffff 50%,#ecfeff 100%)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: isMobile ? '0 0.5rem' : '0 1.5rem' }}>
            <div style={{ display: isMobile ? 'flex' : 'grid', flexDirection: isMobile ? 'column' : undefined, gridTemplateColumns: isMobile ? undefined : isTablet ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? 0 : isTablet ? '2.5rem' : '3rem', alignItems: 'start' }}>

              {isMobile && (
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '1rem' }}>
                  <img src={logoImage} alt="Callifo Logo" style={{ width: '8rem', height: 'auto', objectFit: 'contain' }} />
                </motion.div>
              )}
              {isMobile && (
                <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
                  <TutorialVideo />
                </motion.div>
              )}

              <div style={{ maxWidth: isMobile ? '100%' : 650, marginTop: isMobile ? 0 : '-2.5rem' }}>
                <motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ fontFamily: '"Poppins",sans-serif', fontSize: isMobile ? 28 : isTablet ? 36 : 48, fontWeight: 700, marginTop: '1rem', marginBottom: '1rem', lineHeight: isMobile ? '38px' : isTablet ? '46px' : '58px', letterSpacing: '-0.025em' }}>
                  {!isMobile && (
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '4rem', marginLeft: '2rem', marginBottom: '1rem' }}>
                      <img src={logoImage} alt="Callifo Logo" style={{ width: isTablet ? '8rem' : '12rem', height: 'auto', objectFit: 'contain' }} />
                    </motion.div>
                  )}
                  <span style={{ color: 'rgb(6,182,212)', fontWeight: 900 }}>Explore Callifo</span>{' '}
                  <span style={{ color: '#0F172A' }}>with Detailed Step-by-Step Tutorials</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                  style={{ fontFamily: '"Inter",sans-serif', fontSize: isMobile ? 14 : 16, fontWeight: 400, color: '#475569', marginTop: '-0.75rem', marginBottom: '1.5rem', lineHeight: isMobile ? '22px' : '26px' }}>
                  Learn how to streamline call management, boost productivity, and scale faster with comprehensive tutorials covering setup, configuration, and advanced features.
                </motion.p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {['Quick start guides for instant setup', 'Advanced feature walkthroughs', 'How it works steps for smooth onboarding'].map((feature, idx) => (
                    <motion.div key={feature} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 + idx * 0.1 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: isMobile ? '1.75rem' : '2.25rem', height: isMobile ? '1.75rem' : '2.25rem', borderRadius: '0.5rem', background: 'rgba(6,182,212,0.15)', border: '2px solid rgb(6,182,212)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle style={{ width: isMobile ? '1rem' : '1.25rem', height: isMobile ? '1rem' : '1.25rem', color: 'rgb(6,182,212)' }} />
                      </div>
                      <span style={{ fontFamily: '"Inter",sans-serif', fontSize: isMobile ? 14 : 16, fontWeight: 500, color: '#475569' }}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {!isMobile && (
                <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '4rem' }}
                  animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <TutorialVideo />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Section header */}
        <section style={{ padding: isMobile ? '2.5rem 1rem 1.5rem' : '3rem 1.5rem 2rem', background: 'linear-gradient(to bottom,rgba(255,255,255,0),#f8fafc)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center', padding: isMobile ? '0 0.5rem' : '0 1.5rem' }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
              style={{ fontFamily: '"Poppins",sans-serif', fontSize: isMobile ? 28 : isTablet ? 34 : 40, fontWeight: 700, color: 'rgb(20,47,83)', marginBottom: '0.75rem' }}>
              Complete Step-by-Step Guide
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
              style={{ fontFamily: '"Inter",sans-serif', fontSize: isMobile ? 15 : 17, color: '#475569', margin: '0 auto', lineHeight: isMobile ? '23px' : '26px', fontWeight: 400 }}>
              Master Callifo with our comprehensive guide covering every feature from sign-up to advanced functionality
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: isMobile ? '0.65rem 1rem' : '0.75rem 1.25rem', margin: '1.25rem auto 0', maxWidth: 'fit-content', background: 'linear-gradient(135deg,rgba(6,182,212,0.12),rgba(59,130,246,0.12))', border: '1.5px solid rgba(6,182,212,0.35)', borderRadius: 999, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: '0 6px 20px rgba(6,182,212,0.18)' }}>
              <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '2.25rem' : '2.5rem', height: isMobile ? '2.25rem' : '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg,rgba(6,182,212,0.4),rgba(6,182,212,0.25))', border: '1.5px solid rgba(6,182,212,0.5)', boxShadow: '0 4px 12px rgba(6,182,212,0.3)' }}>
                <Info size={isMobile ? 18 : 20} color="#06B6D4" strokeWidth={2.5} />
              </motion.div>
              <span style={{ fontFamily: '"Inter",sans-serif', fontSize: isMobile ? '0.875rem' : isTablet ? '0.9375rem' : '1rem', color: '#0e7490', fontWeight: 600, letterSpacing: '-0.01em' }}>
                {isMobile ? 'Tap cards for details' : 'Hover over cards to highlight the steps'}
              </span>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section style={{ background: '#f0fdff', position: 'relative' }}>
          {tutorialSections.map((section, sectionIndex) => {
            const sectionStepStart = tutorialSections.slice(0, sectionIndex).reduce((acc, s) => acc + s.steps.length, 0);
            return (
              <div key={section.sectionId} style={{ position: 'relative', paddingTop: sectionIndex === 0 ? '2rem' : '4rem', paddingBottom: '2rem' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
                  style={{ padding: isMobile ? '2rem 1rem 1rem' : '2.5rem 2rem 1.5rem', textAlign: 'center', maxWidth: 900, margin: '0 auto', position: 'relative' }}>
                  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }}
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: isMobile ? 250 : 400, height: isMobile ? 250 : 400, background: `radial-gradient(circle,${section.steps[0].iconColor}12,transparent 70%)`, borderRadius: '50%', filter: 'blur(50px)', zIndex: 0 }} />
                  <h2 style={{ fontFamily: '"Poppins",sans-serif', fontSize: isMobile ? 24 : isTablet ? 28 : 32, fontWeight: 700, marginBottom: '0.5rem', position: 'relative', zIndex: 1, background: 'linear-gradient(135deg,rgb(20,47,83),rgb(71,85,105))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {section.sectionTitle}
                  </h2>
                  <p style={{ fontFamily: '"Inter",sans-serif', color: '#64748b', lineHeight: 1.6, fontSize: isMobile ? 14 : 16, position: 'relative', zIndex: 1 }}>{section.sectionDescription}</p>
                </motion.div>
                {section.steps.map((step, stepIndex) => (
                  <ScrollingStoryStep key={step.number} step={step} isMobile={isMobile} isTablet={isTablet} stepIndex={sectionStepStart + stepIndex} totalSteps={totalSteps} />
                ))}
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <div style={{ padding: isMobile ? '3rem 1.25rem 4rem' : isTablet ? '4rem 2.5rem 5rem' : '5rem 3rem 6rem', textAlign: 'center', background: 'linear-gradient(to bottom,#f0fbff,#f8fafc)' }}>
          <motion.button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = 'https://admin-callifo.onrender.com/'; }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
            style={{ padding: isMobile ? '1rem 2rem' : isTablet ? '1.125rem 3rem' : '1.25rem 3.5rem', background: 'linear-gradient(135deg,rgb(30,41,59),rgb(15,23,42))', color: 'white', borderRadius: '1rem', border: 'none', fontSize: isMobile ? '1rem' : '1.125rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 12px 30px rgba(0,0,0,0.25)', whiteSpace: 'nowrap', width: isMobile ? '100%' : 'auto', justifyContent: 'center', position: 'relative', overflow: 'hidden', margin: '0 auto', zIndex: 100 }}>
            <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)' }} />
            <span style={{ position: 'relative', zIndex: 1 }}>Go to Dashboard</span>
            <ArrowRight style={{ width: isMobile ? '1.4rem' : '1.6rem', height: isMobile ? '1.4rem' : '1.6rem', position: 'relative', zIndex: 1 }} />
          </motion.button>
        </div>

        <NewFooter />
      </div>
    </div>
  );
}