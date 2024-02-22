import { Employe } from "./employe";
import { Salaire } from "./salaire";
import { EmployeSalaireAnnuel } from "./employeSalaireAnnuel";


import { salaireData } from "../data/salaireData";
import { employeData } from "../data/employeData";



const employees: Employe[] = [];
const salaries: Salaire[] = [];

employeData.forEach(empData => {
    employees.push(new Employe(empData.id, empData.nom, empData.prenom));
});

salaireData.forEach(salaryData => {
    salaries.push(new Salaire(salaryData.id, salaryData.annee, salaryData.mois, salaryData.salaireMensuel));
});


function constituerListeEmployeSalaireAnnuel(employes: Employe[], salaires: Salaire[]): EmployeSalaireAnnuel[] {
    const employeSalaireAnnuelMap = new Map<number, EmployeSalaireAnnuel>();
    
    for (const salaire of salaires) {
        if (!employeSalaireAnnuelMap.has(salaire.id)) {
            const employe = employes.find(emp => emp.id === salaire.id);
            if (employe) {
                employeSalaireAnnuelMap.set(salaire.id, {
                    id: salaire.id,
                    nom: employe.nom,
                    prenom: employe.prenom,
                    annee: salaire.annee,
                    salaireAnnuel: salaire.salaireMensuel
                });
            }
        } else {
            const employeSalaireAnnuel = employeSalaireAnnuelMap.get(salaire.id);
            if (employeSalaireAnnuel) {
                employeSalaireAnnuel.salaireAnnuel += salaire.salaireMensuel;
            }
        }
    }
    
    return Array.from(employeSalaireAnnuelMap.values());
}

function afficherMinMaxSalaireAnnuel(employeSalaires: EmployeSalaireAnnuel[]): void {
    const minSalaire = Math.min(...employeSalaires.map(es => es.salaireAnnuel));
    const maxSalaire = Math.max(...employeSalaires.map(es => es.salaireAnnuel));

    const employeMin = employeSalaires.find(es => es.salaireAnnuel === minSalaire);
    const employeMax = employeSalaires.find(es => es.salaireAnnuel === maxSalaire);

    console.log(`Salaire annuel minimum: ${minSalaire}, Employé: ${employeMin?.nom} ${employeMin?.prenom}`);
    console.log(`Salaire annuel maximum: ${maxSalaire}, Employé: ${employeMax?.nom} ${employeMax?.prenom}`);
}

const listeEmployeSalaireAnnuel = constituerListeEmployeSalaireAnnuel(employees, salaries);
console.log("Liste des employés avec leur salaire annuel:");
console.table(listeEmployeSalaireAnnuel);
console.log("\n");
console.log("Salaire annuel min, max et les employés correspondants:");
afficherMinMaxSalaireAnnuel(listeEmployeSalaireAnnuel);


