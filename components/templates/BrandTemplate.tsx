"use client";

import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Image } from "primereact/image";
import { MenuItem } from "primereact/menuitem";
import { SplitButton } from "primereact/splitbutton";
import { Brand } from "@/types/brand";
import { getBrands } from "@/services/brand/brandService";

export default function BrandTemplate() {
  const [selectedItem, setSelectedItem] = useState<any>();
  const [action, setAction] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<any>();

  const optionsActions = (item: Brand): MenuItem[] => {
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

  const actionsTemplate = (item: Brand) => {        
    return (
        <SplitButton 
            buttonClassName={`focus:shadow-none`} 
            menuButtonClassName={`focus:shadow-none`} 
            text 
            size='small' 
            label='Acciones'
            model={optionsActions(item)}
            onClick={() => {console.log("click");
            }}
        />
    );
  };

  const getbrands = () => {
    setLoading(true);
    getBrands()
      .then((response) => {
        setLoading(false);
        if (response.data.length > 0) {
          setBrands(response.data);
          return;
        }
      })
      .catch((error) => {
        console.log("error => ", error);
        setLoading(false);
      });
  };

  const imageBodyTemplate = (brand: Brand) => {
    return <Image src={`${brand.logo}`} alt={brand.name} width="100%" className="flex overflow-hidden w-4rem h-4rem shadow-2 border-round" imageStyle={{objectFit: "contain", objectPosition:"center"}}/>;
  };

  useEffect(() => {
    getbrands();
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="bg-white p-4 border-round-lg shadow-2">
          <div className="w-full h-full pb-3 flex flex-row align-items-center justify-content-between">
            <h5>Example Template</h5>
            <div className="flex gap-3">
              <Button label="Nuevo" icon="pi pi-plus" onClick={getbrands} />
            </div>
          </div>

          {/* Table Data */}
          <DataTable value={brands} rows={10} rowsPerPageOptions={[10, 20, 30]} paginator loading={loading} showGridlines style={{ minWidth: '12rem' }}>
              <Column style={{ width: '6rem' }} field="logo" header={`Logo`} body={imageBodyTemplate}/>
              <Column style={{ minWidth: '15rem' }} field="name" header={`Nombre`} />
              <Column style={{width:"140px"}} body={actionsTemplate}/>
          </DataTable>
        </div>
      </div>
    </>
  );
}
