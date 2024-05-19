import '../App.css';
import React, { useState, useEffect } from 'react';

function Skins() {
  const [returnedData, setReturnedData] = useState([]);
  const [showFormSubmit, setShowFormSubmit] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);

  const [Skinuri_ID, setSkinuri_ID] = useState(null);
  const [NumeItem, setNumeItem] = useState("");
  const [DenumireSkin, setDenumireSkin] = useState("");
  const [Float, setFloat] = useState("");
  const [Pattern, setPattern] = useState("");
  const [Calitate, setCalitate] = useState("");
  const [Raritate, setRaritate] = useState("");
  const [Pret, setPret] = useState("");

 
  const toggleFormSubmit = () => {
    setShowFormSubmit(!showFormSubmit);
  };

  const toggleFormEdit = () => {
    setShowFormEdit(!showFormEdit);
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://localhost:5000/skins');
        const data = await response.json();
        setReturnedData(data);
        console.log(data, "results");
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    getData();
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
      const newSkin = {
        //Skinuri_ID: Skinuri_ID,
        NumeItem: NumeItem,
        DenumireSkin: DenumireSkin,
        Float: Float,
        Pattern: Pattern,
        Calitate: Calitate,
        Raritate: Raritate,
        Pret: Pret,
      };

    try {
      const response = await fetch("http://localhost:5000/insert/skins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSkin),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }
      window.location.reload()
    }
    catch (error) {
      console.error("Error:", error);
    }
    setShowFormSubmit(false);
  }

  const handleEdit = async (event) => {
    event.preventDefault();

    const newSkin = {
      Skinuri_ID: Skinuri_ID,
      NumeItem: NumeItem,
      DenumireSkin: DenumireSkin,
      Float: Float,
      Pattern: Pattern,
      Calitate: Calitate,
      Raritate: Raritate,
      Pret: Pret,
    };

    try {
        const response = await fetch(`http://localhost:5000/update/skins/${Skinuri_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSkin)
        });
        if (!response.ok) {
          throw new Error("Server responded with an error!");
        }
        window.location.reload()
    } catch (error) {
        console.error('Eroare la editarea înregistrării:', error);
    }
    setShowFormEdit(true);
};

const handleEditInfo = (skinulet) => {
  setSkinuri_ID(skinulet.Skinuri_ID);
  setNumeItem(skinulet.NumeItem);
  setDenumireSkin(skinulet.DenumireSkin);
  setFloat(skinulet.Float);
  setPattern(skinulet.Pattern);
  setCalitate(skinulet.Calitate);
  setRaritate(skinulet.Raritate);
  setPret(skinulet.Pret);
  setShowFormEdit(true);
}

const handleDelete = async (Skinuri_ID) => {
  try {
      const response = await fetch(`http://localhost:5000/delete/skins/${Skinuri_ID}`, {
          method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error("Server responded with an error!");
      }
      window.location.reload()
  } catch (error) {
      console.error('Eroare la ștergerea înregistrării:', error);
  }
};

  return (
    <div className="SkinsPage">
      <button onClick={toggleFormSubmit}>Insert</button>{" "}
      <div className="form-add">
        {showFormSubmit && (
        <form onSubmit = {handleSubmit}>
          {/*}
          <input
                type="number"
                placeholder="Skinuri_ID"
                value={Skinuri_ID}
                onChange={(e) => setSkinuri_ID(e.target.value)}>
        </input>*/}
          <input
                type="text"
                placeholder="NumeItem"
                value={NumeItem}
                onChange={(e) => setNumeItem(e.target.value)}>
          </input>
          <input
                type="text"
                placeholder="DenumireSkin"
                value={DenumireSkin}
                onChange={(e) => setDenumireSkin(e.target.value)}>
          </input>
          <input
                type="number"
                placeholder="Float"
                value={Float}
                onChange={(e) => setFloat(e.target.value)}>
          </input>
          <input
                type="number"
                placeholder="Pattern"
                value={Pattern}
                onChange={(e) => setPattern(e.target.value)}>
          </input>
          <input
                type="text"
                placeholder="Calitate"
                value={Calitate}
                onChange={(e) => setCalitate(e.target.value)}>
          </input>
          <input
                type="text"
                placeholder="Raritate"
                value={Raritate}
                onChange={(e) => setRaritate(e.target.value)}>
          </input>
          <input
                type="number"
                placeholder="Pret"
                value={Pret}
                onChange={(e) => setPret(e.target.value)}>
          </input>
          <button type="submit">Submit</button>
        </form>
        )}
        </div>
        {showFormEdit && (
        <form onSubmit={handleEdit}>
            {/*}
            <input
              type="number"
              placeholder="Skinuri_ID"
              value={Skinuri_ID}
              onChange={(e) => setSkinuri_ID(e.target.value)}>
        </input>*/}
            <input
              type="text"
              placeholder="Nume Item"
              value={NumeItem}
              onChange={(e) => setNumeItem(e.target.value)}>
            </input>
            <input
              type="text"
              placeholder="Denumire Skin"
              value={DenumireSkin}
              onChange={(e) => setDenumireSkin(e.target.value)}>
            </input>
            <input
              type="number"
              placeholder="Float"
              value={Float}
              onChange={(e) => setFloat(e.target.value)}>
            </input>
            <input
              type="number"
              placeholder="Pattern"
              value={Pattern}
              onChange={(e) => setPattern(e.target.value)}>
            </input>
            <input
              type="text"
              placeholder="Calitate"
              value={Calitate}
              onChange={(e) => setCalitate(e.target.value)}>
            </input>
            <input
              type="text"
              placeholder="Raritate"
              value={Raritate}
              onChange={(e) => setRaritate(e.target.value)}>
            </input>
            <input
              type="number"
              placeholder="Pret"
              value={Pret}
              onChange={(e) => setPret(e.target.value)}>
            </input>
          <button type="submit">Salvează Modificările</button>
        </form>
        )}
      <div className="table-container" style={{'overflow-x': 'auto'}}>
        <table>
          <thead>
            <tr>
              <th>NumeItem</th>
              <th>DenumireSkin</th>
              <th>Float</th>
              <th>Pattern</th>
              <th>Calitate</th>
              <th>Raritate</th>
              <th>Pret</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returnedData.map((skinulet, index) => (
              <tr key={index} onEdit={handleEditInfo}>
                  <td>{skinulet.NumeItem}</td>
                  <td>{skinulet.DenumireSkin}</td>
                  <td>{skinulet.Float}</td>
                  <td>{skinulet.Pattern}</td>
                  <td>{skinulet.Calitate}</td>
                  <td>{skinulet.Raritate}</td>
                  <td>{skinulet.Pret}</td>
                  <td>
                    <button onClick={() => handleEditInfo(skinulet)}>Edit</button>
                    <button onClick={() => handleDelete(skinulet.Skinuri_ID)}>Delete</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ); 
}

export default Skins;