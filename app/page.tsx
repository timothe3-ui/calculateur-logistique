"use client";

import React from "react";

export default function CalculateurLogistiqueSETAK() {
  const palettes = [
    { nom: "Palette Europe 80 x 120", longueur: 0.8, largeur: 1.2 },
    { nom: "Palette 100 x 120", longueur: 1.0, largeur: 1.2 },
    { nom: "Palette 120 x 120", longueur: 1.2, largeur: 1.2 },
  ];

  const [quantites, setQuantites] = React.useState<Record<number, number>>({});

  const [customRows, setCustomRows] = React.useState([
    { longueur: "", largeur: "", quantite: 1 },
  ]);

  const [mplRows, setMplRows] = React.useState([
    { longueur: "", largeur: "", hauteur: "", quantite: 1, gerbable: false },
  ]);

  const toNumber = (v: any) => (isNaN(Number(v)) ? 0 : Number(v));

  // EQ LOGIC
  const calculEQ = (
  longueur: number,
  largeur: number,
  quantite: number,
  paletteNom?: string
) => {
  // règles spéciales
  if (paletteNom === "Palette Europe 80 x 120") {
    return quantite;
  }

  // 🔥 PALETTE 120x120 (LOGIQUE CORRIGÉE)
  if (paletteNom === "Palette 120 x 120") {
  if (quantite <= 0) return 0;

  // 1 palette = 1 EQ (arrondi sup inutile ici mais cohérent)
  if (quantite === 1) return 1;

  const valeur = (longueur * largeur) / 1.2;
  return Math.ceil(valeur * quantite);
}

  // règle standard
  const valeur = (longueur * largeur) / 1.2;
  return valeur * quantite;
};

  // MPL (sans arrondi)
  const calculMPL = (
    longueur: number,
    largeur: number,
    quantite: number = 1,
    gerbable: boolean = false
  ) => {
    let mpl = (longueur * largeur) / 2.4 * quantite;

    if (gerbable) {
      mpl = mpl / 2;
    }

    return mpl;
  };

  const totalEQStandard = palettes.reduce((acc, palette, index) => {
    const qte = quantites[index] || 0;

    return (
      acc +
      calculEQ(palette.longueur, palette.largeur, qte, palette.nom)
    );
  }, 0);

  const totalEQCustom = customRows.reduce((acc, row) => {
    return (
      acc +
      calculEQ(
        toNumber(row.longueur),
        toNumber(row.largeur),
        toNumber(row.quantite)
      )
    );
  }, 0);

  const totalEQ = totalEQStandard + totalEQCustom;

  const totalMPL = mplRows.reduce((acc, row) => {
    return (
      acc +
      calculMPL(
        toNumber(row.longueur),
        toNumber(row.largeur),
        toNumber(row.quantite),
        row.gerbable
      )
    );
  }, 0);

  return (
    <div className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.96), rgba(255,255,255,0.96))",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-red-200">
          <div className="flex items-center gap-4 flex-wrap">
            <img src="/logosetak.jpg" alt="SETAK" className="h-14 w-auto" />
            <div>
              <h1 className="text-4xl font-bold text-red-700 mb-2">
                Votre calculette
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
                Formule : (Longueur × Largeur / 2.4)
              </p>
            </div>

            <div className="bg-red-700 text-white rounded-2xl px-6 py-4 text-center min-w-[180px]">
              <div className="text-sm uppercase">Total EQ</div>
              <div className="text-3xl font-bold">{totalEQ}</div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-red-200">
            <table className="w-full">
              <thead>
                <tr className="bg-red-50">
                  <th className="p-4">Description</th>
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Longueur</th>
                  <th className="p-4">Largeur</th>
                  <th className="p-4">EQ</th>
                </tr>
              </thead>

              <tbody>
                {palettes.map((palette, index) => {
                  const qte = quantites[index] || 0;

                  const eq = calculEQ(
                    palette.longueur,
                    palette.largeur,
                    qte,
                    palette.nom
                  );

                  return (
                    <tr key={index} className="border-t">
                      <td className="p-4">{palette.nom}</td>

                      <td className="p-4">
                        <input
                          type="number"
                          value={qte || ""}
                          onChange={(e) =>
                            setQuantites({
                              ...quantites,
                              [index]: toNumber(e.target.value),
                            })
                          }
                          className="w-24 border rounded-xl px-3 py-2"
                        />
                      </td>

                      <td className="p-4">{palette.longueur}</td>
                      <td className="p-4">{palette.largeur}</td>

                      <td className="p-4 font-semibold">{eq}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MPL */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-red-200">

          <div className="flex justify-between mb-6 flex-wrap gap-4">
            <div>
  <h2 className="text-3xl font-bold text-red-700">
    Mètre de Plancher
  </h2>

  <p className="text-slate-500 mt-1">
    (Unité en mètre)
  </p>
</div>

            <div className="bg-red-700 text-white rounded-2xl px-6 py-4 min-w-[180px] text-center">
              <div className="text-sm uppercase">Total MPL</div>
              <div className="text-3xl font-bold">{totalMPL} ml</div>
            </div>
          </div>

          <div className="overflow-x-auto border rounded-2xl">
            <table className="w-full">
              <thead>
                <tr className="bg-red-50">
                  <th className="p-4">Longueur</th>
                  <th className="p-4">Largeur</th>
                  <th className="p-4">Hauteur</th>
                  <th className="p-4">Quantité</th>
                  <th className="p-4">Gerbable</th>
                  <th className="p-4">MPL</th>
                </tr>
              </thead>

              <tbody>
                {mplRows.map((row, index) => {
                  const mpl = calculMPL(
                    toNumber(row.longueur),
                    toNumber(row.largeur),
                    toNumber(row.quantite),
                    row.gerbable
                  );

                  return (
                    <tr key={index} className="border-t">

                      <td className="p-4">
                        <input
                          value={row.longueur}
                          onChange={(e) =>
                            setMplRows((prev) =>
                              prev.map((r, i) =>
                                i === index ? { ...r, longueur: e.target.value } : r
                              )
                            )
                          }
                          className="border rounded-xl px-3 py-2 w-32"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          value={row.largeur}
                          onChange={(e) =>
                            setMplRows((prev) =>
                              prev.map((r, i) =>
                                i === index ? { ...r, largeur: e.target.value } : r
                              )
                            )
                          }
                          className="border rounded-xl px-3 py-2 w-32"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          value={row.hauteur}
                          onChange={(e) =>
                            setMplRows((prev) =>
                              prev.map((r, i) =>
                                i === index ? { ...r, hauteur: e.target.value } : r
                              )
                            )
                          }
                          className="border rounded-xl px-3 py-2 w-32"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          value={row.quantite}
                          onChange={(e) =>
                            setMplRows((prev) =>
                              prev.map((r, i) =>
                                i === index ? { ...r, quantite: toNumber(e.target.value) } : r
                              )
                            )
                          }
                          className="border rounded-xl px-3 py-2 w-24"
                        />
                      </td>

                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={row.gerbable}
                          onChange={(e) =>
                            setMplRows((prev) =>
                              prev.map((r, i) =>
                                i === index ? { ...r, gerbable: e.target.checked } : r
                              )
                            )
                          }
                        />
                      </td>

                      <td className="p-4 font-semibold">{mpl} ml</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}