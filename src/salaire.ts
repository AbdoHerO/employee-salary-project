export class Salaire {
    id: number;
    annee: number;
    mois: number;
    salaireMensuel: number;

    constructor(id: number, annee: number, mois: number, salaireMensuel: number) {
        this.id = id;
        this.annee = annee;
        this.mois = mois;
        this.salaireMensuel = salaireMensuel;
    }
}
