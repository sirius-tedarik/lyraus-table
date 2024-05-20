<template>
  <div
    class="rounded w-full"
    :class="hideContainer && 'relative'"
    @click="$emit('click', true)"
  >
    <div
      class="w-full flex relative rounded"
      :class="
        !hideContainer && 'border border-gray-300 p-2 pt-4 dark:border-gray-500'
      "
    >
      <h6
        v-if="!hideTitle"
        class="absolute bg-white pr-2 pl-2 dark:text-gray-300 rounded text-black text-sm"
        :class="{
          'dark:bg-gray-800': lightDark,
          'dark:bg-gray-900': !lightDark,
          '-top-3': !hideContainer,
          '-top-2.5 text-xs z-50 left-0': hideContainer,
        }"
      >
        {{ title }}
      </h6>

      <input
        v-if="
          type != 'select' &&
          type != 'textarea' &&
          type != 'file' &&
          type != 'phone' &&
          type != 'price' &&
          type != 'email' &&
          type != 'numberLength'
        "
        :type="type"
        :step="type == 'number' ? (step ? step : '0.01') : ''"
        @keypress.enter="() => $emit('onEnter', true)"
        :disabled="disabled"
        v-model="data"
        @input="(r) => $emit('change', r.target.value)"
        :min="min"
        :required="required"
        :max="max"
        :maxlength="max"
        class="w-full border-gray-200 text-left rounded dark:border-gray-500 dark:text-gray-300 text-black border h-10 px-4 text-base"
        :class="{
          'w-6/12 bg-red-400': value != value2 && stateId == 3,
          'w-full': !(value != value2 && stateId == 3),
          'bg-gray-100 dark:bg-gray-500': disabled,
          'bg-white dark:bg-gray-700': !disabled,
          'bg-gray-200': type == 'button',
        }"
      />

      <span v-if="type == 'numberLength'" class="block w-full">
        <input
          type="number"
          :value="data"
          @input="updateValue"
          class="w-full rounded dark:text-gray-300 text-black border h-10 px-4"
        />
      </span>

      <span v-if="type == 'phone'" class="block w-full">
        <input
          type="phone"
          v-model="data"
          @input="(r) => $emit('change', r.target.value)"
          class="w-full rounded dark:text-gray-300 text-black border h-10 px-4"
          :class="{
            'w-6/12 bg-red-400': value != value2 && stateId == 3,
            'w-full': !(value != value2 && stateId == 3),
            'bg-gray-100 dark:bg-gray-500': disabled,
            'bg-white dark:bg-gray-700': !disabled,
            'border-red-600 focus:border-red-600 ':
              !phoneValidator() && this.data,
            'border-green-600 focus:border-green-600':
              phoneValidator() && this.data,
            'border-gray-200 dark:border-gray-500':
              phoneValidator() && !this.data,
          }"
          @keypress="phoneValidator()"
        />
        <label class="text-xs mt-5 text-red-600" v-if="!phoneValidator()"
          >Format Örneği 5523322212</label
        >
      </span>

      <span v-if="type == 'email'" class="block w-full">
        <input
          type="email"
          v-model="data"
          @input="(r) => $emit('change', r.target.value)"
          class="w-full rounded dark:text-gray-300 text-black border h-10 px-4"
          :class="{
            'w-6/12 bg-red-400': value != value2 && stateId == 3,
            'w-full': !(value != value2 && stateId == 3),
            'bg-gray-100 dark:bg-gray-500': disabled,
            'bg-white dark:bg-gray-700': !disabled,
            'border-red-600 focus:border-red-600 ':
              !emailValidator() && this.data,
            'border-green-600 focus:border-green-600':
              emailValidator() && this.data,
            'border-gray-200 dark:border-gray-500':
              emailValidator() && !this.data,
          }"
          @keypress="emailValidator()"
        />
        <label class="text-xs mt-5 text-red-600" v-if="!emailValidator()"
          >Format Örneği info@example.com</label
        >
      </span>

      <VueNumeric
        :priceRequired="priceRequired"
        symbolPosition="back"
        :precision="digitCount ? digitCount : 4"
        separator="."
        v-model="data"
        :disabled="disabled"
        v-if="type == 'price'"
        class="w-full dark:text-gray-300 text-black h-10 px-4"
        @change="(r) => $emit('change', r.target.value)"
        :class="{
          'w-6/12 bg-red-400 ': value != value2 && stateId == 3,
          'w-full ': !(value != value2 && stateId == 3),
          'bg-gray-100 dark:bg-gray-500': disabled,
          'bg-white dark:bg-gray-700': !disabled,
          'border dark:border-gray-500 border-gray-300': !hideBorder,
          'border-b dark:border-gray-500 focus:outline-none border-gray-300':
            hideBorder,
          'bg-opacity-0 text-white border-b border-opacity-40 border-t-0 border-l-0 border-r-0 rounded-none focus:outline-none':
            isOpacity,
          rounded: !isOpacity,
        }"
      />

      <input
        v-if="type == 'file'"
        :type="type"
        @change="onFileChange"
        :disabled="disabled"
        :required="required"
        class="w-full border-gray-200 rounded dark:border-gray-500 dark:text-gray-300 text-black border h-10 px-4"
        :class="{
          'w-6/12 bg-red-400': value != value2 && stateId == 3,
          'w-full': !(value != value2 && stateId == 3),
          'bg-gray-100 dark:bg-gray-500': disabled,
          'bg-white dark:bg-gray-700': !disabled,
        }"
      />

      <multiselect
        v-if="type == 'select' && !disabled"
        :internal-search="manuelSearch ? false : true"
        :multiple="multiple"
        v-model="selected"
        :options="optList"
        :loading="loading"
        :label="label ? label : 'name'"
        @remove="$emit('change', 0)"
        track-by="id"
        placeholder="Seçilmedi"
        selectLabel="Seç"
        selectedLabel="Seçildi"
        deselectLabel="Seçimi Kaldır"
        :openDirection="openDirection ? openDirection : 'bottom'"
        :hideSelected="hideSelected ? hideSelected : false"
        @search-change="(val) => manuelSearch && $emit('asyncFind', val)"
      >
      </multiselect>

      <input
        :required="required"
        type="text"
        v-if="type == 'select' && disabled"
        :disabled="true"
        :value="selected.name"
        class="w-full bg-gray-100 border-gray-200 rounded dark:border-gray-500 dark:text-gray-300 text-black border h-10 px-4 text-base dark:bg-gray-700"
      />

      <textarea
        v-model="data"
        @change="(r) => $emit('change', r.target.value)"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        rows="5"
        style="min-height: 80px !important"
        v-if="type == 'textarea'"
        class="w-full p-2 border-gray-300 rounded text-black border max-h-7 dark:border-gray-500 dark:text-gray-300"
        :class="{
          'w-6/12 bg-red-400': value != value2 && stateId == 3,
          'w-full': !(value != value2 && stateId == 3),
          'bg-gray-100 dark:bg-gray-500': disabled,
          'bg-white dark:bg-gray-700': !disabled,
        }"
      ></textarea>
    </div>
  </div>
</template>

<script>
import VueNumeric from "vue-numeric";
import Multiselect from "vue-multiselect";
import { isMobilePhone, isEmail } from "validator";
export default {
  components: {
    Multiselect,
    VueNumeric,
  },
  name: "lyraus-input",
  model: {
    props: "value",
    event: "change",
  },
  props: [
    "priceRequired",
    "digitCount",
    "loading",
    "isOpacity",
    "value",
    "optList",
    "isYesNo",
    "type",
    "value2",
    "title",
    "stateId",
    "min",
    "max",
    "disabled",
    "required",
    "lightDark",
    "multiple",
    "hideContainer",
    "hideTitle",
    "hideBorder",
    "hideSelected",
    "isAllPhone",
    "step",
    "label",
    "valCount",
    "asyncFind",
    "manuelSearch",
    "openDirection",
  ],
  data() {
    return {
      data: "",
      selected: "",
    };
  },
  methods: {
    //İNPUTA GİRİLECEK SAYI SINIRLANDIRILMASI
    // handleInput(event) {
    //   const inputValue = event.target.value.replace(/[^0-9]/g, '');
    //   this.data = inputValue.substring(0, 7);
    //   this.$emit('change', this.data);
    // },

    updateValue(event) {
      const value = event.target.value;
      if (value <= this.valCount) {
        this.data = value;
      }
      this.$forceUpdate();
    },
    onFileChange(e) {
      this.file = e.target.files[0];
      this.priview = URL.createObjectURL(this.file);
      this.$emit("getFile", this.file);
      this.$emit("getPriview", this.priview);
    },
    phoneValidator() {
      if (this.data) {
        if (this.isAllPhone) return this.data.match(/\d/g).length === 10;
        else return isMobilePhone(this.data, ["tr-TR"]);
      } else return true;
    },
    emailValidator() {
      if (this.data) return isEmail(this.data);
      else return true;
    },
  },

  created() {
    this.data = this.value;

    if (
      this.value > 0 &&
      this.type == "select" &&
      !this.multiple &&
      this.optList.length > 0
    ) {
      this.selected = this.optList.find((r) => r.id == this.value);
    } else if (
      this.value > 0 &&
      this.type == "select" &&
      this.multiple &&
      this.optList.length > 0
    )
      this.selected = this.value;
  },
  watch: {
    value(val) {
      this.data = val;
      if (this.type == "select" && !this.multiple && this.optList.length > 0) {
        this.selected = this.optList.find((r) => r.id == val);
      } else if (
        this.type == "select" &&
        this.multiple &&
        this.optList.length > 0
      ) {
        this.selected = val;
      }
    },

    selected(val) {
      if (!this.multiple && this.optList.length) this.$emit("change", val.id);
      else if (this.optList.length) this.$emit("change", val);
    },
    optList(val) {
      if (val.length > 0) {
        if (this.value && this.type == "select" && !this.multiple) {
          this.selected = this.optList.find((r) => r.id == this.value);
        } else if (this.value && this.type == "select" && this.multiple) {
          this.selected = this.value;
        }
      }
    },
  },
};
</script>

<style></style>
