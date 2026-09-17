import QtQuick
import "lib/qml"
StackPanel {
 title: "Kamal"
 hints: "l logs · d deploy · r redeploy · b versions · a audit · v version · x acknowledge · / search · Esc close"
 onAction: (id,key) => { if (key === "b") { drilldown = "Last local deployed versions\n" + (selected.versions || []).map((v,i) => (i+1) + "  " + v).join("\n") + "\nPress 1–5 to stage rollback"; return }
 if (/^[1-5]$/.test(key) && drilldown) { const version=(selected.versions || [])[Number(key)-1]; if(version) key="rollback:"+version; else return }
 if (key === "i") { drilldown = JSON.stringify(selected, null, 2); return }
 if (key === "x") key="ack"
 if (service) service.act(id,key) }
}
