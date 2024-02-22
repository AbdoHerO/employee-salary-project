export class EmployeSalaireAnnuel {
    id: number;
    nom: string;
    prenom: string;
    annee: number;
    salaireAnnuel: number;

    constructor(id: number, nom: string, prenom: string, annee: number, salaireAnnuel: number) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.annee = annee;
        this.salaireAnnuel = salaireAnnuel;
    }
}
