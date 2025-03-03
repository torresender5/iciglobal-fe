import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import PersonSupplier from "./PersonSupplier";
import CompanySupplier from "./companySupplier";
import axiosInstance from '../../hooks/axiosConfig';
 
DataTable.use(DT);
type CompaniesData = {
    companyName?: string
    email?: string
    phoneNumber?: string
    documentNumber?: string
    address: string
    PersonInCharge?: string
}

type PersonsData = {
    second_last_name?: string
    second_name?: string
    address?: string
    code?: string
    document_number?: string
    document_type?: string
    email?: string
    first_name?: string
    last_name?: string
    phone_number?: string
    active?: string
}

const CreateSupplierView = () => {
    const params = useParams()
    const axios = axiosInstance();
    const [activeTab, setActiveTab] = useState(1);
    const [type, setType] = useState<string>();
    const [rows, setRows] = useState<PersonsData>();
    const [rowsCompanies, setRowsCompanies] = useState<CompaniesData>();

console.log('####### type #######', type)
    React.useEffect(() => {
        // console.log('###### params 3####', params)
        setType(params.type)
        if (params.type === 'person') {
            setActiveTab(1)
        }
        if (params.type === 'company'){
            setActiveTab(2)
        }
        const dispatch = async() => {
            const isPerson = params?.type;
            setType(isPerson)
            if (isPerson ==='person'){
                let response = await axios.get(`supplier/persons/${params.id}`)
                if(response.status === 200){
                    // console.log('PERSON DATA', response.data)
                    setRows(response.data)
                } else {
                    console.log(response.data)
                }
            }
            if (isPerson === 'company'){
                let comapnies = await axios.get(`supplier/companies/${params.id}`)
                if(comapnies.status === 200){
                    setRowsCompanies(comapnies.data)
                } else {
                    console.log(comapnies.data)
                }
            }

        }
        dispatch();
    },[params])

    return (
        <>
        <Breadcrumb pageName="Listado de Proveedores" />
        <h1> Listado de Proveedores</h1>
        <div className="rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
                { (type === 'person' || type == undefined) &&
                    <a 
                        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab == 1 ? 'text-primary  border-primary' : 'border-transparent'}`}
                        href="#"
                        onClick={() => setActiveTab(1)}
                    >
                        Persons
                    </a>
                }
                { (type === 'company' || type === undefined ) &&
                    <a 
                        className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${activeTab == 2 ? 'text-primary  border-primary' : 'border-transparent'} `}
                        href="#"
                        onClick={() => setActiveTab(2)}
                    >
                        Companies
                    </a>
                }
            </div>
            <div>
            { activeTab === 1 &&
                <div 
                    className="leading-relaxed"
                >
                    <PersonSupplier personToEdit={rows} edit={rows === undefined? false: true}/>
    
                </div>
            }
            { activeTab === 2 &&
                <div 
                    className="leading-relaxed"
                >
                    <CompanySupplier companyToEdit={rowsCompanies}edit={rows === rowsCompanies? false: true} />
                </div>
            }
            </div>
        </div>
        </>
    )

}

export default CreateSupplierView;





