<script setup>
// ideally js-file-download for blob
// import fileDownload from 'js-file-download'

const BASE_URL = 'https://raw.githubusercontent.com/lnelab/dfu-package/main/'

const items = [
    { name: 'Canis Major Left', fileName: 'sirius_cm_left_2402.zip' },
    { name: 'Canis Major Left', fileName: 'sirius_cm_left_2501.zip' },
    { name: 'Canis Major Right', fileName: 'sirius_cm_right_2402.zip' },
    { name: 'Canis Major Right', fileName: 'sirius_cm_right_2501.zip' },
    { name: 'LINKPAD 1U', fileName: 'sirius_linkpad_1u_2403.zip' },
    { name: 'LINKPAD 1U', fileName: 'sirius_linkpad_1u_2501.zip' },
    { name: 'LINKPAD', fileName: 'sirius_linkpad_2403.zip' },
    { name: 'LINKPAD', fileName: 'sirius_linkpad_2501.zip' },
    { name: 'MeowTool mini', fileName: 'sirius_meowtool_mini_2402.zip' },
    { name: 'MeowTool mini', fileName: 'sirius_meowtool_mini_2501.zip' },
    { name: 'MeowTool mini BLE', fileName: 'sirius_meowtool_mini_ble_2402.zip' },
    { name: 'MeowTool mini BLE', fileName: 'sirius_meowtool_mini_ble_2501.zip' },
    { name: 'Ursa Major Left', fileName: 'sirius_um_left_2402.zip' },
    { name: 'Ursa Major Left', fileName: 'sirius_um_left_2501.zip' },
    { name: 'Ursa Major Right', fileName: 'sirius_um_right_2402.zip' },
    { name: 'Ursa Major Right', fileName: 'sirius_um_right_2501.zip' },
    { name: 'Horizon75', fileName: 'icon_horizon75_2402.zip' },
    { name: 'Horizon75', fileName: 'icon_horizon75_2501.zip' }
]
</script>

<template>
    <div>
        <ul>
            <li v-for="item in items" :key="item.fileName">
                <a :href="BASE_URL + item.fileName">{{ item.name }} - {{ item.fileName }}</a>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>