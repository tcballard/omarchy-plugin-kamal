import QtQuick
import qs.Ui as Ui
import "lib/qml"
import "Model.js" as Model
Ui.BarWidget {
 id: root
 moduleName: "io.github.tcballard.kamal"
 property var service: null
 readonly property var indicator: Model.barStatus(service ? service.snapshot : null, service ? service.snapshot.error || service.snapshot.pollError || "" : "")
 readonly property string barText: root.vertical ? indicator.icon : "Kamal " + indicator.icon
 function resolveService() { if (bar && bar.shell && typeof bar.shell.serviceFor === "function") service=bar.shell.serviceFor(moduleName) }
 onBarChanged: resolveService()
 Component.onCompleted: resolveService()
 Timer { interval: 1000; running: !root.service; repeat: true; onTriggered: root.resolveService() }
 readonly property bool opened: panel.opened
 function open(payloadJson) { panel.open(payloadJson) }
 function close() { panel.close() }
 implicitWidth: button.implicitWidth
 implicitHeight: button.implicitHeight
 StackGlyph {
  id: button
  anchors.fill: parent
  bar: root.bar
  text: root.barText
  severity: root.indicator.severity
  tooltipText: "Kamal — " + root.indicator.label + "\n" + (root.service ? root.service.snapshot.summary || "" : "") + "\nClick for details and controls"
  onPressed: mouseButton => { if (panel.opened) panel.close(); else panel.open("") }
 }
 Panel { id: panel; bar: root.bar; anchorItem: button; hostWidget: root; service: root.service }
}
