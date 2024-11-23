import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./style.css";

// ฟังก์ชันเพื่อดึงข้อมูลจาก API
const fetchBreeds = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();
  return data;
};

const fetchCatImages = async (breedId) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`
  );
  const data = await response.json();
  return data;
};

// SearchResultCount Component
function SearchResultCount({ count }) {
  return <p>{count} cats found</p>;
}

function ButtonExample() {
  return (
    <div>
      <Button text="Click Me" color="green" onClick={() => alert("Clicked!")} />
      <Button
        text="Delete"
        color="red"
        size="large"
        onClick={() => alert("Deleted!")}
      />
    </div>
  );
}

function App() {
  const [breeds, setBreeds] = useState([]); // ข้อมูลสายพันธุ์แมว
  const [selectedBreed, setSelectedBreed] = useState(""); // ค่าที่เลือกจาก dropdown
  const [catImages, setCatImages] = useState([]); // รูปแมว

  // ดึงข้อมูลพันธุ์แมวจาก API
  useEffect(() => {
    const fetchData = async () => {
      const breedsData = await fetchBreeds();
      setBreeds(breedsData);
    };
    fetchData();
  }, []);

  // การเลือกสายพันธุ์จาก dropdown
  const handleBreedSelect = async (event) => {
    const breedId = event.target.value;
    setSelectedBreed(breedId);
    const images = await fetchCatImages(breedId);
    setCatImages(images); // แสดงผลลัพธ์จากการค้นหา
  };

  return (
    <div className="App">
      <h1>Search Your Favorite Cat Breed</h1>
      <select onChange={handleBreedSelect} value={selectedBreed}>
        <option value="">-- Select a breed --</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>
            {breed.name}
          </option>
        ))}
      </select>

      <SearchResultCount count={catImages.length} />

      <div className="results">
        {catImages.length > 0 ? (
          catImages.map((cat) => (
            <div key={cat.id} className="cat-card">
              <img src={cat.url} alt="Cat" />
            </div>
          ))
        ) : (
          <p>No cats found for this breed.</p>
        )}

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <ButtonExample />
        </div>
      </div>
    </div>
  );
}

export default App;
