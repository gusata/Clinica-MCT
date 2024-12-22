export default function Header() {

  return(

    // HEADER 
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 z-20">
    <div className="w-32"></div> {/* Espaço vazio para balancear a navegação */}  
    <div className="flex items-center space-x-3">
    <div className="h-8 w-8 bg-[#313131] rounded-full flex items-center justify-center">
        <img src="logo.png" alt="" />
      </div>
      <span className="text-lg font-bold font-yanone">Clinica MCT</span>
    </div>
    <nav className="space-x-9">
      <a href="#about" className="text-main ">Sobre</a>
      <a href="#contact" className="text-main ">Contato</a>
    </nav>
  </header>

  );

}