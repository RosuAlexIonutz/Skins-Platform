import '../App.css';
import React, { useState, useEffect } from 'react';

function Players() {
  const [returnedData, setReturnedData] = useState([]);
  const [showFormSubmit, setShowFormSubmit] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);

  const [Jucatori_ID, setJucatori_ID] = useState(null);
  const [ParticipantiTranzactie_ID, setParticipantiTranzactie_ID] = useState("");
  const [Nickname, setNickname] = useState("");
  const [NumarOreCS2, setNumarOreCS2] = useState("");
  const [Rank, setRank] = useState("");

 
  const toggleFormSubmit = () => {
    setShowFormSubmit(!showFormSubmit);
  };

  const toggleFormEdit = () => {
    setShowFormEdit(!showFormEdit);
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://localhost:5000/players');
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
  
      const newPlayer = {
        //Jucatori_ID: Jucatori_ID,
        ParticipantiTranzactie_ID: ParticipantiTranzactie_ID,
        Nickname: Nickname,
        NumarOreCS2: NumarOreCS2,
        Rank: Rank,
      };

    try {
      const response = await fetch("http://localhost:5000/insert/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
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

    const newPlayer = {
      Jucatori_ID: Jucatori_ID,
      ParticipantiTranzactie_ID: ParticipantiTranzactie_ID,
      Nickname: Nickname,
      NumarOreCS2: NumarOreCS2,
      Rank: Rank,
    };

    try {
        const response = await fetch(`http://localhost:5000/update/players/${Jucatori_ID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlayer)
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

const handleEditInfo = (playerash) => {
  setJucatori_ID(playerash.Jucatori_ID);
  setParticipantiTranzactie_ID(playerash.ParticipantiTranzactie_ID);
  setNickname(playerash.Nickname);
  setNumarOreCS2(playerash.NumarOreCS2);
  setRank(playerash.Rank);
  setShowFormEdit(true);
}

const handleDelete = async (Jucatori_ID) => {
  try {
      const response = await fetch(`http://localhost:5000/delete/players/${Jucatori_ID}`, {
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
          {/*<input
                type="number"
                placeholder="Jucatori_ID"
                value={Jucatori_ID}
                onChange={(e) => setJucatori_ID(e.target.value)}>
        </input>*/}
          <input
                type="number"
                placeholder="ParticipantiTranzactie_ID"
                value={ParticipantiTranzactie_ID}
                onChange={(e) => setParticipantiTranzactie_ID(e.target.value)}>
          </input>
          <input
                type="text"
                placeholder="Nickname"
                value={Nickname}
                onChange={(e) => setNickname(e.target.value)}>
          </input>
          <input
                type="number"
                placeholder="NumarOreCS2"
                value={NumarOreCS2}
                onChange={(e) => setNumarOreCS2(e.target.value)}>
          </input>
          <input
                type="text"
                placeholder="Rank"
                value={Rank}
                onChange={(e) => setRank(e.target.value)}>
          </input>
          <button type="submit">Submit</button>
        </form>
        )}
        </div>
        {showFormEdit && (
        <form onSubmit={handleEdit}>
            {/*<input
              type="number"
              placeholder="Jucatori_ID"
              value={Jucatori_ID}
              onChange={(e) => setJucatori_ID(e.target.value)}>
        </input>*/}
            <input
              type="number"
              placeholder="ParticipantiTranzactie_ID"
              value={ParticipantiTranzactie_ID}
              onChange={(e) => setParticipantiTranzactie_ID(e.target.value)}>
            </input>
            <input
              type="text"
              placeholder="Nickname"
              value={Nickname}
              onChange={(e) => setNickname(e.target.value)}>
            </input>
            <input
              type="number"
              placeholder="NumarOreCS2"
              value={NumarOreCS2}
              onChange={(e) => setNumarOreCS2(e.target.value)}>
            </input>
            <input
              type="text"
              placeholder="Rank"
              value={Rank}
              onChange={(e) => setRank(e.target.value)}>
            </input>
          <button type="submit">Salvează Modificările</button>
        </form>
        )}
      <div className="table-container" style={{'overflow-x': 'auto'}}>
        <table>
          <thead>
            <tr>
              <th>Nickname</th>
              <th>NumarOreCS2</th>
              <th>Rank</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returnedData.map((playerash, index) => (
              <tr key={index} onEdit={handleEditInfo}>
                  <td>{playerash.Nickname}</td>
                  <td>{playerash.NumarOreCS2}</td>
                  <td>{playerash.Rank}</td>
                  <td>
                    <button onClick={() => handleEditInfo(playerash)}>Edit</button>
                    <button onClick={() => handleDelete(playerash.Jucatori_ID)}>Delete</button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ); 
}

export default Players;