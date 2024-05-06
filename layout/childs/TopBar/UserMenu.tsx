import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { useAppDispatch, useAppSelector } from '@/storage/hooks';
import { logout } from '@/storage/features/auth';
import { useRouter } from 'next/navigation';

export default function UserMenu() {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth)
    const router = useRouter();

    const menuUser = useRef<Menu>(null);
    const items: MenuItem[] = [
        {template: () => <div className='px-4 pb-2 font-bold'>{user?.name}</div>},
        {
            label: 'Salir',
            icon: 'pi pi-sign-out',
            command: () => {
                dispatch(logout());
                router.push("/");
            }
        }
    ];

    return (
        <div>
            <Menu model={items} popup ref={menuUser} />
            <Button type="button" className="p-link layout-topbar-button" onClick={(event) => menuUser.current?.toggle(event)}>
                <i className="fa-solid fa-user"></i>
            </Button>
        </div>
    );
}
