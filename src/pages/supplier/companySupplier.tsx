
import React, { useState } from 'react';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroup from '../../components/Forms/SelectGroup/SelectGroup';
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import SwitcherThree from '../../components/Switchers/SwitcherThree';
import axiosInstance from '../../hooks/axiosConfig';
import { useAppSelector } from '../../hooks/dispatch';
// const Yup = require("yup");
import "yup-phone-lite";
// require("yup-phone-lite");

type FormData = {
    companyName?: string
    email?: string
    phoneNumber?: string
    documentNumber?: string
    documentType: string 
    address: string
    firstNameCharge?: string
    secondNameCharge?:string
    lastNameCharge?: string
    secondLastNameCharge?:string 
    emailCharge?: string
    phoneNumberCharge?: string
    documentNumberCharge?: string
    documentTypeCharge?: string 
    addressCharge?: string
    personInCharge: boolean,
}
type options = {
    value: string;
    label: string;
}[]


const schema = yup.object({
    companyName: yup.string().when('isCompany',{
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    personInCharge: yup.boolean().default(false),
    documentNumber: yup.string().required('This field is required'),
    phoneNumber: yup.string().phone('VE', 'phoneNumber must be a valid phone number for region Ve' ).required('This field is required'),
    email: yup.string().required('This field is required'),
    documentType: yup.string().required('This field is required'),
    address: yup.string().required('This field is required'),
    firstNameCharge: yup.string().when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    secondNameCharge:yup.string().when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    lastNameCharge: yup.string().when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    secondLastNameCharge:yup.string().when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    emailCharge: yup.string().when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    phoneNumberCharge: yup.string().phone('VE', 'phoneNumber must be a valid phone number for region Ve' ).when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    documentNumberCharge: yup.string().when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    documentTypeCharge: yup.string().when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    addressCharge: yup.string().when('personInCharge', {
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
}).required()

const CompanySupplier = () => {
    const axios = axiosInstance()
    const documentsTypes = useAppSelector((state) => state.documentTypes.data);
    const [personInCharge, setPersonInCharge] = useState(false);
    const [document_types, set_document_types] = useState<options>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })
    const onInvalid: SubmitErrorHandler<FormData> = (data) => {
        console.error('EEERRRRORRRRR', data)
    }
    
    const onSubmit:SubmitHandler<FormData> = async(data) => {
        console.log('Form submitted');
        console.log(data)
        let personInCharge = {};
        if (data.personInCharge){
            personInCharge = {
                first_name: data.firstNameCharge,
                second_name:data.secondNameCharge,
                last_name: data.lastNameCharge,
                second_last_name:data.secondLastNameCharge,
                document_number:data.documentNumberCharge,
                document_type: data.documentTypeCharge,
                address: data.addressCharge,
                phone_number: data.phoneNumberCharge,
                email: data.emailCharge
            };
        };
        
        let params = {
            company_name: data.companyName,
            document_number: data.documentNumber,
            document_type: data.documentType,
            address: data.address,
            phone_number: data.phoneNumber,
            email: data.email,
            person_in_charge: personInCharge
        }
        let response = await axios.post('supplier/companies/', params)
        if (response.status){
            console.log('Supplier created successfully')
            console.log(response.data)
        } else {
            console.log('Error creating supplier')
        }
        
    }

    React.useEffect(() => {
        let options = documentsTypes.map((data) => {
            return {
                value: data.document_type_code,
                label: data.document_type_description
            };
        });
        set_document_types(options);
    },[documentsTypes])
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <div className="p-6.5 grid grid-cols-1">
                    <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Nompbre de la Empresa
                            </label>
                            <input
                                {...register('companyName')}
                                type="text"
                                placeholder="Ingrese nombre de la empresa"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.companyName?.message}</p>
                        </div>
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Numero de Identidad
                            </label>
                            <input
                                {...register('documentNumber')}
                                type="text"
                                placeholder="Enter your second last name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.documentNumber?.message}</p>
                        </div>
                        <div className="w-full">
                            <SelectGroup id="documentType" register={register} errors={errors} label='Tipo de documento' options={document_types} />
                        </div>
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Numero de telefono 
                            </label>
                            <input
                                {...register('phoneNumber')}
                                type="text"
                                placeholder="Enter your second last name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.phoneNumber?.message}</p>
                        </div>
                        <div className="w-full md:col-span-2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Email <span className="text-meta-1">*</span>
                            </label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.email?.message}</p>
                        </div>
                        <div className="w-full md:col-span-2">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Direccion <span className="text-meta-1">*</span>
                            </label>
                            <input
                                {...register('address', { required: true })}
                                type="text"
                                placeholder="Enter your direccion"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.address?.message}</p>
                        </div>
                    </div>
                    <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Persona Encargada
                            <SwitcherThree id={'personInCharge'} val={personInCharge} setVal={setPersonInCharge}/>
                        </label>
                    </div>
                    { personInCharge &&
                        <>
                        <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <div className="w-full">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Primer Nombre
                                </label>
                                <input
                                    {...register('firstNameCharge')}
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <p className='text-red-500 text-sm'>{errors.firstNameCharge?.message}</p>
                            </div>
                    
                            <div className="w-full">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Segundo Nombre
                                </label>
                                <input
                                    {...register('secondNameCharge')}
                                    type="text"
                                    placeholder="Enter your second name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <p className='text-red-500 text-sm'>{errors.secondNameCharge?.message}</p>
                            </div>

                            <div className="w-full">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Primer Apellido
                                </label>
                                <input
                                    {...register('lastNameCharge')}
                                    type="text"
                                    placeholder="Enter your last name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <p className='text-red-500 text-sm'>{errors.lastNameCharge?.message}</p>
                            </div>
                            <div className="w-full">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Segundo Apellido
                                </label>
                                <input
                                    {...register('secondLastNameCharge')}
                                    type="text"
                                    placeholder="Enter your second last name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <p className='text-red-500 text-sm'>{errors.secondLastNameCharge?.message}</p>
                            </div>
                            <div className="w-full">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Numero de Identidad
                                </label>
                                <input
                                    {...register('documentNumberCharge')}
                                    type="text"
                                    placeholder="Enter your second last name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <p className='text-red-500 text-sm'>{errors.documentNumberCharge?.message}</p>
                            </div>
                            <div className="w-full">
                                <SelectGroup id='documentTypeCharge' register={register} errors={errors} label='Tipo de documento' options={document_types} />
                            </div>
                            <div className="w-full">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Numero de telefono 
                                </label>
                                <input
                                    {...register('phoneNumberCharge')}
                                    type="text"
                                    placeholder="Enter your second last name"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <p className='text-red-500 text-sm'>{errors.phoneNumberCharge?.message}</p>
                            </div>
                            <div className="w-full md:col-span-2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Email <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    {...register('emailCharge', { required: true })}
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <p className='text-red-500 text-sm'>{errors.emailCharge?.message}</p>
                            </div>
                            <div className="w-full md:col-span-2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Direccion <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    {...register('addressCharge', { required: true })}
                                    type="text"
                                    placeholder="Enter your direccion"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                                <p className='text-red-500 text-sm'>{errors.addressCharge?.message}</p>
                            </div>
                        </div>
                        </>
                    }
                    <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                        <button type='submit' className="flex w-full md:col-start-2 lg:col-start-3 xl:col-start-4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        Crear Proveedor
                        </button>
                    </div>
                </div>
            </form>
        </>
    )



}
export default CompanySupplier;



