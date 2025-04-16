import React from "react";

const ImageGrid = ({ images, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {images.map((img) => (
        <div key={img.id} className="bg-white p-2 rounded shadow">
          <img
            src={img.src.original}
            alt={img.alt_description}
            className="cursor-pointer rounded shadow"
          />

          <button
            onClick={() => onSelect(img.src.original)}
            className="mt-2 bg-green-600 text-white w-full py-1 rounded"
          >
            Add Captions
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
