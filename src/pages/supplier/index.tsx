import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import React, { useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import axiosInstance from '../../hooks/axiosConfig';
import Loader from "../../components/loader";
 
DataTable.use(DT);


const Supplier = () => {
    const axios = axiosInstance();
    const [activeTab, setActiveTab] = useState(1);
    const [rows, setRows] = useState([]);
    const columns = [
        { title: 'Estatus', data: 'active' },
        { title: 'Direccion', data: 'address'},
        { title: 'Codigo', data: 'code' },
        { title: 'numero de documento ', data: 'document_number'},
        { title: 'tipo de documento', data: 'document_type' },
        { title: 'correo electronico', data: 'email' },
        { title: 'nombre', data: 'first_name' },
        { title: 'Segundo nombre', data: 'last_name' },
        { title: 'telefono', data: 'phone_number' },
        { title: 'apellido', data: 'second_name' },
        { title: 'segundo apellido ', data: 'second_last_name' },
    ];

    React.useEffect(() => {
        const dispatch = async() => {
            let response = await axios.get('supplier/suppliers/')
            if(response.status === 200){
                console.log(response.data)
                setRows(response.data)
            } else {
                console.log(response.data)
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
                    Tab2 ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus ligula nec dolor placerat, a consequat elit volutpat. Quisque nibh lacus, posuere et turpis in, pretium facilisis nisl. Proin congue sem vel sollicitudin sagittis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                </div>
            }
            </div>
        </div>
        </>
    )

}

export default Supplier;





