const config = require('./dbConfig'),
    sql = require ('mssql');


const getSkins = async() => {
    try {
        let pool = await sql.connect(config);
        let skins = pool.request().query("SELECT * FROM Skinuri")
        console.log(skins);
        return skins;
    }
    catch(error) {
        console.log(error);
    }
}

const createSkins = async(Skinuri) => {
    try {
        let pool = await sql.connect(config);
        let skins = pool.request().query(`INSERT INTO Skinuri VALUES 
        ('${Skinuri.NumeItem}', '${Skinuri.DenumireSkin}', ${Skinuri.Float}, ${Skinuri.Pattern}, '${Skinuri.Calitate}','${Skinuri.Raritate}', ${Skinuri.Pret})
        `)
        return skins;
    }
    catch(error) {
        console.log(error);
    }
}

// Funcția de Editare (Update)
const updateSkin = async (Skinuri_ID, Skinuri) => {
    try {
        let pool = await sql.connect(config);
        let updateQuery = `UPDATE Skinuri SET 
                           NumeItem = '${Skinuri.NumeItem}', 
                           DenumireSkin = '${Skinuri.DenumireSkin}', 
                           Float = '${Skinuri.Float}', 
                           Pattern = '${Skinuri.Pattern}', 
                           Calitate = '${Skinuri.Calitate}',
                           Raritate = '${Skinuri.Raritate}', 
                           Pret = '${Skinuri.Pret}'
                           WHERE Skinuri_ID = ${Skinuri_ID}`;
        await pool.request().query(updateQuery);
    } catch (error) {
        console.log(error);
    }
}

const deleteSkin = async (Skinuri_ID) => {
    try {
        let pool = await sql.connect(config);
        let deleteQuery = `DELETE FROM Skinuri WHERE Skinuri_ID = '${Skinuri_ID}'`;
        await pool.request().query(deleteQuery);
    } catch (error) {
        console.log(error);
    }
}

const getPlayers = async() => {
    try {
        let pool = await sql.connect(config);
        let players = pool.request().query("SELECT * FROM Jucatori")
        console.log(players);
        return players;
    }
    catch(error) {
        console.log(error);
    }
    
}

const createPlayers = async(Jucatori) => {
    try {
        let pool = await sql.connect(config);
        let players = pool.request().query(`INSERT INTO Jucatori VALUES 
        (${Jucatori.ParticipantiTranzactie_ID}, '${Jucatori.Nickname}', ${Jucatori.NumarOreCS2}, '${Jucatori.Rank}')
        `)
        return players;
    }
    catch(error) {
        console.log(error);
    }
}

const updatePlayers = async (Jucatori_ID, Jucatori) => {
    try {
        let pool = await sql.connect(config);
        let updateQuery = `UPDATE Jucatori SET 
                           ParticipantiTranzactie_ID = '${Jucatori.ParticipantiTranzactie_ID}', 
                           Nickname = '${Jucatori.Nickname}', 
                           NumarOreCS2 = '${Jucatori.NumarOreCS2}', 
                           Rank = '${Jucatori.Rank}'
                           WHERE Jucatori_ID = ${Jucatori_ID}`;
        await pool.request().query(updateQuery);
    } catch (error) {
        console.log(error);
    }
}

const deletePlayers = async (Jucatori_ID) => {
    try {
        let pool = await sql.connect(config);
        let deleteQuery = `DELETE FROM Jucatori WHERE Jucatori_ID = '${Jucatori_ID}'`;
        await pool.request().query(deleteQuery);
    } catch (error) {
        console.log(error);
    }
}

const getBots = async() => {
    try {
        let pool = await sql.connect(config);
        let bots = pool.request().query("SELECT * FROM Boti")
        console.log(bots);
        return bots;
    }
    catch(error) {
        console.log(error);
    }
}

const getTranzaction = async() => {
    try {
        let pool = await sql.connect(config);
        let tranzaction = pool.request().query("SELECT * FROM Tranzactie")
        console.log(tranzaction);
        return tranzaction;
    }
    catch(error) {
        console.log(error);
    }
}

const getTop3PlayersWithSkins = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 
        
            `SELECT TOP 3 
            J.Nickname,
            J.NumarOreCS2,
            S.DenumireSkin AS UltimulSkinCumparat,
            S.Pret AS PretUltimulSkin
          FROM 
            Jucatori AS J
          JOIN 
            (SELECT 
               T.Cumparator_ID, 
               MAX(T.DataTranzactiei) AS DataUltimaTranzactie
             FROM 
               Tranzactie AS T
             GROUP BY 
               T.Cumparator_ID
            ) AS UltimaTranzactie ON J.Jucatori_ID = UltimaTranzactie.Cumparator_ID
          JOIN 
            Tranzactie AS T ON J.Jucatori_ID = T.Cumparator_ID AND T.DataTranzactiei = UltimaTranzactie.DataUltimaTranzactie
          JOIN 
            SkinuriTranzactie AS ST ON T.Tranzactie_ID = ST.Tranzactie_ID
          JOIN 
            Skinuri AS S ON ST.Skinuri_ID = S.Skinuri_ID
          WHERE 
            J.NumarOreCS2 > 0
          ORDER BY 
            J.NumarOreCS2 DESC;
          
        
        `;
        let results = await pool.request().query(query);
        return results.recordset; 
    } catch (error) {
        console.error('Eroare la interogarea pentru top 3 jucatori:', error);
    }
  };

  const getManagerDepartmentEmployee2001 = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 
        
        `SELECT 
        D.Nume AS NumeDepartament,
        M.Nume AS NumeManager,
        M.Prenume AS PrenumeManager
      FROM 
        Departamente D
      JOIN 
        Angajati M ON D.Manager_ID = M.Angajati_ID
      WHERE 
        D.Departament_ID IN (
          SELECT DISTINCT 
            A.Departament_ID
          FROM 
            Angajati A
          WHERE 
            YEAR(A.DataNasterii) >= 2001
        );
      
        `;
        let results = await pool.request().query(query);
        return results.recordset; 
    } catch (error) {
        console.error('Eroare la interogarea pentru managerii departamentelor:', error);
    }
  };

  const getPlayerSpendMoreMoneyThanAVG = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 
        
        `SELECT 
        J.Nickname,
        SUM(S.Pret) AS SumaCheltuita
      FROM 
        Jucatori J
      JOIN 
        Tranzactie T ON J.Jucatori_ID = T.Cumparator_ID
      JOIN 
        SkinuriTranzactie ST ON T.Tranzactie_ID = ST.Tranzactie_ID
      JOIN 
        Skinuri S ON ST.Skinuri_ID = S.Skinuri_ID
      GROUP BY 
        J.Nickname
      HAVING 
        SUM(S.Pret) > (SELECT AVG(SumTotala) FROM (SELECT SUM(S.Pret) AS SumTotala FROM Tranzactie T
                       JOIN SkinuriTranzactie ST ON T.Tranzactie_ID = ST.Tranzactie_ID
                       JOIN Skinuri S ON ST.Skinuri_ID = S.Skinuri_ID
                       GROUP BY T.Cumparator_ID) AS Sub);
        `;
        let results = await pool.request().query(query);
        return results.recordset; 
    } catch (error) {
        console.error('Eroare la interogarea pentru jucatorii care au cheltuit mai mult decat media:', error);
    }
  };

  const getAllTranzactionsBuySell = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 
        
            `SELECT 
            T.Tranzactie_ID,
            JC.Nickname AS NumeCumparator,
            JV.CodIdentificare AS NumeVanzator,
            T.DataTranzactiei
          FROM 
            Tranzactie T
          JOIN 
            Jucatori JC ON T.Cumparator_ID = JC.Jucatori_ID
          JOIN 
            Boti JV ON T.Vanzator_ID = JV.Boti_ID;          
        
        `;
        let results = await pool.request().query(query);
        return results.recordset; 
    } catch (error) {
        console.error('Eroare la interogarea pentru tranzactii:', error);
    }
  };

  const getSumEveryPlayerOnSkins = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 
        
            `SELECT 
            J.Nickname,
            COUNT(ST.Skinuri_ID) AS NumarSkinuriCumparate,
            SUM(S.Pret) AS SumaTotalaCheltuita
          FROM 
            Jucatori AS J 
          JOIN 
            Tranzactie AS T ON J.Jucatori_ID = T.Cumparator_ID 
          JOIN 
            SkinuriTranzactie AS ST ON T.Tranzactie_ID = ST.Tranzactie_ID
          JOIN 
            Skinuri AS S ON ST.Skinuri_ID = S.Skinuri_ID
          GROUP BY 
            J.Nickname;                   
        
        `;
        let results = await pool.request().query(query);
        return results.recordset; 
    } catch (error) {
        console.error('Eroare la interogarea pentru suma cheltuita:', error);
    }
  };

  const getTranzactionsPerSection = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 
        
            `SELECT 
            Sec.DenumireSectiune,
            COUNT(T.Tranzactie_ID) AS NumarTranzactii
          FROM 
            Sectiuni Sec
          JOIN 
            Tranzactie T ON Sec.Sectiuni_ID = T.Sectiuni_ID
          GROUP BY 
            Sec.DenumireSectiune
          ORDER BY 
            NumarTranzactii DESC;                  
        
        `;
        let results = await pool.request().query(query);
        return results.recordset; 
    } catch (error) {
        console.error('Eroare la interogarea pentru tranzactiile per sectiune:', error);
    }
  };

  const getPlayersSpecificSkin = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 
        
        `SELECT J.Nickname, S.NumeItem, S.DenumireSkin
        FROM Jucatori AS J 
        JOIN Tranzactie AS T ON J.Jucatori_ID = T.Cumparator_ID 
        JOIN SkinuriTranzactie AS ST ON T.Tranzactie_ID = ST.Tranzactie_ID 
        JOIN Skinuri AS S ON ST.Skinuri_ID = S.Skinuri_ID 
        WHERE S.Calitate = 'Factory New' AND S.Calitate IS NOT NULL;
        `;
        let results = await pool.request().query(query);
        return results.recordset; 
    } catch (error) {
        console.error('Eroare la interogarea pentru jucatori:', error);
    }
  };

  const getMostActiveBot = async () => {
    try {
        let pool = await sql.connect(config);
        let query = 
        
        `SELECT 
        B.CodIdentificare AS BotulCelMaiActiv,
        COUNT(ST.Skinuri_ID) AS NumarTranzactii,
        S.DenumireSkin
        
      FROM 
        Skinuri AS S
      JOIN 
        SkinuriTranzactie AS ST ON S.Skinuri_ID = ST.Skinuri_ID
      JOIN 
        Tranzactie AS T ON ST.Tranzactie_ID = T.Tranzactie_ID
      JOIN 
        Boti AS B ON T.Vanzator_ID = B.Boti_ID
      GROUP BY 
        S.DenumireSkin, B.CodIdentificare
      ORDER BY 
        NumarTranzactii DESC, B.CodIdentificare;      
        `;

        let results = await pool.request().query(query);
        return results.recordset; 
    } catch (error) {
        console.error('Eroare la interogarea pentru boti:', error);
    }
  };


  const getPlayersFromSpecificBot = async (codIdentificare) => {
    try {
      let pool = await sql.connect(config);
      let query = `
      SELECT DISTINCT J.Nickname, J.Rank
      FROM Jucatori AS J 
      JOIN Tranzactie AS T ON J.Jucatori_ID = T.Cumparator_ID 
      JOIN Boti AS B ON T.Vanzator_ID = B.Boti_ID 
      WHERE B.CodIdentificare LIKE @codIdentificare;      
      `;
      let results = await pool.request()
                        .input('codIdentificare', sql.NVarChar, codIdentificare)
                        .query(query);
      return results.recordset;
    } catch (error) {
      console.error('Error in getPlayersFromSpecificBot:', error);
    }
  };


module.exports = {
    getSkins,
    createSkins,
    updateSkin,
    deleteSkin,
    getPlayers,
    createPlayers,
    updatePlayers,
    deletePlayers,
    getBots,
    getTranzaction,
    getTop3PlayersWithSkins,
    getAllTranzactionsBuySell,
    getSumEveryPlayerOnSkins,
    getPlayersSpecificSkin,
    getManagerDepartmentEmployee2001,
    getPlayersFromSpecificBot,
    getMostActiveBot,
    getPlayerSpendMoreMoneyThanAVG,
    getTranzactionsPerSection
}