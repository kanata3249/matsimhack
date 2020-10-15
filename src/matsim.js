import materialTemplate from './material'

export const materialsFromMS = (inventory, summonedServants, servantDB) => {
  const materials = servantDB.map((servant, index) =>
    materialsForServant(servant, summonedServants[index])
  ).reduce((acc, current) => {
    for (let materialId in current) {
      acc[materialId] = acc[materialId] || { ...materialTemplate }
      for (let key in current[materialId]) {
        acc[materialId][key] += current[materialId][key];
      }
    }
    return acc;
  }, {});
  for (let materialId in inventory) {
    materials[materialId].stock = inventory[materialId];
    materials[materialId].free = materials[materialId].stock - materials[materialId].reserved;
  }
  return materials;
}


export const servantsStatistics = (myServantdb, Servantdb) => {
  const result = {
    total: 0,
    summoned: 0,
    maxAscension: 0,
    skillMax: []
  }

  for (let servantId = 0; servantId < myServantdb.length; servantId++) {
    result.total++
    if (myServantdb[servantId][0]) {
      result.summoned++;
      if (myServantdb[servantId][3] >= 9
        && myServantdb[servantId][5] >= 9
        && myServantdb[servantId][7] >= 9) {
        result.skillMax.push({
          name: Servantdb[servantId].text,
          skillLevel: [myServantdb[servantId][3], myServantdb[servantId][5], myServantdb[servantId][7]]
        });
      }
      if (myServantdb[servantId][1] == 4) {
        result.maxAscension++;
      }

    }
  }
  return result
}

export const materialsForSkillMax = (inventoryNum, myServantdb, Servantdb, useAllMaterials) => {
  const materials = materialsFromMS(inventoryNum, myServantdb, Servantdb);

  var servants = [];

  for (let servantIdx = 0; servantIdx < Servantdb.length; servantIdx++) {
    const servantMaterial = materialsForServant(Servantdb[servantIdx], myServantdb[servantIdx])

    delete servantMaterial[800]
    let materialsForSkillMax = 0
    let needCheck = false
    for (let materialId in servantMaterial) {
      if (servantMaterial[materialId].summonedRequired > 0) {
        if (useAllMaterials) {
          const num = servantMaterial[materialId].requiredForSkill - servantMaterial[materialId].usedForSkill
          if (num > 0) {
            needCheck = true

            materialsForSkillMax += Math.max(0, num - materials[materialId].stock)
          }
        } else {
          const num = servantMaterial[materialId].requiredForSkill
          - (servantMaterial[materialId].reservedForSkill + servantMaterial[materialId].usedForSkill)
          if (num > 0) {
            needCheck = true

            materialsForSkillMax += Math.max(0, num - materials[materialId].free)
          }
        }
      }
    }

    if (needCheck) {
      servants.push({
        idx: servantIdx,
        name: Servantdb[servantIdx].text,
        rank: Servantdb[servantIdx].value + 1,
        materials: materialsForSkillMax
      })
    }
  }

  return servants
}

export const materialNames = {
  300: "英雄の証",
  301: "凶骨",
  302: "竜の牙",
  303: "虚陰の塵",
  304: "愚者の鎖",
  305: "万死の毒針",
  306: "魔術髄液",
  307: "宵哭きの鉄杭",
  308: "励振火薬",
  400: "世界樹の種",
  401: "ゴーストランタン",
  402: "八連双晶",
  403: "蛇の宝玉",
  404: "鳳凰の羽",
  405: "無間の歯車",
  406: "禁断の頁",
  407: "ホムンクルスベピー",
  408: "隕蹄鉄",
  409: "大騎士勲章",
  410: "追憶の貝殻",
  411: "枯淡勾玉",
  412: "永遠結氷",
  413: "巨人の指輪",
  414: "オーロラ鋼",
  415: "閑古鈴",
  416: "禍罪の矢尻",
  417: "光銀の冠",
  418: "神脈霊子",
  500: "混沌の爪",
  501: "蛮神の心臓",
  502: "竜の逆鉾",
  503: "精霊根",
  504: "戦馬の幼角",
  505: "血の涙石",
  506: "黒獣脂",
  507: "封魔のランプ",
  508: "智慧のスカラベ",
  509: "原初の産毛",
  510: "呪獣胆石",
  511: "奇奇神酒",
  512: "暁光炉心",
  513: "九十九鏡",
  514: "真理の卵",
  515: "煌星のカケラ",
  516: "悠久の実",
};
export const materialNames2 = {
  200: "剣の輝石",
  201: "弓の輝石",
  202: "槍の輝石",
  203: "騎の輝石",
  204: "術の輝石",
  205: "殺の輝石",
  206: "狂の輝石",

  210: "剣の魔石",
  211: "弓の魔石",
  212: "槍の魔石",
  213: "騎の魔石",
  214: "術の魔石",
  215: "殺の魔石",
  216: "狂の魔石",

  220: "剣の秘石",
  221: "弓の秘石",
  222: "槍の秘石",
  223: "騎の秘石",
  224: "術の秘石",
  225: "殺の秘石",
  226: "狂の秘石",

  100: "セイバーピース",
  101: "アーチャーピース",
  102: "ランサーピース",
  103: "ライダーピース",
  104: "キャスターピース",
  105: "アサシンピース",
  106: "バーサーカーピース",
  110: "セイバーモニュメント",
  111: "アーチャーモニュメント",
  112: "ランサーモニュメント",
  113: "ライダーモニュメント",
  114: "キャスターモニュメント",
  115: "アサシンモニュメント",
  116: "バーサーカーモニュメント",
};

const materialsForServant = (servant, servantStatus) => {
  const ascensionMaterialKeys = [
    "AdAgain1", "AdAgain2", "AdAgain3", "AdAgain4"
  ];
  const skillMaterialKeys = [
    "skill1", "skill2", "skill3", "skill4", "skill5", "skill6", "skill7", "skill8", "skill9"
  ];
  const isSummoned = servantStatus[0];
  const currentAscensionLevel = servantStatus[1];
  const resesrvedAscensionLevel = servantStatus[2];
  const currentSkillLevel = [servantStatus[3], servantStatus[5], servantStatus[7]];
  const reservedSkillLevel = [servantStatus[4], servantStatus[6], servantStatus[8]];

  const servantMaterials = {};
  for (let ascensionLevel = 0; ascensionLevel < ascensionMaterialKeys.length; ascensionLevel++) {
    const materials = servant[ascensionMaterialKeys[ascensionLevel]]

    for (let materialId in materials) {
      servantMaterials[materialId] = servantMaterials[materialId] || { ...materialTemplate }

      const material = servantMaterials[materialId]
      const num = materials[materialId]

      material.totalRequired += num;
      if (isSummoned) {
        material.summonedRequired += num;
        if (currentAscensionLevel > ascensionLevel) {
          material.used += num
          material.usedForAscension += num
        } else {
          material.requiredForAscension += num
          if (resesrvedAscensionLevel > ascensionLevel) {
            material.reserved += num
            material.reservedForAscension += num
          }
        }
      }
    }
  }
  for (let skillNo = 0; skillNo < 3; skillNo++) {
    for (let skillLevel = 0; skillLevel < skillMaterialKeys.length; skillLevel++) {
      const materials = servant[skillMaterialKeys[skillLevel]]

      for (let materialId in materials) {
        servantMaterials[materialId] = servantMaterials[materialId] || { ...materialTemplate }

        const material = servantMaterials[materialId];
        const num = materials[materialId]

        material.totalRequired += num
        if (isSummoned) {
          material.summonedRequired += num;
          if (currentSkillLevel[skillNo] - 1 > skillLevel) {
            material.used += num
            material.usedForSkill += num
          } else {
            material.requiredForSkill += num;
            if (reservedSkillLevel[skillNo] - 1 > skillLevel) {
              material.reserved += num
              material.reservedForSkill += num
            }
          }
        }
      }
    }
  }
  return servantMaterials
}