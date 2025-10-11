<script setup>
// ideally js-file-download for blob
// import fileDownload from 'js-file-download'

const BASE_URL = 'https://raw.githubusercontent.com/lnelab/dfu-package/main/'

const deepItems = [
    {
        name: 'Canis Major',
        files: [
            'sirius_cm_left_2501.zip',
            'sirius_cm_right_2501.zip'
        ]
    },
    {
        name: 'LINKPAD',
        files: [
            'sirius_linkpad_1u_2501.zip'
        ]
    },
    {
        name: 'LINKPAD 1U',
        files: [
            'sirius_linkpad_2501.zip'
        ]
    },
    {
        name: 'MeowTool mini',
        files: [
            'sirius_meowtool_mini_2501.zip'
        ]
    },
    {
        name: 'MeowTool mini BLE',
        files: [
            'sirius_meowtool_mini_ble_2501.zip'
        ]
    },
    {
        name: 'Ursa Major / 大熊座',
        files: [
            'sirius_um_left_2501.zip',
            'sirius_um_right_2501.zip'
        ]
    },
    {
        name: 'Horizon75',
        files: [
            'icon_horizon75_2501.zip'
        ]
    }
]
</script>

<template>
    <div v-for="{ name, files } in deepItems" :key="name">
        <h3>
            {{ name }}
        </h3>
        <ul>
            <li v-for="file in files" :key="file">
                <a :href="BASE_URL + file">{{ file }}</a>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>