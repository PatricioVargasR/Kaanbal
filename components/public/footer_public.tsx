export default function FooterPublic() {
    return(
        <footer className="bg-[#0f4c81] text-white p-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/placeholder.svg?height=40&width=40" alt="Kaanbal logo" className="h-10 w-10 mb-2" />
            <p>Nuestra misión es proporcionar una educación gratuita de primera clase en cualquier lugar.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Acerca de nosotros</a>
            <a href="#" className="hover:underline">Contacto</a>
            <a href="#" className="hover:underline">UTec</a>
            <a href="#" className="hover:underline">Code challenge</a>
          </div>
        </div>
      </footer>
    )
}