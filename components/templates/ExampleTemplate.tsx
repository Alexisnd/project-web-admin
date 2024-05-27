'use client';
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import React, { useState } from "react";

export default function ExampleTemplate() {

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>();
  const [action, setAction] = useState<string>("");

  const optionsActions = (item: any): MenuItem[] => {
    return [
        {
            label: 'Detalles',
            icon: 'fa-solid fa-circle-info',
            command: async () => {
                await setAction("details");
                await setSelectedItem(item);
                // router.push(`/url/${item.codigo_tyt}`)
            }
        },
        {
            label: 'Editar',
            icon: 'fa-solid fa-pencil',
            command: async () => {
                await setAction("edit");
                await setSelectedItem(item);
            }
        },
        {
            label: 'Eliminar',
            icon: 'fa-solid fa-trash',
            command: async () => {
                await setAction("delete");
                await setSelectedItem(item);
            }
        }
    ]
  };

  const actionsTemplate = (item: any) => {        
    return (
        <SplitButton 
            buttonClassName={`focus:shadow-none`} 
            menuButtonClassName={`focus:shadow-none`} 
            text 
            size='small' 
            label='Acciones'
            model={optionsActions(item)}
        />
    );
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="bg-white p-4 border-round-lg shadow-2">
          <div className="w-full h-full pb-3 flex flex-row align-items-center justify-content-between">
            <h5>Example Template</h5>
            <div className="flex gap-3">
              <Button label="Nuevo" icon="pi pi-plus" />
            </div>
          </div>

          {/* Table Data */}
          
          <DataTable value={[]} rows={10} rowsPerPageOptions={[10, 20, 30]} paginator loading={loading} showGridlines style={{ minWidth: '12rem' }}>
              <Column style={{ minWidth: '15rem' }} field="name_field" header={`Name Field`} />
              <Column style={{ minWidth: '15rem' }} field="name_field" header={`Name Field`} />
              <Column style={{ minWidth: '15rem' }} field="name_field" header={`Name Field`} />
              <Column style={{ minWidth: '15rem' }} field="name_field" header={`Name Field`} />
              <Column style={{ minWidth: '15rem' }} field="name_field" header={`Name Field`} />
              <Column style={{ minWidth: '15rem' }} field="" header={``} body={actionsTemplate}/>
          </DataTable>
        </div>
      </div>
    </>
  );
}
