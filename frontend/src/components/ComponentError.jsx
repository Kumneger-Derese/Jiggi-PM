const ComponentError = ({ message }) => {
  return (
    <div
      className={
        'min-h-screen flex items-center justify-center font-bold text-2xl text-red-500'
      }
    >
      {message}
    </div>
  )
}
export default ComponentError
