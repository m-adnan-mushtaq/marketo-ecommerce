
const AuthWrapper = ({children}) => {
  return (
    <div className="d-flex justify-content-center align-items-center my-5  "  >
        <div className="shadow-lg  rounded px-3 my-5 py-4 responsive-width ">
            {children}
        </div>
    </div>
  )
}

export default AuthWrapper