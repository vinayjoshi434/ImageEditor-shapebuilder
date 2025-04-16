import { useState } from "react";
import SearchBox from "./Components/SearchBox";
import ImageGrid from "./Components/Imagegrid";
import CanvasEdit from "./Components/Canvasedit";

import usePictures from "./utils/Apihandel";

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) return alert("Please enter a search term.");

    try {
      const results = await usePictures(query);
      console.log(results);
      setImages(results);
    } catch (error) {
      alert("Failed to fetch images. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Image Caption & Shape Editor
      </h1>
      <SearchBox onSearch={handleSearch} />

      {!selectedImage ? (
        <ImageGrid images={images} onSelect={setSelectedImage} />
      ) : (
        <CanvasEdit
          image={selectedImage}
          onBack={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default App;
