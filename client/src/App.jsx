
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useFormik } from 'formik';
import * as Yup from 'yup';

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState([])
  const [price, setPrice] = useState([])
  const [image, setImage] = useState([])
  const [search, setSearch] = useState('')

  const handleClickA = () => {
    const sortedDataA = [...data].sort((a, b) => (a.price - b.price));
    setData(sortedDataA)
  }
  const handleClickB = () => {
    const sortedDataB = [...data].sort((a, b) => (b.price - a.price));
    setData(sortedDataB)
  }

  function handleSearch(e) {
    setSearch(e.value)

  }

  // async function addFunc() {
   


  // }

  async function axiosdata() {
    const res = await axios.get("http://localhost:3000/practic")
    setData(res.data)
  }

  async function deleteData(_id) {
    await axios.delete(`http://localhost:3000/practic/${_id}`)
    axiosdata()
  }

  useEffect(() => {
    axiosdata()
  }, [])



  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .required('Required')
        .matches(/^[A-Z, a-z]+$/, 'Only Text Write'),
      price: Yup.string()
        .max(5, 'Must be 5 characters or less, insaf is not DEFINED , very expencive')
        .required('Required'),
      image: Yup.string().required('Required')
      .matches(/^[A-Z, a-z]+$/, 'Only Text Write'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:3000/practic", values);
        alert('Data successfully submitted!');
        const result = await axios.get("http://localhost:3000/practic");
        setData(result.data);
        resetForm();
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    },
  });


  return (
    <>
      {data && data.filter(x => x.name.toLowerCase().includes(search.toLocaleLowerCase()))
        .map((item) => (
          <div style={{ display: "flex" }}>
            <p>Name:{item.name}</p>
            <p>Price:{item.price}$</p>
            <p>Image:{item.image}</p>
            <button onClick={() => deleteData(item._id)}>x</button>
          </div>
        ))}


<form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: "300px" }}>
      <label htmlFor="name">name</label>
      <input type="text" id="name" onChange={formik.handleChange} value={formik.values.name} />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <label htmlFor="image">image</label>
      <input type="text" id="image" onChange={formik.handleChange} value={formik.values.image} />
      {formik.touched.image && formik.errors.image ? (
        <div>{formik.errors.image}</div>
      ) : null}

      <label htmlFor="price">price</label>
      <input type="number" id="price" onChange={formik.handleChange} value={formik.values.price} />
      {formik.touched.price && formik.errors.price ? (
        <div>{formik.errors.price}</div>
      ) : null}

      <button type="submit">Add</button>
    </form>
      
      <button onClick={(e) => handleClickA(e)}>azdan coxa</button>
      <button onClick={(e) => handleClickB(e)}>coxdan aza</button>
      <input type="text" onChange={(e) => handleSearch(e.target)} />


      {/* <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="price">price</label>
        <input id="price" type="number" {...formik.getFieldProps('price')} />
        {formik.touched.price && formik.errors.price ? (
          <div>{formik.errors.price}</div>
        ) : null}

        <label htmlFor="image">image</label>
        <input id="image" type="text" {...formik.getFieldProps('image')} />
        {formik.touched.image && formik.errors.image ? (
          <div>{formik.errors.image}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form> */}
    </>

  )
}

export default App
