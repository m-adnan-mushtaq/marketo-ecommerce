
import {Link as RouterLink} from "react-router-dom"

const Link = ({path,addons,children}) => {
  return (
   <RouterLink to={path || '#'} className={`text-decoration-none ${addons}`}>
    {children}
   </RouterLink>
  )
}

export default Link