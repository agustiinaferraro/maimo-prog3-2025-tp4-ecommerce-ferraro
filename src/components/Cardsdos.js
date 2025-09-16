import Image from "next/image";

const Cardsuno = () => {
  return (
    <div
      style={{
        marginTop: "120px",
        marginBottom: "120px",
        backgroundImage: "url('/background2.png')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 0", // para que las img no queden pegadas
      }}
    >
      <h2 className="px-10 text-4xl font-bold mb-10 text-center text-white">
        Recitales
      </h2>

      {/* contenedor imgs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "40px",
        }}
      >
        {/* primera img mas arriba */}
        <img
          src="/flyer3.jpg"
          alt="Imagen 3"
          style={{
            width: "350px",
            height: "500px",
            marginBottom: "50px",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
            e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
          }}
        />
        <img
          src="/flyer4.jpg"
          alt="Imagen 4"
          style={{
            width: "350px",
            height: "500px",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
            e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
          }}
        />
      </div>
    </div>
  );
};

export default Cardsuno;