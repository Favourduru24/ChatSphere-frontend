import {X, Linkedin, Instagram, GlobeIcon} from "lucide-react"

const Header = () => {
     
    const navLink = [
        {label: 'Home', href: '#home', },
        {label: 'Project', href: '#project', },
        {label: 'Services', href: '#service', },
        {label: 'Contact', href: '#contact', },
    ]
  return (
    <div className="py-4 sm:py-8 px-8 sm:px-16 flex items-center justify-between">
        <ul className="hidden sm:flex gap-5 items-center">
           {navLink.map((nav, index) => (
             <li className="font-semibold text-2xl font-san-serif" key={index}>
                {nav.label}
            </li> 
           ))}  
         </ul>

         <div className="flex gap-5 items-center">
             <X className="text-black size-10"/>
              <Linkedin className="text-black size-10"/>
              <Instagram className="text-black size-10"/>
              <GlobeIcon className="text-black size-10"/>
         </div>
    </div>
  )
}

export default Header