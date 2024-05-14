<template>
	<div>
		<div class="d-flex align-center gap-1">
			<div v-html="bootlogoValue.label"></div>
			<v-chip v-if="bootlogoValue.preview" color="primary" size="x-small">
				<span class="font-weight-bold">P</span>
			</v-chip>
		</div>
		<div class="caption">
			{{ bootlogoValue.des }} [ID: {{ bootlogoValue.id }}]
		</div>
		<div class="d-flex gap-1 w-100">
			<v-file-input
				variant="outlined"
				density="compact"
				v-model="bootlogoValue.value as unknown as File[]"
				:accept="bootlogoValue.format ? bootlogoValue.format : ''"
				@change="addToAsset($event)"
			/>
			<ToolTip location="top" text="Load from asset">
				<v-btn
					@click="assetSelector.new(bootlogoValue.id)"
					color="primary"
					size="40"
				>
					<v-icon size="large">mdi-folder-image</v-icon>
				</v-btn>
			</ToolTip>
		</div>
		<div class="d-flex align-center gap-1">
			Other images:
		</div>
		<div class="caption">
			All the files will be autimatically dropped into /image/wall/
		</div> 
	
		Add image to:
		<v-select
			variant="outlined"
			:items=imagePropertyMap
			item-title="label"
			item-value="path"
			v-model="selectedProperty"
		>
		</v-select>
		<div>
			Path: {{ selectedProperty }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { type PropType, type Ref, ref, computed } from "vue";
import { type MUOSThemeChild, type MUOSThemeValues, themeFunc } from '@/service/theme';
import { assetFunc, assetSelector } from "@/service/assets";
import ToolTip from "@/components/buttons/ToolTip.vue";

const imagePropertyMap = [
	{
		"label": "Default",
		"filename": "default.png",
		"path": "/default.png"
	},
	{
		"label": "Apps",
		"filename": "muxapps.png",
		"path": "/muxapps.png"
	},
	{
		"label": "Apps - Portmaster",
		"filename": "portmaster.png",
		"path": "/portmaster.png"
	},
	{
		"label": "Apps - Retroarch",
		"filename": "retroarch.png",
		"path": "/retroarch.png"
	},
	{
		"label": "Apps - Dingux",
		"filename": "dingux.png",
		"path": "/dingux.png"
	},
	{
		"label": "Apps - Assign",
		"filename": "muxassign.png",
		"path": "/muxassign.png"
	},
	{
		"label": "Apps - Charge",
		"filename": "muxcharge.png",
		"path": "/muxcharge.png"
	},
	{
		"label": "Config",
		"filename": "muxconfig.png",
		"path": "/muxconfig.png"
	},
	{
		"label": "Config - General",
		"filename": "general.png",
		"path": "/muxconfig/general.png"
	},
	{
		"label": "Config - Theme",
		"filename": "theme.png",
		"path": "/muxconfig/theme.png"
	},
	{
		"label": "Config - Archive",
		"filename": "archive.png",
		"path": "/muxconfig/archive.png"
	},
	{
		"label": "Config - Network",
		"filename": "network.png",
		"path": "/muxconfig/network.png"
	},
	{
		"label": "Config - Service",
		"filename": "service.png",
		"path": "/muxconfig/service.png"
	},
	{
		"label": "Config - Clock",
		"filename": "clock.png",
		"path": "/muxconfig/clock.png"
	},
	{
		"label": "Config - Device",
		"filename": "device.png",
		"path": "/muxconfig/device.png"
	},
	{
		"label": "Config - Refresh",
		"filename": "refresh.png",
		"path": "/muxconfig/refresh.png"
	},
	{
		"label": "Credits",
		"filename": "muxcredits.png",
		"path": "/muxcredits.png"
	},
	{
		"label": "Device",
		"filename": "muxdevice.png",
		"path": "/muxdevice.png"
	},
	{
		"label": "Device - rg28xx",
		"filename": "rg28xx.png",
		"path": "/muxdevice/rg28xx.png"
	},
	{
		"label": "Device - rg35xx-h",
		"filename": "rg35xx-h.png",
		"path": "/muxdevice/rg35xx-h.png"
	},
	{
		"label": "Device - rg35xx-plus",
		"filename": "rg35xx-plus.png",
		"path": "/muxdevice/rg35xx-plus.png"
	},
	{
		"label": "Device - rg35xx-2024",
		"filename": "rg35xx-2024.png",
		"path": "/muxdevice/rg35xx-2024.png"
	},
	{
		"label": "Favourite",
		"filename": "muxfavourite.png",
		"path": "/muxfavourite.png"
	},
	{
		"label": "History",
		"filename": "muxhistory.png",
		"path": "/muxhistory.png"
	},
	{
		"label": "Info",
		"filename": "muxinfo.png",
		"path": "/muxinfo.png"
	},
	{
		"label": "Info - Tracker",
		"filename": "tracker.png",
		"path": "/muxinfo/tracker.png"
	},
	{
		"label": "Info - Tester",
		"filename": "tester.png",
		"path": "/muxinfo/tester.png"
	},
	{
		"label": "Info - System",
		"filename": "system.png",
		"path": "/muxinfo/system.png"
	},
	{
		"label": "Info - Credit",
		"filename": "credit.png",
		"path": "/muxinfo/credit.png"
	},
	{
		"label": "Launch (Main)",
		"filename": "muxlaunch.png",
		"path": "/muxlaunch.png"
	},
	{
		"label": "Launch - Explore",
		"filename": "explore.png",
		"path": "/muxlaunch/explore.png"
	},
	{
		"label": "Launch - Favourite",
		"filename": "favourite.png",
		"path": "/muxlaunch/favourite.png"
	},
	{
		"label": "Launch - History",
		"filename": "history.png",
		"path": "/muxlaunch/history.png"
	},
	{
		"label": "Launch - Apps",
		"filename": "apps.png",
		"path": "/muxlaunch/apps.png"
	},
	{
		"label": "Launch - Info",
		"filename": "info.png",
		"path": "/muxlaunch/info.png"
	},
	{
		"label": "Launch - Config",
		"filename": "config.png",
		"path": "/muxlaunch/config.png"
	},
	{
		"label": "Launch - Reboot",
		"filename": "reboot.png",
		"path": "/muxlaunch/reboot.png"
	},
	{
		"label": "Launch - Shutdown",
		"filename": "shutdown.png",
		"path": "/muxlaunch/shutdown.png"
	},
	{
		"label": "Netscan",
		"filename": "muxnetscan.png",
		"path": "/muxnetscan.png"
	},
	{
		"label": "Network",
		"filename": "muxnetwork.png",
		"path": "/muxnetwork.png"
	},
	{
		"label": "Network - Enable",
		"filename": "enable.png",
		"path": "/muxnetwork/enable.png"
	},
	{
		"label": "Network - Identifier",
		"filename": "identifier.png",
		"path": "/muxnetwork/identifier.png"
	},
	{
		"label": "Network - Password",
		"filename": "password.png",
		"path": "/muxnetwork/password.png"
	},
	{
		"label": "Network - Type",
		"filename": "type.png",
		"path": "/muxnetwork/type.png"
	},
	{
		"label": "Network - Address",
		"filename": "address.png",
		"path": "/muxnetwork/address.png"
	},
	{
		"label": "Network - Subnet",
		"filename": "subnet.png",
		"path": "/muxnetwork/subnet.png"
	},
	{
		"label": "Network - Gateway",
		"filename": "gateway.png",
		"path": "/muxnetwork/gateway.png"
	},
	{
		"label": "Network - Dns",
		"filename": "dns.png",
		"path": "/muxnetwork/dns.png"
	},
	{
		"label": "Network - Status",
		"filename": "status.png",
		"path": "/muxnetwork/status.png"
	},
	{
		"label": "Network - Connect",
		"filename": "connect.png",
		"path": "/muxnetwork/connect.png"
	},
	{
		"label": "Explore",
		"filename": "muxplore.png",
		"path": "/muxplore.png"
	},
	{
		"label": "Reset",
		"filename": "muxreset.png",
		"path": "/muxreset.png"
	},
	{
		"label": "Reset - Favourite",
		"filename": "favourite.png",
		"path": "/muxreset/favourite.png"
	},
	{
		"label": "Reset - History",
		"filename": "history.png",
		"path": "/muxreset/history.png"
	},
	{
		"label": "Reset - Activity",
		"filename": "activity.png",
		"path": "/muxreset/activity.png"
	},
	{
		"label": "Reset - Config",
		"filename": "config.png",
		"path": "/muxreset/config.png"
	},
	{
		"label": "Reset - Cache",
		"filename": "cache.png",
		"path": "/muxreset/cache.png"
	},
	{
		"label": "Reset - Retroarch",
		"filename": "retroarch.png",
		"path": "/muxreset/retroarch.png"
	},
	{
		"label": "Reset - Network",
		"filename": "network.png",
		"path": "/muxreset/network.png"
	},
	{
		"label": "Reset - Portmaster",
		"filename": "portmaster.png",
		"path": "/muxreset/portmaster.png"
	},
	{
		"label": "RTC",
		"filename": "muxrtc.png",
		"path": "/muxrtc.png"
	},
	{
		"label": "RTC - Year",
		"filename": "year.png",
		"path": "/muxrtc.png"
	},
	{
		"label": "RTC - Month",
		"filename": "month.png",
		"path": "/muxrtc.png"
	},
	{
		"label": "RTC - Day",
		"filename": "day.png",
		"path": "/muxrtc.png"
	},
	{
		"label": "RTC - Hour",
		"filename": "hour.png",
		"path": "/muxrtc.png"
	},
	{
		"label": "RTC - Minute",
		"filename": "minute.png",
		"path": "/muxrtc.png"
	},
	{
		"label": "RTC - Notation",
		"filename": "notation.png",
		"path": "/muxrtc.png"
	},
	{
		"label": "RTC - Timezone",
		"filename": "timezone.png",
		"path": "/muxrtc.png"
	},
	{
		"label": "muxstart",
		"filename": "muxstart.png",
		"path": "/muxstart.png"
	},
	{
		"label": "muxsysinfo",
		"filename": "muxsysinfo.png",
		"path": "/muxsysinfo.png"
	},
	{
		"label": "version",
		"filename": "version.png",
		"path": "/muxsysinfo/version.png"
	},
	{
		"label": "retroarch",
		"filename": "retroarch.png",
		"path": "/muxsysinfo/retroarch.png"
	},
	{
		"label": "kernel",
		"filename": "kernel.png",
		"path": "/muxsysinfo/kernel.png"
	},
	{
		"label": "uptime",
		"filename": "uptime.png",
		"path": "/muxsysinfo/uptime.png"
	},
	{
		"label": "cpu",
		"filename": "cpu.png",
		"path": "/muxsysinfo/cpu.png"
	},
	{
		"label": "speed",
		"filename": "speed.png",
		"path": "/muxsysinfo/speed.png"
	},
	{
		"label": "governor",
		"filename": "governor.png",
		"path": "/muxsysinfo/governor.png"
	},
	{
		"label": "memory",
		"filename": "memory.png",
		"path": "/muxsysinfo/memory.png"
	},
	{
		"label": "temp",
		"filename": "temp.png",
		"path": "/muxsysinfo/temp.png"
	},
	{
		"label": "service",
		"filename": "service.png",
		"path": "/muxsysinfo/service.png"
	},
	{
		"label": "capacity",
		"filename": "capacity.png",
		"path": "/muxsysinfo/capacity.png"
	},
	{
		"label": "voltage",
		"filename": "voltage.png",
		"path": "/muxsysinfo/voltage.png"
	},
	{
		"label": "muxtester",
		"filename": "muxtester.png",
		"path": "/muxtester.png"
	},
	{
		"label": "muxtheme",
		"filename": "muxtheme.png",
		"path": "/muxtheme.png"
	},
	{
		"label": "muxtimezone",
		"filename": "muxtimezone.png",
		"path": "/muxtimezone.png"
	},
	{
		"label": "muxtracker",
		"filename": "muxtracker.png",
		"path": "/muxtracker.png"
	},
	{
		"label": "muxtweakadv",
		"filename": "muxtweakadv.png",
		"path": "/muxtweakadv.png"
	},
	{
		"label": "swap",
		"filename": "swap.png",
		"path": "/muxtweakadv/swap.png"
	},
	{
		"label": "thermal",
		"filename": "thermal.png",
		"path": "/muxtweakadv/thermal.png"
	},
	{
		"label": "font",
		"filename": "font.png",
		"path": "/muxtweakadv/font.png"
	},
	{
		"label": "verbose",
		"filename": "verbose.png",
		"path": "/muxtweakadv/verbose.png"
	},
	{
		"label": "volume",
		"filename": "volume.png",
		"path": "/muxtweakadv/volume.png"
	},
	{
		"label": "offset",
		"filename": "offset.png",
		"path": "/muxtweakadv/offset.png"
	},
	{
		"label": "muxtweakgen",
		"filename": "muxtweakgen.png",
		"path": "/muxtweakgen.png"
	},
	{
		"label": "sound",
		"filename": "sound.png",
		"path": "/muxtweakgen/sound.png"
	},
	{
		"label": "startup",
		"filename": "startup.png",
		"path": "/muxtweakgen/startup.png"
	},
	{
		"label": "sleep",
		"filename": "sleep.png",
		"path": "/muxtweakgen/sleep.png"
	},
	{
		"label": "shutdown",
		"filename": "shutdown.png",
		"path": "/muxtweakgen/shutdown.png"
	},
	{
		"label": "battery",
		"filename": "battery.png",
		"path": "/muxtweakgen/battery.png"
	},
	{
		"label": "night",
		"filename": "night.png",
		"path": "/muxtweakgen/night.png"
	},
	{
		"label": "interface",
		"filename": "interface.png",
		"path": "/muxtweakgen/interface.png"
	},
	{
		"label": "advanced",
		"filename": "advanced.png",
		"path": "/muxtweakgen/advanced.png"
	},
	{
		"label": "muxvisual",
		"filename": "muxvisual.png",
		"path": "/muxvisual.png"
	},
	{
		"label": "battery",
		"filename": "battery.png",
		"path": "/muxvisual/battery.png"
	},
	{
		"label": "network",
		"filename": "network.png",
		"path": "/muxvisual/network.png"
	},
	{
		"label": "bluetooth",
		"filename": "bluetooth.png",
		"path": "/muxvisual/bluetooth.png"
	},
	{
		"label": "clock",
		"filename": "clock.png",
		"path": "/muxvisual/clock.png"
	},
	{
		"label": "muxwebserv",
		"filename": "muxwebserv.png",
		"path": "/muxwebserv.png"
	},
	{
		"label": "shell",
		"filename": "shell.png",
		"path": "/muxwebserv/shell.png"
	},
	{
		"label": "browser",
		"filename": "browser.png",
		"path": "/muxwebserv/browser.png"
	},
	{
		"label": "terminal",
		"filename": "terminal.png",
		"path": "/muxwebserv/terminal.png"
	},
	{
		"label": "sync",
		"filename": "sync.png",
		"path": "/muxwebserv/sync.png"
	},
	{
		"label": "ntp",
		"filename": "ntp.png",
		"path": "/muxwebserv/ntp.png"
	},
]

const props = defineProps({
	themeGroup: {
		type: Object as PropType<MUOSThemeValues>,
		required: true,
	}
})

const selectedProperty: Ref<string> = ref("/default.png");

const bootlogoValue = computed(() => {
	return themeFunc.getChild("148") as MUOSThemeChild
});

const addToAsset = (e: any) => {
	if(!e || !e.target || !e.target.files) return;
	if(e.target.files.length === 0) return;
	assetFunc.add(e.target.files[0]);
}

</script>

<style scoped></style>