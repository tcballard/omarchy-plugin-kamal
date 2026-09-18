import QtQuick
import qs.Commons
import qs.Ui

WidgetButton {
    id: root
    property string severity: "ok"
    // The built-in bar calls its themed active colour "urgent". Custom bars
    // may additionally expose an accent; keep every value a live binding.
    readonly property color normalForeground: bar && bar.barForeground !== undefined ? bar.barForeground : Color.foreground
    readonly property color activityForeground: bar && bar.accent !== undefined ? bar.accent : bar && bar.urgent !== undefined ? bar.urgent : Color.accent
    readonly property color alertForeground: bar && bar.urgent !== undefined ? bar.urgent : Color.urgent
    foreground: severity === "urgent" || severity === "warn" ? root.alertForeground : severity === "watch" ? root.activityForeground : root.normalForeground
}
