class Tranzactie {
    constructor (Tranzactie_ID, Cumparator_ID, Vanzator_ID, Sectiuni_ID, DataTranzactiei){
        this.Tranzactie_ID = Tranzactie_ID;
        this.Cumparator_ID = Cumparator_ID;
        this.Vanzator_ID = Vanzator_ID;
        this.Sectiuni_ID = Sectiuni_ID;
        this.DataTranzactiei = DataTranzactiei;
    }
}

module.exports = Tranzactie;