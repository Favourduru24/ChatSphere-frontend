// import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "../constant"
import { GlobeIcon, Instagram, Linkedin, X } from "lucide-react";
import {Link} from "react-router-dom"

const Footer = () => {

     const FOOTER_LINKS = [
    {
      title: 'Learn More',
      links: [
        'About Hilink',
        'Press Releases',
        'Environment',
        'Jobs',
        'Privacy Policy',
        'Contact Us',
      ],
    },
    {
      title: 'Our Community',
      links: ['Climbing xixixi', 'Hiking hilink', 'Hilink kinthill'],
    },
  ];
  
   const FOOTER_CONTACT_INFO = {
    title: 'Contact Us',
    links: [
      { label: 'Admin Officer', value: '123-456-7890' },
      { label: 'Email Officer', value: 'hilink@akinthil.com' },
    ],
  };
  
   const SOCIALS = {
    title: 'Social',
    links: [
      '/facebook.svg',
      '/instagram.svg',
      '/twitter.svg',
      '/youtube.svg',
      '/wordpress.svg',
    ],
  };

  return (
    <footer className="py-8 sm:pt-16  px-8 sm:px-16">
      <div className="flex w-full flex-col gap-14">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
         <Link className="mb-10" to="/">
         <img
         src="hilink-logo.svg"
         alt="logo"
         width={74}
         height={29}/>
         </Link>
         <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
             {FOOTER_LINKS.map((columns, index) =>(
              <FooterColumn title={columns.title} key={index}>
            <ul className="text-[14px] font-normal flex flex-col gap-4 text-[#7B7B7B]">
               {columns.links.map((link) => (
                <Link to="/" key={link}>
                  {link}
                </Link>
               ))}
            </ul>
              </FooterColumn>
             ))}

             <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              {FOOTER_CONTACT_INFO.links.map((link) =>  (
                <Link to="/"
                key={link.label}
                className="flex gap-4 md:flex-col lg:flex-row">
                <p className="whitespace-nowrap text-[#021639]">{link.label}:</p>
                <p className="text-[14px] font-semibold whitespace-nowrap text-[#021639]">{link.value}</p>
                </Link> 
              ))}
              </FooterColumn>
             </div>
             <div className="flex flex-col gap-5">
               <div className="flex gap-5 items-center">
                           <X className="text-black size-5"/>
                            <Linkedin className="text-black size-5"/>
                            <Instagram className="text-black size-5"/>
                            <GlobeIcon className="text-black size-5"/>
                       </div>
             </div>
         </div>
        </div>
        <div className="border border-[#A2A2A2]"/>
         <p className="text-[14px] font-normal w-full text-center text-[#7B7B7B]">2023 Hilink | All  right reserved</p>
         
      </div>
         
    </footer>
  )
}
         const FooterColumn = ({title, children}) => {
           return(
              <div className="flex flex-col gap-5">
                <h2 className="text-[18px] font-bold whitespace-nowrap">{title}</h2>
                {children}
                </div>
           )
         }
export default Footer