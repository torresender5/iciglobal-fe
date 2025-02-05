import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroup from '../../components/Forms/SelectGroup/SelectGroup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const OPTIONS = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' }
]

type FormData = {
  firstName: string
  secondName:string
  lastName: string
  secondLastName:string 
  email: string
  phoneNumber: string
  documentNumber: string
  documentType: string 
  
}

const schema = yup
  .object({
    firstName: yup.string().required('This field is required'),
    secondName: yup.string().required('This field is required'),
    lastName: yup.string().required('This field is required'),
    secondLastName: yup.string().required('This field is required'),
    documentNumber: yup.string().required('This field is required'),
    phoneNumber: yup.string().required('This field is required'),
    email: yup.string().required('This field is required'),
    documentType: yup.string().required('This field is required')
  })
  .required()

const CreateCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit((data) => {
    console.log('Form submitted');
    console.log(data)
  })
  return (
    <>
      <Breadcrumb pageName="Create Customer" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3>
            </div>
            <form onSubmit={onSubmit}>
              <div className="p-6.5 grid grid-cols-1">
                <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      First name
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
                      Second Name
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
                      Last name
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
                      Second Last name
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
                      Document nuber
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
                    <SelectGroup register={register} errors={errors} label='Tipo de documento' options={OPTIONS} />
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
                </div>
                <div className="mb-4.5 gap-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                  <button type='submit' className="flex w-full md:col-start-2 lg:col-start-3 xl:col-start-4 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    Crear Cliente
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

export default CreateCustomer;
