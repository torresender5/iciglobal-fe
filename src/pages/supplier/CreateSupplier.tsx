import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroup from '../../components/Forms/SelectGroup/SelectGroup';
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import SwitcherThree from '../../components/Switchers/SwitcherThree';
import axiosInstance from '../../hooks/axiosConfig';


const OPTIONS = [
    { value: 'identity_card', label: 'Cedula de Identidad' },
    { value: 'passport', label: 'Pasaporte' },
    { value: 'rif', label: 'RIF' }
]

type FormData = {
    isCompany: boolean
    personInCharge: boolean
    firstName: string
    secondName?: string
    lastName: string
    secondLastName?:string 
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
}

const schema = yup.object({
    isCompany: yup.boolean().default(false),
    personInCharge: yup.boolean().default(false),
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
    companyName: yup.string().when('isCompany',{
        is: true,
        then: (schema) => schema.required('This field is required'),
    }),
    documentNumber: yup.string().required('This field is required'),
    phoneNumber: yup.string().required('This field is required'),
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
    phoneNumberCharge: yup.string().when('personInCharge', {
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

const CreateSupplier = () => {
    const axios = axiosInstance()

    const [enabled, setEnabled] = useState(false);
    const [personInCharge, setPersonInCharge] = useState(false);
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
        console.log('Form submitted');
        console.log(data)
        let params = {}
        if (!data.isCompany){
            params = {
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

        }
        let response = await axios.post('supplier/suppliers/', params)
        if (response.status){
            console.log('Supplier created successfully')
            console.log(response.data)
        } else {
            console.log('Error creating supplier')
        }
        
    }
    return (
        <>
            <Breadcrumb pageName="Nuevo Proveedor" />
    
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                <div className="flex flex-col gap-9">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Formulario de contacto
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                            <div className="p-6.5 grid grid-cols-1">
                                <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Es una Empresa
                                        <SwitcherThree id={'isCompany'} val={enabled} setVal={setEnabled}/>
                                    </label>
                                </div>
                                <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    { !enabled &&
                                        <>
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
                                        </>
                                    }
                                    { enabled &&
                                        <>
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
                                        </>
                                    }
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
                                        <SelectGroup id="documentType" register={register} errors={errors} label='Tipo de documento' options={OPTIONS} />
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
                                { enabled &&
                                    <>
                                    <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Persona Encargada
                                            <SwitcherThree id={'personInCharge'} val={personInCharge} setVal={setPersonInCharge}/>
                                        </label>
                                    </div>
                                    </>
                                }
                                { personInCharge && enabled &&
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
                                            <SelectGroup id='documentType' register={register} errors={errors} label='Tipo de documento' options={OPTIONS} />
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
                    </div>
                </div>
            </div>
        </>
    );
};
    

export default CreateSupplier;