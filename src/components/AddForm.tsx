import { useFormik} from 'formik';
import { useEffect, useState } from 'react'
import { IPosition } from '../types';
import { authAPI, usersAPI } from '../api';
import { Success } from './Success';
import { SignupSchema } from '../utils/validate';

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  photo: null as any,
  position_id: '1'
}


export const AddForm = () => {
  const [userAdded, setUserAdded] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [token, setToken] = useState('')
  const [positions, setPositions] = useState<IPosition[]>([])

  const getPositions = async () => {
    let data = await usersAPI.getPositions();
    setPositions(data)
  }
  const getToken = async () => {
    let accessToken = await authAPI.getToken();
    setToken(accessToken)
    }

  useEffect(() => {
    getPositions();
    getToken()
  }, [])

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    ...formik
  } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: SignupSchema,
    // validate,
    onSubmit: async () => {
      setLoading(true)
      try {
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('position_id', values.position_id);
        formData.append('photo', values.photo);

        if(token) {
          const res = await authAPI.addUser(formData, token)
          setUserAdded(res.data.success)
        }

      } catch (e: any) {
        formik.setErrors(e);
        setError(e.message);
      } finally {
        setLoading(false)
      }
    },
    // validateOnChange: false,
  });


  if(userAdded) {
    return (
      <div className='sect'>
        <Success />
      </div>
    )
  }

  return (
    <div className='sect'>

      <h1 className='sectionTitle mb-6'>
        Working with POST request
      </h1>


      <form 
        onSubmit={handleSubmit}
        className=' max-w-sm mx-auto'
      >

        <div className='formControl'>
          <input
            id='name'
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder='Your name'
            className='w-full border border-gray-300 py-4 bg-transparent rounded-md px-5 placeholder:text-[#7E7E7E]'
          />
           {errors.name ?  <div className='helperText text-sm text-red-500'>{errors.name}</div> : null}

        </div>
        <div className='formControl'>
          <input
            id='email'
            type="text"
            name='email'
            value={values.email}
            onChange={handleChange}
            placeholder='Email'
            className='w-full border border-gray-300 py-4 bg-transparent rounded-md px-5 placeholder:text-[#7E7E7E]'
          />
             {errors.email ?  <div className='helperText text-sm text-red-500'>{errors.email}</div> : null}
        </div>
        <div className='formControl'>
          <input
            id='phone'
            type="text"
            name='phone'
            value={values.phone}
            onChange={handleChange}
            placeholder='Phone'
            className='w-full border border-gray-300 py-4 bg-transparent rounded-md px-5 placeholder:text-[#7E7E7E]'
          />
           {errors.phone ? 
            <div className='helperText text-sm text-red-500'>{errors.phone} +38 (XXX) XXX - XX - XX</div> 
            : <div className='helperText pl-4 text-gray-400 text-[14px]'>+38 (XXX) XXX - XX - XX</div>}
        </div>

        <div className="formControl">
          <div className="select__position mb-2">Select your position</div>
            { positions && positions.map(p => (
                <div className="space-x-2 mb-2" key={p.id}>
                    <input 
                        onChange={handleChange} 
                        type="radio"
                        name="position_id" 
                        id={String(p.id)} 
                        value={p.id} 
                        checked={p.id == values.position_id}
                    />
                    <label htmlFor={String(p.id)}>
                        {p.name}
                    </label>
                </div>
            )) }
        </div>


        <div className='formControl'>
        
          <div className="custom-file flex">
            <label 
              className="cursor-pointer upload__title block rounded-l-md border border-gray-400 p-4" 
              htmlFor="photo"
            >Upload</label>

            <input 
              onChange={(event: any) => {
                setFieldValue("photo", event.target.files[0]);
              }}
              name="photo"
              type="file" 
              className="custom-file-input hidden" 
              id="photo"  
            />
            <label 
              className="text-[#7E7E7E] cursor-pointer block w-full custom-file-label 
              rounded-r-md border border-gray-300 border-l-0 p-4" 
              htmlFor="photo"
            >
              { values.photo ? values.photo.name : 'Upload your photo' }
            </label>
          </div>
          {/* {errors.photo ?  <div className='helperText text-sm text-red-500'>{errors.photo}</div> : null} */}
        </div>
        
        <div className='text-center'>
          <button disabled={loading} className='button bg-[#F4E041]' type="submit">Submit</button>
        </div>

      </form>
      
    </div>
  )
}

