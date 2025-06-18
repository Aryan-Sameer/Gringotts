
const Footer = () => {
    return (
        <footer className='flex flex-col justify-center items-center bg-slate-600 py-2 mt-auto'>
            <p className='flex items-center text-sm text-slate-200'>Made with
                <lord-icon
                    src="https://cdn.lordicon.com/ewmfucya.json"
                    trigger="hover"
                    colors="primary:#121331,secondary:#f28ba8,tertiary:#000000,quaternary:#000000,quinary:#f24c00,senary:#ebe6ef"
                    style={{"width" : "24px", "margin": "0px 5px"}}>
                </lord-icon>
                <span>by <a target="_blank" className="hover:underline" href="https://github.com/Aryan-Sameer">Aryan Sameer</a></span>
            </p>
        </footer>
    )
}

export default Footer
