
 interface Props {
    placeholder: string,
    value: string,
    setChange: (value: string) => void
 }

const Search = ({placeholder, value, setChange}: Props) => {

     
  return (
   <form className="py-1 border-b">
                        
                         <input
                  className="w-full outline-none"
                  placeholder={placeholder}
                  value={value}
                  onChange={e => setChange(e.target.value)}
                />
                      </form>
  )
}

export default Search