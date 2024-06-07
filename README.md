# LyrausTable Vue.js Component

## Overview

> The LyrausTable component is a versatile table component designed for displaying tabular data in Vue.js applications. It provides various features such as pagination, sticky columns, sorting, filtering, and customizable column rendering.

## Installation

```
npm install lyraus-ui
```

## Usage:

```
<script>
import { LyrausTable } from "lyraus-ui";
</script>
```

```
<template>
    ...
    <LyrausTable
        :data="List"
        :columns="columns"
    />
    ...
</template>
```

### Column Object

| Props           | Description                                                |      Example |    Type | Default |
| :-------------- | :--------------------------------------------------------- | -----------: | ------: | ------: |
| **key**         | Identifier for using data.                                 |    "orderNo" |  String |         |
| **label**       | Column title (optional).                                   | Order Number |  String |         |
| **width**       | You have to give width to use sticky option (optional).    |           80 |  Number |         |
| **isDate**      | Changes the date format (optional).                        |         true | Boolean |   false |
| **dontDisplay** | To provent displaying values for a column (optional).      |         true | Boolean |   false |
| **maxLength**   | Limit the displayed text to a specified length (optional). |           14 |  Number |         |
| **extraKeys**   | Extra data to show in same column (optional).              | ["unitType"] |   Array |         |

### Table Props

| Props                         | Description                                                                                                                    |                                                                                    Example |     Type |                                                                                    Default |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------- | -----------------------------------------------------------------------------------------: | -------: | -----------------------------------------------------------------------------------------: |
| **columns**                   | An array of objects representing the columns of the table. Each object should contain key, label, and width properties.        |   [{ key: "orderNo", label: "Order No", width: 90, isDate:false, extraKeys=["unitType"] }] |    Array |                                                                                            |
| **data**                      | An array of objects representing the rows of data to be displayed in the table.                                                |                                                                            [{orderNo: 85}] |    Array |                                                                                            |
| **pageCount**                 | Total count of rows in the entire dataset (optional).                                                                          |                                                                                         16 |   Number |                                                                                            |
| **propPage**                  | You have to give your currentPage state to this prop to persist the currentPage data when changing tabs in the app (optional). |                                                                                          1 |   Number |                                                                                            |
| **totalCount**                | Total count of pages in the paginated data (optional).                                                                         |                                                                                        324 |   Number |                                                                                            |
| **isLoading**                 | Boolean indicating whether data is being loaded (optional).                                                                    |                                                                                       true |  Boolean |                                                                                      false |
| **checkboxColumn**            | Enables a checkbox column (optional).                                                                                          |                                                                                       true |  Boolean |                                                                                      false |
| **useCheckAllBox**            | Enables a checkbox in the selectable column to select all rows (optional).                                                     |                                                                                       true |  Boolean |                                                                                      false |
| **indexColumn**               | Enables index column (optional).                                                                                               |                                                                                       true |  Boolean |                                                                                      false |
| **searchBar**                 | Enables a search bar above the table (optional).                                                                               |                                                                                       true |  Boolean |                                                                                      false |
| **rightExtraSlot**            | Enables an extra slot at top right side of the table(optional).                                                                |                                                                                       true |  Boolean |                                                                                      false |
| **batchOperations**           | Enables batch operation controls (optional).                                                                                   |                                                                                       true |  Boolean |                                                                                      false |
| **handleSearch**              | A function to handle search queries (optional).                                                                                |                                                                                            | Function |                                                                                            |
| **batchOperationsList**       | A list of options for batch operations (optional).                                                                             |                                                                                            |    Array |                                                                                            |
| **clickableColumns**          | Array of column keys to make columns clickable(optional).                                                                      |                                                               ['orderNo', 'deliveredName'] |    Array |                                                                                            |
| **dblClickableColumns**       | Array of column keys to make columns double clickable(optional).                                                               |                                                               ['orderNo', 'deliveredName'] |    Array |                                                                                            |
| **stickyLeft**                | Array of column keys to make columns sticky on the left side(optional).                                                        |                                                               ['orderNo', 'deliveredName'] |    Array |                                                                                            |
| **stickyRight**               | Array of column keys to make columns sticky on the right side(optional).                                                       |                                                        ['dropdownColumn', 'buttonsColumn'] |    Array |                                                                                            |
| **alternateRowBg**            | Array of two Tailwind color classes for alternating row background colors(optional).                                           |                                                                      ['white', 'gray-100'] |    Array |                                                                                            |
| **innerTable**                | An array representing the inner table columns (optional).                                                                      |                  [{key: "vehicle",label: "Vehicle",width: "100px", extraKeys=["orderNo"]}] |    Array |                                                                                            |
| **buttonsColumn**             | Configuration object for rendering custom buttons in a column (optional).                                                      |                                                              { label: 'İşlem', width: 90 } |   Object |                                                                                            |
| **dropdownColumns**           | Configuration array for rendering dropdowns in a column (optional).                                                            |                                              [{ key: 'status' label: 'Durum', width: 180}] |   Object |                                                                                            |
| **@row-click**                | Function for handling row click (optional).                                                                                    |                                                 (row, index) => handleRowClick(row, index) | Function |                                                                                            |
| **@dbl-row-click**            | Function for handling row double click (optional).                                                                             |                                              (row, index) => handleDblRowClick(row, index) | Function |                                                                                            |
| **@update-selected**          | Function for updating selected checkboxes (optional).                                                                          |                                                               (val) => handleSelected(val) | Function |                                                                                            |
| **@update-search-value**      | Function for updating search value (optional).                                                                                 |                                                            (val) => handleSearchValue(val) | Function |                                                                                            |
| **@update-selected-batch-op** | Function for updating selected batch opertaion (optional).                                                                     |                                                                (val) => handleBatchOp(val) | Function |                                                                                            |
| **@update-current-page**      | Function for updating current page (optional).                                                                                 |                                                            (val) => handleCurrentPage(val) | Function |                                                                                            |
| **paginationButtonColor**     | Tailwind color class of pagination buttons (optional).                                                                         |                                                                                    red-500 |   string |                                                                                   gray-600 |
| **paginationHoverColor**      | Tailwind color class of pagination buttons on hover (optional).                                                                |                                                                                    red-600 |   string |                                                                                   gray-700 |
| **paginationTextColor**       | Tailwind color class of pagination button text (optional).                                                                     |                                                                                   gray-100 |   string |                                                                                      white |
| **tableHeight**               | Height of the table (optional).                                                                                                |                                                                                       50vh |   string |                                                                                       65vh |
| **containerClass**            | Tailwind class for the most outer div (optional).                                                                              |                                                                                            |   string |                                                                                            |
| **operationsDiv**             | Tailwind class for the div containing batch operations and search bar (optional).                                              |                                                     flex justify-between items-center mb-6 |   string |                                                     flex justify-between items-center mb-4 |
| **tableClass**                | Tailwind class for the table element (optional).                                                                               |                                                         min-w-full divide-y divide-red-500 |   string |                                                        min-w-full divide-y divide-gray-200 |
| **theadClass**                | Tailwind class for the table header element (optional).                                                                        |                                                               bg-red-500 sticky top-0 z-10 |   string |                                                               bg-gray-50 sticky top-0 z-10 |
| **thClass**                   | Tailwind class for table header cells (optional).                                                                              | py-4 text-left text-xs font-medium bg-red-500 text-gray-500 tracking-wider border-gray-200 |   string | py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 tracking-wider border-gray-200 |
| **tdClass**                   | Tailwind class for table data cells (optional).                                                                                |                                                  whitespace-nowrap border-gray-200 text-md |   string |                                                  whitespace-nowrap border-gray-200 text-xs |
| **tbodyClass**                | Tailwind class for table body (optional).                                                                                      |                                                                                 text-white |   string |                                                                                 text-black |
| **innerTableClass**           | Tailwind class for the inner table element (optional).                                                                         |                                      divide-gray-200 border-red-500 sticky left-0 w-screen |   string |                                     divide-gray-200 border-gray-300 sticky left-0 w-screen |
| **innerTheadClass**           | Tailwind class for the inner table header element (optional).                                                                  |                                                                                 bg-red-500 |   string |                                                                                 bg-gray-50 |
| **innerThClass**              | Tailwind class for inner table header cells (optional).                                                                        | py-4 text-left text-xs font-medium bg-red-500 text-gray-500 tracking-wider border-gray-200 |   string | py-2 text-left text-xs font-medium bg-gray-50 text-gray-500 tracking-wider border-gray-200 |
| **innerTdClass**              | Tailwind class for inner table data cells (optional).                                                                          |                                                                  whitespace-nowrap text-xs |   string |                                                                  whitespace-nowrap text-xs |
| **innerTbodyClass**           | Tailwind class for inner table body (optional).                                                                                |                                                                                 text-white |   string |                                                                                            |
| **outerDivClass**             | Tailwind class for the outer div wrapping the table(optional).                                                                 |                                                                                            |   string |                                                                          overflow-auto m-2 |
| **innerDivClass**             | Tailwind class for the inner div wrapping the table (optional).                                                                |                                                                                            |   string |                                                                                            |

### Operations

#### Search Bar:

How to use default search bar.

```

<template>
    <LyrausTable
        :data="List"
        :columns="columns"
        :searchBar="true"
        @update-search-value="(val) => handleSearchValue(val)"
        :handleSearch="handleSearch"
    >
        ...
    </LyrausTable>
</template>

<script>
export default {
    data () {
        return {
            search: ""
        }
    }
    methods: {
        handleSearchValue(val) {
            this.search = val;
        },
        handleSearch() {
            console.log(this.search);
        },
    }
}
</script>

```

#### Batch Operations:

How to use default batch operations.

```

<template>
    <LyrausTable
        :data="List"
        :columns="columns"
        :batchOperations="true"
        :batchOperationsList="batchOperationsList"
        @update-selected-batch-op="(val) => handleBatchOp(val)"
    >
        ...
    </LyrausTable>
</template>

<script>
export default {
    data () {
        return {
            batchOperationsList: [
                {
                    id: 1,
                    name: "Something One",
                },
                {
                    id: 2,
                    name: "Something Two",
                },
            ],
        }
    }
    methods: {
        handleBatchOp(val) {
           handleAction(val);
        },
        handleAction(val) {
            switch (val) {
                case '1':
                    console.log('Case 1 In');
                    break;
                case '2':
                    console.log('Case 2 In');
                    break;
                default:
                    console.log('Unknown action');
            }
        }
    }
}
</script>

```

### Slots

#### Search Bar:

Slot to change default search bar.

```

<LyrausTable
:data="List"
:columns="columns"
>
    <template v-slot:searchBar>
        < Add Your Custom Search Bar >
    </template>

</LyrausTable>
```

#### Extra Top Right Slot:

Slot for custom component at top right side of the table.

```

<LyrausTable
:data="List"
:columns="columns"
>
    <template v-slot:rightExtra>
        < Add Your Custom Component >
    </template>

</LyrausTable>
```

#### Batch Operations:

Slot to change default batch operations.

```
<LyrausTable
    :data="List"
    :columns="columns"
    :batchOperations="true"
>
    <template v-slot:batchOperations>
        < Add Your Custom Batch Operations Component >
    </template>
</LyrausTable>
```

#### Sort Button:

Slot for custom sort buttons in table headers.

```
<LyrausTable
    :data="List"
    :columns="columns"
>
    <template v-slot:sortButton="{ columnKey }">
        <button
          v-if="columnKey === 'orderNo'"
          class="pr-1"
          @click="triggerSort(columnKey, 'Artan')"
        >
          <i class="fas fa-sort"></i>
        </button>
        <button
          v-if="columnKey === 'outpointAdress'"
          class="pr-1"
          @click="triggerSortTwo(columnKey, 'Artan')"
        >
          <i class="fas fa-sort"></i>
        </button>
    </template>
</LyrausTable>
```

#### Filter Button:

Slot for custom filter buttons in table headers.

```
<LyrausTable
    :data="List"
    :columns="columns"
>
    <template v-slot:filterButton="{ columnKey }">
        <TableStatusPanel
            v-if="columnKey === 'outpointAdress'"
            class="h-4 w-4"
            :statusList="receivedNameStatusList"
            :initialStatus="filterType"
            @setStatusFilter="(val) => (val, handleFilter(val))"
        />
    </template>
</LyrausTable>
```

#### Column Dropdown:

Slot for custom dropdowns in column.
To use this you have to add **dropdownColumn** prop.
If you want this to stick right side of the screen add :stickyRight=['dropdownColumn'] prop.

```
<LyrausTable
    :data="List"
    :columns="columns"
    :dropdownColumn="[
      { key: 'Durum', label: 'Durum', width: 180 },
    ]"
>
    <template v-slot:colDropdown="{ item, dropdownKey }">
        <div
         v-if="dropdownKey === 'dropdownColumnDurum'"
         class="table-td w-36 border-r border-opacity-20">
            <ChangeStatus
                :plaque="item.vehicle"
                :defaultTitle="item.stateName"
                :stateId="item.stateId"
                :typeId="item.typeId"
                :planId="item.id"
                :orderNo="item.orderNo"
                :note="item.note"
                @changeVehicle="
                    () => ((selected = item), $modal.show('change-vehicle-modal'))
                "
                @refresh="() => getAll()"
                @vehicleStatu="
                    (r) => (
                        ($refs.vehicleStatu.modalData = {
                            detail: item,
                            activeStatu: r,
                        }),
                    $refs.vehicleStatu.show()
                )
                "
            />
        </div>
    </template>
</LyrausTable>
```

#### Column Buttons:

Slot for custom buttons in a column.
To use this you have to add **buttonsColumn** prop.
If you want this to stick right side of the screen add :stickyRight=['buttonsColumn'] prop.

```
<LyrausTable
    :data="List"
    :columns="columns"
    :buttonsColumn="{ label: 'İşlem', width: 90 }"
>
    <template v-slot:colButtons="{ item, index }">
        <div class="flex items-center justify-end space-x-2 px-2">
            <button
                class="px-1 rounded text-sm"
                :disabled="isDisabled"
                @click="editData(item, index)"
            >
                <i class="fas fa-edit"></i>
            </button>
        </div>
        <div class="flex items-center justify-end space-x-2 px-2">
            <button
                class="px-1 rounded text-sm"
                :disabled="isDisabled"
                @click="deleteData(item, index)"
            >
                <i class="fas fa-trash"></i>
            </button>
        </div>
    </template>
</LyrausTable>
```

#### Row Buttons:

Slot for custom buttons in each row.

```
<LyrausTable
    :data="List"
    :columns="columns"
>
    <template v-slot:rowButtons="{ item, index, columnKey }">
        <button
          v-if="columnKey === 'receivedName'"
          @click="handleName(item, index)"
        >
          <img
            class="w-5 h-5 ml-3"
            src="../assets/planing/filteredit.svg"
            alt=""
          />
        </button>
        <button
          v-if="columnKey === 'outpointAdress'"
          @click="handleLocation(item, index)"
        >
          <img
            class="w-5 h-5 ml-3"
            src="../assets/planing/location.svg"
            alt=""
          />
        </button>
    </template>
</LyrausTable>
```
