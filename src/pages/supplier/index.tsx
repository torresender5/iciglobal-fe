import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import React, { useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import axiosInstance from '../../hooks/axiosConfig';
import Loader from "../../components/loader";
import DropdownDefault from "../../components/Dropdowns/DropdownDefault";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import ReactDOMServer from 'react-dom/server';
 
DataTable.use(DT);
type CompaniesData = {
    companyName?: string
    email?: string
    phoneNumber?: string
    documentNumber?: string
    address: string
    PersonInCharge?: string
}[]

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
}[]

type Props = {
    type: string
    id: number 
}

const MyComponent = ({type, id}: Props ) => {
    const path = `/suppliers/update/${type}/${id}`;
    return (
        <>
        <div>
            <a
                href={path}
            >
                <PencilSquareIcon className="size-6 text-blue-500"/>
            </a>
        </div>
        </>
    );
};

const Supplier = () => {
    const axios = axiosInstance();
    const [activeTab, setActiveTab] = useState(1);
    const [rows, setRows] = useState<PersonsData>([]);
    const [rowsCompanies, setRowsCompanies] = useState<CompaniesData>([]);
    const columns = [
        { title: 'segundo apellido ', data: 'second_last_name' },
        { title: 'apellido', data: 'second_name' },
        { title: 'Direccion', data: 'address' },
        { title: 'Codigo', data: 'code' },
        { title: 'numero de documento ', data: 'document_number' },
        { title: 'tipo de documento', data: 'document_type' },
        { title: 'correo electronico', data: 'email' },
        { title: 'nombre', data: 'first_name' },
        { title: 'Segundo nombre', data: 'last_name' },
        { title: 'telefono', data: 'phone_number' },
        { title: 'Estatus', data: 'active' },
        { title: 'Actions', data: 'actions' },
    ];
    const columnsCompanies = [
        { title: 'nombre', data: 'company_name' },
        { title: 'Direccion', data: 'address'},
        { title: 'Codigo', data: 'code' },
        { title: 'numero de documento ', data: 'document_number'},
        { title: 'correo electronico', data: 'email' },
        { title: 'telefono', data: 'phone_number' },
        { title: 'Persona encargada', data: 'personInCharge'},
        { title: 'Actions', data: 'actions' },
    ];

    
    
    const renderComponentToString = (type: string, id: number) => {
        const componentString = ReactDOMServer.renderToString(<MyComponent type={type} id={id}/>);
        console.log('################', componentString); // Aquí obtienes el string del componente
        return componentString;
    };

    const parsePersonsData = (data: [any]) => {
        console.log(data)
        return data .map(({
            id,
            second_last_name,
            second_name,
            address,
            code,
            document_number,
            document_type,
            email,
            first_name,
            last_name,
            phone_number,
            active,
        }) => ({
            second_last_name,
            second_name,
            address,
            code,
            document_number,
            document_type,
            email,
            first_name,
            last_name,
            phone_number,
            active,
            actions: () => {
                // Pending for fix
                return renderComponentToString('person', id) 
            },
        })) 
    }

    const parseCompaniesData = (data: [any]) => {
        return data.map(({
            id,
            company_name,
            address,
            code,
            document_number,
            email,
            active,
            phone_number,
            person_in_charge
        })=>({
            company_name,
            address,
            code,
            document_number,
            email,
            active,
            phone_number,
            personInCharge: () => {
                if(person_in_charge){
                    let first_name = person_in_charge?.first_name ? person_in_charge?.first_name : '';
                    let last_name = person_in_charge?.last_name ? person_in_charge?.last_name : '';
                    return first_name + ' ' + last_name
                }
                return ''
            },
            actions: () => {
                // Pending for fix
                return renderComponentToString('company', id) 
            },
        }));
    }

    React.useEffect(() => {
        const dispatch = async() => {
            let response = await axios.get('supplier/persons/')
            if(response.status === 200){
                let data = parsePersonsData(response.data)
                setRows(data)
            } else {
                console.log(response.data)
            }
            let comapnies = await axios.get('supplier/companies/')
            if(comapnies.status === 200){
                let data = parseCompaniesData(comapnies.data)
                setRowsCompanies(data)
            } else {
                console.log(comapnies.data)
            }

        }
        dispatch();
    },[])

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
                    <DataTable 
                        data={rows}
                        columns={columns}
                        options={{
                            responsive: true,
                            select: true,
                        }}
                        className="display w-full table-auto">
                            <thead></thead>
                    </DataTable>
                </div>
            }
            { activeTab === 2 &&
                <div 
                    className="leading-relaxed"
                >
                    <DataTable 
                        data={rowsCompanies}
                        columns={columnsCompanies}
                        options={{
                            responsive: true,
                            select: true,
                        }}
                        className="display w-full table-auto">
                            <thead></thead>
                    </DataTable>
                </div>
            }
            </div>
        </div>
        </>
    )

}

export default Supplier;





