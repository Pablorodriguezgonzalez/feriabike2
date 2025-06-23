export default function Card({ title, image, price, onDetalleClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onDetalleClick}
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-green-600 font-bold mb-4">{price}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetalleClick();
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ver Mas
        </button>
      </div>
    </div>
  );
}