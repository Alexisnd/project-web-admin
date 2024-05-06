'use client';

import React from 'react';
import { PrimeReactProvider, addLocale, locale } from 'primereact/api';
import es from '@/public/locales/es.json';
import en from '@/public/locales/en.json';
//theme
import "primereact/resources/themes/tailwind-light/theme.css";     
//core
import "primereact/resources/primereact.min.css";
// Icons Prime
import 'primeicons/primeicons.css';

export default function PrimeReactProviders({ children } : { children: React.ReactNode }) {
  
  addLocale("es", es.es);
  addLocale("en", en.en);

  locale("es")

  return (
    <PrimeReactProvider>
        {children}
    </PrimeReactProvider>
  )
}
