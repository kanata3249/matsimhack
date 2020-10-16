import {
    materialsFromMS, materialNames, materialNames2,
    servantsStatistics, materialsForSkillMax
  } from './matsim'

export const summaryOfMaterials = (inventoryNum, myServantdb, Servantdb) => {
  const summaryWithName = []
  const summaryWithName2 = []

  const required = materialsFromMS(inventoryNum, myServantdb, Servantdb)
  for (let materialId in materialNames) {
    summaryWithName.push({
      name: materialNames[materialId],
      total: required[materialId].totalRequired,
      summoned: required[materialId].summonedRequired,
      used: required[materialId].used,
      stock: required[materialId].stock,
      reserved: required[materialId].reserved
    })
  }
  for (let materialId in materialNames2) {
    summaryWithName2.push({
      name: materialNames2[materialId],
      total: required[materialId].totalRequired,
      summoned: required[materialId].summonedRequired,
      used: required[materialId].used,
      stock: required[materialId].stock,
      reserved: required[materialId].reserved
    })
  }
  let result = "名称\t必要数\t必要数(召喚済み)\t使用済み\t使用予定\t所持\n"
  for (let item of summaryWithName) {
    result += `${item.name}\t${item.total}\t${item.summoned}\t${item.used}\t${item.reserved}\t${item.stock}\n`
  }
  result += "\n"
  for (let item of summaryWithName2) {
    result += `${item.name}\t${item.total}\t${item.summoned}\t${item.used}\t${item.reserved}\t${item.stock}\n`
  }
  return result
}

export const summaryOfServants = (myServantdb, Servantdb) =>
{
  let statistics = servantsStatistics(myServantdb, Servantdb);

  let result = `実装済み: ${statistics.total} 召喚済み: ${statistics.summoned} 最終再臨: ${statistics.maxAscension} スキルマ: ${statistics.skillMax.length}\n`;
  result += '\nスキルマ\n'
  for(let item of statistics.skillMax) {
    result += `${item.name.replace('\n', ' ')}\n`
  }
  return result
}

export const numMaterialsForSkillMax = (inventoryNum, myServantdb, Servantdb, useAllMaterials) =>
{
  let servants = materialsForSkillMax(inventoryNum, myServantdb, Servantdb, useAllMaterials).sort((a,b) => (a.materials - b.materials));

  let result = `サーヴァント\t☆\t残素材数\n`
  for(let servant of servants) {
    result += `${servant.name.replace('\n', ' ')}\t${servant.rank}\t${servant.materials}\n`
  }
  return result
}