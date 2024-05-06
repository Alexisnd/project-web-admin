import PrimeReactProviders from '@/providers/PrimeReactProviders';
import ReduxProvider from '@/storage/redux-provider';
import { LayoutProvider } from '@/layout/context/layoutcontext';
import 'primereact/resources/themes/tailwind-light/theme.css'
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/public/styles/layout/globals.scss';
import ToastProvider from '@/providers/toastProvider';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/fontawesome.min.css`} />
                <link rel="stylesheet" href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/solid.min.css`} />
            </head>
            <body>
                <PrimeReactProviders>
                    <ReduxProvider>
				        <ToastProvider>
                            <LayoutProvider>
                                {children}
                            </LayoutProvider>
                        </ToastProvider>
                    </ReduxProvider>
                </PrimeReactProviders>
            </body>
        </html>
    );
}
