"use client";

import React from "react";

export default function CalculateurLogistiqueSETAK() {
  const palettes = [
    { nom: "Palette Europe 80 x 120", longueur: 0.8, largeur: 1.2 },
    { nom: "Palette 100 x 120", longueur: 1.0, largeur: 1.2 },
    { nom: "Palette 120 x 120", longueur: 1.2, largeur: 1.2 },
  ];

  const [quantites, setQuantites] = React.useState<Record<number, string>>({});

  const [customRows, setCustomRows] = React.useState([
    {
      longueur: "",
      largeur: "",
      quantite: 1,
    },
  ]);

  const [mplRows, setMplRows] = React.useState([
    {
      longueur: "",
      largeur: "",
      hauteur: "",
      quantite: 1,
      gerbable: false,
    },
  ]);

  const calculEQ = (
    longueur: number,
    largeur: number,
    quantite: number = 1
  ) => {
    const valeur = ((longueur * largeur) / 2.4) / 0.5;
    return valeur * quantite;
  };

  const calculMPL = (
    longueur: number,
    largeur: number,
    quantite: number = 1,
    gerbable: boolean = false
  ) => {
    let mpl = ((longueur * largeur) / 2.4) * quantite;

    if (gerbable) {
      mpl = mpl / 2;
    }

    return mpl;
  };

  const totalEQStandard = palettes.reduce((acc, palette, index) => {
    const qte = Number(quantites[index] || 0);

    return acc + calculEQ(palette.longueur, palette.largeur, qte);
  }, 0);

  const totalEQCustom = customRows.reduce((acc, row) => {
    return (
      acc +
      calculEQ(
        Number(row.longueur || 0),
        Number(row.largeur || 0),
        Number(row.quantite || 0)
      )
    );
  }, 0);

  const totalEQ = totalEQStandard + totalEQCustom;

  const totalMPL = mplRows.reduce((acc, row) => {
    return (
      acc +
      calculMPL(
        Number(row.longueur || 0),
        Number(row.largeur || 0),
        Number(row.quantite || 0),
        row.gerbable
      )
    );
  }, 0);

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.96), rgba(255,255,255,0.96))"
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-red-200">
          <div className="flex items-center gap-4 flex-wrap">
            <img
  src="/logosetak.jpg"
  alt="SETAK"
  className="h-14 object-contain"
/>
  className="h-16 object-contain"
/>
  className="h-16 object-contain"
/>
              className="h-16 object-contain"
            />

            <div>
              <h1 className="text-4xl font-bold text-red-700 mb-2">
                Calculateur Logistique
              </h1>

              <p className="text-slate-600 text-lg font-medium">
                Transports SETAK
              </p>
            </div>
          </div>
        </div>

        {/* EQ */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-red-200">

          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-3xl font-bold text-red-700">
                Équivalence Palette
              </h2>

              <p className="text-slate-500 mt-1">
                Formule : (Longueur × Largeur / 2.4) / 0.5
              </p>
            </div>

            <div className="bg-red-700 text-white rounded-2xl px-6 py-4 text-center min-w-[180px]">
              <div className="text-sm uppercase tracking-wide opacity-80">
                Total EQ
              </div>

              <div className="text-3xl font-bold">
                {Math.ceil(totalEQ)}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-red-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50 text-slate-700">
                  <th className="p-4">Description</th>
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Longueur (m)</th>
                  <th className="p-4">Largeur (m)</th>
                  <th className="p-4">EQ</th>
                </tr>
              </thead>

              <tbody>
                {palettes.map((palette, index) => {
                  const qte = Number(quantites[index] || 0);

                  const resultat = calculEQ(
                    palette.longueur,
                    palette.largeur,
                    qte
                  );

                  return (
                    <tr key={index} className="border-t border-red-100">
                      <td className="p-4 font-medium">{palette.nom}</td>

                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          value={quantites[index] || ""}
                          onChange={(e) =>
                            setQuantites({
                              ...quantites,
                              [index]: e.target.value,
                            })
                          }
                          className="w-24 rounded-xl border border-red-300 px-3 py-2"
                        />
                      </td>

                      <td className="p-4">{palette.longueur}</td>

                      <td className="p-4">{palette.largeur}</td>

                      <td className="p-4 font-semibold text-slate-800">
                        {Math.ceil(resultat)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* HORS STANDARDS */}
          <div className="mt-8">

            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <h3 className="text-2xl font-bold text-red-700">
                Palettes Hors Standards
              </h3>

              <button
                onClick={() =>
                  setCustomRows([
                    ...customRows,
                    {
                      longueur: "",
                      largeur: "",
                      quantite: 1,
                    },
                  ])
                }
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl transition"
              >
                Ajouter une ligne
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-red-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-red-50 text-slate-700">
                    <th className="p-4">Quantité</th>
                    <th className="p-4">Longueur (m)</th>
                    <th className="p-4">Largeur (m)</th>
                    <th className="p-4">EQ</th>
                  </tr>
                </thead>

                <tbody>
                  {customRows.map((row, index) => {
                    const eq = calculEQ(
                      Number(row.longueur || 0),
                      Number(row.largeur || 0),
                      Number(row.quantite || 0)
                    );

                    return (
                      <tr key={index} className="border-t border-red-100">

                        <td className="p-4">
                          <input
                            type="number"
                            min="0"
                            value={row.quantite}
                            onChange={(e) => {
                              const updated = [...customRows];
                              updated[index].quantite = Number(e.target.value);
                              setCustomRows(updated);
                            }}
                            className="w-24 rounded-xl border border-red-300 px-3 py-2"
                          />
                        </td>

                        <td className="p-4">
                          <input
                            type="number"
                            step="0.01"
                            value={row.longueur}
                            onChange={(e) => {
                              const updated = [...customRows];
                              updated[index].longueur = e.target.value;
                              setCustomRows(updated);
                            }}
                            className="w-32 rounded-xl border border-red-300 px-3 py-2"
                          />
                        </td>

                        <td className="p-4">
                          <input
                            type="number"
                            step="0.01"
                            value={row.largeur}
                            onChange={(e) => {
                              const updated = [...customRows];
                              updated[index].largeur = e.target.value;
                              setCustomRows(updated);
                            }}
                            className="w-32 rounded-xl border border-red-300 px-3 py-2"
                          />
                        </td>

                        <td className="p-4 font-semibold text-slate-800">
                          {Math.ceil(eq)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MPL */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-red-200">

          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold text-red-700">
                Calcul du Mètre de Plancher
              </h2>

              <p className="text-slate-500 mt-1">
                Basé sur une largeur de remorque de 2,40 m.
              </p>
            </div>

            <div className="bg-red-700 text-white rounded-2xl px-6 py-4 text-center min-w-[180px]">
              <div className="text-sm uppercase tracking-wide opacity-80">
                Total MPL
              </div>

              <div className="text-3xl font-bold">
                {Math.ceil(totalMPL)} ml
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-red-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50 text-slate-700">
                  <th className="p-4">Longueur (m)</th>
                  <th className="p-4">Largeur (m)</th>
                  <th className="p-4">Hauteur (m)</th>
                  <th className="p-4">Quantité</th>
                  <th className="p-4">Gerbable</th>
                  <th className="p-4">Résultat MPL</th>
                </tr>
              </thead>

              <tbody>
                {mplRows.map((row, index) => {
                  const mpl = calculMPL(
                    Number(row.longueur || 0),
                    Number(row.largeur || 0),
                    Number(row.quantite || 0),
                    row.gerbable
                  );

                  return (
                    <tr key={index} className="border-t border-red-100">

                      <td className="p-4">
                        <input
                          type="number"
                          step="0.01"
                          value={row.longueur}
                          onChange={(e) => {
                            const updated = [...mplRows];
                            updated[index].longueur = e.target.value;
                            setMplRows(updated);
                          }}
                          className="w-32 rounded-xl border border-red-300 px-3 py-2"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          step="0.01"
                          value={row.largeur}
                          onChange={(e) => {
                            const updated = [...mplRows];
                            updated[index].largeur = e.target.value;
                            setMplRows(updated);
                          }}
                          className="w-32 rounded-xl border border-red-300 px-3 py-2"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          step="0.01"
                          value={row.hauteur}
                          onChange={(e) => {
                            const updated = [...mplRows];
                            updated[index].hauteur = e.target.value;
                            setMplRows(updated);
                          }}
                          className="w-32 rounded-xl border border-red-300 px-3 py-2"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          min="1"
                          value={row.quantite}
                          onChange={(e) => {
                            const updated = [...mplRows];
                            updated[index].quantite = Number(e.target.value);
                            setMplRows(updated);
                          }}
                          className="w-24 rounded-xl border border-red-300 px-3 py-2"
                        />
                      </td>

                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={row.gerbable}
                          onChange={(e) => {
                            const updated = [...mplRows];
                            updated[index].gerbable = e.target.checked;
                            setMplRows(updated);
                          }}
                          className="h-5 w-5"
                        />
                      </td>

                      <td className="p-4 font-semibold text-slate-800">
                        {Math.ceil(mpl)} ml
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              onClick={() =>
                setMplRows([
                  ...mplRows,
                  {
                    longueur: "",
                    largeur: "",
                    hauteur: "",
                    quantite: 1,
                    gerbable: false,
                  },
                ])
              }
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-3 rounded-xl transition"
            >
              Ajouter une ligne
            </button>

            <button
              onClick={() =>
                setMplRows([
                  {
                    longueur: "",
                    largeur: "",
                    hauteur: "",
                    quantite: 1,
                    gerbable: false,
                  },
                ])
              }
              className="border border-red-300 px-4 py-3 rounded-xl hover:bg-red-50 transition"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

