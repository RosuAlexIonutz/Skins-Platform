const express = require('express'),
    Skinuri = require('./dbFiles/skinuri'),
    Playeri = require('./dbFiles/playeri'),
    Boti = require('./dbFiles/boti'),
    Tranzactie = require('./dbFiles/tranzactie'),
    dbOperation = require('./dbFiles/dbOperation'),
    cors = require('cors');


const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/skins', async function (req, res) {
    try {
        const skins = await dbOperation.getSkins();
        console.log('Called and retrieved skins:', skins);
        res.send(skins.recordset);
    } catch (error) {
        console.error('Error retrieving skins:', error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/insert/skins', async function (req, res) {
    await dbOperation.createSkins(req.body);
    const result = await dbOperation.getSkins(req.body);
    res.send(result.recordset);
});

app.put('/update/skins/:Skinuri_ID', async (req, res) => {
    try {
        const Skinuri_ID = req.params.Skinuri_ID;
        const updatedSkinData = req.body;
        await dbOperation.updateSkin(Skinuri_ID, updatedSkinData);
        res.status(200).send({ message: 'Înregistrarea a fost actualizată cu succes.' });
    } catch (error) {
        console.error('Eroare la actualizarea înregistrării:', error);
        res.status(500).send({ error: 'Eroare internă de server' });
    }
});

app.delete('/delete/skins/:Skinuri_ID', async (req, res) => {
    try {
        const Skinuri_ID = req.params.Skinuri_ID;
        await dbOperation.deleteSkin(Skinuri_ID);
        res.status(200).send({ message: 'Înregistrarea a fost ștearsă cu succes.' });
    } catch (error) {
        console.error('Eroare la ștergerea înregistrării:', error);
        res.status(500).send({ error: 'Eroare internă de server' });
    }
});

app.get('/players', async function (req, res) {
    try {
        const players = await dbOperation.getPlayers();
        console.log('Called and retrieved players:', players);
        res.send(players.recordset);
    }
    catch (error) {
        console.error("Error retrieving players:", error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/insert/players', async function (req, res) {
    await dbOperation.createPlayers(req.body);
    const result = await dbOperation.getPlayers(req.body);
    res.send(result.recordset);
});

app.put('/update/players/:Jucatori_ID', async (req, res) => {
    try {
        const Jucatori_ID = req.params.Jucatori_ID;
        const updatedPlayerData = req.body;
        await dbOperation.updatePlayers(Jucatori_ID, updatedPlayerData);
        res.status(200).send({ message: 'Înregistrarea a fost actualizată cu succes.' });
    } catch (error) {
        console.error('Eroare la actualizarea înregistrării:', error);
        res.status(500).send({ error: 'Eroare internă de server' });
    }
});

app.delete('/delete/players/:Jucatori_ID', async (req, res) => {
    try {
        const Jucatori_ID = req.params.Jucatori_ID;
        await dbOperation.deletePlayers(Jucatori_ID);
        res.status(200).send({ message: 'Înregistrarea a fost ștearsă cu succes.' });
    } catch (error) {
        console.error('Eroare la ștergerea înregistrării:', error);
        res.status(500).send({ error: 'Eroare internă de server' });
    }
});

app.get('/bots', async function (req, res) {
    try {
        const bots = await dbOperation.getBots();
        console.log("Called and retrieved bots:", bots);
        res.send(bots.recordset);
    }
    catch (error) {
        console.error("Error retrieving bots:", error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/tranzaction', async function (req, res) {
    try {
        const tranzaction = await dbOperation.getTranzaction();
        console.log("Called and retrieved tranzaction:", tranzaction);
        res.send(tranzaction.recordset);
    }
    catch (error) {
        console.error("Error retrieving tranzaction:", error.message);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/top3-players-with-skins', async (req, res) => {
    try {
        let results = await dbOperation.getTop3PlayersWithSkins();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/all-tranzactions-buy-sell', async (req, res) => {
    try {
        let results = await dbOperation.getAllTranzactionsBuySell();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/sum-every-player-on-skins', async (req, res) => {
    try {
        let results = await dbOperation.getSumEveryPlayerOnSkins();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/players-buy-specific-skin', async (req, res) => {
    try {
        let results = await dbOperation.getPlayersSpecificSkin();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/manager-department-employee-2001', async (req, res) => {
    try {
        let results = await dbOperation.getManagerDepartmentEmployee2001();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/players-spend-more-than-avg', async (req, res) => {
    try {
        let results = await dbOperation.getPlayerSpendMoreMoneyThanAVG();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/most-active-bot', async (req, res) => {
    try {
        let results = await dbOperation.getMostActiveBot();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/tranzactions-per-section', async (req, res) => {
    try {
        let results = await dbOperation.getTranzactionsPerSection();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/players-buy-from-a-specific-bot/:codIdentificare', async (req, res) => {
    try {
        const codIdentificare = req.params.codIdentificare;
        let results = await dbOperation.getPlayersFromSpecificBot(codIdentificare);
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});




app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));
