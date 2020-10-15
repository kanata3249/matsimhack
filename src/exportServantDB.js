(function() {
  var a = document.createElement("a");
  var d = `{"Servantdb":${JSON.stringify(Servantdb)},"myServantdb":${JSON.stringify(myServantdb)},\n"inventryNum":${JSON.stringify(inventoryNum)}}\n`;
  a.href = "data:text/plain," + encodeURIComponent(d);
  a.download = "chaldea.txt";
  document.body.appendChild(a);
  a.click();
  a.parentNode.removeChild(a);
})();