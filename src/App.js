import './App.css'
import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'

function App() {
 const [openModal, setOpenModal] = useState(false)
 const [openFilterByTitle, setOpenFilterByTitle] = useState(false)
 const filterByTitleRef = useRef()
 const [openFilterByDescription, setOpenFilterByDescription] = useState(false)
 const filterByDescriptionRef = useRef()
 const [openFilterByDate, setOpenFilterByDate] = useState(false)
 const filterByDateRef = useRef()
 const [tasks, setTasks] = useState([])
 const [filteredTasks, setFilteredTasks] = useState([])
 const {
  register,
  handleSubmit,
  formState: { errors },
  setValue,
 } = useForm()
 const onSubmit = (data) => {
  setOpenModal(false)
  setValue('title', '')
  setValue('description', '')
  setValue('date', '2022-11-07')
  setValue('priority', 'high')
  setValue('status', 'Not started')
  setTasks((prevTasks) => [...prevTasks, data])
  localStorage.setItem('tasks', JSON.stringify([...tasks, data]))
 }

 useEffect(() => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
   setTasks(JSON.parse(savedTasks))
   setFilteredTasks(JSON.parse(savedTasks))
  }
 }, [])

 useEffect(() => {
  setOpenFilterByTitle(false)
  setOpenFilterByDescription(false)
  setOpenFilterByDate(false)
 }, [filteredTasks])

 const handleGlobalFilter = (e) => {
  e.target.value
   ? setFilteredTasks(
      tasks.filter(
       (task) =>
        task.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        task.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
        task.date.toLowerCase().includes(e.target.value.toLowerCase()) ||
        task.priority.toLowerCase().includes(e.target.value.toLowerCase()) ||
        task.status.toLowerCase().includes(e.target.value.toLowerCase())
      )
     )
   : setFilteredTasks(tasks)
 }

 const handleFilterByTitle = () => {
  const value = filterByTitleRef.current.value
  value
   ? setFilteredTasks(
      tasks.filter((task) =>
       task.title.toLowerCase().includes(value.toLowerCase())
      )
     )
   : setFilteredTasks(tasks)
 }
 const handleFilterByDescription = () => {
  const value = filterByDescriptionRef.current.value
  value
   ? setFilteredTasks(
      tasks.filter((task) =>
       task.description.toLowerCase().includes(value.toLowerCase())
      )
     )
   : setFilteredTasks(tasks)
 }
 const handleFilterByDate = () => {
  const value = filterByDateRef.current.value
  value
   ? setFilteredTasks(
      tasks.filter((task) =>
       task.date.toLowerCase().includes(value.toLowerCase())
      )
     )
   : setFilteredTasks(tasks)
 }

 return (
  <div className="App relative min-h-screen bg-gray-200">
   <div
    className={`h-screen w-screen bg-gray-300 absolute top-0 flex justify-center items-center ${
     openModal ? '' : 'hidden'
    }`}
   >
    <form
     className="flex flex-col max-w-md space-y-2"
     onSubmit={handleSubmit(onSubmit)}
    >
     <input
      className="border"
      defaultValue=""
      {...register('title', { required: true })}
     />
     <input
      className="border"
      {...register('description', { required: true })}
     />
     <input
      type="date"
      id="start"
      name="trip-start"
      min="2022-11-07"
      max="2022-12-31"
      {...register('date', { required: true })}
     />
     <select defaultValue="high" {...register('priority')}>
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
     </select>
     <select defaultValue="Not started" {...register('status')}>
      <option value="Not started">Not started</option>
      <option value="In progress">In progress</option>
      <option value="Testing">Testing</option>
      <option value="Done">Done</option>
     </select>
     {/* errors will return when field validation fails  */}
     {errors.exampleRequired && <span>This field is required</span>}

     <input type="submit" />
    </form>
   </div>
   <div className="flex flex-col max-w-6xl mx-auto space-y-5 p-1">
    <div className="space-x-2">
     <span>{`Hello {name} you have ${
      tasks.filter((task) => task.status === 'Done').length
     } task completed by today and ${
      tasks.filter((task) => task.status !== 'Done').length
     } pending tasks.`}</span>
     <button
      type="button"
      className="bg-red-100 rounded-full p-2"
      onClick={() => setOpenModal(true)}
     >
      Add task
     </button>
    </div>
    <div className="ml-auto space-x-2">
     <input
      className="p-2 w-[300px]"
      type="text"
      placeholder="Search"
      onChange={handleGlobalFilter}
     />
     <button onClick={() => setFilteredTasks(tasks)}>Reset Filters</button>
    </div>
    <table>
     <thead className="bg-white">
      <tr className="border border-gray-400">
       <th
        className="relative"
        onClick={() => {
         setOpenFilterByTitle(true)
         setOpenFilterByDescription(false)
         setOpenFilterByDate(false)
        }}
       >
        {openFilterByTitle ? (
         <div className="absolute left-1 top-5 bg-blue-50 border border-blue-100 shadow-sm">
          <input
           ref={filterByTitleRef}
           type="text"
           placeholder="Search by title"
           className="p-1"
          />
          <button onClick={handleFilterByTitle}>Filter</button>
         </div>
        ) : null}
        Title
       </th>
       <th
        className="relative"
        onClick={() => {
         setOpenFilterByTitle(false)
         setOpenFilterByDescription(true)
         setOpenFilterByDate(false)
        }}
       >
        {openFilterByDescription ? (
         <div className="absolute left-1 top-5 bg-blue-50 border border-blue-100 shadow-sm">
          <input
           ref={filterByDescriptionRef}
           type="text"
           placeholder="Search by description"
           className="p-1"
          />
          <button onClick={handleFilterByDescription}>Filter</button>
         </div>
        ) : null}
        Description
       </th>
       <th
        className="relative"
        onClick={() => {
         setOpenFilterByTitle(false)
         setOpenFilterByDescription(false)
         setOpenFilterByDate(true)
        }}
       >
        {openFilterByDate ? (
         <div className="absolute left-1 top-5 bg-blue-50 border border-blue-100 shadow-sm">
          <input
           ref={filterByDateRef}
           type="text"
           placeholder="Search by date"
           className="p-1"
          />
          <button onClick={handleFilterByDate}>Filter</button>
         </div>
        ) : null}
        Date
       </th>
       <th>Priority</th>
       <th>Status</th>
      </tr>
     </thead>
     <tbody>
      {filteredTasks?.map((task, i) => (
       <tr
        key={task.title + task.description + task.date}
        className={`${
         i % 2 === 0 ? 'bg-gray-200' : 'bg-white'
        } border border-gray-400`}
       >
        <td className="border border-gray-400 px-3 py-1">{task.title}</td>
        <td className="border border-gray-400 px-3 py-1">{task.description}</td>
        <td className="border border-gray-400 px-3 py-1">{task.date}</td>
        <td className="border border-gray-400 px-3 py-1">
         <p
          className={`${
           (task.priority === 'high' &&
            'bg-red-50 text-red-600 border border-red-600') ||
           (task.priority === 'medium' &&
            'bg-yellow-50 text-yellow-600 border border-yellow-600') ||
           (task.priority === 'low' &&
            'bg-green-50 text-green-600 border border-green-600')
          } rounded-full px-3`}
         >
          {task.priority}
         </p>
        </td>
        <td className="border border-gray-400 px-3 py-1">
         <p
          className={`${
           (task.status === 'Not started' &&
            'bg-blue-50 text-blue-600 border border-blue-600') ||
           (task.status === 'In progress' &&
            'bg-yellow-50 text-yellow-600 border border-yellow-600') ||
           (task.status === 'Testing' &&
            'bg-gray-50 text-gray-600 border border-gray-600') ||
           (task.status === 'Done' &&
            'bg-green-50 text-green-600 border border-green-600')
          } rounded-full px-3`}
         >
          {task.status}
         </p>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 )
}

export default App
