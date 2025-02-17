import SelectGroup from '../../components/Forms/SelectGroup/SelectGroup';
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axiosInstance from '../../hooks/axiosConfig';
import { useAppSelector } from '../../hooks/dispatch';
import React, { useState } from 'react';

type FormData = {
    firstName: string
    secondName?: string
    lastName: string
    secondLastName?:string 
    email?: string
    phoneNumber?: string
    documentNumber?: string
    documentType: string 
    address: string
}
type options = {
    value: string;
    label: string;
}[]

const schema = yup.object({
    firstName: yup.string().when('isCompany',{
        is: false,
        then: (schema) => schema.required('This field is required'),
    }).default(''),
    secondName: yup.string(),
    lastName: yup.string().when('isCompany',{
        is: false,
        then: (schema) => schema.required('This field is required'),
    }).default(''),
    secondLastName: yup.string(),
    documentNumber: yup.string().required('This field is required'),
    phoneNumber: yup.string().required('This field is required'),
    email: yup.string().required('This field is required'),
    documentType: yup.string().required('This field is required'),
    address: yup.string().required('This field is required'),
}).required()

const PersonSupplier = () => {
    const axios = axiosInstance()
    const documentsTypes = useAppSelector((state) => state.documentTypes.data);
    const [document_types, set_document_types] = useState<options>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema)
    })
    const onInvalid: SubmitErrorHandler<FormData> = (data) => {
        console.error(data)
    }
    
    const onSubmit:SubmitHandler<FormData> = async(data) => {
        let params = {
            first_name: data.firstName,
            second_name:data.secondName,
            last_name: data.lastName,
            second_last_name:data.secondLastName,
            document_number:data.documentNumber,
            document_type: data.documentType,
            address: data.address,
            phone_number: data.phoneNumber,
            email: data.email
        }
        let response = await axios.post('supplier/persons/', params)
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
                                Primer Nombre
                            </label>
                            <input
                                {...register('firstName')}
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.firstName?.message}</p>
                        </div>
            
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Segundo Nombre
                            </label>
                            <input
                                {...register('secondName')}
                                type="text"
                                placeholder="Enter your second name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.secondName?.message}</p>
                        </div>

                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Primer Apellido
                            </label>
                            <input
                                {...register('lastName')}
                                type="text"
                                placeholder="Enter your last name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.lastName?.message}</p>
                        </div>
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Segundo Apellido
                            </label>
                            <input
                                {...register('secondLastName')}
                                type="text"
                                placeholder="Enter your second last name"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                            <p className='text-red-500 text-sm'>{errors.secondLastName?.message}</p>
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
export default PersonSupplier;



