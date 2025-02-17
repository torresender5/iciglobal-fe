import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import React, { useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import PersonSupplier from "./PersonSupplier";
import CompanySupplier from "./companySupplier";
 
DataTable.use(DT);

const CreateSupplierView = () => {
    const [activeTab, setActiveTab] = useState(1);

    return (
        <>
        <Breadcrumb pageName="Listado de Proveedores" />
        <h1> Listado de Proveedores</h1>
        <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
                <a 
                    className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab == 1 ? 'text-primary  border-primary' : 'border-transparent'}`}
                    href="#"
                    onClick={() => setActiveTab(1)}
                >
                    Persons
                </a>
                <a 
                    className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab == 2 ? 'text-primary  border-primary' : 'border-transparent'} `}
                    href="#"
                    onClick={() => setActiveTab(2)}
                >
                    Companies
                </a>
            </div>
            <div>
            { activeTab === 1 &&
                <div 
                    className="leading-relaxed"
                >
                    <PersonSupplier/>
    
                </div>
            }
            { activeTab === 2 &&
                <div 
                    className="leading-relaxed"
                >
                    <CompanySupplier/>
                </div>
            }
            </div>
        </div>
        </>
    )

}

export default CreateSupplierView;





