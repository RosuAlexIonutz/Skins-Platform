import '../App.css';
import React, { useState, useEffect } from 'react';

function Aplicatii() {
    const [top3PlayersWithSkins, setTop3PlayersWithSkins] = useState([]);
    const [allTranzactionsBuySell, setAllTranzactionsBuySell] = useState([]);
    const [sumEveryPlayerOnSkins, setSumEveryPlayerOnSkins] = useState([]);
    const [sumPlayersSpecificSkin, setPlayersSpecificSkin] = useState([]);
    const [managerDepartmentEmployee2001, setManagerDepartmentEmployee2001] = useState([]);
    const [codIdentificare, setCodIdentificare] = useState("");
    const [jucator, setJucator] = useState([]);
    const [mostActiveBot, setMostActiveBot] = useState([]);
    const [playersSpendMoreThanAVG, setPlayersSpendMoreThanAVG] = useState([]);
    const [tranzactionsPerSection, setTranzactionsPerSection] = useState([]);
    
    
    

    const fetchTop3PlayersWithSkins = () => {
    fetch('http://localhost:5000/top3-players-with-skins')
        .then(response => {
            console.log(response); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setTop3PlayersWithSkins(data);
        })
        .catch(error => {
            console.error('Eroare la preluarea jucatorilor:', error);
        });
    };

    const fetchTranzactionsPerSection = () => {
        fetch('http://localhost:5000/tranzactions-per-section')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTranzactionsPerSection(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea tranzactiilor per sectiune:', error);
            });
        };

    const fetchAllTranzactionsBuySell = () => {
        fetch('http://localhost:5000/all-tranzactions-buy-sell')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setAllTranzactionsBuySell(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea tranzactiilor:', error);
            });
    };

    const fetchSumEveryPlayerOnSkins = () => {
        fetch('http://localhost:5000/sum-every-player-on-skins')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSumEveryPlayerOnSkins(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea jucatorilor:', error);
            });
    };

    const fetchPlayersSpecificSkin = () => {
            fetch('http://localhost:5000/players-buy-specific-skin')
                .then(response => {
                    console.log(response); 
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setPlayersSpecificSkin(data);
                })
                .catch(error => {
                    console.error('Eroare la preluarea jucatorilor cu un skin specific:', error);
                });
    };

    const fetchManagerDepartmentEmployee2001 = () => {
        fetch('http://localhost:5000/manager-department-employee-2001')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setManagerDepartmentEmployee2001(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea managerilor:', error);
            });
    };

    const fetchMostActiveBot = () => {
        fetch('http://localhost:5000/most-active-bot')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMostActiveBot(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea botilor:', error);
            });
    };

    const fetchPlayersSpendMoreThanAVG = () => {
        fetch('http://localhost:5000/players-spend-more-than-avg')
            .then(response => {
                console.log(response); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPlayersSpendMoreThanAVG(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea jucatorilor:', error);
            });
    };

    const fetchPlayersFromSpecificBot = () => {
        fetch(`http://localhost:5000/players-buy-from-a-specific-bot/${codIdentificare}`)
            .then(response => response.json())
            .then(data => {
                setJucator(data);
            })
            .catch(error => {
                console.error('Eroare la preluarea jucatorilor:', error);
            });
    };

    


  return (
    <div>
        <div>
            <p>Afiseaza toate tranzacțiile, inclusiv numele cumpărătorului și vânzătorului::</p>
                <button onClick={() => fetchAllTranzactionsBuySell()}>Afișează toate tranzactiile</button>
                <table>
                    <thead>
                        <tr>
                            <th>Tranzactie_ID</th>
                            <th>NumeCumparator</th>
                            <th>NumeVanzator</th>
                            <th>DataTranzactiei</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTranzactionsBuySell.map((allTranzactionsBuySell, index) => (
                            <tr key={index}>
                                <td>{allTranzactionsBuySell.Tranzactie_ID}</td>
                                <td>{allTranzactionsBuySell.NumeCumparator}</td>
                                <td>{allTranzactionsBuySell.NumeVanzator}</td>
                                <td>{allTranzactionsBuySell.DataTranzactiei}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <p>Afiseaza numele jucatorilor si rankul lor care au cumparat skinuri de la un anumit bot</p>             
            <input type="text" value={codIdentificare} onChange={e => setCodIdentificare(e.target.value)} />
            <button onClick={() => fetchPlayersFromSpecificBot()}>Afișează detaliile despre jucatori</button>
            <table>
            <thead>
                <tr>
                    <th>Nickname</th>
                    <th>Rank</th>          
                </tr>
            </thead>
                <tbody>
                    {jucator.map((index, bot) => (
                        <tr key={index}>
                            <td>{bot.Nickname}</td>
                            <td>{bot.Rank}</td>
                        </tr>
                    ))}
                </tbody>
            </table>               
        </div>
        <div>
            <p>Afiseaza suma totală cheltuită de fiecare jucător pe skin-uri și numărul total de skin-uri achiziționate:</p>
                <button onClick={() => fetchSumEveryPlayerOnSkins()}>Afișează detaliile</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>NumarSkinuriCumparate</th>
                            <th>SumaTotalaCheltuita</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sumEveryPlayerOnSkins.map((sumEveryPlayerOnSkins, index) => (
                            <tr key={index}>
                                <td>{sumEveryPlayerOnSkins.Nickname}</td>
                                <td>{sumEveryPlayerOnSkins.NumarSkinuriCumparate}</td>
                                <td>{sumEveryPlayerOnSkins.SumaTotalaCheltuita}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <p>Afiseaza Identifica toti jucatorii care au cumparat skinuri de o anumita calitate:</p>
                <button onClick={() => fetchPlayersSpecificSkin()}>Afișează jucatorii</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>NumeItem</th>
                            <th>DenumireSkin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sumPlayersSpecificSkin.map((sumPlayersSpecificSkin, index) => (
                            <tr key={index}>
                                <td>{sumPlayersSpecificSkin.Nickname}</td>
                                <td>{sumPlayersSpecificSkin.NumeItem}</td>
                                <td>{sumPlayersSpecificSkin.DenumireSkin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <p>Afisati cate tranzactii au avut loc pe fiecare sectiune: </p>
                <button onClick={() => fetchTranzactionsPerSection()}>Afișează sectiunile</button>
                <table>
                    <thead>
                        <tr>
                            <th>DenumireSectiune</th>
                            <th>NumarTranzactii</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tranzactionsPerSection.map((tranzactionsPerSection, index) => (
                            <tr key={index}>
                                <td>{tranzactionsPerSection.DenumireSectiune}</td>
                                <td>{tranzactionsPerSection.NumarTranzactii}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <p>Afisati fiecare skin și numărul de tranzacții în care a fost implicat, alături de numele botului care a vândut cel mai des acel skin: </p>
                <button onClick={() => fetchMostActiveBot()}>Afișează botul</button>
                <table>
                    <thead>
                        <tr>
                            <th>BotulCelMaiActiv</th>
                            <th>NumarTranzactii</th>
                            <th>DenumireSkin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mostActiveBot.map((mostActiveBot, index) => (
                            <tr key={index}>
                                <td>{mostActiveBot.BotulCelMaiActiv}</td>
                                <td>{mostActiveBot.NumarTranzactii}</td>
                                <td>{mostActiveBot.DenumireSkin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <p>  Afisati numele jucatorilor care au cheltuit mai mult decat media sumei cheltuite in tranzactii: </p>
                <button onClick={() => fetchPlayersSpendMoreThanAVG()}>Afișează jucatorii care au cheltuit mult</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>SumaCheltuita</th>

                        </tr>
                    </thead>
                    <tbody>
                        {playersSpendMoreThanAVG.map((playersSpendMoreThanAVG, index) => (
                            <tr key={index}>
                                <td>{playersSpendMoreThanAVG.Nickname}</td>
                                <td>{playersSpendMoreThanAVG.SumaCheltuita}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                <div>
                <p>Afisati top 3 cei mai activi jucători în termeni de număr de ore jucate în CS2, alături de ultimul skin cumpărat și prețul acestuia:</p>
                <button onClick={() => fetchTop3PlayersWithSkins()}>Afișează top 3 jucatori</button>
                <table>
                    <thead>
                        <tr>
                            <th>Nickname</th>
                            <th>NumarOreCS2</th>
                            <th>UltimulSkinCumparat</th>
                            <th>PretUltimulSkin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top3PlayersWithSkins.map((top3PlayersWithSkins, index) => (
                            <tr key={index}>
                                <td>{top3PlayersWithSkins.Nickname}</td>
                                <td>{top3PlayersWithSkins.NumarOreCS2}</td>
                                <td>{top3PlayersWithSkins.UltimulSkinCumparat}</td>
                                <td>{top3PlayersWithSkins.PretUltimulSkin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
            <p>Afiseaza numele managerului fiecarui departament in care este o persoana nascuta incepand cu 2001. </p>
                <button onClick={() => fetchManagerDepartmentEmployee2001()}>Afișează managerul</button>
                <table>
                    <thead>
                        <tr>
                            <th>NumeDepartament</th>
                            <th>NumeManager</th>
                            <th>PrenumeManager</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managerDepartmentEmployee2001.map((managerDepartmentEmployee2001, index) => (
                            <tr key={index}>
                                <td>{managerDepartmentEmployee2001.NumeDepartament}</td>
                                <td>{managerDepartmentEmployee2001.NumeManager}</td>
                                <td>{managerDepartmentEmployee2001.PrenumeManager}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
  )
};

export default Aplicatii;