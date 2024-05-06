/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Image } from 'primereact/image';
import { useFormik } from 'formik';
import { getFormErrorMessage, isFormFieldInvalid, validatorEmail } from '@/libs/utils';
import { useAppDispatch, useAppSelector } from '@/storage/hooks';
import { login } from '@/storage/features/auth';
import { useToast } from '@/providers/toastProvider';
import { loginAdmin } from "@/services/auth/authService";

// const authService = new AuthService();

export default function LoginForm() {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const params = useSearchParams();
    const [isLoading, setLoading] = useState<boolean>(false);
    const isAuth = useAppSelector((state) => state?.auth.isAuth);

    const form = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (data) => {
            let errors: any = {};
            
            if(!data.email){
                errors.email = "Ingrese su correo electrónico.";
            }

            if (!validatorEmail(data.email)) {
                errors.email = "Ingrese un correo electrónico válido.";
            }

            if (!data.password) {
                errors.password = 'Ingrese su contraseña.';
            }

            return errors;
        },
        onSubmit: (values) => {
            handleLogin(values.email, values.password);
        }
    });

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        loginAdmin(email, password).then((response) => {
            if (response?.data?.token) {
                dispatch(login({token: response?.data?.token}));
                toast.current?.show({severity: "success", detail: response?.message, life: 5000});
                router.push("/dashboard");
                setLoading(false);
            }
            console.log("response => ", response);
        })
        .catch((error) => {
            console.log("error handleLogin() => ", error);
            toast.current?.show({severity: "error", detail: error.toString(), life: 5000});
            setLoading(false);
        });
    }

    useEffect(() => {
        // Redirect if auth user   
        if (isAuth) {
            router.push("/dashboard");
        }        
    }, [isAuth]);

    useEffect(() => {
        // Validate sesión and token
        if (params.get("unauthorized")) {
            toast.current?.show({severity: "warn", detail: "Por seguridad, su sesión a sido finalizada.", life: 5000});
            deleteCookie("user");
            deleteCookie("isAuth");
            deleteCookie("token");
        }
    }, [params]);

    return (
        <div className="flex flex-column align-items-center justify-content-center">
            {/* <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
            {/* <Image src={`/images/logo-tyt.svg`} alt="logo" width={`96px`} height={`96px`} /> */}
            <div className="w-full lg:surface-card lg:py-6 lg:px-5 lg:shadow-1 lg:border-round-2xl">
                {/* <div className="text-center mb-5">
                    <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
                    <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                    <span className="text-600 font-medium">Sign in to continue</span>
                </div> */}
                <form onSubmit={form.handleSubmit}>
                    <div className={`flex flex-column ${isFormFieldInvalid('email', form) ? '' : 'pb-4'} `}>
                        <label htmlFor="email" className="block text-900 text-xl font-medium mb-2">
                            Correo electrónico
                        </label>
                        <InputText 
                            id="email"
                            name="email"
                            type="text" 
                            value={form.values.email}
                            onChange={(e) => form.setFieldValue('email', e.target.value)} 
                            keyfilter="email" 
                            placeholder="example@domain.com" 
                            className={`w-full lg:w-30rem ${isFormFieldInvalid('email', form) ? 'p-invalid' : null}`}
                        />
                        {getFormErrorMessage('email', form)}
                    </div>

                    <div className={`flex flex-column ${isFormFieldInvalid('password', form) ? '' : 'pb-4'} `}>
                        <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                            Contraseña
                        </label>
                        <Password 
                            inputId="password" 
                            name="password" 
                            value={form.values.password} 
                            onChange={(e) => form.setFieldValue('password', e.target.value)} 
                            placeholder="*******" 
                            toggleMask 
                            className={`w-full ${isFormFieldInvalid('password', form) ? 'p-invalid' : null}`} 
                            inputClassName={`w-full lg:w-30rem`}
                            feedback={false}
                        />
                        {getFormErrorMessage('password', form)}
                    </div>

                    <div className="flex align-items-center justify-content-between mb-5 gap-5">
                        <div className="flex align-items-center">
                            {/* <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox> */}
                            {/* <label htmlFor="rememberme1">Remember me</label> */}
                        </div>
                        {/* <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                            ¿Olvido su contraseña?
                        </a> */}
                    </div>
                    <Button icon={`${isLoading ? 'pi pi-spin pi-spinner' : ''}`} label={`${isLoading ? `Iniciando sesión...` : `Iniciar Sesión `}`} raised disabled={isLoading} type='submit' className={`w-full`} />
                </form>
            </div>
        </div>
    )
}
