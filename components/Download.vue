<script setup>
// ideally js-file-download for blob
// import fileDownload from 'js-file-download'

const BASE_URL = 'https://raw.githubusercontent.com/lnelab/dfu-package/main/'

const items = [
    { name: 'sirius_cm_left_2402.zip' },
    { name: 'sirius_cm_right_2402.zip' },
    { name: 'sirius_linkpad_1u_2403.zip' },
    { name: 'sirius_linkpad_2403.zip' },
    { name: 'sirius_meowtool_mini_2402.zip' },
    { name: 'sirius_meowtool_mini_ble_2402.zip' },
    { name: 'sirius_um_left_2402.zip' },
    { name: 'sirius_um_right_2402.zip' },
    { name: 'icon_horizon75_2402.zip' }
]
</script>

<template>
    <div>
        <ul>
            <li v-for="item in items" :key="item.name">
                <a :href="BASE_URL + item.name">{{ item.name }}</a>
            </li>
        </ul>
    </div>
</template>

<style scoped></style>