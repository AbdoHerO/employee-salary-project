"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employe_1 = require("./employe");
const salaire_1 = require("./salaire");
const salaireData_1 = require("../data/salaireData");
const employeData_1 = require("../data/employeData");
const employees = [];
const salaries = [];
employeData_1.employeData.forEach(empData => {
    employees.push(new employe_1.Employe(empData.id, empData.nom, empData.prenom));
});
salaireData_1.salaireData.forEach(salaryData => {
    salaries.push(new salaire_1.Salaire(salaryData.id, salaryData.annee, salaryData.mois, salaryData.salaireMensuel));
});
function constituerListeEmployeSalaireAnnuel(employes, salaires) {
    const employeSalaireAnnuelMap = new Map();
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
        }
        else {
            const employeSalaireAnnuel = employeSalaireAnnuelMap.get(salaire.id);
            if (employeSalaireAnnuel) {
                employeSalaireAnnuel.salaireAnnuel += salaire.salaireMensuel;
            }
        }
    }
    return Array.from(employeSalaireAnnuelMap.values());
}
function afficherMinMaxSalaireAnnuel(employeSalaires) {
    const minSalaire = Math.min(...employeSalaires.map(es => es.salaireAnnuel));
    const maxSalaire = Math.max(...employeSalaires.map(es => es.salaireAnnuel));
    const employeMin = employeSalaires.find(es => es.salaireAnnuel === minSalaire);
    const employeMax = employeSalaires.find(es => es.salaireAnnuel === maxSalaire);
    console.log(`Salaire annuel minimum: ${minSalaire}, Employé: ${employeMin === null || employeMin === void 0 ? void 0 : employeMin.nom} ${employeMin === null || employeMin === void 0 ? void 0 : employeMin.prenom}`);
    console.log(`Salaire annuel maximum: ${maxSalaire}, Employé: ${employeMax === null || employeMax === void 0 ? void 0 : employeMax.nom} ${employeMax === null || employeMax === void 0 ? void 0 : employeMax.prenom}`);
}
const listeEmployeSalaireAnnuel = constituerListeEmployeSalaireAnnuel(employees, salaries);
console.log("Liste des employés avec leur salaire annuel:");
console.table(listeEmployeSalaireAnnuel);
console.log("\n");
console.log("Salaire annuel min, max et les employés correspondants:");
afficherMinMaxSalaireAnnuel(listeEmployeSalaireAnnuel);
