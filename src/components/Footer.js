const Footer = () => {
  const redes = [
    { nombre: "Instagram", url: "https://www.instagram.com/thedriverera", img: "/instagram.png" },
    { nombre: "Facebook", url: "https://www.facebook.com/thedriverera", img: "/facebook.png" },
    { nombre: "X", url: "https://x.com/thedriverera", img: "/x.png" }
  ];

  return (
    <footer className="bg-gradient-to-r from-black to-transparent py-16">
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold mb-6">The Driver Era</h2>

        {/*redes sociales */}
        <div className="flex justify-center flex-wrap gap-8 mb-8">
          {redes.map((red) => ( //recorre el objeto y hace todo clickeable + estilos
            <a
              key={red.nombre}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center w-24 transform transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <img
                src={red.img}
                alt={red.nombre}
                className="w-12 h-12 mb-2 object-contain"
              />
              <span className="text-white text-sm font-medium">{red.nombre}</span>
            </a>
          ))}
        </div>

        <p className="text-lg mt-4">© Copyright 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
