import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function AddTask({onClose, open}) {

  const [nama, setNama] = useState('')
  const [umur, setUmur] = useState('')
  const [ukur, setUkur] = useState('')
  const [kondisi, setKondisi] = useState('')
  const [rekom, setRekom] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'pasien'), {
        created: Timestamp.now().toDate().toString(),
        nama: nama,
        umur: umur ,
        ukur: ukur,
        kondisi: kondisi,
        rekom: rekom,
        completed: false,        
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }
  /* function to add new task to firestore */

  return (
    <Modal modalLable='Add Patient' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='nama' 
          onChange={(e) => setNama(e.target.value.toUpperCase())} 
          value={nama}
          placeholder='Nama'/>
        <input 
          type='text'
          name="umur"
          onChange={(e) => setUmur(e.target.value)}
          placeholder='Umur'
          value={
            umur
            }></input>
        <input
          type='text' 
          name='Hasil Ukur' 
          onChange={(e) => setUkur(e.target.value)} 
          value={ukur}
          placeholder='Hasil Ukur'
          ></input>
        <input
         type='text'
         name="Kondisi"
         onChange= {(e) => setKondisi(e.target.value)}
         value={kondisi}
         placeholder="kondisi" 
        ></input>
        <input
         type='text'
         name="Kondisi"
         onChange= {(e) => setRekom(e.target.value)}
         value={rekom}
         placeholder="rekomendasi" 
        ></input>
        <button type='submit'>Submit</button>
      </form> 
    </Modal>
  )
}

export default AddTask
