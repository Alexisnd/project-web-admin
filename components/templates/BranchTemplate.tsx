'use client';
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState } from "react";

export default function BranchTemplate() {

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <div className="w-full h-full">
        <div className="bg-white p-4 border-round-lg shadow-2">
          <div className="w-full h-full pb-3 flex flex-row align-items-center justify-content-between">
            <h5>Sucursales</h5>
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
          </DataTable>
        </div>
      </div>
    </>
  );
}
